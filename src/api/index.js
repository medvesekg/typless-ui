import axios from 'axios'
import store from '@/store'

const client = axios.create({
  headers: {
    Authorization: `Token ${process.env.VUE_APP_API_KEY}`,
  },
  baseURL: process.env.VUE_APP_ENDPOINT,
})

client.interceptors.request.use((config) => {
  store.commit('SET_ERROR_MESSAGE', null)

  if (!config.url.endsWith('/')) {
    config.url += '/';
  }
  return config;
});

client.interceptors.response.use(response => response, error => {
  if(error.response && error.response.data) {
    store.commit('SET_ERROR_MESSAGE', error.response.data)
  }
  throw error
})

export default client