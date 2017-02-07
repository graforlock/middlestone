import test from 'tape';

test("true === true", expect => {
    expect.plan(1);
    expect.equal(true, true);
});