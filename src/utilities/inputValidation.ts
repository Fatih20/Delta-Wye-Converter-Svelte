const listOfNumber = Array.from({ length: 10 }, (_, i) => i.toString());
const listOfValidFloatCharacter = listOfNumber.concat(["."]);
const setOfValidIntCharacter = new Set(listOfNumber);
const setOfValidFloatCharacter = new Set(listOfValidFloatCharacter);


function countInArray(array: string[], checkedValue: string) {
    return array.reduce(
      (count, element) => count + (element === checkedValue ? 1 : 0),
      0
    );
  }

export function isInputValidFloat (givenValue : string) : boolean{
    let inputValid = true;
    const givenValueArrayed = givenValue.split("");

    // Prevent space
    if (
      givenValue.length > 0 &&
      countInArray(givenValueArrayed, " ") > 0
    ) {
      inputValid = false;
    }

    // Prevent non-number and period character
    const containedWithin = givenValueArrayed.every(character => listOfValidFloatCharacter.includes(character))

    if (!containedWithin) {
      inputValid = false;
    }

    // Prevent more than one period
    if (
      givenValue.length > 0 &&
      countInArray(givenValueArrayed, ".") > 1
    ) {
      inputValid = false;
    }

    return inputValid;
}

export function isInputValidInt (e : any, givenValue : string) : boolean{
    let inputValid = true;
    const givenValueArrayed = givenValue.split("");

    // Prevent space
    if (
      givenValue.length > 0 &&
      countInArray(givenValueArrayed, " ") > 0
    ) {
      inputValid = false;
    }

    // Prevent non-number and period character
    const containedWithin = givenValueArrayed.every(character => listOfNumber.includes(character))

    if (!containedWithin) {
      inputValid = false;
    }

    return inputValid;
}