<script setup lang="ts">
import Popup from '~/components/app/Popup.vue'

withDefaults(
  defineProps<{
    isVisible: boolean
    title: string
    text: string
    confirmButtonText?: string
  }>(),
  {
    confirmButtonText: 'Confirm',
  },
)

defineEmits<{
  (e: 'yes'): void
  (e: 'closeConfirmPopup'): void
}>()
</script>

<template>
  <Popup
    title="Confirm"
    :is-visible="isVisible"
    @close-popup="$emit('closeConfirmPopup')"
  >
    <div class="confirm-popup">
      <p class="confirm-text">
        {{ text }}
      </p>
      <div class="confirm-button">
        <button type="button" class="yes-button" @click="$emit('yes')">
          {{ confirmButtonText }}
        </button>
        <button type="button" class="no-button" @click="$emit('closeConfirmPopup')">
          Cancel
        </button>
      </div>
    </div>
  </Popup>
</template>

<style lang="scss" scoped>
.confirm-popup {
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 20px;

  .confirm-text {
    justify-content: center;
    margin: 1em 1.6em 0.3em;
    padding: 0;
    overflow: auto;
    color: inherit;
    font-size: 1.125em;
    font-weight: normal;
    line-height: normal;
    text-align: center;
    word-wrap: break-word;
    word-break: break-word;
    margin-bottom: 20px;
  }

  > .confirm-button {
    display: flex;
    justify-content: center;
    margin: 1.25em auto 0;

    > .yes-button,
    > .no-button {
      @apply text-white;
      border: 0;
      border-radius: 0.25rem;
      margin: 0.3125em;
      padding: 0.625em 1.1em;
      transition: box-shadow .1s;
      box-shadow: 0 0 0 3px rgba(0,0,0,0);
      font-weight: 500;
    }

    > .yes-button {
      @apply bg-primary-500;
    }

    > .no-button {
      @apply bg-[#DD3333];
    }
  }
}
</style>
