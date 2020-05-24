<template>
  <div v-if="documentType">
    <h3>{{ documentType.name }}</h3>
    <h3>Fields</h3>
    <table style="margin:auto">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, i) in documentType.fields" :key="i">
          <td>{{ field.name }}</td>
          <td>{{ field.type }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="deleteDocumentType">Delete this document type</button>
  </div>
</template>

<script>
import api from '@/api'


export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      documentType: null
    }
  },

  created() {
    api.get(`document-types/${this.id}`).then(res => {
      this.documentType = res.data
    })
  },

  methods: {
    deleteDocumentType() {
      api.delete(`document-types/${this.id}`).then(() => {
        this.$router.push('/')
      })
    },
  }
}
</script>

<style>

</style>