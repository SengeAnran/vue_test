<template>
  <el-dialog title="标引信息" width="500px" :visible="show" @close="closeView">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="任务" prop="task">
        <el-select v-model="form.task"  placeholder="请选择任务">
          <el-option label="任务一" value="任务一"></el-option>
          <el-option label="任务二" value="任务二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="能力项" prop="abilityItems">
        <el-select v-model="form.abilityItems" placeholder="请选择能力项">
          <el-option label="能力项一" value="能力项一"></el-option>
          <el-option label="能力项二" value="能力项二"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预设信息" prop="preInformation">
        <el-input v-model="form.preInformation" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeView">取 消</el-button>
      <el-button type="primary" @click="submitData">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    show: Boolean,
    // form: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       task: '',
    //       abilityItems: '',
    //       preInformation: '',
    //     }
    //   }
    // }
  },
  data() {
    return {
      form: {
        task: '',
        abilityItems: '',
        preInformation: '',
      },
      rules: {
        task: [
          { required: true, message: '请选择任务项', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    submitData() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit',{...this.form});
          this.resetForm();
          this.$emit('update:show', false);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    closeView() {
      this.resetForm();
      this.$emit('update:show', false)
    }
  }
}

</script>
<style scoped>

</style>
