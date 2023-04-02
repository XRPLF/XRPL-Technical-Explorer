<template>
  <div class="container">
    <span style="margin-right:10px;">{{ title }}</span>
    <button class="action" @click.stop="clicked">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  props: ['title', 'buttonText'],
  methods: {
    clicked () {
      this.$emit('clicked')
    }
  }
}
</script>
