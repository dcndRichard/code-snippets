/* 
HOW TO USE:
FOUR arguments must be passed to use this function. 
1)1st argument must be an array of objects to cycle thru, [{},{},{}] or and array of strings
2)2nd argument must be an array containing the two ids of the forward and back buttons
    and the properties of the cycled array objects you want to display, 
3)
    If you are passing an array of objects in the first argument, then the 3rd argument must be and array of two arrays (multi-dimensional)
    The first array must be and array of the ids of one or more HTML element(s) that will display the data 
    The second array must be the properties of the objects passed in thru the first argument array
 
    If you are passing an array of strings in the first argument, then the 3rd argument can be one array with one item, (not Multi-dimensional). 
    This one item is the id of the HTML element to display the data.
    Or you just pass the one string that is the id of the HTML element to display the data
*/

//cycleBackAndForth is dependant on cycleThru() to generate the numbers to use as indexes in the array
//DATA ARRAY option 1
let breakfast = [
  ////////////////////////////////////////
  { name: "bacon", amount: 5 }, ////////////////////////////////////////
  { name: "pancakes", amount: 2 }, ////////////////////////////////////////
  { name: "eggs", amount: 3 }, ////////////////////////////////////////
  { name: "sausage", amount: 2 } ////////////////////////////////////////
];
//DATA ARRAY option 2
let breakfast2 = ["bacon", "pancakes", "eggs", "sausage"]; ////////////////////////////////////////
//ids of cycle direction buttons.                           ////////////////////////////////////////
let dirBtnIdsArr = ["forward", "back"]; ////////////////////////////////////////

let elmtIdAnPropsFromPassedArrayToDisplayArr = [
  ["plate", "cup"], //array of html ids
  ["name", "amount"] //array of the properties of the passed array, if passing an array of object
];

//Calling the function
cycleBackAndForward(
  breakfast2, ///data array
  dirBtnIdsArr, ////btn ids array
  elmtIdAnPropsFromPassedArrayToDisplayArr ///HTML display ids and properites multi-dimensional array if passing and array of objects for the data    OR a simple string if 1st argument is an array of strings
);

function cycleBackAndForward(dataArr, dirBtnIdsArr, elIdnPropsArr) {
  let fwd = document.querySelector(`#${dirBtnIdsArr[0]}`);
  let bck = document.querySelector(`#${dirBtnIdsArr[1]}`);
  let length = `${dataArr.length}`; //This could be the array length that you want to cycle through
  let numb = cycleThru(length); //closure to be called here once
  let isAllStrings = dataArr.every(item => typeof item === "string"); //checks if passed in array is all strings
  let isAllObjects = dataArr.every(item => typeof item === "object"); //checks if passed in array is all objects
  let singleId;

  //checks if the data passed in is an array, and if the button ids are passed in as an array.
  if (!Array.isArray(dataArr) || !Array.isArray(dirBtnIdsArr)) {
    console.log("not arr");
    return;
  }
  //checks if id
  if (Array.isArray(elmtIdAnPropsFromPassedArrayToDisplayArr)) {
    singleId = elmtIdAnPropsFromPassedArrayToDisplayArr[0];
  } else if (typeof elmtIdAnPropsFromPassedArrayToDisplayArr === "string") {
    singleId = elmtIdAnPropsFromPassedArrayToDisplayArr;
  }

  fwd.addEventListener("click", e => {
    const _DIRECTION = "forward";
    let indexNum = numb(length, _DIRECTION); //returns a number to use to cycle thru array

    if (isAllStrings) {
      document.querySelector(`#${singleId}`).innerText = dataArr[indexNum];
    } else if (isAllObjects) {
      for (let i = 0; i < elIdnPropsArr.length; i++) {
        //elIdnPropsArr[0].length;
        document.querySelector(`#${elIdnPropsArr[0][i]}`).innerText =
          dataArr[indexNum][elIdnPropsArr[1][i]];
      }
    }
  });
  bck.addEventListener("click", e => {
    const _DIRECTION = "back";
    let indexNum = numb(length, _DIRECTION); //returns a number to use to cycle thru array
    //let isAllStrings = dataArr.every(item => typeof item === "string");
    if (isAllStrings) {
      document.querySelector(`#${singleId}`).innerText = dataArr[indexNum];
    } else if (isAllObjects) {
      for (let i = 0; i < elIdnPropsArr.length; i++) {
        //elIdnPropsArr[0].length;
        document.querySelector(`#${elIdnPropsArr[0][i]}`).innerText =
          dataArr[indexNum][elIdnPropsArr[1][i]];
      }
    }
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
