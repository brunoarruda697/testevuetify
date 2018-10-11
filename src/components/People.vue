<template>
  <div>
    <people-modal
      modalTitle="Cadastrar nova pessoa."
      :peopleModal="peopleModal"
      @fechar-modal="fecharModal"
      @atualizar-lista="atualizarLista"
    >
      <template slot="button-bar">
        <v-btn fab fixed bottom right class="info" @click="abrirModal">
          <v-icon large> add </v-icon>
        </v-btn>
      </template>
    </people-modal>
    <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
    <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="people"
      hide-actions
      class="elevation-5"
    >
      <template slot="items" slot-scope="{ item }">
        <td v-if="!item.editar" class="text-xs-left">{{ item.name }}</td>
        <td v-else> </td>
        <td v-if="!item.editar" class="text-xs-center">{{ item.phone }}</td>
        <td v-else> </td>
        <td v-if="!item.editar" class="text-xs-right">{{ item.occupation }}</td>
        <td v-else> </td>
        <td class="justify-center layout px-0">
          <people-modal
            :x="item"
            @fechar-modal="item.editar = !item.editar"
            :peopleModal="item.editar"
            modalTitle="Editar nova pessoa."
            @atualizar-lista="atualizarLista"
          >
            <template slot="button-bar">
              <v-btn flat icon @click="item.editar = !item.editar">
                <v-icon small class="green--text"> edit </v-icon>
              </v-btn>
            </template>
          </people-modal>
          <v-icon
            small
            @click="deletarBatata(item)"
            log

          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import API from '@/lib/API';
import PeopleModal from './People/PeopleModal';

export default {
  name: 'PeopleList',
  components: {
    PeopleModal,
  },
  data: () => ({
    loading: false,
    editItem: {},
    peopleModal: false,
    modalEdit: false,
    headers: [
      {
        text: 'Full name',
        align: 'left',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Phone',
        align: 'center',
        sortable: false,
        value: 'phone',
      },
      {
        text: 'Job',
        align: 'right',
        sortable: false,
        value: 'occupation',
      },
      {
        text: 'Actions',
        align: 'right',
        sortable: false,
      },
    ],
    people: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      phone: '',
      occupation: '',
    },
    defaultItem: {
      name: '',
      phone: '',
      occupation: '',
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  created() {
    const { load } = this;
    load();
  },

  methods: {
    atualizarDelete() {
      const { load } = this;
      load();
    },

    atualizarLista() {
      const { load, fecharModal } = this;
      load();
      fecharModal();
    },

    fecharModal() {
      this.peopleModal = false;
    },

    abrirModal(item) {
      this.editItem = item;
      this.peopleModal = true;
      this.$forceUpdate();
    },

    deletarBatata(item) {
      if (!confirm(`Você deseja excluir o usuario ${item.name}`)) return alert('não ASDASDASDASD');
      API
        .deletePeople(item.id)
        .then(() => this.atualizarDelete());
    },

    editPeople(item) {
      console.log(item);
      this.modalEdit = true;
      API
        .editPeople(name)
        .then(response => console.log(response))
        .catch(response => console.log(response));
    },

    load() {
      this.loading = true;
      API.getPeople().then(({ data }) => {
        this.people = data.map(item => ({
          ...item,
          editar: false,
        }));
        this.loading = false;
      });
    },
  },
};
</script>
