<template>
  <main class="container-fluid pb-5">
    <div class="row">
      <div class="col-9">
        <div v-if="possibleCommands.length > 0">
          <h4 class="nes blue">Custom Payload</h4>
          <code class="text-primary nes">Pick one</code>
          <p class="pt-3">
            Which one are you looking for?
          </p>
          <ul class="list-unstyled">
            <li v-for="entry in possibleCommands" v-bind:key="entry">
              <router-link :to="'/' + entry" class="nes-btn py-0 mb-3 nes is-warning">{{ entry }}</router-link>
            </li>
          </ul>
        </div>
        <div v-else>
          <h4 class="nes blue">
            <a class="nes-btn is-warning float-end btn-sm py-1" :href="'https://docs.xumm.dev/'" target="_blank"><i style="position: relative; top: -2px;" class="fas fa-external-link-alt me-2"></i><code class="d-none text-primary pe-2">Custom Payload</code>Docs</a>
          </h4>
          <code class="text-primary nes">Xumm Payload</code>
          <div class="mt-3">
            <div class="rounded" style="overflow: hidden;">
              <codemirror v-model="command" :options="cmOptions"></codemirror>
            </div>
            <div class="d-block text-end">
              <button @click="get()" :disabled="loading" :class="{ 'is-success': !loading, 'is-disabled': loading }" class="mt-3 nes-btn nes"><i class="fas fa-rocket-launch me-2" style="position: relative; top: -3px"></i>Execute</button>
            </div>
            <div class="mt-2">
              <Loading v-if="loading" />
              <div :class="{ 'border-danger': errorResponse }" class="card mt-4 shadow-sm" v-if="!loading && Object.keys(data).length > 0">
                <h5 :class="{ 'bg-danger text-white': errorResponse }" class="card-header nes h6">{{ errorResponse ? 'Error' : 'Results' }}</h5>
                <div class="card-body" style="overflow-x: auto;">
                  <JsonRenderer :data="data" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 d-flex justify-content-center align-items-center">
        <img :src="imageUrl" />
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.scrollable-section {
  max-height: 100vh; /* Adjust this value according to your needs */
  overflow-y: auto;
}
</style>
<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import Loading from '../components/Loading.vue'
import { groupedCommands } from '../plugins/commands'

import 'codemirror/lib/codemirror.css'
import JsonRenderer from '../components/JsonRenderer.vue'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/lint/lint.css'

import jsonlint from 'jsonlint-mod'

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/json-lint.js'
import 'codemirror/keymap/sublime.js'

window.jsonlint = jsonlint

export default {
  name: 'CustomCommand',
  components: {
    codemirror,
    JsonRenderer,
    Loading
  },
  data () {
    return {
      command: '',
      cmOptions: {
        tabSize: 2,
        mode: 'application/json',
        theme: 'monokai',
        lineNumbers: true,
        line: true,
        keymap: 'sublime',
        lineWrapping: false,
        lint: true
      },
      loading: false,
      imageUrl: null,
      data: {},
      errorResponse: false,
      groupedCommands: groupedCommands
    }
  },
  computed: {
    paramToTemplate () {
      return this.$route.meta?.replaceProp && this.$route.meta?.replaceParam && this.$route.params?.[this.$route.meta.replaceParam]
    },
    possibleCommands () {
      if (this.$route?.query?.c) {
        return this.$router.options.routes.filter(r => {
          return r?.meta?.isPublicCommand
        }).map(r => r.name.split('_').slice(1).join('_')).filter(r => this.$route.query.c.indexOf(r) > -1).sort()
      }

      return []
    },
    commandName () {
      return this.$route.name.split('_').slice(1).join('_')
    }
  },
  methods: {
    prepare () {
      this.command = JSON.stringify({
        TransactionType: 'Payment',
        Amount: '1000000',
        Destination: 'r223rsyz1cfqPbjmiX6oYu1hFgNwCkWZH'
      }, null, 2)
    },
    async get (marker) {
      this.loading = true
      this.errorResponse = false

      const customCommand = {}
      try {
        Object.assign(customCommand, JSON.parse(this.command))
      } catch (e) {
        this.data = { error: e.message }
        this.loading = false
        this.marker = null
        this.errorResponse = true
        return
      }

      console.log(customCommand)

      try {
        const response = await axios.post('http://localhost:9000/payload', customCommand)
        this.loading = false
        this.data = response.data
        this.imageUrl = response.data.refs.qr_png
      } catch (error) {
        this.data = { error: error.response.data.error }
        this.loading = false
        this.marker = null
        this.errorResponse = true
      }
    }
  },
  async mounted () {
    this.prepare()
  }
}
</script>

<style lang="scss" scoped>
</style>
