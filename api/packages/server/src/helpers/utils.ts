class JsonResponse{
    private message = '';
    private data = [];
    private errors = [];
    constructor(message = 'success',data = [],errors = []){
        this.message = message;
        this.data = data;
        this.errors = errors
    }
    setMessage(message){
        this.message = message;
        return this;
    }
    setData(data){
        this.data = data;
        return this;
    }
    setErrors(errors){
        this.errors = errors;
        return this;
    }
    getResponse(){
        const response = {
            message:this.message,
            data:this.data,
            errors:this.errors
        };
        return response;    
    }
}
export  {JsonResponse};
