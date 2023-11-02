<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header text-center">Forgot Password</div>
            <div class="card-body">
              <form @submit.prevent="resetPassword">
                <div class="form-group mb-3">
                  <label for="inputEmail">Email Address</label>
                  <input type="email" class="form-control" id="inputEmail" placeholder="Enter your email" v-model="user.email">
                  <p v-if="error" style="color: red;font-size: 13px;">{{ this.error }}</p>
                </div>
                <div class="text-center">
                  <button class="btn btn-primary" @click="handleLogin" style="width: 150px;">Reset Password</button>
                </div>
              </form>
            </div>
            <div class="card-footer text-center">
                <router-link :to="{ name: 'login' }" class="">Remember your password? Login</router-link>

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
                    "email": '',
                    
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
                if (this.user.email) {

                    // this.data = api.post('auth/login', this.user);
                    axios.post('http://127.0.0.1:8000/api/auth/forgot-password', this.user, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((response) => {
                        Swal.fire({
                                title: 'Good Job!',
                                text: "Password reset mail has been sent successfully",
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