#!/usr/bin/env node
const { Command } = require('commander');
const printVersion = require('./lib/version.js');
const createRailsProject = require('./lib/rails.js');
const createVanillaProject = require('./lib/vanilla.js');
const { assertArgs, banner, queryParams } = require('./lib/cli.js');

const program = new Command();

program
    .description('Create Emmy App')
    .option('--rails', 'Create a Rails app')
    .option('--vanilla', 'Create a Vanilla app')
    .option('--tailwind', 'Use TailwindCSS')
    .option('-v, --version', 'Print version number')
    .option('--run', 'Run the app after creation')
    .option('--prerender', 'Use prerendering')
    .parse(process.argv);

const options = program.opts();

if (process.argv.length >= 3) {
    const name = process.argv[2];
    options.name = name;
}
if (options.version) {
    assertArgs();
    printVersion();
}
else if (options.rails) {
    assertArgs();
    createRailsProject(options);
}
else if (options.vanilla) {
    assertArgs();
    createVanillaProject(options);
}
else {
    (async() => {
        banner('create-emmy');
        const params = await queryParams();
        if (params.type == 'Vanilla') {
            params.vanilla = true;
            createVanillaProject(params);
        }
        else {
            params.rails = true;
            params.prerender = false;
            createRailsProject(params);
        }
    })();
}
