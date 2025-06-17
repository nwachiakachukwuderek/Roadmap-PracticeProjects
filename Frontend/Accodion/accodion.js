  const slides = document.querySelectorAll('.slide');

  
  function removeAllShown(e) {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => answer.classList.remove('active'));
  }


  slides.forEach(slide => slide.addEventListener('click', () => {
    removeAllShown();
    

    const choice = slide.querySelector('.answer');
    let isActive = choice.classList.contains('active');
    console.log(!isActive)

  choice.classList.add('active');

  setTimeout(() => {
    choice.classList.remove('active');
  }, 10000)
  }))
  
