import * as fs from "fs";
import {removeWhitespace, regexSpecial, removeLineBreaks} from "./helpers";
import {Token, tokenObj} from "./tokens";
import {variables} from "./variables";
import * as path from "path";

const lexifyArr = (str: string, separators: Record<string, Token>): Array<string> => {
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

const parseArr = (arr: Array<string>): Array<Token> => {
    let tokenArr: Array<Token> = [];
    let currentArrs: Array<Array<Token>> = [tokenArr];
    let afterEquals = false;
    let afterOperator = false;
    for (const str of arr) {
        let currentArr = currentArrs[currentArrs.length - 1];
        if (str === "") {
            continue;
        }
        if (str === ";") {
            if (afterEquals === true) {
                currentArrs.pop();
                afterEquals = false;
            }
            currentArr = currentArrs[currentArrs.length - 1];
            currentArr.push(tokenObj.semicolonToken);
        } else if (str === "(") {
            currentArr[currentArr.length - 1].args = [];
            currentArr[currentArr.length - 1].type = "function";
            currentArrs.push(currentArr[currentArr.length - 1].args);
        } else if (str === ")") {
            currentArrs.pop();
        } else if (str === ",") {
            currentArr.push(tokenObj.commaToken);
        } else if (str === "be") {
            afterEquals = true;
            continue;
        } else if (str === "let") {
            currentArr.push({...tokenObj.letToken});
            currentArr[currentArr.length - 1].args = [];
            currentArrs.push(currentArr[currentArr.length - 1].args);
        } else if (str === "+" || str === "-" || str === "*" || str === "/") {
            const arg1 = currentArr.pop();
            const val = str === "+" ? "add"
                        : str === "-" ? "subtract"
                        : str === "*" ? "multiply"
                        : "divide";
            currentArr.push(<Token>{
                value: val,
                type: "function",
                args: []
            });
            currentArrs.push(currentArr[currentArr.length - 1].args);
            currentArr = currentArrs[currentArrs.length - 1];
            currentArr.push(arg1);
            afterOperator = true;
            continue;
        } else if (Number(str).toString() === str) {
            currentArr.push(<Token>{
                value: str,
                type: "number"
            })
        } else if (str.charAt(0) === "\"" && str.charAt(str.length - 1) === "\"") {
            currentArr.push(<Token>{
                value: str.slice(1, str.length - 1),
                type: "string"
            })
        } else {
            currentArr.push(<Token>{
                value: str,
                type: "undefined"
            })
        }
        if (afterOperator === true) {
            currentArrs.pop();
            afterOperator = false;
        }
    }
    return tokenArr;
};

const evalFunc = (token: Token): Token => {
    if (token.value === "add" || token.value === "subtract" || token.value === "multiply" || token.value === "divide") {
        let addend1 = {...token.args[0]};
        let addend2 = {...token.args[1]};
        if (addend1.type === "function") {
            addend1 = evalFunc(addend1);
        }
        if (addend2.type === "function") {
            addend2 = evalFunc(addend2);
        }
        if (addend1.type === "number" && addend2.type === "number") {
            const funcValue = token.value === "add" ? (Number(addend1.value) + Number(addend2.value)).toString()
                            : token.value === "subtract" ? (Number(addend1.value) - Number(addend2.value)).toString()
                            : token.value === "multiply" ? (Number(addend1.value) * Number(addend2.value)).toString()
                            : (Number(addend1.value) / Number(addend2.value)).toString();
            token = {
                value: funcValue,
                type: "number"
            };
            return token;
        } else {
            const funcValue = token.value === "add" ? addend1.value + addend2.value : "null";
            token = {
                value: funcValue,
                type: "string"
            };
            return token;
        }
    }
};

const evaluate = (ast: Array<Token>) => {
    for (let token of ast) {
        if (token.value === "let") {
            const [varName, varValue] = token.args;
            if (varValue.type === "string" || varValue.type === "number") {
                variables[varName.value] = varValue;
            } else if (varValue.type === "function") {
                variables[varName.value] = evalFunc(varValue);
            } else {
                variables[varName.value] = variables[varValue.value];
            }
        }
        if (token.value === "print") {
            const varValue = token.args[0];
            console.log(variables[varValue.value].value);
        }
    }
};

const runProgram = (inputString: string) => {
    const lexed = lexifyArr(inputString, tokenObj);
    const AST = parseArr(lexed);
    evaluate(AST);
};

const main = () => {
    fs.readFile(path.resolve(__dirname, "myprogram.ws"), "utf-8", (err, data) => {
        if (err) throw err;
        runProgram(removeLineBreaks(data));
    })
};

main();

export { lexifyArr, parseArr, evalFunc, evaluate, runProgram };
