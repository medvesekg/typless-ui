import api from '@/api'

export default {

  all() {
    return api.get('document-types').then(res => {
      let documentTypes = res.data.results
      documentTypes.forEach(documentType => this.equipDocumentTypeWithId(documentType))
      return documentTypes
    })
  },

  get(id) {
    api.get(`document-types/${id}`).then(res => {
      return res.data
    })
  },

  create(params) {
    return api.post('document-types', params).then(res => {
      let documentType = res.data
      this.equipDocumentTypeWithId(documentType)
      return documentType
    })
  },

  getDocumentTypeId(documentType) {
    let parts = documentType.url.split('/')
    let id = parts[parts.length-2]
    return id
  },

  equipDocumentTypeWithId(documentType) {
    documentType.id = this.getDocumentTypeId(documentType)
    return documentType
  }

}