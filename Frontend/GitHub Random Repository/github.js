
// List of popular programming languages (can be extended or fetched from a resource)
const languages = [
  "JavaScript", "Python", "Java", "C++", "C#", "TypeScript", "PHP", "Ruby", "Go", "Swift", "Kotlin", "Rust", "Scala", "Dart", "Objective-C"
];

const languageSelect = document.getElementById('language-select');
const repoInfo = document.getElementById('repo-info');
const refreshBtn = document.getElementById('refresh-btn');

// Populate the language dropdown
function populateLanguages() {
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    languageSelect.appendChild(option);
  });
};

// Fetch a random repository for the selected language
async function fetchRandomRepo(language) {
  repoInfo.textContent = 'Loading...';
  refreshBtn.style.display = 'none';
  try {
    // GitHub Search API: sort by stars, get first 100 results
    const url = `https://api.github.com/search/repositories?q=language:${encodeURIComponent(language)}+stars:>1&sort=stars&order=desc&per_page=100`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('GitHub API error');
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      repoInfo.textContent = 'No repositories found for this language.';
      return;
    }
    // Pick a random repo from the results
    const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
    displayRepo(randomRepo);
    refreshBtn.style.display = 'inline-block';
  } catch (err) {
    repoInfo.textContent = 'Error fetching repository. Please try again.';
  }
}

// Display repository details
function displayRepo(repo) {
  repoInfo.innerHTML = `
    <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.full_name}</a></h3>
    <p>${repo.description ? repo.description : 'No description provided.'}</p>
    <ul style="list-style:none; padding:0;">
      <li>⭐ Stars: ${repo.stargazers_count}</li>
      <li>🍴 Forks: ${repo.forks_count}</li>
      <li>🐞 Open Issues: ${repo.open_issues_count}</li>
    </ul>
  `;
}

// Event listeners
languageSelect.addEventListener('change', function () {
  const lang = languageSelect.value;
  if (lang) {
    fetchRandomRepo(lang);
  } else {
    repoInfo.textContent = 'Please select a language';
    refreshBtn.style.display = 'none';
  }
});

refreshBtn.addEventListener('click', function () {
  const lang = languageSelect.value;
  if (lang) fetchRandomRepo(lang);
});

// Initialize
populateLanguages();