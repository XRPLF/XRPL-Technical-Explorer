<template>
  <main class="container px-3">
    <h4 class="nes blue">Hi!</h4>
    <code class="text-primary nes">Work in progress, EARLY BETA ;)</code>
    <div class="mt-4">
      Early (technical, geeky) beta of a new (technical) tx / ledger / object / hash explorer. Lots to do,
      but the beginning is here.
    </div>
    <div class="mt-4">
      <div class="alert alert-success shadow-sm">
        You can view (JSON, technical (!) explorer) ledgers, transactions,
        meta, etc. and <b>click through, on ledger numbers, hashes, transaction hashes, accounts</b>, etc.
      </div>
    </div>
    <div class="mt-4">
      Click a ledger or search for something (account, hash, ...)
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>
