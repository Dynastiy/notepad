<template>
  <div>
    <div class="jumbotron text-center">
      <h1 class="display-3 font-weight-medium">Word-Dy</h1>
      <p class="lead">A compedium of spoken word pieces and messages</p>
      <hr class="">
      <p class="lead">
        <router-link to="/add" class="btn btn-primary btnNote btn-sm" href="Jumbo action link" role="button">Add New</router-link>
      </p>
    </div>
    <div class="container-fluid mb-3">
      <div class="item mb-3 p-3" :key = "index" v-for= "(note, index) in notes">
        <h1 class="title-display"> {{note.title}} </h1>
          <p> {{note.content}} </p>
          <div class="text-right">
            <button class="btn btn-danger" @click="deleteNote(note.title)"><i class="fa fa-trash" aria-hidden="true"></i> </button>
          </div>
          
      </div>
    </div>
  </div>
</template>

<script>

import db from './../../firebaseInit.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      title: '',
      content: '',
      notes: []
    }
  },
    //To view notes
  mounted(){
      db.collection('notes').get().then(query => {
        query.forEach(doc => {
          const dbNote = {
            title: doc.data().title,
            content: doc.data().content
          }
          this.notes.push(dbNote)
        })
      })
    },


//To delete Note
  methods: {
    deleteNote(title) {
      let docToDeleteId = ''
      this.notes = this.notes.filter(note => {
        return note.title !== title
      })
      db.collection('notes').where("title", "==", title).get().then(query => {
        query.docs.map(doc => {
          docToDeleteId = doc.id;
        })
        db.collection('notes').doc(docToDeleteId).delete()
      })
    }

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  margin: 0 !important;
}
.item {
  border: 1px solid #999999 !important;
}
.btnNote {
  border-radius: 0 !important;
  background: #000;
  padding: 0.3rem 3rem;
}
.btnNote:hover {
  background: #fff;
  color: #000;
  border: 1px solid #000;
  transition: 2s;
}

</style>
