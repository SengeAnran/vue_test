<template>
<div class="layout">
  <header class="head">头部</header>
  <div class="content">
    <div class="nav">
      <router-view name="nav"/>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
.head {
  height: 100px;
  background-color: pink;
  text-align: center;
  font-size: 30px;
}
.content {
  display: flex;
  height: 100%;
}
.nav {
  background-color: #e0e0e0;
  max-width: 150px;
}
.main {
  background-color: skyblue;
  flex: 1;
}
</style>