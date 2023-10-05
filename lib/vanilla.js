#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const TEMPLATES = require('./constants.js').TEMPLATES;
const { createFolder, createFile, deleteFile, runCommand, writeFile } = require('./utils.js');

const createVanillaFiles = (options) => {
    console.log("Creating Emmy project files");
    const appPath = createFolder(path.join(process.cwd(), 'app'));
    createFolder(path.join(appPath, 'components'));
    const stylesPath = createFolder(path.join(process.cwd(), 'styles'));
    writeFile(path.join(process.cwd(), 'index.html'), TEMPLATES.application(options));
    createFile(stylesPath, 'index.css', options.tailwind ? TEMPLATES.css : '');
    createFile(appPath, 'index.js', TEMPLATES.index(options));
    createFile(path.join(appPath, 'components'), 'counter.js', TEMPLATES.counter(options));
    if (options.tailwind) {
        writeFile(path.join(process.cwd(), 'tailwind.config.js'), TEMPLATES.tailwind(options));
    }
    console.log("Deleting unnecessary files");
    deleteFile(path.join(process.cwd(), 'style.css'));
    deleteFile(path.join(process.cwd(), 'main.js'));
    deleteFile(path.join(process.cwd(), 'counter.js'));
    deleteFile(path.join(process.cwd(), 'public', 'vite.svg'));
    createFile(path.join(process.cwd(), 'public'), '.gitkeep', '');
    deleteFile(path.join(process.cwd(), 'javascript.svg'));
}

const createVanillaProject = (options) => {
    const VITE_INIT_COMMAND = `npm init vite@latest ${options.name} -- --template vanilla`; 
    const EMMY_INSTALLATION_COMMAND = "npm install emmy-dom@latest --save";
    const TAILWIND_INSTALLATION_COMMAND = "npm install -D tailwindcss postcss autoprefixer --save-dev";
    const TAILWIND_CONFIG_COMMAND = "npx tailwindcss init -p";
    const TAILWIND_PLUGIN_COMMAND = "npm install -D @tailwindcss/forms @tailwindcss/typography --save-dev";

    console.log('Creating Vanilla JS app');

    const isViteInitialized = runCommand(VITE_INIT_COMMAND);
    if (!isViteInitialized) process.exit(1);

    process.chdir(options.name);

    const isEmmyInstalled = runCommand(EMMY_INSTALLATION_COMMAND);
    if (!isEmmyInstalled) process.exit(1);

    if (options.tailwind) {
        console.log('Installing TailwindCSS');
        const isTailwindInstalled = runCommand(TAILWIND_INSTALLATION_COMMAND);
        if (!isTailwindInstalled) process.exit(1);

        const isTailwindConfigured = runCommand(TAILWIND_CONFIG_COMMAND);
        if (!isTailwindConfigured) process.exit(1);

        console.log('Installing TailwindCSS plugins');
        const isTailwindPluginsInstalled = runCommand(TAILWIND_PLUGIN_COMMAND);
        if (!isTailwindPluginsInstalled) process.exit(1);
    }

    createVanillaFiles(options);

    console.log(chalk.bold.greenBright(`\nCreated project: ${options.name}\n`
        + `Use 'cd ${options.name}' to enter the project directory\n`
        + `Use 'npm run dev' to start the development server\n`
    ));

    if (options.run) {
        console.log('Starting the development server');
        const isServerStarted = runCommand('npm run dev');
        if (!isServerStarted) process.exit(1);
    }
    console.log();
}

module.exports = createVanillaProject;
