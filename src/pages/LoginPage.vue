<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">Login</div>
                    <div class="card-body">
                        <form class="user" @submit.prevent="handleLogin">
                            <div class="form-group mb-3">
                                <label for="inputUsername">Username</label>
                                <input type="text" class="form-control" id="inputUsername" placeholder="Enter username" v-model="user.username">
                            </div>
                            <div class="form-group mb-3">
                                <label for="inputPassword">Password</label>
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="user.password">
                            </div>
                            <p v-if="error" style="color: red;font-size: 13px;">{{ this.error }}</p>
                            <div class="text-center">
                                <button class="btn btn-primary" style="width: 150px;">Login</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center">
                        <router-link :to="{ name: 'forgot-password' }" class="">Forgot Password?</router-link>
                        <p>Don't have an account? <router-link :to="{ name: 'register' }" class="">Register</router-link></p>
                        
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
            user: {
                "username": '',
                "password": ''
            },
            error:'',
            response: {}
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
                axios.post('http://127.0.0.1:8000/api/auth/login', this.user, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('auth', true);
                    this.$router.push("/blogs");

                }).catch((error) => {
                        console.log(error.response.data.message);
                        this.error = error.response.data.message
                    })
            }
        },
    },
};
</script>