import fs from 'fs';

export default function exportTasks(todoFilePath, outputFile) {
  const todos = loadTodos(todoFilePath);
  const content = todos.map((todo, index) => `${index + 1}. [${todo.done ? 'x' : ' '}] ${todo.task}`).join('\n');
  
  fs.writeFileSync(outputFile, content);
  console.log(`Tasks exported to ${outputFile}`);
}

function loadTodos(todoFilePath) {
  if (fs.existsSync(todoFilePath)) {
    const data = fs.readFileSync(todoFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}
