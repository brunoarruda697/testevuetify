<template>
  <div class="people-modal">
    <slot name="button-bar">
    </slot>
    <v-container grid-list-md>
      <v-dialog v-model="peopleModal" persistent>
        <v-toolbar class="info">
            <v-toolbar-title>
              <div class="title white--text"> {{ modalTitle }} </div>
            </v-toolbar-title>
            <v-layout row nowrap>
              <v-spacer></v-spacer>
              <v-btn flat icon @click="fecharModal">
                <v-icon class="white--text"> close </v-icon>
              </v-btn>
            </v-layout>
        </v-toolbar>
        <v-card>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="payload.name"
                  label="Name"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="payload.phone"
                  label="Phone"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  v-model="payload.occupation"
                  label="Occupation"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-btn block color="info">
                  RESETAR
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn :loading="requestLoader" block color="success" @click="peopleHandler">
                  ENVIAR
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import API from '@/lib/API';

export default {
  name: 'PeopleModal',
  props: {
    x: {
      type: Object,
    },
    peopleModal: {
      type: Boolean,
      default: () => false,
    },
    modalTitle: {
      type: String,
      default: () => 'Titulo Genérico',
    },
  },
  data: vm => ({
    requestLoader: false,
    payload: { ...vm.x } || {
      name: '',
      phone: '',
      occupation: '',
    },
  }),
  computed: {
    isEditing() {
      const { modalTitle } = this;
      return modalTitle === 'Editar nova pessoa.';
    },
  },
  methods: {
    fecharModal() {
      this.$emit('fechar-modal');
    },

    peopleHandler() {
      const { isEditing, editPeople, newRegister } = this;
      this.requestLoader = true;
      if (isEditing) return editPeople();
      return newRegister();
    },

    clearPayload() {
      this.payload = {
        name: '',
        phone: '',
        occupation: '',
      };
    },

    editPeople() {
      const payload = {
        ...this.payload,
      };
      delete payload.editar;
      API
        .editPeople(payload.id, payload)
        .then(() => {
          this.$emit('atualizar-lista');
        })
        .catch(response => console.log(response));
    },

    newRegister() {
      const { clearPayload } = this;
      API
        .newRegister(this.payload)
        .then((response) => {
          clearPayload();
          this.requestLoader = false;
          this.$emit('atualizar-lista');
          console.log(response);
        });
    },
  },
};
</script>
