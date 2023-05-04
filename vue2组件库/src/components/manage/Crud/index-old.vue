<template>
  <div>
    <!--搜索-->
    <div v-if="!hideSearch" style="margin-bottom: 10px">
      <!--搜索插槽-->
      <slot name="search"></slot>

      <el-button style="margin-left: 15px" plain @click="resetSearch"
        >重置</el-button
      >
      <el-button type="primary" @click="search">查询</el-button>
    </div>

    <!--crud操作-->
    <div style="margin-bottom: 10px">
      <el-button v-if="!hideAdd" type="primary" @click="addItem"
        >新增</el-button
      >
      <slot name="crudAction"></slot>
    </div>

    <!--表格-->
    <el-table
      v-if="!hideTable"
      v-loading="loading"
      :data="items"
      border
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>

      <!--表格列插槽-->
      <slot name="table" :data="items"></slot>

      <el-table-column
        v-if="!hideTableAction"
        label="操作"
        :width="actionWidth"
        fixed="right"
        align="center"
      >
        <template slot-scope="scope">
          <!--表格操作插槽-->
          <slot name="tableAction" :data="scope.row"></slot>
          <el-button v-if="!hideEdit" type="text" @click="editItem(scope.row)"
            >编辑</el-button
          >
          <slot name="tableEdit" :data="scope.row"></slot>
          <el-button
            v-if="!hideDelete"
            type="text"
            :loading="loading"
            @click="deleteItem(scope.row)"
            >删除</el-button
          >
          <slot name="tableDelete" :data="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!--自定义数据插槽-->
    <slot name="data" :data="items"></slot>

    <!--分页-->
    <div style="text-align: right">
      <el-pagination
        v-if="!hidePagination"
        style="margin-top: 15px"
        background
        :current-page.sync="page"
        :page-sizes="sizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
      />
    </div>

    <!--弹窗-->
    <div v-if="dialogDestroyOnClose ? dialog : true">
      <el-dialog
        :visible.sync="dialog"
        :width="dialogWidth"
        :title="`${modeText}${title}`"
        :close-on-click-modal="closeOnClickModal"
      >
        <div>
          <el-form ref="form" :model="form" :label-width="labelWidth">
            <!--表单插槽-->
            <slot name="form"></slot>
          </el-form>
        </div>
        <div v-if="!hideDialogAction" slot="footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            v-if="!hideSave"
            type="primary"
            :loading="loading"
            @click="saveItem"
            >确定</el-button
          >
          <!--表单操作插槽-->
          <slot name="dialogAction"></slot>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    // 表单对象
    form: {
      type: Object,
      default: () => ({}),
    },
    // 搜索对象
    query: {
      type: Object,
      default: () => ({}),
    },
    // 弹窗标题
    title: {
      type: String,
      default: "",
    },
    // 表格是否开启多选模式
    selection: {
      type: Boolean,
      default: false,
    },
    // 获取数据方法
    getMethod: {
      type: Function,
    },
    // 自定义获取数据方法（无分页等）
    customGetMethod: {
      type: Function,
    },
    // 新增数据方法
    addMethod: {
      type: Function,
    },
    // 编辑数据方法
    updateMethod: {
      type: Function,
    },
    // 删除数据方法
    deleteMethod: {
      type: Function,
    },
    // 获取数据后方法（items重新赋值等处理）
    afterGetMethod: {
      type: Function,
    },
    // 编辑前方法（将item需要提交的值赋到form，父组件必须操作）
    beforeEditMethod: {
      type: Function,
    },
    // 提交前方法，返回新的data值
    beforeSaveMethod: {
      type: Function,
    },
    // 删除前方法，返回新的data值
    beforeDeleteMethod: {
      type: Function,
    },
    // 隐藏新增按钮
    hideAdd: {
      type: Boolean,
      default: false,
    },
    // 隐藏搜索
    hideSearch: {
      type: Boolean,
      default: false,
    },
    // 隐藏分页
    hidePagination: {
      type: Boolean,
      default: false,
    },
    // 隐藏表格
    hideTable: {
      type: Boolean,
      default: false,
    },
    // 隐藏表格操作列
    hideTableAction: {
      type: Boolean,
      default: false,
    },
    // 隐藏弹窗操作
    hideDialogAction: {
      type: Boolean,
      default: false,
    },
    // 隐藏编辑按钮
    hideEdit: {
      type: Boolean,
      default: false,
    },
    // 隐藏删除按钮
    hideDelete: {
      type: Boolean,
      default: false,
    },
    // 隐藏表单确定按钮
    hideSave: {
      type: Boolean,
      default: false,
    },
    // 编辑和删除区域宽度
    actionWidth: {
      type: String,
      default: "130px",
    },
    // 弹窗宽度
    dialogWidth: {
      type: String,
      default: "500px",
    },
    // 是否点击遮罩关闭弹窗
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    // 弹窗是否关闭后销毁
    dialogDestroyOnClose: {
      type: Boolean,
      default: false,
    },
    // 表单label宽度，95容纳5个字
    labelWidth: {
      type: String,
      default: "95px",
    },
  },
  data() {
    return {
      defaultForm: _.cloneDeep(this.form),
      defaultQuery: _.cloneDeep(this.query),
      loading: true,
      dialog: false,
      mode: 0, // 0新增，1编辑
      items: [],
      page: 1,
      size: 10,
      sizes: [10, 20, 50, 100],
      total: 0,
      selections: [],
    };
  },
  watch: {
    page() {
      this.getItems();
    },
    dialog(show) {
      if (!show) {
        this.mode = 0;
        if (!this.dialogDestroyOnClose) {
          this.resetForm(); // 防止dom销毁报错
        }
        this.updateForm(_.cloneDeep(this.defaultForm));
        this.$emit("dialogClose");
      }
    },
  },
  computed: {
    modeText() {
      let text = "新增";
      if (this.mode === 0) {
        text = "新增";
      } else if (this.mode === 1) {
        text = "编辑";
      }
      return text;
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    // 获取数据
    async getItems() {
      const { page, size, query } = this;
      const params = {
        page: page - 1,
        size,
        ...query,
      };
      this.loading = true;
      try {
        if (this.customGetMethod) {
          this.customGetMethod(params);
        } else {
          const res = await this.getMethod(params);
          this.items = res.content;
          this.total = res.totalElements;
        }
        this.loading = false;
        this.afterGetMethod && this.afterGetMethod();
      } finally {
        this.loading = false;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getItems();
    },
    // 搜索重置
    resetSearch() {
      this.updateQuery(_.cloneDeep(this.defaultQuery));
      // 用户$nextTick等待query从父组件同步过来
      this.$nextTick(() => {
        this.page = 1;
        this.getItems();
      });
    },
    // 打开弹窗
    openDialog() {
      this.dialog = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.dialog = false;
    },
    // 新增
    addItem() {
      this.updateForm(_.cloneDeep(this.defaultForm));
      this.openDialog();
      this.mode = 0;
    },
    // 编辑
    editItem(item) {
      if (!this.beforeEditMethod) {
        console.error("请传入 beforeEditMethod 处理数据回填");
        return;
      }
      this.beforeEditMethod(item);
      this.openDialog();
      this.mode = 1;
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
    },
    // 删除
    async deleteItem(item) {
      this.$confirm("是否删除该条数据？", "提示", {
        type: "warning",
      }).then(async () => {
        this.loading = true;
        try {
          let data = [item.id];
          if (this.beforeDeleteMethod) {
            data = this.beforeDeleteMethod(item);
          }
          await this.deleteMethod(data);
          this.$notify.success("删除成功");
          await this.getItems();
        } finally {
          this.loading = false;
        }
      });
    },
    // 保存
    async saveItem() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            let data = this.form;
            if (this.beforeSaveMethod) {
              data = this.beforeSaveMethod();
            }
            if (this.mode === 0) {
              await this.addMethod(data);
            } else if (this.mode === 1) {
              await this.updateMethod(data);
            }
            this.$notify.success(`${this.modeText}成功`);
            this.closeDialog();
            this.resetForm();
            await this.getItems();
          } finally {
            this.loading = false;
          }
        }
      });
    },
    // 分页大小切换
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getItems();
    },
    // 表格多选回调
    selectionChange(val) {
      this.selections = val;
      this.$emit("selectionChange", val);
    },
    // 同步form到父组件
    updateForm(form) {
      this.$emit("update:form", form);
    },
    // 同步query到父组件
    updateQuery(query) {
      this.$emit("update:query", query);
    },
  },
};
</script>

<style lang="scss" scoped></style>
