#!/usr/bin/env node
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");

const assertArgs = () => {
    if (process.argv.length < 3) {
        console.error('Error: Project name is required');
        process.exit(1);
    }
}

const banner = message => {
    console.log(chalk.bold.cyan(figlet.textSync(message, { 
        font:  'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
}

const queryParams = () => {
    const qs = [
        {
            name: 'name',
            type: 'input',
            message: 'Enter the name of your project:',
            validate: input => {
                if (input.length < 1) {
                    return 'Project name is required';
                }
                return true;
            }
        },
        {
            name: 'type',
            type: 'list',
            message: 'Select the type of project you want to create:',
            choices: [
                'Vanilla',
                'Rails'
            ],
        },
        {
            name: 'tailwind',
            type: 'confirm',
            message: 'Do you want to use TailwindCSS?'
        },
        {
            name: 'prerender',
            type: 'confirm',
            message: 'Do you want to use prerendering?'
        }
    ];
    return inquirer.prompt(qs);
};

module.exports = { assertArgs, banner, queryParams };
