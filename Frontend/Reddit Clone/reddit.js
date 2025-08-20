const addButton = document.querySelector('.add-button');
const subredditField = document.querySelector('.subreddit-field');
const subredditInput = document.querySelector('.subreddit-input');
const subredditButton = document.querySelector('.subreddit-button');  
const mainContainer = document.querySelector('.main-container');


async function fetchData(subreddit) {
    mainContainer.textContent = 'Loading...';
  try{
    const url = `https://www.reddit.com/r/${subreddit}.json`
    const response = await fetch(url)
    if (!response.ok) throw new Error('There is a problem with the link or website')
    const data = await response.json()
    console.log(subreddit)
    const redditInfo = data.data.children.data
    console.log(redditInfo)

    displayReddit(redditInfo)
  } catch (err) {
    console.log(err, 'is not working')
  }
}

function displayReddit(info) {
  mainContainer.innerHTML = `
  <h3>${info.title}</h3>
    <div>
      <p>${info.selftext}</p>
      <p>⭐ vote counts: ${info.score}</p>
      <p>author: ${info.author}</p>
    </div>
  `
}

function renderInput() {
  const value = subredditInput.value.trim()
  if (value === '') {
    const p = document.createElement('p');
    p.textContent = 'You need to add a text to show contents';
    p.style.color = 'red'
    subredditField.appendChild(p)
    return
  }

  subredditField.classList.add('hide')
  fetchData(value)
}

subredditButton.addEventListener('click', renderInput)

addButton.addEventListener('click', () => {
  subredditField.classList.remove('hide');
})
