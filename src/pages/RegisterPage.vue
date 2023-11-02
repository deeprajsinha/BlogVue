<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">Register</div>
                    <div class="card-body">
                        <form class="user" @submit.prevent="handleLogin">
                            <div class="form-group mb-3">
                                <label for="inputUsername">Username</label>
                                <input type="text" class="form-control" id="inputUsername" placeholder="Enter username" v-model="user.username">
                            </div>
                            <div class="form-group mb-3">
                                <label for="inputEmail">Email</label>
                                <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="user.email">
                            </div>
                            <div class="form-group mb-3">
                                <label for="inputPassword">Password</label>
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="user.password">
                            </div>
                            <div class="form-group mb-3">
                                <label for="inputPassword">Confirm Password</label>
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="user.password_confirmation">
                            </div>
                            <p v-if="error" style="color: red;font-size: 13px;">{{ this.error }}</p>
                            <div class="text-center">
                                <button class="btn btn-primary" style="width: 150px;">Register</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center">
                    <router-link :to="{ name: 'login' }" class="">Already have an account? Login</router-link>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import api from "../http/auth";
import axios from "axios";
import Swal from 'sweetalert2'


export default {
    //   name: "Login",
    data() {
        return {
            user: {
                "username": '',
                "password": '',
                "email":'',
                "password_confirmation" : ''
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
                axios.post('http://127.0.0.1:8000/api/auth/register', this.user, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    Swal.fire({
                                title: 'Good Job!',
                                text: "User registered successfully",
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Ok'
                                }).then((result) => {
                                if (result.isConfirmed) {
                                    this.$router.push("/");  
                                }
                                })

                }).catch((error) => {
                        console.log(error.response.data.message);
                        this.error = error.response.data.message
                    })
            }
        },
    },
};
</script>