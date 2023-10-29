<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form class="user" @submit.prevent="handleLogin">
                            <div class="form-group">
                                <label for="inputEmail">Email</label>
                                <input type="text" class="form-control" id="inputEmail" placeholder="Enter email" v-model="user.username">
                            </div>
                            <div class="form-group">
                                <label for="inputPassword">Password</label>
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="user.password">
                            </div>
                           
                            <button class="btn btn-primary mt-3" style="margin-left:34rem" >Login</button>
                        </form>
                    </div>
                    <div class="card-footer">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "../http/auth";
import axios from "axios";

export default {
//   name: "Login",
  data() {
    return {
        user:{
            "username":'',
            "password":''
        },
        response:{}
    };
  },
  computed: {
    
  },
  created() {

    
  },
  methods: {
    handleLogin() {
        if (this.user.username && this.user.password) {
            
            // this.data = api.post('auth/login', this.user);
            axios.post('http://127.0.0.1:8000/api/auth/login', this.user ,{
            headers: {
                "Content-Type": "application/json",
            },
            }).then((response) => {
                localStorage.setItem('token', response.data.token);
                this.$router.push("/blogs");

            })
        }
    },
  },
};
</script>