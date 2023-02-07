<template>
<div class="my-wife">
  <h2>我的妻子</h2>
  <div class="name">
    name: <slot name="name"></slot>
  </div>
  <div class="age">
    age: <slot name="age"></slot>
  </div>
  <div class="phone">
    phone: <slot name="phone" ></slot>
  </div>
  <div class="default">
    <slot :data="obj"></slot>
  </div>

<!--  <base-my-wife></base-my-wife>-->
</div>
</template>

<script>
// import TreeFolder from '../TreeFolder';
export default {
  name: "BaseMyWife",
  // components: {TreeFolder},
  data() {
    return {
      obj: {
        sing: 'song',
        doing: 'study',
      }
    }
  }
}
</script>

<style scoped>

</style>