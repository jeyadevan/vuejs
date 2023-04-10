<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Enter the title" v-model="title" /> 
            
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" @click="searchTitle" type="button">Search</button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Tutorial List</h4>
            <ul class="list-group">
                <li class="lit-group-item" :class="{active: index == currentIndex}" v-for="(tutorial, index) in tutorials" :key="index" @click="setActiveTutorial(tutorial,index)">
                    {{ tutorial.title }}
                </li>
            </ul>
            <button class="m-3 btn btn-sm btn-danger d-none" @click="removeAllTutorials">Remove All</button>
        </div>
        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Tutorial</h4>
                <div>
                    <label for="">
                        <strong>Title:</strong>
                    </label>
                    {{ currentTutorial.title }}
                </div>
                <div>
                    <label for="">
                        <strong>
                            Description:
                        </strong>
                    </label>
                    {{ currentTutorial.description }}
                </div>
                <div>
                    <label for="">
                        <strong>
                            Status:
                        </strong>
                    </label>
                    {{ currentTutorial.published ? "Published" : "Pending" }}
                </div>

                <router-link :to="'/tutorials/'+currentTutorial.id" class="badge badge-warning">Edit</router-link>
            </div>

            <div v-else>
                <p>Please click on a tutorial...</p>
            </div>
        </div>
    </div>
</template>
<script>
import TutorialDataService from '../services/TutorialDataService';
export default {
    name: 'tutorial-list',
    data(){
        return {
            tutorials:[],
            currentTutorial: null,
            currentIndex: -1,
            title:""
        };
    },
    methods:{
        retrieveTutorials(){
            TutorialDataService.getAll()
            .then(response => {
                this.tutorials = response.data;
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        },
        refreshList(){
            this.retrieveTutorials();
            this.currentIndex = -1;
            this.currentTutorial = null;
        },
        setActiveTutorial(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = tutorial ? index : -1;
        },
        removeAllTutorials(){
            TutorialDataService.deleteAll()
            .then(response => {
                this.refreshList();
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        searchTitle(){
            TutorialDataService.findByTitle(this.title)
            .then(response =>{
                this.tutorials = response.data;
                this.setActiveTutorials();
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    mounted(){
        this.retrieveTutorials();
    }
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>