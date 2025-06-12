  const textArea = document.querySelector('#textarea');
  const currentNumber = document.querySelector('.currentNumber');
  const limited = document.querySelector('.limited');


  textArea.addEventListener('keyup', () => {
    let characterLength = (textArea.value).length;
    console.log(characterLength);
    currentNumber.innerHTML = characterLength
    if (characterLength >= '250') {
      textArea.classList.add('red')
      currentNumber.classList.add('redd')
      limited.classList.add('redd')
    } else {
      textArea.classList.remove('red')
      currentNumber.classList.remove('redd')
      limited.classList.remove('redd')
    }
  })