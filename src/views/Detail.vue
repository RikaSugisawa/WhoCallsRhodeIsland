<template>
  <div class="detail">
    <h1>
      {{char.name}}
      <small>{{char['appellation']}}</small>
    </h1>

    <form class="md-layout">
      <md-card class="md-layout-item md-size-25" v-for="(phase,stage) in char['phases']"
               style="min-width: 240px;margin-bottom: .5rem; margin-left: 0">
        <md-card-header>
          <div class="md-title">精英化 {{stage}}</div>
        </md-card-header>
        <md-card-content>
          <md-field>
            <md-icon>trending_up</md-icon>
            <label>Level</label>
            <md-input @dblclick="detail[stage].level=detail[stage].level==phase['maxLevel']?1:phase['maxLevel']"
                      v-model="detail[stage].level" type="number"/>
            <span class="md-helper-text">{{detail[stage].level}}/{{phase['maxLevel']}}</span>
          </md-field>
          <div class="md-layout md-gutter" style="display: flex;justify-content: center">
            <md-field class="md-inline" v-for="(svg,prop) in propsIcon">
              <md-icon>
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                     class="svg-inline--fa fa-sword fa-w-16">
                  <path fill="currentColor" :d="svg"></path>
                </svg>
              </md-icon>
              <md-input readonly :value="getCurrentProp(phase,detail[stage].level,prop)">{{}}</md-input>
            </md-field>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: "Detail",
    props: ['id'],
    data() {
      return {
        Characters: _.mapKeys(require("../character_table.json"), (v, k) => Number(k.split('_')[1])),
        detail: [],
        propsIcon: {
          maxHp: 'M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z',
          atk: 'M110.11 227.59c-6.25-6.25-16.38-6.25-22.63 0l-18.79 18.8a16.005 16.005 0 0 0-2 20.19l53.39 80.09-53.43 53.43-29.26-14.63a13.902 13.902 0 0 0-16.04 2.6L4.07 405.36c-5.42 5.43-5.42 14.22 0 19.64L87 507.93c5.42 5.42 14.22 5.42 19.64 0l17.29-17.29a13.873 13.873 0 0 0 2.6-16.03l-14.63-29.26 53.43-53.43 80.09 53.39c6.35 4.23 14.8 3.39 20.19-2l18.8-18.79c6.25-6.25 6.25-16.38 0-22.63l-174.3-174.3zM493.73.16L400 16 171.89 244.11l96 96L496 112l15.83-93.73c1.51-10.56-7.54-19.61-18.1-18.11z',
          def: 'M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3z',
          magicResistance: 'M420.43 83.69l-179.2-80c-11.03-4.92-23.43-4.92-34.46 0l-179.2 80C10.88 91.14 0 108.62 0 128c0 198.49 106.86 335.71 206.77 380.31 11.03 4.92 23.43 4.92 34.46 0C321.13 472.64 448 349.28 448 128c0-19.38-10.88-36.86-27.57-44.31zM374.09 224H256v200.27c-11.34 8.92-22.26 16.12-32.07 21.3-10.68-5.51-21.36-12.66-31.93-20.81V224H74.8c-4.39-20.25-7.37-41.58-8.9-64H192V80.37l32-14.29 32 14.29V160h126.74c-1.47 22.72-4.4 44.07-8.65 64z',
          cost: 'M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z',
          blockCnt: 'M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z',
          attackSpeed: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z',
          respawnTime: 'M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-75.078 384H99.08c17.059-46.797 52.096-80 92.92-80 40.821 0 75.862 33.196 92.922 80zm.019-256H99.078C91.988 108.548 88 86.748 88 64h208c0 22.805-3.987 44.587-11.059 64z',
        }
      }
    },
    computed: {
      char() {
        return this.Characters[Number(this.id)]
      }
    },
    methods: {
      getCurrentProp(phase, lvl, propName) {
        let i = 0
        lvl = lvl < 1 ? 1 : (lvl > phase['maxLevel'] ? phase['maxLevel'] : lvl)
        const keyFrames = phase['attributesKeyFrames']
        if (lvl == phase['maxLevel']) return _.last(keyFrames)['data'][propName]
        for (; keyFrames[i + 1]['level'] <= lvl; i++) ;
        return Math.round((lvl - keyFrames[i]['level']) / (keyFrames[i + 1]['level'] - keyFrames[i]['level']) *
          (keyFrames[i + 1]['data'][propName] - keyFrames[i]['data'][propName]) + keyFrames[i]['data'][propName])
      }
    },
    watch: {
      detail(newVal, oldVal) {
      }
    },
    created() {
      this.detail = this.char['phases'].map((phase) => {
        return {
          _level: 1,
          get level() {
            return this._level
          },
          set level(value) {
            this._level = value < 1 ? 1 : value > phase['maxLevel'] ? phase['maxLevel'] : value
          }
        }
      })
    }
  }
</script>

<style scoped>
  .detail {
    padding: 0 2rem;
  }

  .md-field.md-inline {
    width: 43%;
  }

</style>
