import { getDomElements } from "./domHandler.js";

const collisionExtraRectSettings = {
    wizard: {
        top: 20,
        bottom: -10,
        right: -20,
        left: 20
    },
    fireball: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    witch: {
        top: 10,
        bottom: 0,
        right: - 10,
        left: 10
    }
}

const checkCollectionForCollision = {

    witches : (secondElement) => {
        let allWitches = getDomElements.witches();
        let isArray = (typeof secondElement).toLowerCase() == 'object';

        if(isArray && isArray.length > 0) return allWitches.some(witch =>secondElement.some(element => isCollision(witch, element)))
        return allWitches.some(witch => isCollision(witch, secondElement))
    }
}

function isCollision(firstElement, secondElement) {
   let collisionObjConfig = Object.values(firstElement.classList).find(value => collisionExtraRectSettings[value]);
   let firstRec = firstElement.getBoundingClientRect();
   let secondRec = secondElement.getBoundingClientRect();

   if(!(
      firstRec.top + collisionExtraRectSettings[collisionObjConfig].top > secondRec.bottom ||
      firstRec.bottom - collisionExtraRectSettings[collisionObjConfig].bottom < secondRec.top ||
      firstRec.right - collisionExtraRectSettings[collisionObjConfig].right < secondRec.left ||
      firstRec.left + collisionExtraRectSettings[collisionObjConfig].left > secondRec.right
   )) return true;

   return false;
}

export {
    checkCollectionForCollision,
    isCollision
}