const tabItems = document.querySelectorAll('.tab-items');
const tabContents = document.querySelectorAll(".content");

//  Select tab content
// function selectItem(e) {
//   removeBorder();
//   removeShow();
//   this.classList.add('tab-border');

//   const tabContents = document.querySelector(`#${this.id}-content`);

//   tabContents.classList.add('show')
// };

// function removeBorder() {
//   tabItems.forEach(item => item.classList.remove('tab-border'));
// };

// function removeShow() {
//   tabContents.forEach(item => item.classList.remove('show'))
// };

// tabItems.forEach(item => item.addEventListener('click', selectItem));

tabItems.forEach((tab, index)=>{
  tab.addEventListener('click', (e)=>{
    tabItems.forEach(tab=>{tab.classList.remove('active')})
    tab.classList.add('active');

    let line = document.querySelector('.line');
line.style.width = e.target.offsetWidth + "px";
line.style.left = e.target.offsetLeft + "px";
  })
});

let line = document.querySelector('.line');
line.style.width = e.target.offsetWidth + "px";
line.style.left = e.target.offsetLeft + "px";
