import inquirer from 'inquirer';
import fs from 'fs';

export default async function markTaskDone(todoFilePath) {
  const todos = loadTodos(todoFilePath);

  if (todos.length === 0) {
    console.log('No tasks to mark as complete.');
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'completedTasks',
      message: 'Select completed tasks:',
      choices: todos.map((todo, index) => ({
        name: `${todo.task}`,
        value: index,
        checked: todo.done,
      })),
    },
    {
      type: 'confirm',
      name: 'deleteAfterCompletion',
      message: 'Do you want to delete completed tasks?',
      default: false,
    },
  ]);

  const completedIndexes = answers.completedTasks;
  if (answers.deleteAfterCompletion) {
    const newTodos = todos.filter((_, index) => !completedIndexes.includes(index));
    saveTodos(todoFilePath, newTodos);
    console.log('Tasks marked complete and deleted!');
  } else {
    completedIndexes.forEach((index) => {
      todos[index].done = true;
    });
    saveTodos(todoFilePath, todos);
    console.log('Tasks marked as complete!');
  }
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
