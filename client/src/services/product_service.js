import axios from "axios";
const API_URL = "http://localhost:8080/api/products";

class ProductService {

    upload(data, title,price,category,description){
        let token;
        if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
        } else {
          token = "";
        }
        return axios.post(API_URL,data,
            {headers: {
                    'Authorization': token,
                    'Content-Type' : 'multipart/form-data'
                }}
            )
    }

    allproduct() {
      return axios.get( "http://localhost:8080/api/allproducts"
      )
    }

    myproduct(){
      let token;
      if (localStorage.getItem("user")) {
        token = JSON.parse(localStorage.getItem("user")).token;
      } else {
        token = "";
      }
      return axios.get(API_URL+'/myproducts',
        {headers: {
                'Authorization': token,
            }}
        )
    }
    deleteproduct(_id){
      let token = JSON.parse(localStorage.getItem("user")).token;
      return axios.delete(API_URL+'/deleteproduct/'+String(_id),
      {headers: {
        'Authorization': token,
      },
      }
      )   
}

}

export default new ProductService();