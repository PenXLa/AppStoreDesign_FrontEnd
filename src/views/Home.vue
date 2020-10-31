<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/public/navbar.vue'

export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>
