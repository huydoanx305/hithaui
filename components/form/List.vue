<script setup lang="ts">
import ConfirmPopup from '~/components/app/ConfirmPopup.vue'
import ToggleSwitch from '~/components/app/ToggleSwitch.vue'
import type { Form, UpdateForm } from '~/types'

const props = defineProps<{
  forms: Form[]
}>()
const { formTableColumns } = useForms()
const formsStore = useFormsStore()

const isVisibleConfirmPopup = ref(true)

function openConfirmPopup() {
  isVisibleConfirmPopup.value = true
}

function closeConfirmPopup() {
  isVisibleConfirmPopup.value = false
}

async function activeUnactiveForm(formId: number, isActive: boolean) {
  const formUpdate = props.forms.find(form => form.id === formId)
  const formUpdateDto = {
    isActive,
  } as UpdateForm

  if (formUpdate) {
    await formsStore.updateForm(formUpdate.id, formUpdateDto)
    useNotification({
      message: isActive ? 'Active form successfully' : 'Unactive form successfully',
      type: 'success',
    })
  }
  else {
    useNotification({
      message: 'Form not found!',
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="form-list">
    <table class="form-table">
      <thead class="table-head">
        <tr class="row">
          <th v-for="{ value, label } in formTableColumns" :key="value" class="cell" :class="`-${value}`">
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="form in forms" :key="form.id" class="row">
          <td class="cell -name">
            {{ form.name }}
          </td>
          <td class="cell -eventName">
            {{ form.event.name }}
          </td>
          <td class="cell -status">
            <ToggleSwitch v-model="form.isActive" label="ON|OFF" @click="() => isVisibleConfirmPopup = true" />
          </td>
          <td class="cell -createdAt">
            {{ formatDate(form.createdAt) }}
          </td>
          <td class="cell -updatedAt">
            {{ formatDate(form.updatedAt) }}
          </td>
          <td class="cell -action">
            <Icon size="15" name="uil:eye" class="-detail" /> |
            <Icon size="15" name="uil:edit" class="-edit" /> |
            <Icon size="15" name="uil:trash" class="-delete" />
          </td>
        </tr>
      </tbody>
    </table>
    <ConfirmPopup
      title="Confirm Active form"
      text="You won't be able to revert this!"
      :is-visible="isVisibleConfirmPopup"
      @close-confirm-popup="closeConfirmPopup"
    />
  </div>
  <div>Hello</div>
</template>

<style scoped lang="scss">
.form-list {
  > .form-table {
    @apply w-full text-sm text-left text-gray-700;
  }

  > .form-table > .table-head {
    @apply text-xs text-gray-700 uppercase bg-gray-100;
  }

  > .form-table > .table-body>.row {
    @apply bg-white border-b hover:bg-gray-50;
  }

  > .form-table > .table-head > .row > .cell,
  > .form-table > .table-body > .row > .cell {
    @apply px-6 py-4;

    &.-action {
      @apply text-right;
    }
  }

  > .form-table > .table-body > .row > .cell.-name {
    @apply min-w-[300px] font-semibold;
  }

  > .form-table > .table-body > .row > .cell.-eventName {
    @apply min-w-[200px];
  }

  > .form-table > .table-body > .row > .cell.-createdAt,
  > .form-table > .table-body > .row > .cell.-updatedAt {
    @apply min-w-[120px];
  }

  > .form-table > .table-body > .row > .cell.-action {
    @apply min-w-[120px];

    > .-detail {
      @apply text-blue-500 cursor-pointer;
    }

    > .-edit {
      @apply text-primary-500 cursor-pointer;
    }

    > .-delete {
      @apply text-red-500 cursor-pointer;
    }
  }
}
</style>
