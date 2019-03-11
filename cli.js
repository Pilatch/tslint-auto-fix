#!/usr/bin/env node

let argv = require('yargs')
  .usage('$0 [globs-to-watch] [options]')
  .option('project', {
    alias: 'p',
    describe: 'Typescript project file relative to project root.',
    default: 'tsconfig.json',
  })
  .option('verbose', {
    default: false,
    describe: 'Whether to say when a file is being fixed',
    type: 'boolean',
  })
  .option('format', {
    default: 'prose',
    describe: 'What TSLint format to use',
    type: 'string',
  })
  .epilogue('[globs-to-watch] are file globs you want to watch for changes.\nDefaults to "./**/*.ts".\n(You probably want to enclose these in quotes unless you want the shell to expand them before watching.)')
  .help()
  .argv

require('./fix')(argv._, argv)
