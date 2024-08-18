import inquirer from 'inquirer';
import fs from 'fs';

export default async function addTask(todoFilePath) {
  const todos = loadTodos(todoFilePath);
  let adding = true;

  while (adding) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'task',
        message: 'Enter the task (or leave it empty to finish):',
      },
    ]);

    if (answers.task) {
      todos.push({ task: answers.task, done: false });
    } else {
      adding = false;
    }
  }

  saveTodos(todoFilePath, todos);
  console.log('Tasks added!');
}

function loadTodos(todoFilePath) {
  if (fs.existsSync(todoFilePath)) {
    const data = fs.readFileSync(todoFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

function saveTodos(todoFilePath, todos) {
  fs.writeFileSync(todoFilePath, JSON.stringify(todos, null, 2));
}
