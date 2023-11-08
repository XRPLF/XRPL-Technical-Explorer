<template>
    <main class="container-fluid pb-5">
        <div class="row">
            <div class="col-12">
                <div v-if="possibleCommands.length > 0">
                    <h4 class="nes blue">Custom command</h4>
                </div>
                <div v-else>
                    <div class="row mb-3">
                        <div class="col-12">
                            <h4 class="nes blue mb-3">
                                {{ commandName }}
                            </h4>
                            <h4 class="nes blue">
                                <a class="nes-btn is-warning float-end btn-sm py-1" :href="'https://docs.hooks.network/' + commandName + '.html'" target="_blank"><i style="position: relative; top: -2px;" class="fas fa-external-link-alt me-2"></i><code class="d-none text-primary pe-2">{{ commandName }}</code>Docs</a>
                            </h4>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-9">
                        </div>
                        <div class="col-3 align-self-end">
                            <a class="nav-link dropdown-toggle float-end" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Commands</a>
                            <div class="dropdown-menu">
                                <ul v-for="(group, index) in groupedCommands" :key="index">
                                    <h4 href="#" class="list-group-item list-group-item-action">{{ group.title }}</h4>
                                    <li v-for="(item, itemIndex) in group.items" :key="`item-${itemIndex}`" class="dropdown-item">
                                        <a :href="item.link" class="list-group-item list-group-item-action">{{ item.name }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <code class="text-primary nes">Custom command</code>
                    <div class="mt-3">
                        <div class="rounded" style="overflow: hidden;">
                            <codemirror
                                v-model="command"
                                placeholder="Code goes here..."
                                :style="{ height: '400px' }"
                                :autofocus="true"
                                :indent-with-tab="true"
                                :tab-size="2"
                                :extensions="extensions"
                                @ready="handleReady"
                                />
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
        </div>
    </main>
  </template>
  
  <script>
    import { defineComponent, ref, shallowRef } from 'vue'
    import { Codemirror } from 'vue-codemirror'
    import { json } from '@codemirror/lang-json'
    import { oneDark } from '@codemirror/theme-one-dark'

    import JsonRenderer from '../components/JsonRenderer.vue'
    import Loading from '../components/Loading.vue'
    import { groupedCommands } from '../plugins/commands'

    // import jsonlint from 'jsonlint-mod'
    // window.jsonlint = jsonlint /// does nothing

    export default defineComponent({
        components: {
            Codemirror,
            Loading,
            JsonRenderer
        },
        data () {
            return {
                loading: false,
                marker: null,
                data: {},
                errorResponse: false,
                groupedCommands: groupedCommands
            }
        },
        setup () {
            const command = ref(``)
            const extensions = [json(), oneDark]

            // Codemirror EditorView instance ref
            const view = shallowRef()
                const handleReady = (payload) => {
                view.value = payload.view
            }

            // Status is available at all times via Codemirror EditorView
            const getCodemirrorStates = () => {
                const state = view.value.state
                const ranges = state.selection.ranges
                const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
                const cursor = ranges[0].anchor
                const length = state.doc.length
                const lines = state.doc.lines
                // more state info ...
                // return ...
            }

            return {
                command,
                extensions,
                handleReady,
                log: console.log
            }
        },
        computed: {
            paramToTemplate () {
                return this.$route.meta?.replaceProp && this.$route.meta?.replaceParam && this.$route.params?.[this.$route.meta.replaceParam]
            },
            possibleCommands () {
                if (this.$route?.query?.c) {
                    return this.$router.options.routes.filter(r => { return r?.meta?.isPublicCommand}).map(r => r.name.split('_').slice(1).join('_')).filter(r => this.$route.query.c.indexOf(r) > -1).sort()
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
                    command: this.commandName,
                    ...(this.$router.options.routes.filter(r => r.name === this.$route.name)[0]?.meta?.template || {}),
                    ...(this.paramToTemplate ? {[this.$route.meta.replaceProp]: this.$route.params[this.$route.meta.replaceParam]} : {})
                }, null, 2)
                if (this.paramToTemplate) {
                    this.get()
                }
            },
            async get (marker) {
                this.loading = true
                this.errorResponse = false

                if (typeof marker === 'undefined') {
                    this.marker = null
                    this.data = {}
                    this.loaded = false
                }

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

                console.log({
                    marker,
                    ...customCommand
                })
                const data = await this.$store.getters.getClient.send({
                    marker,
                    ...customCommand
                })
                console.log('marker', this.$route.name, data?.marker)
                if (data?.marker || marker) {
                    this.marker = data.marker
                }
                if (data?.error) {
                    this.errorResponse = true
                    if (data?.request) {
                        delete data.request
                    }
                }

                this.loading = false
                this.data = data
            }
        },
        async mounted () {
            this.prepare()
        }
    })
  </script>