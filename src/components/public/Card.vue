<template>
    <div class="cardFrame"><slot/></div>
</template>


<script>
  export default {
    name: "Card"
  }
</script>


<style scoped>
.cardFrame {
    box-shadow: rgba(0, 0, 0, 0.5) 1px 1px 10px;
    background: rgb(62, 72, 87);
    border-radius: 3px;
    color: rgb(227, 229, 232);
}
</style>