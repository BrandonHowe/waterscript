let loop be (a, {
    if (a > 0, {
        a - 1;
        print(#);
        loop(#);
    });
});

loop(6);
