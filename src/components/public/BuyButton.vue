<template>
    <button class="BuyButton"><slot/></button>
</template>
    

<script>
  export default {
    name: 'BuyButton'
  }
</script>


<style scoped>
.BuyButton {
    cursor: pointer;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    border-width: 0px;
    color:#e7e7e7;
    text-align: center;
    background: #0067b8;
    outline: none;
    box-shadow: 2px 2px 5px 0px #00000029;
    -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
}
.BuyButton:hover {
    background: #005494;
}
.BuyButton:active {
    background: #00467c;
    -webkit-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
    -moz-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
    -o-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
    transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
    box-shadow: 0px 0px 5px 0px #00000029;
}
</style>