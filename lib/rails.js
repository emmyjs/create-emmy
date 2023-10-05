#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const TEMPLATES = require('./constants.js').TEMPLATES;
const { createFolder, createFile, runCommand, writeFile } = require('./utils.js');

const createRailsFiles = (options) => {
    console.log("Add root route");
    writeFile(path.join(process.cwd(), 'config', 'routes.rb'), TEMPLATES.routes);

    console.log("Add Home view");
    writeFile(path.join(process.cwd(), 'app', 'views', 'layouts', 'application.html.erb'), TEMPLATES.application(options));
    writeFile(path.join(process.cwd(), 'app', 'views', 'home', 'index.html.erb'), TEMPLATES.home);

    if (options.tailwind) {
        console.log("Add public javascript folder into Tailwind config");
        writeFile(path.join(process.cwd(), 'config', 'tailwind.config.js'), TEMPLATES.tailwind);
    }

    console.log("Creating Emmy project files");
    const componentsPath = createFolder(
        path.join(process.cwd(), 'public', 'javascript', 'components')
    );
    const homePath = createFolder(
        path.join(process.cwd(), 'public', 'javascript', 'views', 'home')
    );
    createFile(homePath, 'index.js', TEMPLATES.index);
    createFile(componentsPath, 'counter.js', TEMPLATES.counter);
}

function createRailsProject (options) {
    const BASE_COMMAND = (options.tailwind
        ? `rails new ${options.name} --css tailwind`
        : `rails new ${options.name}`);
    const EMMY_INSTALLATION_COMMAND = "bin/importmap pin emmy-dom@latest --from jsdelivr";
    const HOME_VIEW_COMMAND = "bin/rails generate controller Home index";

    console.log('Creating Rails app');

    const isRailsCreated = runCommand(BASE_COMMAND);
    if (!isRailsCreated) process.exit(1);
        
    process.chdir(options.name);

    const isEmmyInstalled = runCommand(EMMY_INSTALLATION_COMMAND);
    if (!isEmmyInstalled) process.exit(1);

    const isHomeViewGenerated = runCommand(HOME_VIEW_COMMAND);
    if (!isHomeViewGenerated) process.exit(1);

    createRailsFiles(options);

    console.log(chalk.bold.greenBright(`\nCreated project: ${options.name}\n`
        + `Use 'cd ${options.name}' to enter the project directory\n` + (
            options.tailwind
            ? "Use 'bin/dev' to start the server."
            : "Use 'bin/rails server' to start the server."
        )
    ));

    if (options.run) {
        console.log(`\nRunning project: ${options.name}\n`);
        runCommand(options.tailwind ? 'bin/dev' : 'bin/rails server');
    }
    else console.log();
}

module.exports = createRailsProject;
