import { describe, expect, it } from '@jest/globals';

import { ResponseObject } from "../src/response-object";
import { AddChannelResponseDataType } from "../src/types/data";

describe('ResponseObject', () => {
    it('should return a success response', () => {
        const data: AddChannelResponseDataType = { channelId: 'C123456', channelName: 'test-channel' };
        const response: ResponseObject = ResponseObject.success(data);
        expect(response.isSuccess).toBeTruthy();
        expect(response.data).toEqual(data);
    });

    it('should return an error response', () => {
        const message: string = 'foo bar';
        const response: ResponseObject = ResponseObject.error(message);
        expect(response.isSuccess).toBeFalsy();
        expect(response.data).toEqual(message);
    });
});

