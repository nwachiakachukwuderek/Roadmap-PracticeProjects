
// Multi-lane Reddit client implementation
const addButton = document.querySelector('.add-button');
const subredditField = document.querySelector('.subreddit-field');
const subredditInput = document.querySelector('.subreddit-input');
const subredditButton = document.querySelector('.subreddit-button');
const mainContainer = document.querySelector('.main-container');

let lanes = [];

function loadLanes() {
  const saved = localStorage.getItem('reddit_lanes');
  if (saved) {
    try {
      lanes = JSON.parse(saved);
    } catch {
      lanes = [];
    }
  }
}

function saveLanes() {
  localStorage.setItem('reddit_lanes', JSON.stringify(lanes));
}

function createLaneElement(subreddit, posts, loading, error) {
  const lane = document.createElement('div');
  lane.className = 'reddit-lane';
  lane.style.flex = '1 1 300px';
  lane.style.margin = '10px';
  lane.style.background = '#f8f8f8';
  lane.style.borderRadius = '8px';
  lane.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
  lane.style.padding = '12px';
  lane.style.position = 'relative';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '×';
  removeBtn.title = 'Remove lane';
  removeBtn.style.position = 'absolute';
  removeBtn.style.top = '8px';
  removeBtn.style.right = '8px';
  removeBtn.style.background = 'transparent';
  removeBtn.style.border = 'none';
  removeBtn.style.fontSize = '20px';
  removeBtn.style.cursor = 'pointer';
  removeBtn.onclick = () => removeLane(subreddit);
  lane.appendChild(removeBtn);

  const title = document.createElement('h3');
  title.textContent = `/r/${subreddit}`;
  lane.appendChild(title);

  if (loading) {
    const loadingDiv = document.createElement('div');
    loadingDiv.textContent = 'Loading...';
    lane.appendChild(loadingDiv);
    return lane;
  }
  if (error) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = error;
    errorDiv.style.color = 'red';
    lane.appendChild(errorDiv);
    return lane;
  }
  if (!posts || posts.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.textContent = 'No posts found.';
    lane.appendChild(emptyDiv);
    return lane;
  }

  const list = document.createElement('ul');
  list.style.listStyle = 'none';
  list.style.padding = '0';
  posts.forEach(post => {
    const li = document.createElement('li');
    li.style.marginBottom = '18px';
    li.style.padding = '8px';
    li.style.background = '#fff';
    li.style.borderRadius = '6px';
    li.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
    li.innerHTML = `
      <a href="https://reddit.com${post.permalink}" target="_blank" style="font-weight:bold;text-decoration:none;color:#0079d3;">${post.title}</a><br>
      <span style="font-size:13px;">by ${post.author} | ⭐ ${post.ups}</span>
    `;
    list.appendChild(li);
  });
  lane.appendChild(list);
  return lane;
}

function renderLanes() {
  mainContainer.innerHTML = '';
  lanes.forEach(lane => {
    const el = createLaneElement(lane.subreddit, lane.posts, lane.loading, lane.error);
    mainContainer.appendChild(el);
  });
}

async function fetchSubreddit(subreddit) {
  const idx = lanes.findIndex(l => l.subreddit === subreddit);
  if (idx !== -1) {
    lanes[idx].loading = true;
    lanes[idx].error = null;
    lanes[idx].posts = [];
    renderLanes();
  }
  try {
    const url = `https://www.reddit.com/r/${subreddit}.json?limit=15`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Subreddit not found or API error');
    const data = await response.json();
    const posts = data.data.children.map(c => c.data);
    if (idx !== -1) {
      lanes[idx].posts = posts;
      lanes[idx].loading = false;
      lanes[idx].error = null;
      saveLanes();
      renderLanes();
    }
  } catch (err) {
    if (idx !== -1) {
      lanes[idx].loading = false;
      lanes[idx].error = err.message || 'Failed to load subreddit';
      lanes[idx].posts = [];
      renderLanes();
    }
  }
}

function addLane(subreddit) {
  subreddit = subreddit.trim();
  if (!subreddit) return;
  if (lanes.some(l => l.subreddit.toLowerCase() === subreddit.toLowerCase())) return;
  lanes.push({ subreddit, posts: [], loading: true, error: null });
  saveLanes();
  renderLanes();
  fetchSubreddit(subreddit);
}

function removeLane(subreddit) {
  lanes = lanes.filter(l => l.subreddit !== subreddit);
  saveLanes();
  renderLanes();
}

function renderInput() {
  const value = subredditInput.value.trim();
  if (value === '') {
    let p = subredditField.querySelector('.error-msg');
    if (!p) {
      p = document.createElement('p');
      p.className = 'error-msg';
      subredditField.appendChild(p);
    }
    p.textContent = 'You need to add a subreddit name.';
    p.style.color = 'red';
    return;
  }
  subredditInput.value = '';
  subredditField.classList.add('hide');
  addLane(value);
}

subredditButton.addEventListener('click', renderInput);

addButton.addEventListener('click', () => {
  subredditField.classList.remove('hide');
  subredditInput.focus();
});

subredditInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    renderInput();
  }
});

// Initial load
loadLanes();
renderLanes();
lanes.forEach(lane => {
  if (!lane.posts || lane.posts.length === 0) {
    fetchSubreddit(lane.subreddit);
  }
});