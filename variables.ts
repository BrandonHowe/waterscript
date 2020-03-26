import {Token} from "./tokens";

let variables: Record<string, Token> = {
    "#": {
        value: "null",
        type: "null"
    }
};

interface FuncArg {
    value: string,
    type: string,
    val?: any,
    valtype?: string
}

interface Function {
    name: string,
    args: FuncArg[],
    block: Token
}

let functions: Record<string, Function> = {};

export {variables, functions, FuncArg, Function};
