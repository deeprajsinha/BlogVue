<template>
    <div class="container-fluid d-flex flex-column">
        <div>
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <div class="row">
                        <div class="col-lg-6">
                            <h3>Blog List for Guest user</h3> <h5><router-link :to="{ name: 'login' }" class="">Already have an account? Login to see your blogs</router-link></h5>
                        </div>
                        <div class="col-lg-4" style="float: right"></div>
                        
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8 offset-md-2">
                            <table id="myTable" class="table" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Body</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="blog in blogs" :key="blog.id">
                                        <td>{{blog.title}}</td>
                                        <td v-html="blog.body"></td>
                                        <td v-if="!blog.status">
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
        
                        </div>
                    </div>
  
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import axios from "axios";
    import DataTable from 'datatables.net-dt';
    import Swal from 'sweetalert2'

  
    export default {
    data() {
        return {
            blogs:{},
            auth : ''
        };
    },
    computed: {
        strippedHtml() {
        let regex = /(<([^>]+)>)/ig;
        
	    return this.comment.content.rendered.replace(regex, "");
    }
    },
    created() {

        if(localStorage.getItem('auth')){
            this.$router.push("/blogs");
        }
console.log('dddddddd');
            axios
            .get("http://127.0.0.1:8000/api/blog-list" ,{
            headers: {
                "Content-Type": "application/json",
                
            },
            })
            .then((response) => {
            this.blogs = response.data.data;
            this.getAllBlogs();                    
              });

        
    },
    methods: {
        getAllBlogs(){
		this.$nextTick(() => {
			var self = this
			
            let table1 = new DataTable('#myTable')
			table1.destroy();

			let table = new DataTable('#myTable',{
				"lengthChange": true,
				"searching" : true,
				"columns": [{
						"orderable": false,
					},
					{
						"orderable": false,
					},
					
					
				]
			});
		}, {immediate: true});
	},
    deleteBlog(id){
        if (localStorage.getItem('token')) {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    axios
                    .delete("http://127.0.0.1:8000/api/blogs/" + id ,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                    },
                    })
                    .then((response) => {
                        Swal.fire('Saved!', '', 'success')
                        location.reload()
                    });

                } else if (result.isDenied) {
                    Swal.fire('Blog not deleted', '', 'info')
                }
                })



        }
    }
            
    },
    };

</script>
<style>
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #0f9703;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #108305;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
</style>