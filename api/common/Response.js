module.exports = class Response{
    successResponse(){
        return {
            "data": {

            }
        }
    }

    errorResponse(){
        return {
            "error": {
                "code": 0,
                "message": ""
            }
        }
    }
}