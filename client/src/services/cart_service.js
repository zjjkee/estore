import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/mycart";

class CartService {
    get(){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.get(API_URL,
            {headers: {
                'Authorization': token,
            }}
            ) 
    }

    addtocart(product_id){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.post(API_URL,{'product_id':product_id},
        {headers: {
            'Authorization': token,
        }}
        )
    }

    changeQt(value,product_id) {
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.patch(API_URL+'/changeQt',{'value':value,'product_id':product_id},
        {headers: {
            'Authorization': token,
        },
        })
    }

    remove(product_id){
      let token = JSON.parse(localStorage.getItem("user")).token;

      return axios.delete(API_URL+'/remove',{headers: {
        'Authorization': token},
        data:{
          product_id:product_id
        }
      })
    }

    removeAll(){
      let token = JSON.parse(localStorage.getItem("user")).token;
      return axios.delete(API_URL+'/removeall',{headers: {
        'Authorization': token},
      })
    }

    

}

export default new CartService();