const options = document.querySelector('.options');
const optionsChildren = options.querySelectorAll('p');
const selectItem = document.querySelector('.select-item');

// Toggle dropdown visibility when selectItem is clicked
function toggleDropdown() {
  options.classList.toggle('hide');
}
selectItem.addEventListener('click', toggleDropdown);

// Handle selection of an option
function selectOption(event) {
  const text = event.target.textContent;
  selectItem.textContent = text;
  options.classList.add('hide'); // Hide dropdown after selection
}
optionsChildren.forEach(option => {
  option.addEventListener('click', selectOption);
});