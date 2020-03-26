import { expect } from 'chai';
import { removeWhitespace } from "../helpers";
import { tokenObj } from "../tokens";
import { lexifyArr } from "../index";

describe("whitespace remover", () => {
    it('should remove all whitespace from a string', () => {
        const input = "1 + 2 ";
        expect(removeWhitespace(input)).to.equal("1+2");
    })
});

describe("lexer", () => {
    it('should split the string based on an array of chars', () => {
        const input = "1 - 23 + 4";
        expect(lexifyArr(input, tokenObj)).to.eql(["1", "-", "23", "+", "4"]);
    })
});
