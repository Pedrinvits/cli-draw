#!/usr/bin/env node

import { Command } from 'commander';
import showWelcomeMessage from './functions/showWelcomeMessage.js';
import addTask from './functions/addTask.js';
import listTasks from './functions/listTasks.js';
import markTaskDone from './functions/markTaskDone.js';
import removeTask from './functions/removeTask.js';
import exportTasks from './functions/exportTasks.js';
const program = new Command();
const todoFilePath = 'todo.json';

showWelcomeMessage();
program
  .command('add')
  .description('Add new task')
  .action(() => addTask(todoFilePath));

program
  .command('list')
  .description('List all tasks')
  .action(() => listTasks(todoFilePath));

program
  .command('done')
  .description('Mark tasks as completed')
  .action(() => markTaskDone(todoFilePath));

program
  .command('remove')
  .description('Remove tasks')
  .action(() => removeTask(todoFilePath));

program
  .command('export')
  .description('Export the task list to a file')
  .option('-f, --file <file>', 'File name', 'todo.txt')
  .action((options) => exportTasks(todoFilePath, options.file));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  showWelcomeMessage();
}
