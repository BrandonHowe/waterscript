interface Token {
    value: string,
    type: string,
    args?: Token[]
}

const letToken: Token = {
    value: "let",
    type: "varInit"
};

const plusToken: Token = {
    value: "+",
    type: "operator"
};

const minusToken: Token = {
    value: "-",
    type: "operator"
};

const multiplyToken: Token = {
    value: "*",
    type: "operator"
};

const divideToken: Token = {
    value: "/",
    type: "operator"
};

const openParenthesesToken: Token = {
    value: "(",
    type: "paren"
};

const closeParenthesesToken: Token = {
    value: ")",
    type: "paren"
};

const openBraceToken: Token = {
    value: "{",
    type: "brace",
};

const closeBraceToken: Token = {
    value: "}",
    type: "brace",
};

const commaToken: Token = {
    value: ",",
    type: "comma"
};

const equalsToken: Token = {
    value: "be",
    type: "assign"
};

const semicolonToken: Token = {
    value: ";",
    type: "semi"
};

const argumentsToken: Token = {
    value: "args",
    type: "args"
};

const ifToken: Token = {
    value: "if",
    type: "if"
};

const greaterThanToken: Token = {
    value: ">",
    type: "compare"
};

const lessThanToken: Token = {
    value: "<",
    type: "compare"
};

const greaterEqualToken: Token = {
    value: ">=",
    type: "compare"
};

const lessEqualToken: Token = {
    value: "<=",
    type: "compare"
};

const equalToken: Token = {
    value: "==",
    type: "compare"
};

const notEqualToken: Token = {
    value: "!=",
    type: "compare"
};

const newLineToken: Token = {
    value: "\n",
    type: "newline"
};

const commentToken: Token = {
    value: "%%",
    type: "comment"
};

const tokenObj: Record<string, Token> = {
    plusToken,
    minusToken,
    multiplyToken,
    divideToken,
    openParenthesesToken,
    closeParenthesesToken,
    openBraceToken,
    closeBraceToken,
    commaToken,
    equalsToken,
    semicolonToken,
    letToken,
    argumentsToken,
    ifToken,
    greaterThanToken,
    lessThanToken,
    greaterEqualToken,
    lessEqualToken,
    equalToken,
    notEqualToken,
    newLineToken,
    commentToken
};

export {Token, tokenObj};
