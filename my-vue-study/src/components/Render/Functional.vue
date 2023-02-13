<!--<template functional>-->
<!--</template>-->

<script>
export default {
  name: "Functional",
  // props: {
  //   number: {type:Number},
  // },
  functional: true,
  render(createElement, context) {
    console.log(context);
    return<p>{1+1} {context.props.number}
    </p>
  },

}
</script>

<style scoped>

</style>