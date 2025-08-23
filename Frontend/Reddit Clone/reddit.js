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
    const redditInfos = data.data.children

    // redditInfos.forEach((redditInfo) => console.log(redditInfo.data.score))
    console.log(redditInfos)
    displayReddit(redditInfos)

  } catch (err) {
    console.log(err, 'is not working')
  }
}

function displayReddit(infos) {

  infos.forEach((info) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <h3>${info.data.subreddit}</h3>
    <a href="${info.data.permalink}">${info.data.title}</a>
    <span>${info.data.score}</span>
    <span>${info.data.author}</span>
    `
  });
  mainContainer.appendChild(div)
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
