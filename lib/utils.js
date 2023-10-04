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
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
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
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }
        return filePath;
    }
    catch(error) {
        console.error(error);
        process.exit(1);
    }
}

const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
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

module.exports = { appendFile, createFolder, createFile, runCommand, writeFile };
