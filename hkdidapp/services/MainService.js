export default class MainService{
    static load(cb){
        setTimeout(cb,3000);
    }
    static login(email,password){
        return new Promise((resolve,reject) => {
            if(email == 'stevenlam123@yahoo.com.hk' && password == '12345678'){
                setTimeout(()=>{
                    resolve({
                        'token':Math.random().toString(36).substring(7)
                    });
                },2000);
            }else{
                setTimeout(()=>{
                    reject({
                        'message':'Invalid username or password'
                    });
                },2000);
            }
            
         });
    }
}