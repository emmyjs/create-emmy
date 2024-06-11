#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const TEMPLATES = require('./constants.js').TEMPLATES;
const { createFolder, createFile, deleteFile, runCommand, writeFile, patchJSONFile } = require('./utils.js');

const createVanillaFiles = (options) => {
    console.log("Creating Emmy project files");
    const appPath = createFolder(path.join(process.cwd(), 'app'));
    createFolder(path.join(appPath, 'components'));
    const stylesPath = createFolder(path.join(process.cwd(), 'styles'));
    createFile(stylesPath, 'index.css', TEMPLATES.css(options));
    createFile(appPath, 'index.js', TEMPLATES.index(options));
    createFile(path.join(appPath, 'components'), 'counter.js', TEMPLATES.counter(options));
    if (options.tailwind) {
        writeFile(path.join(process.cwd(), 'tailwind.config.js'), TEMPLATES.tailwind(options));
    }

    if (options.prerender) {
        createFile(process.cwd(), 'prerender.js', TEMPLATES.prerender(options));
        createFile(process.cwd(), 'template.html', TEMPLATES.application(options));
        deleteFile(path.join(process.cwd(), 'index.html'));
        patchJSONFile(path.join(process.cwd(), 'package.json'), {
            scripts: {
              dev: "concurrently --raw 'npm run watch' 'vite'",
              ssr: "node prerender.js",
              build: "vite build",
              preview: "vite preview",
              prod: "npm run ssr && vite build && vite preview",
              watch: "watch 'npm run ssr' ./app"
            }
        });
    }
    else {
        writeFile(path.join(process.cwd(), 'index.html'), TEMPLATES.application(options));
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
    let installCommand = 'npm install --save';
    let installDevCommand = 'npm install -D --save-dev';
    let initCommand = 'npm init';
    let executeCommand = 'npx';
    let devCommand = 'npm run dev';
    if (options.packageManager === 'pnpm') {
        installCommand = 'pnpm install';
        installDevCommand = 'pnpm install -D';
        initCommand = 'npm init';
        executeCommand = 'pnpx';
        devCommand = 'pnpm run dev';
    }
    else if (options.packageManager === 'yarn') {
        installCommand = 'yarn add';
        installDevCommand = 'yarn add -D';
        initCommand = 'npm init';
        executeCommand = 'npx';
        devCommand = 'yarn dev';
    }
    else if (options.packageManager === 'bun') {
        installCommand = 'bun add';
        installDevCommand = 'bun add -D';
        initCommand = 'npm init';
        executeCommand = 'bunx';
        devCommand = 'bun dev';
    }
    else {
        options.packageManager = 'npm';
    }
    const VITE_INIT_COMMAND = `${initCommand} vite@latest ${options.name} -- --template vanilla`; 
    const EMMY_INSTALLATION_COMMAND = `${installCommand} emmy-dom@latest`;
    const TAILWIND_INSTALLATION_COMMAND = `${installDevCommand} tailwindcss postcss autoprefixer`;
    const TAILWIND_CONFIG_COMMAND = `${executeCommand} tailwindcss init -p`;
    const TAILWIND_PLUGIN_COMMAND = `${installDevCommand} @tailwindcss/forms @tailwindcss/typography`;
    const WATCH_INSTALLATION_COMMAND = `${installDevCommand} watch`;
    const CONCURRENTLY_INSTALLATION_COMMAND = `${installDevCommand} concurrently`;

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

    const isWatchInstalled = runCommand(WATCH_INSTALLATION_COMMAND);
    if (!isWatchInstalled) console.log("Watch was not installed");
    const isConcurrentlyInstalled = runCommand(CONCURRENTLY_INSTALLATION_COMMAND);
    if (!isConcurrentlyInstalled) console.log("Concurrently was not installed");

    console.log(chalk.bold.greenBright(`\nCreated project: ${options.name}\n`
        + `Use 'cd ${options.name}' to enter the project directory\n`
        + `Use '${devCommand}' to start the development server\n`
    ));

    if (options.run) {
        console.log('Starting the development server');
        const isServerStarted = runCommand(devCommand);
        if (!isServerStarted) process.exit(1);
    }
    console.log();
}

module.exports = createVanillaProject;
