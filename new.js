#!/usr/bin/env node
const program = require('commander');
const ver = require('./lib/ver');
program
  .usage('[options] <file>')
  .option('-v, --version', 'show version', ver, '')
  .option('-f, --flag', 'boolean flag', false)
  .action((file, options) => {
      const emmyDomPackage = require('./node_modules/emmy-dom/package.json');
      console.log(`emmy-dom version: ${emmyDomPackage.version}`);
  })
  .parse(process.argv);