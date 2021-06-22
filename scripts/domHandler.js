const getDomElements = {
    gameScreen: () => document.querySelector('.game-screen'),
    startSection: () => document.querySelector('.start-section'),
    startBtn: () => document.querySelector('.start-section__btn'),
    allInputs: () => Array.from(document.querySelectorAll('.start-section input')),
    wizard: () => document.querySelector('.wizard'),
    header: () => document.querySelector('.header')
}

function createDomElement(tag, text, attributes = {}, children = []) {
   let element = document.createElement(tag);
   element.innerText = text;

   if(Object.keys(attributes).length > 0) {
    Object.keys(attributes).forEach((key) => {
       element.setAttribute(key, attributes[key]);
   });
  }

  if(children.length > 0) {
      children.forEach(child => element.appendChild(child));
  }

  return element;
}

export {
    getDomElements,
    createDomElement
}