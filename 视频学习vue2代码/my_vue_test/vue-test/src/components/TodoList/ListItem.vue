<template>
<div class="item-list">
  <input type="checkbox" :checked="objData.complete" @change="$bus.$emit(CHECKONE, objData.index)">
  <span v-show="!objData.isEdit">{{objData.name}}</span>
<!--  blur 失去焦点-->
  <input ref="inputTitle" v-show="objData.isEdit" type="text" v-model.trim="editValue"  @blur="subEdit">
  <button style="margin-right: 5px" @click="editOne">编辑</button>
  <button @click="$bus.$emit(DELETEONE,objData.index)">删除</button>
</div>
</template>

<script>
import {DELETEONE, CHECKONE, EDITONE, NEWVALUE} from '@/bus.js'
// import {CHECKONE, DELETEONE} from '../../bus';
export default {
  name: "ItemList",
  data() {
    return {
      DELETEONE,
      CHECKONE,
      EDITONE,
      NEWVALUE,
      editValue: '',
    }
  },
  props: {
    objData: {
      type: Object,
      default: () => {
        return {
          id: undefined,
          name: this.value,
          complete: false,
          isEdit: false,
        }
      }
    }
  },
  watch: {
    'objData.name': {
      handler: function (val) {
        if (val !== this.editValue) {
          this.editValue = val;
        }
      },
      immediate: true,
    }
  },
  methods: {
    // checkOne() {
    //   this
    // }
    editOne() {
      this.$bus.$emit(this.EDITONE,this.objData.index);
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      })
    },
    subEdit() {
      console.log(this.NEWVALUE,this.objData.index, this.editValue);
      this.$bus.$emit(this.NEWVALUE,this.objData.index, this.editValue);
    }
  }
}
</script>

<style scoped>

</style>