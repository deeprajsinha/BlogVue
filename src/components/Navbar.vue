<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container-fluid py-2">
            <a href="#" class="navbar-brand">
                <!-- <span>Toedoe</span> -->
                <strong>Blogs</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary ms-2">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'register' }" class="btn btn-danger ms-2">Register</router-link>
                    </li>
                    <li class="nav-item">
                        <a @click="handleLogout" class="btn btn-outline-secondary ms-2">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import api from "../http/auth";
import axios from "axios";
import Swal from 'sweetalert2'


export default {
    data() {
        return {
            auth: ''
        };
    },
    computed: {

    },
    created() {
        this.auth = localStorage.getItem('auth');

    },
    methods: {
        handleLogout() {
                  
               
            Swal.fire({
                    title: 'See you soon!',
                    text: "Logout successfully",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('auth');
                        this.$router.push("/");  
                    }
                    })
            
            axios.post('http://127.0.0.1:8000/api/auth/logout', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                    },
                }).then((response) => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('auth');
                    this.$router.push("/");

                })
        },
    },
};
</script>

<style scoped>
.nav-link.router-link-active {
    color: rgba(0,0,0,.9);
}
</style>
