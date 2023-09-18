import type { Page } from '~/types'
import { PAGE_PERMISSION } from '~/constants/permissions'

export function usePermission(page: Page) {
  const currentPage = ref(page)

  const authStore = useAuthStore()
  const { userRoles } = storeToRefs(authStore)

  const isAccessible = computed(() => {
    return PAGE_PERMISSION[currentPage.value]
      ? PAGE_PERMISSION[currentPage.value]?.some((roleId: number) => {
        return userRoles.value.includes(roleId)
      },
      )
      : true
  })

  return { isAccessible }
}
