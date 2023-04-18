<template>
<div class="page">
<div class="box">
  <Force></Force>
</div>
</div>
</template>

<script>
import Force from './Force';
export default {
  name: 'index',
  components: {Force},

}
</script>

<style scoped>
.box {
  width: 572px;
  height: 410px;
  background: rgba(0, 21, 46, 0.8);
  box-shadow: 0px 11px 28px 2px rgba(16,38,70,0.5), 0px 0px 40px 0px #1D4D8D;
}

</style>