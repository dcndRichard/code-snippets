/* 
HOW TO USE:
FOUR arguments must be passed to use this function. 
1)an array of objects to cycle thru, [{},{},{}]
2)and array object containing the display elements ids [{ elmntId: "myDivId", arrObjProp: "name" },{},{}...]
    and the properties of the cycled array objects you want to display, 
3)And the two html backward and forward buttons ids 
*/

//cycleBackAndForth is dependant on cycleThru() to generate the numbers to use as indexes in the array
function cycleBackAndForward(
  arr,
  displayElmntIdsandPropObj,
  fwdBtnId,
  bckBtnId
) {
  let fwd = document.querySelector(`#${fwdBtnId}`);
  let bck = document.querySelector(`#${bckBtnId}`);
  let length = `${arr.length}`; //This could be the array length that you want to cycle through
  let numb = cycleThru(length); //closure to be called here once

  fwd.addEventListener("click", e => {
    const _DIRECTION = "forward";
    let indexNum = numb(length, _DIRECTION); //returns a number to use to cycle thru array
    displayElmntIdsandPropObj.forEach(obj => {
      document.querySelector(`#${obj.elmntId}`).textContent = `${
        arr[indexNum][obj.arrObjProp]
      }`;
    });
  });
  bck.addEventListener("click", e => {
    const _DIRECTION = "back";
    let indexNum = numb(length, _DIRECTION); //returns a number to use to cycle thru array
    displayElmntIdsandPropObj.forEach(obj => {
      document.querySelector(`#${obj.elmntId}`).textContent = `${
        arr[indexNum][obj.arrObjProp]
      }`;
    });
  });
}
/* This generates numbers to use as indexs for arrays to cycle through */
function cycleThru(_len) {
  const DIR = ["back"];
  let count = 0;
  return (dataLength, direction) => {
    if (direction === DIR[0]) {
      //change to 0 to end at 0  --OR--  change to 1 to end at 1
      if (count <= 0) {
        //**** may need to minus 1 for the array index dont go out of bounds (_len -1)
        count = _len - 1;
        return count;
      }
      return --count;
    } else {
      //**** may need to minus 1 for the array index dont go out of bounds (dataLength - 1)
      if (count >= dataLength - 1) {
        count = 0; //change to 0 to end at 0  --OR--  change to 1 to end at 1
        return count;
      }
      return ++count;
    }
  };
}
