import axios from 'axios'

export default {
    //API_URL : "http://localhost:4000/",
    API_URL : "https://secure-dawn-02653.herokuapp.com/",
    proxyurl : "https://cors-anywhere.herokuapp.com/",

    header:{
        "token": localStorage.getItem("token"),
        "_id": localStorage.getItem("_id"), 
    },
    loginUser(data) {
        return axios.post(this.API_URL+'login',data).then(res => res.data);
    },
    signUpUser(data) {
        return axios.post(this.API_URL+'createUser',data).then(res => res.data);
    },
    oneUser() {
        return axios.get(this.API_URL+'oneUser',{headers:this.header}).then(res => res.data);
    },
    getCountries() {
        return axios.get('assets/layout/data/countries.json').then(res => res.data.data);
    }
}
