import { getDomElements } from "./domHandler.js";

const checkCollectionForCollision = {

    witches : (secondElement) => {
        let allWitches = getDomElements.witches();
        let isArray = (typeof secondElement).toLowerCase() == 'object';
        if(isArray) allWitches.some(witch =>secondElement.some(element => isCollision(witch, element)))
        else allWitches.some(witch => isCollision(witch, secondElement))
    }
}

function isCollision(firstElement, secondElement) {
   let firstRec = firstElement.getBoundingClientRect();
   let secondRec = secondElement.getBoundingClientRect();

   if(!(
      firstRec.top > secondRec.bottom ||
      firstRec.bottom < secondRec.top ||
      firstRec.right < secondRec.left ||
      firstRec.left > secondRec.right
   )) return true;

   return false;
}

export {
    checkCollectionForCollision,
    isCollision
}