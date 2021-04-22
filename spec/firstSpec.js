const Answer = require('../application/routers/Answer');
const User = require('../application/modules/users/User');

describe("Check Answer class", () => {

    const answer = new Answer;

    it("good answer", () => {
        expect(answer.good({ any: 123 }))
            .toEqual({ result: 'ok', data: { any: 123 } });
    });

    it("bad answer", () => {
        expect(answer.bad(8696))
            .toEqual({ result: 'error', error: { code: 8696, text: undefined } });
    });
});

describe("Check User class", () => {

    const user = new User();

    user.fill({ id: 1,
        login: 'vasya',
        password: "123",
        name: 'вася',
        token: 'sd3232gpus12312dhg'
    });

    it("user self", () => {
        expect(
            user.self()
        ).toEqual({
            id: 1,
            login: 'vasya',
            password: "123",
            name: 'вася',
            token: 'sd3232gpus12312dhg'
        });
    });

    it("user get", () => {
        expect(
            user.get()
        ).toEqual({
            id: 1,
            name: 'вася'
        });
    });
});