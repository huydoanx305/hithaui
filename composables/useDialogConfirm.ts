import type { AppDialogConfirm } from '~/types'

const dialogConfirm = reactive<{
  isVisible: boolean
  content?: AppDialogConfirm
  confirmStatus?: boolean
}>({
  isVisible: false,
  content: undefined,
  confirmStatus: false,
})

export function useDialogConfirm() {
  const openDialog = (dialog: AppDialogConfirm) => {
    dialogConfirm.content = dialog
    dialogConfirm.isVisible = true
    dialogConfirm.confirmStatus = undefined
  }

  const handleConfirm = () => {
    dialogConfirm.confirmStatus = true
  }

  const closeDialog = () => {
    dialogConfirm.confirmStatus = false
    dialogConfirm.isVisible = false
  }

  const confirm = (dialog: AppDialogConfirm) => {
    openDialog(dialog)
    return new Promise((resolve) => {
      watch(() => dialogConfirm.confirmStatus, () => {
        if (dialogConfirm.confirmStatus)
          resolve(true)
        else
          resolve(false)
      })
    })
  }

  return { dialogConfirm, confirm, closeDialog, handleConfirm }
}
