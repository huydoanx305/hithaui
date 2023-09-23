<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', answer: boolean): void
}>()

const curValue = ref<boolean>(props.modelValue)

const getIsActive = computed(() => curValue.value ? '-active' : '')

const getLabel = computed(() => {
  if (props.label) {
    const labels = props.label.split('|')
    const newLabel = labels[curValue.value ? 0 : 1]
    return newLabel || ''
  }
  return ''
})

const getMaxLabel = computed(() => {
  let maxLabel = ''
  if (props.label) {
    const labels = props.label.split('|')
    labels.forEach((x) => {
      if (maxLabel.length < x.length)
        maxLabel = x
    })
  }
  return maxLabel
})

function toggleState() {
  curValue.value = !curValue.value
  emit('update:modelValue', curValue.value)
}
</script>

<template>
  <div class="toggle-switch" :class="getIsActive" @click="toggleState">
    <span class="label">{{ getLabel }}</span>
    <span class="maxlabel">{{ getMaxLabel }}</span>
    <div class="knob" />
  </div>
</template>

<style scoped lang="scss">
.toggle-switch {
  @apply inline-block bg-gray-700 text-white text-[12px] min-w-[50px] h-[25px] pl-[12px] pr-[8px] py-[2px] border-solid border-black rounded-[20px] relative transition-all duration-200 ease-in-out cursor-pointer select-none;

  &.-active {
    @apply text-left bg-primary-500 text-white;

    > .knob {
      @apply left-[calc(100%-23px)]
    }

    > .label {
      @apply ml-0 mr-[20px];
    }
  }

  > .label {
    @apply ml-[20px] mr-0 inline-block absolute opacity-100;
  }

  > .maxlabel {
    @apply ml-[20px] mr-0 opacity-0;
  }

  > .knob {
    @apply inline-block bg-white w-[20px] h-[20px] border-solid border-black rounded-[10px] absolute left-[calc(0%--3px)] top-[2.5px] transition-all duration-300 ease-in-out;
  }
}
</style>
