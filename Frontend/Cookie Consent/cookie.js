  const container = document.querySelector('.container');
  const removeButton = document.querySelector('.removeButton');
  const likeButton = document.querySelector('.likeButton');
  const numberOfItems = localStorage.length
  console.log(localStorage.getItem("cookieConsent"))
  
  function checkCookieStatus() {
    return localStorage.getItem("cookieConsent") === "true";
  }

  function controlCookie() {
    localStorage.setItem("cookieConsent", "true");
    container.classList.add('hide');
  }

  // function cancelCookie() {
  //   container.classList.add('hide')
  // }

  likeButton.addEventListener('click', controlCookie);
  // removeButton.addEventListener('click', cancelCookie)

  if (!cookieConsent()) {
    container.classList.remove('hide');
  }