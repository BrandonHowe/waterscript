import {removeWhitespace, regexSpecial} from "./helpers";
import {Token, tokenArr} from "./tokens";

const splitString = (str: string, separators: Array<Token>): Array<string> => {
    let regex: string = "(";
    for (const separator of separators) {
        if (regexSpecial.indexOf(separator.value) > 0) {
            regex += "\\" + separator.value + "|"
        } else {
            regex += separator.value + "|";
        }
    }
    regex = regex.split("").slice(0, regex.length - 1).join("") + ")";
    return str.split(new RegExp(regex)).map(l => removeWhitespace(l));
};

const lexifyArr = (arr: Array<string>): Array<Token> => {
    let tokenArr: Array<Token> = [];
    let currentArrs: Array<Array<Token>> = [tokenArr];
    for (const str of arr) {
        let currentArr = currentArrs[currentArrs.length - 1];
        if (str === "(") {
            currentArr[currentArr.length - 1].args = [];
            currentArrs.push(currentArr[currentArr.length - 1].args);
        } else if (str === ")") {
            currentArrs.pop();
        } else if (str === "+") {
            currentArr.push(<Token>{
                value: "+",
                type: "operator"
            })
        } else if (str === "-") {
            currentArr.push(<Token>{
                value: "-",
                type: "operator"
            })
        } else if (Number(str).toString() === str) {
            currentArr.push(<Token>{
                value: str,
                type: "number"
            })
        } else {
            currentArr.push(<Token>{
                value: str,
                type: "undefined"
            })
        }
    }
    return tokenArr;
};

const inputString = "do(23 - 1)";

console.log(lexifyArr(splitString(inputString, tokenArr))[0]);
