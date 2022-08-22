<template>
  <div id="page-404">
    <div class="fof">
      <h1>Error 404</h1>
      <p>{{text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      default: ''
    }
  }

}
</script>
<style scoped>
*{
  transition: all 0.6s;
}

html {
  height: 100%;
}

body{
  font-family: 'Lato', sans-serif;
  color: #888;
  margin: 0;
}

#page-404{
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}

#page-404 .fof{
  display: table-cell;
  vertical-align: middle;
}

#page-404 .fof h1{
  font-size: 50px;
  display: inline-block;
  padding-right: 12px;
  animation: type .5s alternate infinite 0s;
}

#page-404 .fof p{
  font-size: 30px;
  padding-right: 12px;
}

@keyframes type{
  from{box-shadow: inset -3px 0px 0px #888;}
  to{box-shadow: inset -3px 0px 0px transparent;}
}
</style>