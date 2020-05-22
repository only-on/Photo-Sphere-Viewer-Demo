<template>
    <div>
      <Menu></Menu>
      <Main></Main>
    </div>
</template>

<script>
  import Menu from './slideMenu'
  import Main from './mainContent'
    export default {
      name: "home.vue",
      components: {
        Menu,
        Main
      }
    }
</script>

<style scoped>

</style>
