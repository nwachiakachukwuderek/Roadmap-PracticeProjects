const button = document.querySelector('button');
const input = document.querySelector('input');
const taskContainer= document.querySelector('.text-colomn');

const tasks = [];

function renderTask() {
  taskContainer.innerHTML= ''
  tasks.forEach((task,index) => {
    const div = document.createElement('div');
    div.className = 'task-row';

    const p = document.createElement('p');
    p.textContent = task.description;
    p.className = task.completed ? 'checked' : ''
    p.style.flex = '1';
    p.style.cursor = 'pointer';
    p.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      renderTask()
    }

    const button = document.createElement('button')
    button.className = 'delete-button';
    button.innerHTML = '<i class="fa-solid fa-trash fa-2xl delete" style="color: #B197FC;"></i>';
    button.onclick = () => {
      tasks.splice(index, 1)
      renderTask()
    }

    div.appendChild(p);
    div.appendChild(button)
    taskContainer.appendChild(div)
  })
};

function handleTasks() {
  const value = input.value.trim()
  if (value) {
  tasks.push({
    description: value,
    completed: false
  })
  input.value = ''
  renderTask()
  }
};

button.addEventListener('click', handleTasks);

renderTask();
