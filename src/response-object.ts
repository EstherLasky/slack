export class ResponseObject<T> {
    isSuccess: boolean;
    data: T;

    constructor(isSuccess = true, data: T) {
        this.isSuccess = isSuccess;
        this.data = data;
    }

    static success<T>(data: T): ResponseObject<T> {
        return new ResponseObject<T>(true, data);
    }

    static error(message: string): ResponseObject<string> {
        return new ResponseObject<string>(false, message);
    }
}

