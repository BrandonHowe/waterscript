#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

import {main} from '../index';

program
    .command('run <file>') // sub-command name
    .description('run WS file') // command description
    // function to execute when command is uses
    .action( (file: string) => {
        console.log(file);
        main(file);
    });

program.parse(process.argv);
