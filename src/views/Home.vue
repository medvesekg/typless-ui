<template>
  <div class="home">
    <h3>Document types</h3>
    <ul>
      <li v-for="(documentType, i) in documentTypes" :key="i">
        <router-link :to="`document-types/${documentType.id}`">{{ documentType.name }}</router-link>
      </li>
    </ul>
    <h3>Add document type</h3>
    <form>
      <div>
        <div>
        <label for="document-type-name">Document Type Name</label>
        </div>
        <input v-model="form.name" type="text" id="document-type-name">
      </div>
      <div>Fields</div>
      <div v-for="(field, i) in form.fields" :key="i">
        <label :for="`field-${i}-name`">Name</label>
        <input v-model="field.name" type="text" :id="`field-${i}-name`">
        <label :for="`field-${i}-type`">Type</label>
        <select v-model="field.type" :id="`field-${i}-type`">
          <option value="AUTHOR">Author</option>
          <option value="STRING">String</option>
          <option value="DATE">Date</option>
          <option value="NUMBER">Number</option>
        </select>
        <button @click="deleteField(i)">X</button>
      </div>
      <div>
        <button @click="addField">+</button>
      </div>
      <div>
        <button @click="createDocumentType">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import DocumentType from '@/models/DocumentType'

export default {
  name: 'Home',

  data() {
    return {
      documentTypes: [],

      form: {
        name: '',
        fields: []
      }
    }
  },

  created() {
    DocumentType.all().then(documentTypes => {
      this.documentTypes = documentTypes
    })
  },

  methods: {
    addField() {
      this.form.fields.push(this.defaultField())
    },
    defaultField() {
      return {
        type: '',
        name: ''
      }
    },
    deleteField(i) {
      this.form.fields.splice(i, 1)
    },
    createDocumentType() {
      DocumentType.create(this.form).then(documentType => {
        this.documentTypes.push(documentType)
        this.resetForm()
      })
    },
    resetForm() {
      this.form = {
        name: '',
        fields: []
      }
    },
  }
}
</script>
