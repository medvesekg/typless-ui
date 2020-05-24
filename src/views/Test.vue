<template>
  <div>
    <div>
      <label for="document-type">Select a document type</label>
      <select v-model="form.document_type_name" id="document-type">
        <option v-for="(documentType, i) in documentTypes" :key="i" :value="documentType.name">{{ documentType.name }}</option>
      </select>
    </div>
    <div>
      <label for="fileInput">Upload file</label>
      <input ref="fileInput" id="fileInput" type="file">
    </div>
    <div>
      <button @click="extractData">Submit</button>
    </div>
    <div v-if="extractedFields.length">
      <h3>Extracted fields</h3>
      <table style="margin:auto">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(field, i) in extractedFields" :key="i">
            <td>{{ field.name }}</td>
            <td>{{ field.values[0].value }}</td>
            <td>{{ field.values[0].confidence_score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="data">
      <h3>Data</h3>
      <pre style="text-align:left">
        {{ JSON.stringify(data, null, 2) }}
      </pre>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import DocumentType from '@/models/DocumentType'

export default {

  data() {
    return {
      data: null,
      documentTypes: [],
      extractedFields: [],
      form: {
        document_type_name: null
      },
    }
  },

  created() {
    DocumentType.all().then(documentTypes => {
      this.documentTypes = documentTypes
    })
  },

  methods: {
    extractData() {
      let file = this.$refs.fileInput.files[0]
      let data = new FormData()
      data.set('file', file)
      data.set('document_type_name', this.form.document_type_name)
      api.post('document-types/extract-data', data).then(res => {
        this.data = res.data
        this.extractedFields = res.data.extracted_fields
      })
    }
  }
}
</script>

<style>

</style>