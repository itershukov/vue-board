<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar dark color="primary" class="mb-3">
          <v-toolbar-title>Создать новую рекламу</v-toolbar-title>
        </v-toolbar>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            name="title"
            label="Добавьте заголовок"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Это обязательное поле']"
            ></v-text-field>
          <v-text-field
            name="description"
            label="Добавьте описание"
            type="text"
            v-model="description"
            multi-line
            :rules="[v => !!v || 'Это обязательное поле']"
            ></v-text-field>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn round="true" class="primary" @click="triggerUpload">
              Загрузить изображение
            </v-btn>
            <input 
              ref="fileInput" 
              type="file" 
              style="display: none" 
              accept="image/*"
              @change="onFileChange"
              >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img :src="imageSrc" height="100" v-if="imageSrc">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              label="Добавить в слайдер?"
              v-model="promo"
              color="primary"
              ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
              @click="createAd"
              round
              >
              Создать рекламу
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        description: '',
        promo: false,
        valid: false,
        image: null,
        imageSrc: ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      createAd () {
        if (this.$refs.form.validate() && this.image) {
          const ad = {
            title: this.title,
            description: this.description,
            promo: this.promo,
            image: this.image,
          }

          this.$store.dispatch('createAd', ad)
            .then(() => {
              this.$router.push('/list')
            })
            .catch(() => {})
        }
      },
      triggerUpload() {
        this.$refs.fileInput.click()
      },
      onFileChange(event) {
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onload = e => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      },
    }
  }
</script>
