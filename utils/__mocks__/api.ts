import { NuxtAxiosInstance } from '@nuxtjs/axios'
import nuxtPluginAxios from '~/.nuxt/axios'

// eslint-disable-next-line import/no-mutable-exports
let $axios: NuxtAxiosInstance

nuxtPluginAxios({}, (_: string, axios: NuxtAxiosInstance) => {
  $axios = axios
})

export { $axios }
