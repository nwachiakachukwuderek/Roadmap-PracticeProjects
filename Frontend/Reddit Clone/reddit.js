const addButton = document.querySelector('.add-button');
const subredditField = document.querySelector('.subreddit-field');
const subredditInput = document.querySelector('.subreddit-input');
const subredditButton = document.querySelector('.subreddit-button');  
const mainContainer = document.querySelector('.main-container');

let tasks = [];

function loadTasks() {
  const saved = localStorage.getItem('reddit-lanes');
  if (saved) {
    try{
      tasks = JSON.parse(saved);
    } catch {
      tasks = [];
    }
  }
}

function saveTasks() {
  localStorage.setItem('reddit-lanes', JSON.stringify(tasks));
}

async function fetchData(subreddit) {
  const task = tasks.find(t => t.subreddit === subreddit);

  if (!task) {
    return
  };

  task.loading = true;
  task.error = null;
  task.posts = [];
  displayReddit();
  saveTasks();

  try{
    const url = `https://corsproxy.io/?url=https://www.reddit.com/r/${subreddit}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(" There is a problem with the link or your search doesn't be found ");
    const data = await response.json();
    console.log(subreddit);
    const posts = data.data.children.map(c => c.data);
    task.posts = posts;
    task.loading = false;
    displayReddit();

  } catch (err) {
    task.loading = false;
    task.error = err.msg || 'Failed to load subreddit';
    console.log(err, 'is not working');
    displayReddit();
  }
  console.log(task)
  console.log(tasks)
};

function createLaneElement(subreddit, posts, loading, error) {
  const lane = document.createElement('div');
  lane.className = 'content-container';
  
  
  const h3 = document.createElement('h3');
  h3.textContent = `/r/${subreddit}`;
  lane.appendChild(h3);

  const cancel = document.createElement('button');
  cancel.textContent = 'X';
  cancel.className = 'cancel-button';
  cancel.onclick = () => removeTask(subreddit)
  lane.appendChild(cancel);

  if (loading) {
    const div = document.createElement('div');
    div.textContent = 'Loading'
    lane.appendChild(div);
    return lane;
  }

  if (error) {
    const div = document.createElement('div')
    div.textContent = error;
    div.style.color = 'red';
    lane.appendChild(div);
    return lane;
  } 

  if (!posts || posts.length === 0) {
    const div = document.createElement('div')
    div.textContent = 'No Posts Found';
    div.style.color = 'red';
    lane.appendChild(div);
    return lane;
  }

  const ul = document.createElement('ul');
  ul.className = 'subreddit-container'

  posts.forEach((post) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="https://reddit.com${post.permalink}" target="_blank">${post.title}</a><br>
      <span style="font-size:13px;">by ${post.author} || ⭐${post.ups}</span>
    `;
    ul.appendChild(li);
  });
  lane.appendChild(ul);
  return lane
}

function displayReddit() {
  mainContainer.innerHTML = ''
  tasks.forEach((task) => {
    const el = createLaneElement(task.subreddit, task.posts, task.loading, task.error);
    mainContainer.appendChild(el);
  })
}

function addTasks(subreddit) {
  subreddit = subreddit.trim();
  if (!subreddit) return;
  if (tasks.some(t => t.subreddit.toLowerCase() === subreddit.toLowerCase()))return
  tasks.push({
    subreddit,
    posts: [],
    loading: true,
    error: null
  });
  saveTasks();
  displayReddit();
  fetchData(subreddit);
}

function removeTask(subreddit) {
  tasks = tasks.filter(l => l.subreddit !== subreddit)
  saveTasks()
  displayReddit()
}

function renderInput() {
  const value = subredditInput.value.trim()
  if (value === '') {
    const p = subredditField.querySelector('.err-msg');
    if (!p) {
    const p = document.createElement('p');
    p.className = 'err-msg';
    subredditField.appendChild(p)
    }
    p.textContent = 'You need to add a text to show contents';
    p.style.color = 'red';
    return
  }
  subredditInput.value = '';
  subredditField.classList.add('hide');
  addTasks(value);
}

subredditButton.addEventListener('click', renderInput)

addButton.addEventListener('click', () => {
  subredditField.classList.remove('hide');
  subredditInput.focus();
})

subredditInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    renderInput();
  }
});

loadTasks();
displayReddit();

tasks.forEach(lane => {
  if (!lane.posts || lane.posts.length === 0) {
    fetchData(lane.subreddit)
  }
})