const SETTINGS = require('../../settings');
const DB = require('../../application/modules/db/DB');
const User = require('../../application/modules/users/User');

describe("Check User class", () => {

    const db = new DB(SETTINGS.DATABASE);
    const user = new User(db);

    it("user auth", async () => {
        expect(
            await user.auth({})
        ).toBe(true);
    });

    /*it("user get", () => {
        expect(
            user.get()
        ).toEqual({
            id: 1,
            name: 'вася'
        });
    });*/
});