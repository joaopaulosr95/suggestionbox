<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Suggestion Box</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="suggestion in suggestions" :key="suggestion._id">
            <td>{{ suggestion.firstName }} {{ suggestion.lastName }}</td>
            <td>{{ suggestion.email }}</td>
            <td>{{ suggestion.message }}</td>
            <td>{{ suggestion.updated_at }}</td>
            <td class="text-right">
              <a href="#" @click.prevent="populateSuggestionToEdit(suggestion)">Edit</a> -
              <a href="#" @click.prevent="removeSuggestion(suggestion._id)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model._id ? 'Edit Suggestion' : 'New Suggestion')">
          <form @submit.prevent="checkForm">
            <b-alert :show="errors" variant="danger" v-if="errors.length">
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </b-alert>
            <b-form-group label="First name">
              <b-form-input type="text" v-model="model.firstName" aria-required="true"></b-form-input>
            </b-form-group>
            <b-form-group label="Last name">
              <b-form-input type="text" v-model="model.lastName" aria-required="true"></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input type="text" v-model="model.email" aria-required="true"></b-form-input>
            </b-form-group>
            <b-form-group label="Message">
              <b-form-textarea rows="4" v-model="model.message" aria-required="true"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="button" @click="abortForm()" variant="info">Cancel</b-btn>
              <b-btn type="submit" variant="success">Save Suggestion</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

const ax = axios.create({
  baseURL: 'http://localhost:3000/suggestions',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    // 'Access-Control-Allow-Origin': 'localhost'
  }
})
// crud operations
const getSuggestions = async () => {
  return ax.get('/').then(res => {
    return res.data.data
  }).catch(err => {
    console.log({bla: err})
  })
}

const createSuggestion = async (data) => {
  return ax.post('/', data).catch(err => {
    console.log(err)
  })
}
const updateSuggestion = async (id, data) => {
  return ax.patch(`/${id}`, data).catch(err => {
    console.log(err)
  })
}
const deleteSuggestion = async (id) => {
  return ax.delete(`/${id}`).catch(err => {
    console.log(err)
  })
}

export default {
  data () {
    return {
      loading: false,
      suggestions: [],
      errors: [],
      model: {}
    }
  },
  // onload operations
  async created () {
    await this.refreshSuggestions()
  },
  methods: {
    async checkForm (e) {
      this.errors = []
      if (!this.model.firstName) this.errors.push('First name required')
      if (!this.model.lastName) this.errors.push('Last name required')
      if (!this.model.email) this.errors.push('Email required')
      if (!this.model.message) this.errors.push('Message required')
      if (this.errors.length === 0) {
        await this.saveSuggestion()
      }
    },
    async abortForm () {
      this.model = {}
      await this.refreshSuggestions()
    },
    // ui operations
    async refreshSuggestions () {
      this.errors = []
      this.loading = true
      this.suggestions = await getSuggestions()
      this.loading = false
    },
    async populateSuggestionToEdit (suggestion) {
      this.errors = []
      this.model = Object.assign({}, suggestion)
    },
    async saveSuggestion () {
      if (this.model._id) await updateSuggestion(this.model._id, this.model)
      else await createSuggestion(this.model)
      this.model = {}
      await this.refreshSuggestions()
    },
    async removeSuggestion (id) {
      if (confirm('Are you sure you want to delete this suggestion?')) {
        // if we are editing a suggestion we deleted, remove it from the form
        if (this.model._id === id) this.model = {}
        await deleteSuggestion(id)
        await this.refreshSuggestions()
      }
    }
  }
}
</script>

<style>
  .hero {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .hero .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>
