<template>
    <div class="container mt-3 d-flex flex-column">
        <div>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-6">
                            <h3>Update Blog</h3>
                        </div>
                        <div class="col-lg-4" style="float: right"></div>
                        <div class="col-lg-2" style="float: right">
                            <button type="button" class="btn btn-primary" @click="updateBlog()">Update Blog</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Title</label>
                          <input type="text" class="form-control" v-model="blog.title">
                        </div>
                        <div class="form-group mt-3">
                          <label for="exampleInputPassword1">Body</label>
                          <Editor v-model="blog.body" editorStyle="height: 320px" />
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import Editor from 'primevue/editor';
    import Swal from 'sweetalert2'


  
    export default {
    components:{Editor},    
    data() {
        return {
            blog:{
                'title' : '',
                'body' : ''
            }
        };
    },
    computed: {
        
    },
    created() {
        if (localStorage.getItem('token')) {
            axios.get("http://127.0.0.1:8000/api/blogs/"+  this.$route.params.blog_id ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            })
            .then((response) => {
                this.blog = response.data.data;
              });

        }
        
    },
    methods: {
             updateBlog(){
                if (localStorage.getItem('token')) {
                    if (this.blog.title != '' && this.blog.body != '') {
                        axios
                            .patch("http://127.0.0.1:8000/api/blogs/" + this.$route.params.blog_id , this.blog , {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem('token'),
                            },
                            })
                            .then((response) => {
                                Swal.fire({
                                title: 'Good Job!',
                                text: "Blog Saved successfully",
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Ok'
                                }).then((result) => {
                                if (result.isConfirmed) {
                                    this.$router.push("/blogs");  
                                }
                                })
                                          
                            });

                        }
                    }
                    
             }       
        },
    };

</script>
