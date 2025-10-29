// Inject GEMINI_API_KEY from .env into ui.html at build time
// This avoids storing the key in the repo and removes manual input in the UI.

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const projectRoot = path.join(__dirname, '..');
const uiPath = path.join(projectRoot, 'ui.html');

const key = process.env.GEMINI_API_KEY || '';

if (!fs.existsSync(uiPath)) {
  console.error('[inject-env] ui.html not found at', uiPath);
  process.exit(0);
}

const html = fs.readFileSync(uiPath, 'utf8');

// Replace the placeholder value for INJECTED_API_KEY
const pattern = /const\s+INJECTED_API_KEY\s*=\s*"[^"]*"\s*;/;
const replacement = `const INJECTED_API_KEY = "${key}";`;

if (!pattern.test(html)) {
  console.warn('[inject-env] Placeholder INJECTED_API_KEY not found in ui.html. Skipping injection.');
  process.exit(0);
}

const updated = html.replace(pattern, replacement);
fs.writeFileSync(uiPath, updated, 'utf8');
console.log('[inject-env] Injected GEMINI_API_KEY from .env into ui.html');
