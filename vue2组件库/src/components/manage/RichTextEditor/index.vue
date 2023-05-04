<!--富文本编辑与查看-->
<template>
  <Editor v-if="mode === 'edit'" v-model="html" />
  <Viewer v-else :value="html" />
</template>

<script>
import Editor from './Editor.vue';
import Viewer from './Viewer.vue';
import '@wangeditor/editor/dist/css/style.css';

export default {
  components: { Editor, Viewer },
  props: {
    mode: {
      type: String,
      default: 'edit',
      validate: (v) => ['edit', 'view'].includes(v),
    },
    value: {
      type: String,
      // default: '',
    },
  },
  computed: {
    html: {
      set: function (val) {
        this.$emit('input', val);
      },
      get: function () {
        return this.value;
      },
    },
  },
};
</script>

<style lang="scss">

.rich-text-editor-lock {
  overflow: hidden;
  user-select: none;
}

.w-e-text-container {
  word-wrap: break-word;
  border-top: 1px solid transparent;
  min-height: 100%;
  outline: 0;
  padding: 0 10px;
  padding-top: 0px;
  padding-right: 10px;
  padding-bottom: 0px;
  padding-left: 10px;
  white-space: pre-wrap;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

.w-e-full-screen-container {
  z-index: 1000;
}
 .w-e-text-container {

  .table-container {
    border: 1px dashed var(--w-e-textarea-border-color);
    border-radius: 5px;
    margin-top: 10px;
    overflow-x: auto;
    padding: 10px;
    width: 100%;
  }

  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: revert;
    padding: revert;
    border: revert;
    font-size: revert;
    font: revert;
    font-weight: revert;
    vertical-align: revert;
  }

  table {
    border: none;
  }

  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    border-color: revert;
    border-style: inset;
    border-width: revert;
    margin: unset;
    padding: inherit;
    font-size: unset;
    font: unset;
    font-weight: unset;
    vertical-align: unset;
  }
}
</style>
