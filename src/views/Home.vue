<template>
  <div class="home">
<!--    <md-table ref="profFilter" v-if="filters.professions.open">
      <tr>
        <td style="border: transparent dashed thick;"
            v-for="filename in ['caster','medic','pioneer','sniper','special','support','tank','warrior']">
          <img style="width: 3rem;margin: .5rem;" :style="{opacity:filters.professions[filename]?1:.5}"
               :alt="filename.split('.')[0]" @click="filters.professions[filename]=!filters.professions[filename]"
               :src="'/imgs/professions/'+filename+'.svg'">
        </td>
      </tr>
    </md-table>-->
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Profession</md-table-head>
        <md-table-head>Rarity</md-table-head>
        <md-table-head>Position</md-table-head>
        <md-table-head>Tag</md-table-head>
      </md-table-row>
      <md-table-row v-for="(char, ID) in Characters" :key="ID" v-if="ID>100 && ID<1000">
        <md-table-cell md-numeric>{{ID}}</md-table-cell>
        <md-table-cell>
          <md-card-header-text>
            <div class="md-title"> {{char.name}}</div>
            <div class="md-subhead">{{char["appellation"]}}</div>
          </md-card-header-text>
        </md-table-cell>

        <md-table-cell><img style="width: 2rem;" :alt="char['profession']" :title="char['profession']"
                            :src="'/imgs/professions/'+char['profession']+'.svg'"/></md-table-cell>
        <md-table-cell>{{new Array(char["rarity"]+2).join('&starf;')}}</md-table-cell>
        <md-table-cell>
          <md-chip v-if="char['position']"
                   :style="{'background-color':char['position']?char['position'].substr(0,1)==='远'?'#ff000033':'#0000ff33':false}">
            {{(char["position"] === null?null: char["position"].substr(0,1))}}
          </md-chip>
        </md-table-cell>
        <md-table-cell>
          <md-chip v-for="tag in char['tagList']" class="md-square">{{tag}}</md-chip>
        </md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import _ from 'lodash'


    @Component({
        data() {
            return {
                Characters: _.mapKeys(require("../character_table.json"), (v: string, k: string) => Number(k.split('_')[1])),
                filters: {
                    professions: {
                        open: false,
                        caster: false,
                        medic: false,
                        pioneer: false,
                        sniper: false,
                        special: false,
                        support: false,
                        tank: false,
                        warrior: false
                    }
                }
            }
        },
        methods: {
            filterProfessions() {
            }
        }
    })
    export default class Home extends Vue {
    }
</script>
