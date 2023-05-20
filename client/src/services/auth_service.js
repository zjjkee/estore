import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
    test(){
        return  axios.get(API_URL+"/test")
    }
    signin(email_or_username, password){
        return axios.post(API_URL + "/signin", { email_or_username, password });
    }

    signout() {
    localStorage.removeItem("user");
    }
    
    signup(username,email,password,role){
        return axios.post(API_URL+"/signup",{
            username:username,
            email:email,
            password:password,
            role:role
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
      }
}

export default new AuthService();