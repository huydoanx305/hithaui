<script lang="ts" setup>
definePageMeta({
  middleware: 'permission',
})

const formsStore = useFormsStore()
const { forms } = storeToRefs(formsStore)

onMounted(async () => {
  await formsStore.fetchForms()
})
</script>

<template>
  <div class="forms-page">
    <header class="form-header">
      <h2 class="title">
        Ours Event Registration Forms
      </h2>
      <p class="description">
        List of forms of the great HIT family through generations until now!
      </p>
    </header>
    <section class="forms-list">
      <FormsList :forms="forms" />
    </section>
    <footer class="form-footer">
      <p class="showing-form">
        Showing <span class="label"> {{ forms?.length || 0 }}</span> of
        <span class="value">{{ forms.length }}</span>
      </p>
      <p class="total-form">
        <span class="label">Total forms: </span>
        <span class="value">{{ forms.length }}</span>
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.forms-page {
  > .form-header {
    @apply px-4 pt-4 pb-8;

    > .title {
      @apply text-lg font-semibold text-left text-gray-900;
    }
    > .description {
      @apply mt-1 text-sm font-normal text-gray-500;
    }
  }
  > .form-footer {
    @apply flex flex-row items-center justify-between p-4 font-normal;

    > .showing-form,
    > .total-form {
      @apply text-sm text-gray-500;
    }

    > .showing-form > .value,
    > .total-form > .value {
      @apply text-gray-900;
    }

    > .showing-form > .label {
      @apply font-semibold text-gray-900;
    }
  }
}
</style>
