<template>
  <router-view />
</template>

<script>
import axios from '@/api/axios'
import {getItem, setItem} from '@/helpers/persistanceStorage'

export default {
  mounted(){
    if(!getItem('csrftoken')){
      axios.get('get-csrf-token/').then((response) => {
        setItem('csrftoken', response.data.csrftoken)
      })
    }
  }
}
</script>