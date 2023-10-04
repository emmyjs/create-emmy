#!/usr/bin/env node
const chalk = require('chalk');
const { runCommand } = require('./utils.js');

function createVanillaProject (options) {
    const BASE_COMMAND = `mkdir ${options.name}`;
    const NPM_INIT_COMMAND = `npm init -y`;
    const EMMY_INSTALLATION_COMMAND = "npm install emmy-dom@latest --save";

    console.log('Creating Vanilla JS app');

    const isVanillaCreated = runCommand(BASE_COMMAND);
    if (!isVanillaCreated) process.exit(1);

    process.chdir(options.name);

    const isNpmInitialized = runCommand(NPM_INIT_COMMAND);
    if (!isNpmInitialized) process.exit(1);

    const isEmmyInstalled = runCommand(EMMY_INSTALLATION_COMMAND);
    if (!isEmmyInstalled) process.exit(1);

    console.log(chalk.bold.greenBright(`\nCreated project: ${options.name}\n`
        + `Use 'cd ${options.name}' to enter the project directory\n`
    ));
}

module.exports = createVanillaProject;
