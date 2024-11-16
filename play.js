/* 
HOW TO USE:
FOUR arguments must be passed to use this function. 
1)an array of objects to cycle thru, [{},{},{}]
2)and array object containing the display elements ids [{ elmntId: "myDivId", arrObjProp: "name" },{},{}...]
    and the properties of the cycled array objects you want to display, 
3)And the two html backward and forward buttons ids 
*/

//cycleBackAndForth is dependant on cycleThru() to generate the numbers to use as indexes in the array
let breakfast = [
  { name: "bacon", amount: 5 },
  { name: "pancakes", amount: 2 },
  { name: "eggs", amount: 3 },
  { name: "sausage", amount: 2 }
];
let breakfast2 = ["bacon", "pancakes", "eggs", "sausage"];
let dirBtnIdsArr = ["forward", "back"];
let elmtIdAnPropsFromPassedArrayToDisplayArr = [
    { elmntId: "plate", passedArrProp: "name" },
    { elmntId: "cup", passedArrProp: "amount" },
];
cycleBackAndForward(
  breakfast,
  dirBtnIdsArr,
  elmtIdAnPropsFromPassedArrayToDisplayArr
);

function cycleBackAndForward(dataArr, dirBtnIdsArr, elIdnPropsArr) {
    if (!Array.isArray(dataArr)) {
        console.log('not arr')
        return;
    }
  let fwd = document.querySelector(`#${dirBtnIdsArr[0]}`);
  let bck = document.querySelector(`#${dirBtnIdsArr[1]}`);
  let length = `${dataArr.length}`; //This could be the array length that you want to cycle through
  let numb = cycleThru(length); //closure to be called here once

  fwd.addEventListener("click", e => {
    const _DIRECTION = "forward";
    //   let keys = displayElmntIdsandPropObj.map((obj) => {
    //       return Object.keys(obj)
    //   })
    // let keysArr = Object.keys(display[0]);
    // console.log(keys[0]);
    let indexNum = numb(length, _DIRECTION); //returns a number to use to cycle thru array
    //   displayElmntIdsandPropObj.forEach(obj => {
    //     console.log(`${obj[elmntId]}`)
    //   document.querySelector(`#${obj.elmntId}`).textContent = `${
    //     arr[indexNum][obj.arrObjProp]
    //   }`;
    // });

    let isAllStrings = dataArr.every(item => typeof item === "string"); //checks if passed in array is all strings
    let isAllObjects = dataArr.every(item => typeof item === "object"); //checks if passed in array is all strings
    if (isAllStrings) {
      console.log(dataArr[indexNum], "--");
    } else if (isAllObjects) {
      //   [{x:y,a:b},{x:y,a:b}];
      //   let keysArr = []
      //   arr.forEach((obj) => {
      //       keysArr.push(Object.keys(obj))
      //   })
      let keys = Object.keys(dataArr[0]);
      document.querySelector(`#${keys}`);
      //   console.log(arr[indexNum][],"--");
      console.log(keys);
    }
    //   displayit(breakfast, ids, indexNum);
  });
  bck.addEventListener("click", e => {
    const _DIRECTION = "back";
    let indexNum = numb(length, _DIRECTION); //returns a number to use to cycle thru array
    // displayElmntIdsandPropObj.forEach(obj => {
    //   document.querySelector(`#${obj.elmntId}`).textContent = `${
    //     arr[indexNum][obj.arrObjProp]
    //   }`;
    // });
    //   console.log(indexNum)
    let isAllStrings = dataArr.every(item => typeof item === "string");
    if (isAllStrings) {
      console.log(dataArr[indexNum], "--");
    } else {
        elIdnPropsArr.forEach((obj, index) => {
            console.log(index)
    //         console.log(document.querySelector(`#${obj[index]}`));
    //   document.querySelector(`#${obj[index]}`).textContent = `${
    //     dataArr[indexNum][obj[index]]
    //   }`;
    });
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
