import axios from 'axios'
import * as moment from "moment";
export default {
    //API_URL : "http://localhost:4000/",
    API_URL : "https://node-test-app-v1.herokuapp.com/",
    proxyurl : "https://cors-anywhere.herokuapp.com/",
    header:{
        "token": localStorage.getItem("token"),
        "_id": localStorage.getItem("_id"), 
    },
    loginUser(data) {
        return axios.post(this.API_URL+'login',data).then(res => res.data);
    },
    addBook(data) {
        return axios.post(this.API_URL+'book',data,{headers:this.header}).then(res => res.data);
    },
    updateBook(data) {
        return axios.put(this.API_URL+'book/'+data._id,data,{headers:this.header}).then(res => res.data);
    },
    getBooks(page,pageSize) {
        return axios.get(this.API_URL+'book?itemPerPage='+pageSize+'&page='+page,{headers:this.header}).then(res => res.data);
    },
    deleteBook(id) {
        return axios.delete(this.API_URL+'book/'+id,{headers:this.header}).then(res => res.data);
    },
    getTeachers(page,pageSize) {
        return axios.get(this.API_URL+'teacher?itemPerPage='+pageSize+'&page='+page,{headers:this.header}).then(res => res.data);
    },
    addTeacher(data) {
        return axios.post(this.API_URL+'teacher',data,{headers:this.header}).then(res => res.data);
    },
    updateTeacher(data) {
        return axios.put(this.API_URL+'teacher/'+data._id,data,{headers:this.header}).then(res => res.data);
    },
    deleteTeacher(id) {
        return axios.delete(this.API_URL+'teacher/'+id,{headers:this.header}).then(res => res.data);
    },
    format_date(value) {
        if (value) {
          return moment().format("yyyy-MM-DD");
        }
      },
}
