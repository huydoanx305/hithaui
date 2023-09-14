export const useFormsStore = defineStore('forms', () => {
  const { $api } = useNuxtApp()
  const forms = ref<Form[]>([])

  const authStore = useAuthStore()
  const { accessToken } = storeToRefs(authStore)

  const fetchForms = async () => {
    const response = await $api<Form[]>('/api/v1/forms', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })

    forms.value = response
  }

  return { forms, fetchForms }
})
