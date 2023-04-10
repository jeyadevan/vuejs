<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">
          Title
        </label>
        <input type="text" class="form-control"
        id="title" name="title" placeholder="Enter title" required
        v-model="tutorial.title" />
      </div>

      <div class="form-group">
        <label for="description">
          Description
        </label>
        <input type="text" class="form-control"
        id="description" name="description" placeholder="Enter description" required
        v-model="tutorial.description" />
      </div>
      <button @click="saveTutorial" class="btn btn-primary">Submit</button>
    </div>

    <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script>
  import TutorialDataService from '../services/TutorialDataService';

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: '',
        description: "",
        published: false,
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      const data = {
        title: this.tutorial.title,
        description: this.tutorial.description
      };

      TutorialDataService.create(data)
      .then(response =>{
        this.tutorial.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      })
      .catch(error =>{
        console.log(error);
      })
    },

    newTutorial(){
      this.submitted = false;
      this.tutorial = {};
    }
  }
}
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.form-group{
  text-align: left;
}
</style>