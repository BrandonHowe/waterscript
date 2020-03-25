import {removeWhitespace, regexSpecial} from "./helpers";
import {Token, tokenObj} from "./tokens";

const splitString = (str: string, separators: Record<string, Token>): Array<string> => {
    let regex: string = "(";
    for (const i in separators) {
        const separator = separators[i];
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
        if (str === "") {
            continue;
        }
        if (str === ";") {
            currentArr.push(tokenObj.semicolonToken);
        } else if (str === "(") {
            currentArr[currentArr.length - 1].args = [];
            currentArr[currentArr.length - 1].type = "function";
            currentArrs.push(currentArr[currentArr.length - 1].args);
        } else if (str === ")") {
            currentArrs.pop();
        } else if (str === ",") {
            // currentArr.push(<Token>{
            //     value: ",",
            //     type: "comma"
            // })
        } else if (str === ",") {
            currentArr.push(tokenObj.commaToken);
        } else if (str === "be") {
            currentArr.push(tokenObj.equalsToken);
        } else if (str === "let") {
            currentArr.push(tokenObj.letToken);
        } else if (str === "+") {
            currentArr.push(tokenObj.plusToken);
        } else if (str === "-") {
            currentArr.push(tokenObj.minusToken);
        } else if (Number(str).toString() === str) {
            currentArr.push(<Token>{
                value: str,
                type: "number"
            })
        } else {
            console.log(str);
            currentArr.push(<Token>{
                value: str,
                type: "undefined"
            })
        }
    }
    return tokenArr;
};

const inputString = "let str be 5; do(add(10, 2), 5)";

console.log(lexifyArr(splitString(inputString, tokenObj)));
