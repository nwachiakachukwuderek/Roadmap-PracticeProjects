
const addButton = document.querySelector('.add-button');
const subredditField = document.querySelector('.subreddit-field');
const subredditInput = document.querySelector('.subreddit-input');
const subredditButton = document.querySelector('.subreddit-button');  
const mainContainer = document.querySelector('.main-container');

const tasks = []
console.log(tasks)


async function fetchData(subreddit) {
  const task = tasks.find(t => t.subreddit === subreddit);

  if (!task) {
    return
  };

  task.loading = true;
  task.error = null;
  task.posts = [];
  displayReddit();

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
};

function displayReddit(infos) {
  const h1 = document.createElement('h1');
  h1.textContent = `/r/${infos[0].data.subreddit}`;
  mainContainer.appendChild(h1);

  const divIi = document.createElement('div');
  divIi.className = 'content-container';

  const cancel = document.createElement('button');
  cancel.textContent = 'X';
  cancel.className = 'cancel-button';
  divIi.appendChild(cancel);


  infos.forEach((info) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <h4>${info.data.subreddit}</h4>
    <a href="${info.data.permalink}">${info.data.title}</a>
    <span>${info.data.score}</span>
    <span>${info.data.author}</span>
    `
    divIi.appendChild(div);
  });
  console.log(divIi);
  mainContainer.appendChild(divIi);
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
  displayReddit();
  fetchData(subreddit);
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