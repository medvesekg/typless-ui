<template>
  <div>
    <label for="document-type">Document Type To Train</label>
    <select v-model="form.document_type_name" id="document-type">
      <option v-for="(documentType, i) in documentTypes" :key="i" :value="documentType.name">{{ documentType.name }}</option>
    </select>
    <div v-if="form.document_type_name">
      <div>
        <label for="fileInput">Upload File</label>
        <input ref="fileInput" id="fileInput" type="file">
      </div>
      <h3>Training data</h3>
      <table style="margin:auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field,i) in form.learning_fields" :key="i">
            <td>
              <label :for="`field${i}`">{{ field.name }}</label>
            </td>
            <td>
              <input v-model="field.value" :id="`field${i}`" type="text">
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button @click="submitToTraining">Submit</button>
      </div>
      <div v-if="response">
         {{ response }}
      </div>
    </div>
  </div>
</template>

<script>
import DocumentType from '@/models/DocumentType'
import api from '@/api'

export default {
  data() {
    return {
      documentTypes: [],
      response: null,
      form: {
        document_type_name: null,
        learning_fields: []
      }
    }
  },

  watch: {
    'form.document_type_name': {
      handler: function(newDocumentTypeName) {
        let newDocumentType = this.documentTypes.find(documentType => documentType.name === newDocumentTypeName)
        this.form.learning_fields = newDocumentType.fields.map(field => {
          return  {
            name: field.name,
            value: ''
          }
        })
      }
    } 
  },

  created() {
    DocumentType.all().then(documentTypes => {
      this.documentTypes = documentTypes
    })
  },

  methods: {
    submitToTraining() {
      this.response = null
      let file = this.$refs.fileInput.files[0]
      let data = new FormData()
      data.set('document_type_name', this.form.document_type_name)
      data.set('learning_fields', JSON.stringify(this.form.learning_fields))
      data.set('file', file)

      api.post('document-types/learn', data).then(res => {
        this.response = res.data
      })
    }
  }

  
}
</script>

<style>

</style>