<template>
  <v-card>
    <v-card-title>
      <h1 class="px-5 ">Lista</h1>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pessoas"
      :search="search"
    >
      <template slot="items" slot-scope="{ item }">
        <td>{{ item.name }}</td>
        <td class="text-xs-right">{{ item.phone }}</td>
        <td class="text-xs-right">{{ item.occupation }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import API from '@/lib/API';

export default {
  name: 'pessoas',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Nome completo',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Telefone',
          align: 'center',
          sortable: false,
          value: 'phone',
        },
        { text: 'Profissão',
          align: 'right',
          sortable: false,
          value: 'occupation',
        },
      ],
      pessoas: [],
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
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
