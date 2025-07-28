const options = document.querySelector('.options');
const optionsChildren = options.querySelectorAll('p');
const selectItem = document.querySelector('.select-item')

function selector(event) {
  const text = event.target.textContent;
  selectItem.textContent = text;
}



optionsChildren.forEach(option => option.addEventListener('click', selector))