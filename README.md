# waterscript

This is just a language I'm making to improve and reinforce my language development skills. I have no idea what the syntax will be, and it's probably going to be some convoluted JS-looking thing.

## Docs

### Expressions

Everything in WaterScript is an expression. That means it returns a value.

```
1 + 1; # returns 2
```

They can be multiline, or "blocks". Blocks return the final command in their line.

```
{
    1 + 2; # returns 3, but it's ignored
    3 + 4; # returns 7. the whole block returns 7
};
```

Blocks can be one line, but there's no use.

### Operators

The four operators available for use are addition, subtraction, multiplication, and division.

```$xslt
1 + 1; # returns 2
4 - 3; # returns 1
6 * 9; # returns 54
6 / 4; # returns 1.5
```

Do note that there is no order of operations; all commands are executed left to right.

```$xslt
2 + 2 * 2; # returns 8
```

### The Hash (#) operator and variables

The hash operator is a way to access the last returned value. It is a replacement for all variables, which have been eliminated.

```$xslt
{
    1 + 2; # returns 3
    # * 3; # returns 9
};
print(#); # prints 9
```

### Functions

Functions are declared with `let be` syntax. A function can take in multiple arguments and then returns a block.

```$xslt
let plus be (a, b) {
    a + b;
};
```

### If statements (TODO)

You will also be able to  use if statements. The syntax will be:

```$xslt
if (a > b, {
    print(a);
});
```

You can use these, but not inside functions. Stay tuned for when you can!

### Semicolons

You need a semicolon at the end of essentially every line, unless you are in the middle of a definition. That means semicolons at the end of blocks, functions, and expressions.
