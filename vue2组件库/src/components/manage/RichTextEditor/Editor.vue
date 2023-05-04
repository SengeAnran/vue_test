<template>
  <div class="editor-com-root" @click.stop>
    <!-- 工具栏 -->
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
    <!-- 编辑器 -->
    <Editor class="editor-com-content" style="height: 400px; overflow-y: hidden" :defaultConfig="editorConfig"
      v-model="html" @onChange="onChange" @onCreated="onCreated" />
  </div>
</template>

<script>
import emitter from 'element-ui/lib/mixins/emitter.js';
import { uploadFile2 } from '@/api/common.js';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const defaultRichText = '<p style="text-align: left;"><span style="color: rgb(170, 170, 170);">一、基本情况</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">二、创建方案的实施情况</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">三、数字化建设与应用情况</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">四、场景特别是“一老一小”场景建设情况</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">五、建设投入情况</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">六、工作推进情况</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">七、特色和创新情况</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">八、相关附件</span></p><p style="text-align: left;"><span style="color: rgb(170, 170, 170);">报告中涉及到的支撑材料可作为附件单独提供，并需提供附件清单方便查阅。</span></p>';
export default {
  name: 'RichTextEditor',
  mixins: [emitter],
  components: { Editor, Toolbar },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      // default: '',
    },
    placeholder: {
      type: String,
      // default: '请输入内容...',
      default: defaultRichText,
    },
  },
  data() {
    return {
      inited: false,
      editor: null,
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        excludeKeys: ['group-video', 'insertImage', 'group-image', 'codeBlock'],
        insertKeys: {
          index: 22, // 插入的位置，基于当前的 toolbarKeys
          keys: ['uploadImage'],
        },
      },
      editorConfig: {
        html: this.value,
        autoFocus: false,
        placeholder: this.placeholder,
        // autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            async customUpload(file, insertFn) {
              const href = '';
              const formData = new FormData();
              formData.append('file', file);
              formData.append("business", "history");
              const res = await uploadFile2(formData);
              const { filePath, fileName } = res;
              insertFn(filePath || '', fileName || '', href);
            },
          },
        },
      },
    };
  },
  computed: {
    html: {
      set: function (val) {
        this.$emit('input', val);
        if (!this.inited) {
          this.inited = true;
          return;
        }
        this.dispatch('ElFormItem', 'el.form.change', [val]);
      },
      get: function () {
        return this.value || '';
      },
    },
  },
  mounted() {
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      this.$emit('change', editor.getHtml());
    },
    getText() {
      const editor = this.editor;
      if (editor == null) return;
      return editor.getText();
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style lang="scss" scoped>
.editor-com-root {
  border: 1px solid #ccc;
  z-index: 1000;
  pointer-events: all;
}
</style>

<style lang="scss">
.el-form-item.is-error {
  .editor-com-root {
    border-color: red;
  }
}
</style>
