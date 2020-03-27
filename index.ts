import * as fs from "fs";
import {removeWhitespace, regexSpecial } from "./helpers";
import {Token, tokenObj} from "./tokens";
import {functions, variables} from "./variables";
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
    let inFuncDef = false;
    let rightAfterBe = false;
    let afterOperator = false;
    let currentIf = false;
    let commented = false;
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        let currentArr = currentArrs[currentArrs.length - 1];
        if (str === "\n") {
            commented = false;
            continue;
        }
        if (commented === true) {
            continue;
        }
        if (str === "") {
            continue;
        } else if (str === ";") {
            currentArr = currentArrs[currentArrs.length - 1];
            currentArr.push(tokenObj.semicolonToken);
        } else if (str === "/*") {
            commented = true;
        } else if (str === "(") {
            if (!rightAfterBe && !currentIf) {
                currentArr[currentArr.length - 1].args = [];
                currentArr[currentArr.length - 1].type = "function";
                currentArrs.push(currentArr[currentArr.length - 1].args);
            } else if (!rightAfterBe && currentIf) {

            } else {
                currentArr.push(<Token>{
                    value: "args",
                    type: "args",
                    args: []
                });
                currentArrs.push(currentArr[currentArr.length - 1].args);
            }
        } else if (str === ")") {
            currentArrs.pop();
        } else if (str === "{") {
            if (rightAfterBe === true) {
                currentArrs.pop();
                rightAfterBe = false;
            }
            currentArr = currentArrs[currentArrs.length - 1];
            currentArr.push(<Token>{
                value: "block",
                type: "block",
                args: []
            });
            currentArrs.push(currentArr[currentArr.length - 1].args);
        } else if (str === "}") {
            currentArrs.pop();
        } else if (str === ",") {
            // currentArr.push(tokenObj.commaToken);
        } else if (str === "be") {
            inFuncDef = true;
            rightAfterBe = true;
            continue;
        } else if (str === "let") {
            currentArr.push({...tokenObj.letToken});
            currentArr[currentArr.length - 1].args = [];
            currentArrs.push(currentArr[currentArr.length - 1].args);
        } else if (str === "if") {
            currentArr.push({...tokenObj.ifToken});
            currentArr[currentArr.length - 1].args = [];
            currentArrs.push(currentArr[currentArr.length - 1].args);
            currentIf = true;
            continue;
        } else if (str === "+") {
            const arg1 = currentArr.pop();
            currentArr.push(<Token>{
                value: "add",
                type: "function",
                args: []
            });
            currentArrs.push(currentArr[currentArr.length - 1].args);
            currentArr = currentArrs[currentArrs.length - 1];
            currentArr.push(arg1);
            afterOperator = true;
            continue;
        } else if (str === "-" || str === "*" || str === "/") {
            const arg1 = currentArr.pop();
            const value = str === "-" ? "subtract"
                        : str === "*" ? "multiply"
                        : "divide";
            currentArr.push(<Token>{
                value: value,
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
            });
            continue;
        } else if (str.charAt(0) === "\"" && str.charAt(str.length - 1) === "\"") {
            currentArr.push(<Token>{
                value: str.slice(1, str.length - 1),
                type: "string"
            })
        } else {
            currentArr.push(<Token>{
                value: str,
                type: "variable"
            })
        }
        if (afterOperator === true) {
            currentArrs.pop();
            afterOperator = false;
        }
        if (currentIf === true) {
            currentIf = false;
        }
    }
    return tokenArr;
};

const evalFunc = (token: Token): Token => {
    if (token.value === "add" || token.value === "subtract" || token.value === "multiply" || token.value === "divide") {
        let addend1 = {...token.args[0]};
        let addend2 = {...token.args[1]};
        while (addend1.type === "variable") {
            addend1 = variables[addend1.value];
        }
        while (addend2.type === "variable") {
            addend2 = variables[addend2.value];
        }
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
            variables["#"] = token;
            return variables["#"];
        } else {
            const funcValue = token.value === "add" ? addend1.value + addend2.value : "null";
            token = {
                value: funcValue,
                type: "string"
            };
            variables["#"] = token;
            return variables["#"];
        }
    } else if (token.value === "print") {
        const varValue = token.args[0];
        if (varValue.type === "variable") {
            console.log(variables[varValue.value].value);
            variables["#"] = variables[varValue.value];
        } else {
            console.log(varValue.value);
            variables["#"] = varValue;
        }
    } else {
        let copiedArgs = token.args.map(l => Object.assign(l, l));
        for (let i = 0; i < copiedArgs.length; i++) {
            if (copiedArgs[i].type === "function") {
                copiedArgs[i] = evalFunc(copiedArgs[i]);
            }
            while (copiedArgs[i].type === "variable") {
                copiedArgs[i] = variables[copiedArgs[i].value];
            }
        }
        for (let i = 0; i < copiedArgs.length; i++) {
            variables[functions[token.value].args[i].value] = <Token>{};
            variables[functions[token.value].args[i].value].value = copiedArgs[i].value;
            variables[functions[token.value].args[i].value].type = copiedArgs[i].type;
        }
        variables["#"] = {...evaluate(functions[token.value].block.args)};
        for (let i = 0; i < copiedArgs.length; i++) {
            delete variables[functions[token.value].args[i].value];
        }
        return variables["#"];
    }
};

const evaluate = (ast: Array<Token>): Token => {
    for (let token of ast) {
        if (token.value === "let") {
            functions[token.args[0].value] = {
                name: token.args[0].value,
                args: token.args[1].args,
                block: token.args[2]
            };
        }
        if (token.value === "if") {
            let arg0 = {...token.args[0]};
            let arg2 = {...token.args[2]};
            while (arg0.type === "variable") {
                arg0 = variables[arg0.value];
            }
            while (arg2.type === "variable") {
                arg2 = variables[token.args[2].value];
            }
            const farg0 = arg0.type === "number" ? Number(arg0.value) : arg0.value;
            const farg2 = arg2.type === "number" ? Number(arg2.value) : arg2.value;
            if (token.args[1].value === "==") {
                if (farg0 === farg2) {
                    variables["#"] = evaluate(token.args[3].args);
                }
            }
            if (token.args[1].value === "!=") {
                if (farg0 !== farg2) {
                    variables["#"] = evaluate(token.args[3].args);
                }
            }
            if (token.args[1].value === ">=") {
                if (farg0 >= farg2) {
                    variables["#"] = evaluate(token.args[3].args);
                }
            }
            if (token.args[1].value === "<=") {
                if (farg0 <= farg2) {
                    variables["#"] = evaluate(token.args[3].args);
                }
            }
            if (token.args[1].value === ">") {
                if (farg0 > farg2) {
                    variables["#"] = evaluate(token.args[3].args);
                }
            }
            if (token.args[1].value === "<") {
                if (farg0 < farg2) {
                    variables["#"] = evaluate(token.args[3].args);
                }
            }
        }
        if (token.value === "block") {
            evaluate(token.args);
        } else if (token.type === "function") {
            evalFunc(token);
        }
    }
    return variables["#"];
};

const runProgram = (inputString: string) => {
    const lexed = lexifyArr(inputString, tokenObj);
    const AST = parseArr(lexed);
    evaluate(AST);
};

const main = (dir: string) => {
    fs.readFile(path.resolve(__dirname, dir), "utf-8", (err, data) => {
        if (err) throw err;
        runProgram(data);
    })
};

main(process.argv[2]);

export {lexifyArr, parseArr, evalFunc, evaluate, runProgram};
