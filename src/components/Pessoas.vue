<template lang="html">
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 v-for="(pessoa, index) in pessoas" :key="pessoa">
        <v-card>
          <v-card-media :src="pessoa.avatar" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ pessoa.name }}</h3>
              <div>{{ pessoa.occupation }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import API from '@/lib/API';

export default {
  data() {
    return {
      pessoas: [],
      products: [],
    };
  },

  created() {
    const { load } = this;
    load();
  },
  methods: {
    load() {
      API
        .getPessoas()
        .then(({ data }) => {
          this.pessoas = data;
        })
        .catch(({ err }) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="css">

</style>
