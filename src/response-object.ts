import { ResponseDataType } from "./types/data";

export class ResponseObject {
    isSuccess: boolean;
    data: ResponseDataType;

    constructor(isSuccess = true, data: ResponseDataType = null) {
        this.isSuccess = isSuccess;
        this.data = data;
    }

    static success(data: ResponseDataType): ResponseObject {
        return new ResponseObject(true, data);
    }

    static error(message: string): ResponseObject {
        return new ResponseObject(false, message);
    }
}

