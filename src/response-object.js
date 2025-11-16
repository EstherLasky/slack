module.exports = new class ResponseObject {
    
    constructor(isSuccess = true, data = null ) {
        this.isSuccess = isSuccess;
        this.data = data;
    }
    
    success(data) {
        return new ResponseObject(true, data);
    }

    error(message) {
        return new ResponseObject(false, message);
    }
}
