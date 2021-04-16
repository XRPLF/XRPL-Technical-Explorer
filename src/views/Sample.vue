<template>
  <div class="container">
    <div class="row">
      <div class="col-12">

        <span class="nes-text is-primary">Primary</span>
        <span class="nes-text is-success">Success</span>
        <span class="nes-text is-warning">Warning</span>
        <span class="nes-text is-error">Error</span>
        <span class="nes-text is-disabled">Disabled</span>

        <br /><br />

        <pre>{"command":"server_info"}</pre>

      </div>
      <div class="col-6">

        <label for="textarea_field">Textarea</label>
        <textarea id="textarea_field" class="nes-textarea"></textarea>

      </div>
      <div class="col-6">

        <button class="mb-2 nes-btn is-primary">Primary</button>
        <button class="mb-2 nes-btn is-success">Success</button>

      </div>
      <div class="col-12">

        <div class="mb-2 nes-container with-title is-centered">
          <p class="title">Container.is-centered</p>
          <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
        </div>

        <div class="mb-2 nes-container is-dark with-title">
          <p class="title">Container.is-dark</p>
          <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
        </div>

        <div class="mb-2 nes-container alert-danger with-title is-centered">
          <p class="title bg-danger text-white">Container.is-dark</p>
          <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sample',
  components: {
  }
}
</script>

<style lang="scss" scoped>
</style>
