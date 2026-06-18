#!/usr/bin/env node
/**
 * Skills repo validator and catalog tool.
 * Validates SKILL.md frontmatter against the Palantir-inspired ontology schema.
 *
 * Usage (from repo root):
 *   node .claude/skills/run-skills/driver.mjs [command] [options]
 *
 * Commands:
 *   validate          Check all SKILL.md frontmatter against schema (default)
 *   list              List all discovered skills with type + description
 *   search <query>    Find skills by name, description, tags, or type
 *   check <slug>      Validate a single skill by slug and show parsed data
 *   graph             Print dependency graph (links between skills)
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dir, "../../../..");

// ── Frontmatter parser (zero deps) ──────────────────────────────────────────

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { _error: "No YAML frontmatter block (file must start with ---)" };

  const result = {};
  let currentKey = null;
  let currentArray = null;
  let currentObjectArray = null;
  let currentObj = null;

  for (const raw of m[1].split("\n")) {
    const line = raw.trimEnd();
    if (!line) continue;

    // nested object property inside an array of objects (4-space indent)
    if (currentObj !== null && /^ {4}[a-zA-Z]/.test(line)) {
      const kv = line.trim().match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)/);
      if (kv) {
        const val = kv[2].trim();
        currentObj[kv[1]] = val === "" ? undefined : parseScalar(val);
      }
      continue;
    }

    // array item — could be a scalar or start of an object
    if (/^  - /.test(line)) {
      const item = line.replace(/^  - /, "").trim();
      if (currentObjectArray !== null) {
        // flush previous object
        currentObjectArray.push(currentObj || {});
      }
      if (item === "" || item === "{}") {
        currentObj = {};
        currentObjectArray = currentObjectArray ?? (() => {
          const arr = [];
          if (currentKey) result[currentKey] = arr;
          return arr;
        })();
      } else if (item.includes(": ")) {
        // inline object
        currentObj = {};
        const kv = item.match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)/);
        if (kv) currentObj[kv[1]] = parseScalar(kv[2].trim());
        if (!currentObjectArray) {
          currentObjectArray = [];
          if (currentKey) result[currentKey] = currentObjectArray;
        }
      } else {
        // plain scalar in array
        currentObj = null;
        currentObjectArray = null;
        if (!Array.isArray(result[currentKey])) result[currentKey] = [];
        result[currentKey].push(parseScalar(item));
      }
      continue;
    }

    // flush any pending object
    if (currentObj !== null && currentObjectArray !== null) {
      currentObjectArray.push(currentObj);
      currentObj = null;
      currentObjectArray = null;
    }

    // top-level key
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)/);
    if (kv) {
      currentKey = kv[1];
      const val = kv[2].trim();
      if (val === "" || val === "null") {
        result[currentKey] = undefined;
        currentArray = null;
        currentObjectArray = null;
        currentObj = null;
      } else {
        result[currentKey] = parseScalar(val);
        currentArray = null;
        currentObjectArray = null;
        currentObj = null;
      }
    }
  }

  // flush last pending object
  if (currentObj !== null && currentObjectArray !== null) {
    currentObjectArray.push(currentObj);
  }

  return result;
}

function parseScalar(v) {
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^\d+$/.test(v)) return parseInt(v, 10);
  if (/^\d+\.\d+$/.test(v)) return parseFloat(v);
  return v.replace(/^["']|["']$/g, ""); // strip optional quotes
}

// ── Schema validation ────────────────────────────────────────────────────────

const REQUIRED = ["name", "description", "type"];
const VALID_TYPES = ["action", "object", "interface", "skill"];
const VALID_PLATFORMS = ["claude-code", "codex", "openai-assistants", "any"];
const VALID_CARDINALITIES = ["one-to-one", "one-to-many", "many-to-many"];
const VALID_BASE_TYPES = ["string", "integer", "float", "boolean", "date", "timestamp", "object-reference", "array", "struct"];
const NAME_RE = /^[a-z][a-z0-9-]*$/;
const VER_RE = /^\d+\.\d+\.\d+$/;

function validate(fm, slug) {
  const errors = [];

  for (const r of REQUIRED) {
    if (fm[r] == null) errors.push(`missing required field: "${r}"`);
  }

  if (fm.name && !NAME_RE.test(fm.name))
    errors.push(`name must be kebab-case (got "${fm.name}")`);

  if (fm.name && fm.name !== slug)
    errors.push(`name "${fm.name}" ≠ directory slug "${slug}"`);

  if (fm.description && typeof fm.description === "string" && fm.description.length < 20)
    errors.push(`description too short (${fm.description.length} chars, min 20)`);

  if (fm.type && !VALID_TYPES.includes(fm.type))
    errors.push(`type must be one of: ${VALID_TYPES.join(", ")} (got "${fm.type}")`);

  if (fm.platforms) {
    const bad = asArray(fm.platforms).filter(p => !VALID_PLATFORMS.includes(p));
    if (bad.length) errors.push(`unknown platforms: ${bad.join(", ")}`);
  }

  if (fm.version && !VER_RE.test(fm.version))
    errors.push(`version must be x.y.z semver (got "${fm.version}")`);

  // action-type checks
  if (fm.type === "action" && fm.parameters) {
    const params = asArray(fm.parameters);
    for (const p of params) {
      if (!p.name) errors.push(`parameter missing "name" field`);
      if (p.baseType && !VALID_BASE_TYPES.includes(p.baseType))
        errors.push(`parameter "${p.name}": unknown baseType "${p.baseType}"`);
    }
  }

  // interface-type checks
  if (fm.type === "interface" && fm.extends) {
    for (const e of asArray(fm.extends)) {
      if (!NAME_RE.test(e)) errors.push(`extends: "${e}" is not a valid slug`);
    }
  }

  // link checks
  if (fm.links) {
    const links = asArray(fm.links);
    for (const l of links) {
      if (!l.forwardName) errors.push(`link missing "forwardName"`);
      if (!l.target) errors.push(`link "${l.forwardName ?? "?"}": missing "target"`);
      if (l.target && !NAME_RE.test(l.target))
        errors.push(`link target "${l.target}" is not a valid slug`);
      if (l.cardinality && !VALID_CARDINALITIES.includes(l.cardinality))
        errors.push(`link "${l.forwardName}": cardinality must be one of ${VALID_CARDINALITIES.join(", ")}`);
    }
  }

  // object-type property checks
  if (fm.type === "object" && fm.properties) {
    const props = asArray(fm.properties);
    for (const p of props) {
      if (!p.name) errors.push(`property missing "name"`);
      if (!p.description) errors.push(`property "${p.name}": missing "description"`);
      if (p.baseType && !VALID_BASE_TYPES.filter(t => t !== "object-reference").includes(p.baseType))
        errors.push(`property "${p.name}": unknown baseType "${p.baseType}"`);
    }
  }

  return errors;
}

function asArray(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

// ── File discovery ───────────────────────────────────────────────────────────

function findSkills(root) {
  const skills = [];
  function walk(dir) {
    let entries;
    try { entries = readdirSync(dir); } catch { return; }
    for (const e of entries) {
      if (e.startsWith(".")) continue;
      const full = join(dir, e);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (e === "SKILL.md") {
        const slug = dir.split("/").at(-1);
        skills.push({ path: full, slug, dir });
      }
    }
  }
  walk(root);
  return skills;
}

// ── Commands ─────────────────────────────────────────────────────────────────

const TYPE_ICON = { action: "⚡", object: "◉", interface: "◈", skill: "◆" };

function cmdList(skillsDir) {
  const skills = findSkills(skillsDir);
  if (!skills.length) { console.log("No skills found."); return 0; }
  console.log(`Found ${skills.length} skill(s):\n`);
  const byType = {};
  for (const s of skills) {
    const text = readFileSync(s.path, "utf8");
    const fm = parseFrontmatter(text);
    const t = fm.type ?? "skill";
    if (!byType[t]) byType[t] = [];
    byType[t].push({ fm, s });
  }
  for (const [type, items] of Object.entries(byType)) {
    console.log(`  ${TYPE_ICON[type] ?? "◆"} ${type.toUpperCase()}`);
    for (const { fm, s } of items) {
      const name = (fm.name || s.slug).padEnd(30);
      const desc = (fm.description ?? "(no description)").slice(0, 55);
      console.log(`    ${name} ${desc}`);
    }
    console.log();
  }
  return 0;
}

function cmdValidate(skillsDir) {
  const skills = findSkills(skillsDir);
  if (!skills.length) { console.log("No skills found to validate."); return 0; }
  let passed = 0, failed = 0;
  for (const s of skills) {
    const text = readFileSync(s.path, "utf8");
    const fm = parseFrontmatter(text);
    if (fm._error) {
      console.error(`  FAIL  ${s.slug}: ${fm._error}`);
      failed++; continue;
    }
    const errs = validate(fm, s.slug);
    if (errs.length) {
      console.error(`  FAIL  ${s.slug}:`);
      for (const e of errs) console.error(`          ${e}`);
      failed++;
    } else {
      const icon = TYPE_ICON[fm.type] ?? "◆";
      console.log(`  OK    ${icon} ${s.slug}`);
      passed++;
    }
  }
  console.log(`\n${passed} passed, ${failed} failed.`);
  return failed > 0 ? 1 : 0;
}

function cmdSearch(skillsDir, query) {
  if (!query) { console.error("Usage: search <query>"); return 1; }
  const q = query.toLowerCase();
  const skills = findSkills(skillsDir);
  const hits = [];
  for (const s of skills) {
    const text = readFileSync(s.path, "utf8");
    const fm = parseFrontmatter(text);
    const haystack = [
      fm.name, fm.description, fm.type,
      ...asArray(fm.tags), ...asArray(fm.platforms),
    ].filter(Boolean).join(" ").toLowerCase();
    if (haystack.includes(q)) hits.push({ fm, s });
  }
  if (!hits.length) { console.log("No matches."); return 0; }
  for (const { fm, s } of hits) {
    const icon = TYPE_ICON[fm.type] ?? "◆";
    console.log(`\n  ${icon} ${fm.name || s.slug} [${fm.type ?? "skill"}]`);
    console.log(`    ${fm.description ?? "(no description)"}`);
    if (fm.tags?.length) console.log(`    tags: ${asArray(fm.tags).join(", ")}`);
    if (fm.platforms?.length) console.log(`    platforms: ${asArray(fm.platforms).join(", ")}`);
  }
  return 0;
}

function cmdCheck(skillsDir, slug) {
  if (!slug) { console.error("Usage: check <slug>"); return 1; }
  const skills = findSkills(skillsDir);
  const s = skills.find(x => x.slug === slug);
  if (!s) { console.error(`Skill "${slug}" not found.`); return 1; }
  const text = readFileSync(s.path, "utf8");
  const fm = parseFrontmatter(text);
  if (fm._error) { console.error(`Parse error: ${fm._error}`); return 1; }
  console.log(`Skill: ${slug} [${fm.type ?? "skill"}]`);
  console.log(JSON.stringify(fm, null, 2));
  const errs = validate(fm, slug);
  if (errs.length) {
    console.error("\nValidation errors:");
    for (const e of errs) console.error(`  - ${e}`);
    return 1;
  }
  console.log("\nValid.");
  return 0;
}

function cmdGraph(skillsDir) {
  const skills = findSkills(skillsDir);
  if (!skills.length) { console.log("No skills found."); return 0; }
  console.log("Skill link graph:\n");
  for (const s of skills) {
    const text = readFileSync(s.path, "utf8");
    const fm = parseFrontmatter(text);
    const links = asArray(fm.links);
    const impl = asArray(fm.implements);
    const ext = asArray(fm.extends);
    if (!links.length && !impl.length && !ext.length) continue;
    console.log(`  ${fm.name || s.slug}`);
    for (const l of links)  console.log(`    ──[${l.forwardName}]──▶ ${l.target}`);
    for (const i of impl)   console.log(`    ──[implements]──▶ ${i}`);
    for (const e of ext)    console.log(`    ──[extends]──▶ ${e}`);
  }
  return 0;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const skillsDir = join(REPO_ROOT, "skills");
const [, , cmd = "validate", ...rest] = process.argv;

const exitCode = (() => {
  switch (cmd) {
    case "list":     return cmdList(skillsDir);
    case "validate": return cmdValidate(skillsDir);
    case "search":   return cmdSearch(skillsDir, rest[0]);
    case "check":    return cmdCheck(skillsDir, rest[0]);
    case "graph":    return cmdGraph(skillsDir);
    default:
      console.error(`Unknown command: ${cmd}`);
      console.error("Commands: validate | list | search <q> | check <slug> | graph");
      return 1;
  }
})();

process.exit(exitCode);
