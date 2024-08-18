import inquirer from 'inquirer';
import fs from 'fs';

export default async function removeTask(todoFilePath) {
  const todos = loadTodos(todoFilePath);

  if (todos.length === 0) {
    console.log('Nenhuma tarefa para remover.');
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'tasksToRemove',
      message: 'Selecione as tarefas que deseja remover:',
      choices: todos.map((todo, index) => ({
        name: `${todo.task}`,
        value: index,
      })),
    },
  ]);

  const newTodos = todos.filter(
    (todo, index) => !answers.tasksToRemove.includes(index)
  );

  saveTodos(todoFilePath, newTodos);
  console.log('Tarefas removidas!');
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
