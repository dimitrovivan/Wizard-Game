const getDomElements = {
    gameScreen: () => document.querySelector('.game-screen'),
    startSection: () => document.querySelector('.start-section'),
    shopBtn: () => document.querySelector('.header__shop-btn'),
    shopSection: () => document.querySelector('.header__shop-section'),
    health: () => document.querySelector('.header__health-value'),
    healthSection: () => document.querySelector('.header__health-section'),
    healthExtraInfo: () => document.querySelector('.header__health-extra-info'),
    logo: () => document.querySelector('.header__logo'),
    score: () => document.querySelector('.header__score-value'),
    scoreSection: () => document.querySelector('.header__score-section'),
    gameOverSection: () => document.querySelector('.game-over'),
    startBtn: () => document.querySelector('.start-section__btn'),
    tryAgainBtn: () => document.querySelector('.game-over__play-btn'),
    allInputs: () => Array.from(document.querySelectorAll('.start-section input')),
    wizard: () => document.querySelector('.wizard'),
    header: () => document.querySelector('.header'),
    fireballs: () => Array.from(document.querySelectorAll('.fireball')),
    witches: () => Array.from(document.querySelectorAll('.witch')),
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