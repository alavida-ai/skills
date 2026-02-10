#!/usr/bin/env node

/**
 * Alavida Buying Signals Client
 *
 * Thin skill client that calls the Alavida platform API to run
 * buying-signals workflows. Does NOT call the buying-signals
 * service directly — the platform handles routing, auth, credits,
 * and job tracking.
 *
 * Usage:
 *   ./client.js run <file.json>
 *   ./client.js run <file.json> --poll
 *   ./client.js run <file.json> --poll --timeout 600
 *   ./client.js status <job_id>
 *   ./client.js health
 *   ./client.js setup --key <api_key>
 *   ./client.js config:show
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import * as readline from 'readline/promises';

// ============================================================================
// Constants
// ============================================================================

const PLATFORM_API = 'https://api.alavida.ai';
const WORKFLOW_SLUG = 'buying-signals';
const DEFAULT_POLL_INTERVAL_MS = 10_000; // 10 seconds
const DEFAULT_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

const CONFIG_PATH = join(homedir(), '.config', 'alavida', 'config.json');

// ============================================================================
// Configuration
// ============================================================================

function loadConfig() {
  // Priority: ALAVIDA_API_KEY env var > config file
  const envKey = process.env.ALAVIDA_API_KEY;
  if (envKey) {
    return { apiKey: envKey, source: 'ALAVIDA_API_KEY environment variable' };
  }

  if (existsSync(CONFIG_PATH)) {
    try {
      const raw = readFileSync(CONFIG_PATH, 'utf8');
      const config = JSON.parse(raw);
      if (config.api_key) {
        return { apiKey: config.api_key, source: CONFIG_PATH };
      }
    } catch {
      // Fall through to no-config state
    }
  }

  return { apiKey: null, source: null };
}

function saveConfig(apiKey) {
  const dir = dirname(CONFIG_PATH);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  let existing = {};
  if (existsSync(CONFIG_PATH)) {
    try {
      existing = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
    } catch {
      // Start fresh
    }
  }

  const config = { ...existing, api_key: apiKey };
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');
  return CONFIG_PATH;
}

function requireApiKey() {
  const config = loadConfig();
  if (!config.apiKey) {
    console.error('\n  Error: No Alavida API key configured.\n');
    console.error('  Set it up with:');
    console.error('    ./client.js setup --key <your-api-key>\n');
    console.error('  Or set the ALAVIDA_API_KEY environment variable.\n');
    process.exit(1);
  }
  return config.apiKey;
}

// ============================================================================
// ANSI helpers
// ============================================================================

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const bold = (t) => `${C.bold}${t}${C.reset}`;
const dim = (t) => `${C.dim}${t}${C.reset}`;
const red = (t) => `${C.red}${t}${C.reset}`;
const green = (t) => `${C.green}${t}${C.reset}`;
const yellow = (t) => `${C.yellow}${t}${C.reset}`;
const cyan = (t) => `${C.cyan}${t}${C.reset}`;

// ============================================================================
// Platform API Client
// ============================================================================

async function apiRequest(path, { method = 'GET', body, apiKey, skipAuth = false } = {}) {
  const url = `${PLATFORM_API}${path}`;
  const headers = { 'Content-Type': 'application/json' };

  if (!skipAuth && apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  // Handle specific error codes
  if (response.status === 402) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`\n  ${red('Insufficient credits.')}\n`);
    console.error('  Your account does not have enough credits to run this workflow.');
    if (errorData.detail) {
      console.error(`  ${errorData.detail}`);
    }
    console.error('\n  Top up your credits at https://app.alavida.ai/credits\n');
    process.exit(1);
  }

  if (response.status === 401) {
    console.error(`\n  ${red('Authentication failed.')}\n`);
    console.error('  Your API key is invalid or expired.');
    console.error('  Run: ./client.js setup --key <new-api-key>\n');
    process.exit(1);
  }

  if (response.status === 503) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`\n  ${red('Service unavailable.')}\n`);
    console.error('  The buying-signals service is currently unavailable.');
    if (errorData.detail) {
      console.error(`  ${errorData.detail}`);
    }
    console.error('\n  Try again in a few minutes.\n');
    process.exit(1);
  }

  if (!response.ok) {
    const errorText = await response.text();
    let detail;
    try {
      const parsed = JSON.parse(errorText);
      detail = parsed.detail || parsed.message || errorText;
    } catch {
      detail = errorText || response.statusText;
    }
    throw new Error(`API error (${response.status}): ${detail}`);
  }

  return response.json();
}

// ============================================================================
// Commands
// ============================================================================

async function cmdSetup(args) {
  let apiKey = args.key;

  if (!apiKey) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(bold('\n  Alavida Setup\n'));
    apiKey = await rl.question('  Enter your Alavida API key: ');
    rl.close();
  }

  if (!apiKey || !apiKey.trim()) {
    console.error(red('\n  Error: API key is required.\n'));
    process.exit(1);
  }

  const savedPath = saveConfig(apiKey.trim());

  console.log(green('\n  Configuration saved.'));
  console.log(`  Location: ${savedPath}`);
  console.log(`  API Key:  ${apiKey.substring(0, 8)}...${apiKey.slice(-4)}\n`);
}

async function cmdConfigShow() {
  const config = loadConfig();

  if (!config.apiKey) {
    console.log(yellow('\n  No API key configured.'));
    console.log('  Run: ./client.js setup --key <your-api-key>\n');
    return;
  }

  console.log(green(`\n  API key loaded from ${config.source}`));
  console.log(`  Key: ${config.apiKey.substring(0, 8)}...${config.apiKey.slice(-4)}`);
  console.log(`  Platform: ${PLATFORM_API}\n`);
}

async function cmdHealth() {
  console.log(`\n  Checking platform health...\n`);

  try {
    const data = await apiRequest(`/v1/workflows/${WORKFLOW_SLUG}/health`, {
      skipAuth: true,
    });
    console.log(green('  Buying Signals service is healthy.'));
    if (data.status) {
      console.log(`  Status: ${data.status}`);
    }
    console.log();
  } catch (error) {
    console.error(red('  Health check failed.'));
    console.error(`  ${error.message}\n`);
    process.exit(1);
  }
}

async function cmdRun(args) {
  const apiKey = requireApiKey();

  const inputFile = args._[1];
  if (!inputFile) {
    console.error(red('\n  Error: Input file required.'));
    console.log('  Usage: ./client.js run <companies.json>\n');
    process.exit(1);
  }

  // Load input
  let inputData;
  try {
    inputData = JSON.parse(readFileSync(inputFile, 'utf8'));
  } catch (error) {
    console.error(red(`\n  Error reading input file: ${error.message}\n`));
    process.exit(1);
  }

  if (!inputData.companies || inputData.companies.length === 0) {
    console.error(red('\n  Error: No companies found in input file.\n'));
    process.exit(1);
  }

  const companyCount = inputData.companies.length;
  console.log(cyan(`\n  Submitting ${companyCount} ${companyCount === 1 ? 'company' : 'companies'} for analysis...`));
  console.log(dim(`  Platform: ${PLATFORM_API}\n`));

  try {
    const result = await apiRequest(`/v1/workflows/${WORKFLOW_SLUG}/run`, {
      method: 'POST',
      body: { companies: inputData.companies },
      apiKey,
    });

    if (args.json && !args.poll) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    console.log(green('  Job submitted.'));
    console.log(`  ${bold('Job ID:')}  ${result.job_id}`);
    console.log(`  ${bold('Status:')}  ${result.status}`);

    if (!args.poll) {
      console.log(`\n  Check status: ./client.js status ${result.job_id}`);
      console.log(`  Or use --poll to wait for results.\n`);
      return;
    }

    // Poll for completion
    const timeoutMs = (args.timeout ? Number(args.timeout) : DEFAULT_TIMEOUT_MS / 1000) * 1000;
    await pollForCompletion(result.job_id, apiKey, {
      json: args.json,
      timeoutMs,
    });
  } catch (error) {
    console.error(red(`\n  Job submission failed: ${error.message}\n`));
    process.exit(1);
  }
}

async function cmdStatus(args) {
  const apiKey = requireApiKey();

  const jobId = args._[1];
  if (!jobId) {
    console.error(red('\n  Error: Job ID required.'));
    console.log('  Usage: ./client.js status <job_id>\n');
    process.exit(1);
  }

  try {
    const data = await apiRequest(`/v1/jobs/${jobId}`, { apiKey });

    if (args.json) {
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    formatJobStatus(data);
  } catch (error) {
    console.error(red(`\n  Failed to get job status: ${error.message}\n`));
    process.exit(1);
  }
}

// ============================================================================
// Polling
// ============================================================================

async function pollForCompletion(jobId, apiKey, { json = false, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  console.log(yellow(`\n  Polling for results (timeout: ${Math.round(timeoutMs / 1000)}s)...\n`));

  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const data = await apiRequest(`/v1/jobs/${jobId}`, { apiKey });

    if (data.status === 'completed') {
      if (json) {
        console.log(JSON.stringify(data, null, 2));
      } else {
        formatJobStatus(data);
      }
      return;
    }

    if (data.status === 'failed') {
      if (json) {
        console.log(JSON.stringify(data, null, 2));
      } else {
        formatJobStatus(data);
      }
      process.exit(1);
    }

    const progress = data.progress != null ? ` (${data.progress}%)` : '';
    process.stdout.write(dim(`  ${data.status}${progress} — next check in ${DEFAULT_POLL_INTERVAL_MS / 1000}s\n`));
    await new Promise((r) => setTimeout(r, DEFAULT_POLL_INTERVAL_MS));
  }

  console.error(yellow(`\n  Timed out after ${Math.round(timeoutMs / 1000)}s.`));
  console.log(`  Job ${jobId} is still running.`);
  console.log(`  Check later: ./client.js status ${jobId}\n`);
  process.exit(1);
}

// ============================================================================
// Formatting
// ============================================================================

function formatJobStatus(data) {
  const statusEmoji = {
    completed: green('completed'),
    failed: red('failed'),
    running: yellow('running'),
    queued: yellow('queued'),
    processing: yellow('processing'),
    pending: yellow('pending'),
  };

  console.log(`\n  ${bold('Job ID:')}  ${data.job_id}`);
  console.log(`  ${bold('Status:')}  ${statusEmoji[data.status] || data.status}`);

  if (data.created_at) console.log(`  ${bold('Created:')} ${data.created_at}`);
  if (data.updated_at) console.log(`  ${bold('Updated:')} ${data.updated_at}`);
  if (data.progress != null) console.log(`  ${bold('Progress:')} ${data.progress}%`);

  if (data.credits_used != null) {
    console.log(`  ${bold('Credits:')} ${data.credits_used} used`);
  }

  // Show result summary if completed
  if (data.status === 'completed' && data.result) {
    const r = data.result;

    console.log(`\n  ${bold('Results:')}`);

    if (r.summary) {
      const s = r.summary;
      if (s.total_companies != null) console.log(`    Companies: ${s.total_companies}`);
      if (s.hot != null) console.log(`    Hot:  ${s.hot}  |  Warm: ${s.warm}  |  Cool: ${s.cool}  |  Cold: ${s.cold}`);
    }

    if (r.companies && Array.isArray(r.companies)) {
      r.companies.forEach((company) => {
        const tierIcon = { HOT: '  ', WARM: ' ', COOL: '  ', COLD: '  ' }[company.tier] || '';
        console.log(`\n  ${cyan(company.company_name)} — ${bold(company.tier)}${tierIcon} (score: ${company.total_score})`);
        if (company.signal_count != null) {
          console.log(`    ${company.signal_count} signal(s)`);
        }
        if (company.recommendation) {
          console.log(`    ${dim(company.recommendation)}`);
        }
        if (company.signals && company.signals.length > 0) {
          company.signals.slice(0, 5).forEach((sig) => {
            const conf = sig.confidence ? ` (${Math.round(sig.confidence * 100)}%)` : '';
            console.log(`      - ${sig.type}${conf}: ${dim(sig.source_url || sig.snippet || '')}`);
          });
          if (company.signals.length > 5) {
            console.log(dim(`      ... and ${company.signals.length - 5} more`));
          }
        }
      });
    }
  }

  // Show error if failed
  if (data.status === 'failed') {
    if (data.error) {
      console.log(`\n  ${red('Error:')} ${data.error}`);
    }
    if (data.error_code) {
      console.log(`  ${red('Code:')}  ${data.error_code}`);
    }
  }

  console.log();
}

// ============================================================================
// CLI Entry Point
// ============================================================================

function parseArgs(argv) {
  const args = { _: [] };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg.startsWith('--')) {
      const key = arg.substring(2);
      const next = argv[i + 1];

      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    } else {
      args._.push(arg);
    }
  }

  return args;
}

function showHelp() {
  console.log(`
${bold('Alavida Buying Signals')} — Detect B2B buying signals via the Alavida platform

${bold('USAGE')}
  ./client.js <command> [options]

${bold('COMMANDS')}
  ${bold('run')} <file.json>          Submit companies for signal analysis
  ${bold('status')} <job_id>          Check job status and view results
  ${bold('health')}                   Check service availability
  ${bold('setup')}                    Configure your Alavida API key
  ${bold('config:show')}              Show current configuration

${bold('OPTIONS')}
  --poll                    Wait for results (used with 'run')
  --timeout <seconds>       Polling timeout (default: 600)
  --json                    Output raw JSON
  --key <api_key>           API key (used with 'setup')

${bold('EXAMPLES')}
  ./client.js setup --key ak_xxxxx
  ./client.js run companies.json
  ./client.js run companies.json --poll
  ./client.js run companies.json --poll --timeout 300
  ./client.js status 550e8400-e29b-41d4-a716-446655440000
  ./client.js health
`);
}

async function main() {
  const argv = process.argv.slice(2);

  if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
    showHelp();
    return;
  }

  const args = parseArgs(argv);
  const command = args._[0];

  try {
    switch (command) {
      case 'setup':
        await cmdSetup(args);
        break;
      case 'config:show':
        await cmdConfigShow();
        break;
      case 'health':
        await cmdHealth();
        break;
      case 'run':
        await cmdRun(args);
        break;
      case 'status':
        await cmdStatus(args);
        break;
      default:
        console.error(red(`\n  Unknown command: ${command}`));
        console.log('  Run with --help to see available commands.\n');
        process.exit(1);
    }
  } catch (error) {
    console.error(red(`\n  Unexpected error: ${error.message}`));
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
