import fs from 'fs';

export default function listTasks(todoFilePath) {
  const todos = loadTodos(todoFilePath);
  console.log('\nYour Tasks:');
  todos.forEach((todo, index) => {
    console.log(`${index + 1}. [${todo.done ? 'x' : ' '}] ${todo.task}`);
  });
}

function loadTodos(todoFilePath) {
  if (fs.existsSync(todoFilePath)) {
    const data = fs.readFileSync(todoFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}
