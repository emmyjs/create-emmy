const chalk = require('chalk');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const appendFile = (path, content) => {
    try {
        console.log(chalk.green.bold("      append  ") + path);
        fs.appendFileSync(path, content);
        return path;
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

const createFolder = (folder) => {
    try {
        console.log(chalk.green.bold("      create  ") + folder);
        if (!fs.existsSync(folder))
            fs.mkdirSync(folder, { recursive: true });
        return folder;
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

const createFile = (folder, file, content) => {
    const filePath = path.join(folder, file);
    try {
        console.log(chalk.green.bold("      create  ") + filePath);
        if (!fs.existsSync(filePath))
            fs.writeFileSync(filePath, content);
        return filePath;
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

const runCommand = (command, showStdio = true) => {
    try {
        if (showStdio)
            execSync(command, { stdio: 'inherit' });
        else
            execSync(command);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        return false;
    }
    return true;
}

const writeFile = (path, content) => {
    try {
        console.log(chalk.green.bold("      insert  ") + path);
        fs.writeFileSync(path, content);
        return path;
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

const deleteFile = (path) => {
    try {
        console.log(chalk.red.bold("      delete  ") + path);
        fs.unlinkSync(path);
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

const patchJSONFile = (path, patch) => {
    console.log(chalk.yellow.bold("      patch   ") + path);
    const json = JSON.parse(fs.readFileSync(path));
    const patched = {
        ...json,
        ...patch
    };
    fs.writeFileSync(path, JSON.stringify(patched, null, 2));
}

module.exports = { appendFile, createFolder, createFile, deleteFile, runCommand, writeFile, patchJSONFile };
