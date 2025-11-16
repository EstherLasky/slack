const responseObject = require("../src/response-object");

describe('ResponseObject', () => {
    it('should return a success response', () => {
        const data = { foo: 'bar' };
        const response = responseObject.success(data);
        expect(response.isSuccess).toBeTruthy();
        expect(response.data).toEqual(data);
    });

    it('should return an error response', () => {
        const message = 'foo bar';
        const response = responseObject.error(message);
        expect(response.isSuccess).toBeFalsy();
        expect(response.data).toEqual(message);
    });
});
