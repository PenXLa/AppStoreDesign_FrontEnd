<template>
    <div class="tagDiv">
        <span class="apptag" v-for="tag in tags" :key="tag">{{tag}}</span>
    </div>
</template>


<script>
  export default {
    name: 'TagDisplay',
    props: {
        tags: Array
    }
  }
</script>


<style scoped>
.apptag {
    font-size: 10px;
    background-color: #dfdfdf;
    color: #6c6c6c;
    padding: 1px 2px 1px 2px;
    margin-right: 3px;
    border-radius: 3px;
}
</style>