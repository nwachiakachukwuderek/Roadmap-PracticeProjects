  // import { DateTime } from "luxon";


  const input = document.querySelector('input');
  const button = document.querySelector('button');
  const displayText = document.querySelector('.display-text');
  const { DateTime } = luxon;
  const now = DateTime.fromObject({
    year: null,
    month: null,
    day: null
  })

  function date(e) {
    e.preventDefault(); // Prevent form submission 
   // displayText.textContent = `Your Age is: ${inputValue}`;
    const inputValue = input.value;
    const toNumber = inputValue.split('/').map(Number);

    const year = now.month < toNumber[1] ? (now.year - 1) - toNumber[2] : now.year - toNumber[2];
    const month = now.month < toNumber[1] ? ((now.month - 1) + 12) - toNumber[1] : now.month - toNumber[1];
    const day = now.day < toNumber[0] ? (now.day + 30) - toNumber[0] : now.day - toNumber[0];

    displayText.textContent = `You are ${year} years old, ${month} months and ${day} Days Old `
  }



  button.addEventListener('click', date)