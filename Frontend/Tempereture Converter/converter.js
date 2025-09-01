const input = document.querySelector('input');
const button = document.querySelector('button');
const fromUnits = document.querySelector('#from-unit');
const toUnitsId = document.getElementById('to-unit');
const toFehrenhiet = document.querySelector('.to-fehrenhiet');
const container = document.querySelector('.container')
const p = document.createElement('p')

function test() {
  const inputValue = input.value

  if (fromUnits.value === 'fehrenhiet' && toUnitsId.value === 'celseus') {
    ferToCel(inputValue);
    console.log('tt');
  } else if  (fromUnits.value === 'celseus' && toUnitsId.value === 'fehrenhiet'){
    celToFeh(inputValue);
    console.log('kkk');
  } else if (fromUnits.value === 'celseus' && toUnitsId.value === 'kelvin') {
    celToKel(inputValue)
  } else if(fromUnits.value === 'kelvin' && toUnitsId.value === 'celseus') {
    kelToCel(inputValue)
  } else if (fromUnits.value === 'fehrenhiet' && toUnitsId.value === 'kelvin') {
    fehToKel(inputValue)
  } else if(fromUnits.value === 'kelvin' && toUnitsId.value === 'fehrenhiet') {
    kelToFeh(inputValue)
  }

}

button.addEventListener('click', test)

// Next line of code converts to respective Temperature

// from Celseus to Fehrenhiet
function celToFeh(value) {
  const fehrenhiet = (9/5 * value) + 32;
  console.log(fehrenhiet);

  p.textContent = `${value}Celseus is Equals to ${fehrenhiet} Fehrenhiet`;
  container.appendChild(p)
}

// from Fehrenhiet to Celseus

function ferToCel(value) {
  const celseus = 5/9 * (value - 32);
  console.log(celseus);

  p.textContent = `${value}Fehrenhiet is Equals to ${celseus} Celseus`;
  container.appendChild(p)
}

// from Celseus to Kelvin
function celToKel(value) {
  const kelvin = (value * 1) + 273.15;
  console.log(kelvin);

  p.textContent = `${value}Celseus is Equals to ${kelvin}Kelvin`;
  container.appendChild(p)
}

// Kelvin to Celseus
function kelToCel(value) {
  const celseus = value - 273.15;
  console.log(celseus);

  p.textContent = `${value}Kelvin is Equals to ${celseus}Celseus`;
  container.appendChild(p)
}

// Fehrenhiet to Kelvin
function fehToKel(value) {
  const kelvin = 5/9 * (value - 32) + 273.15
  console.log(kelvin);

  p.textContent = `${value}Fehrenhiet is Equals to ${kelvin}Kelvin`;
  container.appendChild(p)
}

// Kelvin to Fehrenhiet
function kelToFeh(value) {
  const fehrenhiet = 9/5 * (value - 273.15) + 32
  console.log(fehrenhiet);

  p.textContent = `${value}Fehrenhiet is Equals to ${fehrenhiet}Kelvin`;
  container.appendChild(p)
}

button.addEventListener('mouseenter', () => {
  if(input.value.length > 0 && toUnitsId.selectedIndex > 0 && fromUnits.selectedIndex > 0) button.disabled = false;
})