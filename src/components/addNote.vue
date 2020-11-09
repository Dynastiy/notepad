<template>
    <div class="body">
      <div v-show= "form" id="form" class="text-center">
        <h1 class="my-4">Add New Note</h1>
        <div>
          <input class="mb-5" v-model="title" type="text" name="title" id="note-title" placeholder="Enter title here"> <br/>
          <textarea v-model="content" name="content" id="note-content" cols="40" rows="8" placeholder="Type Note here"></textarea>
        </div>
        <button class="btnAdd btn-dark mt-3 px-5 py-1" @click="submitNote" id="add-note">Add Note</button>
      </div>

      <div v-show="submitted" class="text-center mt-5">
        <h1 class="submitted">Added Successfully <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> </h1>
        <router-link class="mr-4" to="/"><i class="fa fa-home mr-2" aria-hidden="true"></i>Go Home</router-link> 
        <router-link @click="addNote" to="/add"> <i class="fa fa-plus mr-2" aria-hidden="true"></i> Add Another Note</router-link>
      </div>

    </div>

</template>

<script>

import db from './../../firebaseInit.js'

export default {
    data(){
    return {
      form: true,
      submitted: false,
      title: '',
      content: '',
      notes: []
    }
  },

  methods: {
    submitNote(){
      if(this.title.length > 0 && this.content.length > 0) {
        //Add note to database
       db.collection('notes').add({
          title: this.title,
          content: this.content
        })
        .catch(error => console.log(error))

        //push note to notes array
        this.title = ''
        this.content= ''

        this.submitted = true,
        this.form = false
      }
      else{
        alert("Input Content");
      }
    },
    addNote(){
      this.submitted = false,
      this.form = true
    }
  },
}
</script>

<style scoped>
#note-title{
  width: 90% !important;
  padding: 0.3rem 0.2rem;
}
#note-content {
  width: 90% !important;
  padding: 0.3rem 0.2rem;
}
.btnAdd:hover {
  border: 1px solid #000;
  color: #000;
  background: #fff;
  transition: 2s;
}
.submitted {
  color: #175c17;
  font-size: 6rem !important;
}
</style>