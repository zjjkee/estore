import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/order";


class OrderService {

    onpapprove_save(id,amount,goods,address){

        let  token = JSON.parse(localStorage.getItem("user")).token;
        return axios.post(API_URL,
            {
                id:id,
                amount:amount,
                goods:goods,
                address:address
            }
            ,
            {headers: {
                    'Authorization': token,
                }}
            )
    }

    getorder(){
        let  token = JSON.parse(localStorage.getItem("user")).token;
        return axios.get(API_URL,
            {headers: {
                'Authorization': token,
            }})
    }



}

export default new OrderService();