<template>
  <div :class="s.view">
    <div :id="id"></div>
  </div>
</template>

<script>
import loadScript from './loadScript.js';

export default {
  name: 'docPreview',
  props: {
    id: {
      type: String,
      default: '',
    },
    documentServerUrl: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => { },
    },
    document_fileType: {
      type: String,
      default: '',
    },
    document_title: {
      type: String,
      default: '',
    },
    documentType: {
      type: String,
      default: '',
    },
    editorConfig_lang: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    events_onAppReady: {
      type: Function,
      default: () => { },
    },
    events_onDocumentStateChange: {
      type: Function,
      default: () => { },
    },
    events_onMetaChange: {
      type: Function,
      default: () => { },
    },
    events_onDocumentReady: {
      type: Function,
      default: () => { },
    },
    events_onInfo: {
      type: Function,
      default: () => { },
    },
    events_onWarning: {
      type: Function,
      default: () => { },
    },
    events_onError: {
      type: Function,
      default: () => { },
    },
    events_onRequestSharingSettings: {
      type: Function,
      default: () => { },
    },
    events_onRequestRename: {
      type: Function,
      default: () => { },
    },
    events_onMakeActionLink: {
      type: Function,
      default: () => { },
    },
    events_onRequestInsertImage: {
      type: Function,
      default: () => { },
    },
    events_onRequestSaveAs: {
      type: Function,
      default: () => { },
    },
    events_onRequestMailMergeRecipients: {
      type: Function,
      default: () => { },
    },
    events_onRequestCompareFile: {
      type: Function,
      default: () => { },
    },
    events_onRequestEditRights: {
      type: Function,
      default: () => { },
    },
    events_onRequestHistory: {
      type: Function,
      default: () => { },
    },
    events_onRequestHistoryClose: {
      type: Function,
      default: () => { },
    },
    events_onRequestHistoryData: {
      type: Function,
      default: () => { },
    },
    events_onRequestRestore: {
      type: Function,
      default: () => { },
    },
  },
  data() {
    return {};
  },
  watch: {
    config: {
      handler() {
        this.onChangeProps();
      },
      deep: true,
    },
    document_fileType() {
      this.onChangeProps();
    },
    document_title() {
      this.onChangeProps();
    },
    documentType() {
      this.onChangeProps();
    },
    editorConfig_lang() {
      this.onChangeProps();
    },
    height() {
      this.onChangeProps();
    },
    type() {
      this.onChangeProps();
    },
    width() {
      this.onChangeProps();
    },
  },
  mounted() {
    let url = this.documentServerUrl;
    if (!url.endsWith('/')) {
      url += '/';
    }
    const docApiUrl = `${url}web-apps/apps/api/documents/api.js`;
    loadScript(docApiUrl, 'onlyoffice-api-script')
        .then(() => this.onLoad())
        .catch((err) => console.error(err));
  },
  beforeDestroy() {
    const id = this.id || '';
    if (window?.DocEditor?.instances[id]) {
      window.DocEditor.instances[id].destroyEditor();
      window.DocEditor.instances[id] = undefined;
    }
  },
  methods: {
    onLoad() {
      try {
        const id = this.id || '';
        if (!window.DocsAPI) throw new Error('DocsAPI is not defined');
        if (window?.DocEditor?.instances[id]) {
          console.log('Skip loading. Instance already exists', id);
          return;
        }
        if (!window?.DocEditor?.instances) {
          window.DocEditor = { instances: {} };
        }
        const initConfig = {
          document: {
            fileType: this.document_fileType,
            title: this.document_title,
          },
          documentType: this.documentType,
          editorConfig: {
            lang: this.editorConfig_lang,
          },
          events: {
            onAppReady: this.onAppReady,
            onDocumentStateChange: this.events_onDocumentStateChange,
            onMetaChange: this.events_onMetaChange,
            onDocumentReady: this.events_onDocumentReady,
            onInfo: this.events_onInfo,
            onWarning: this.events_onWarning,
            onError: this.events_onError,
            onRequestSharingSettings: this.events_onRequestSharingSettings,
            onRequestRename: this.events_onRequestRename,
            onMakeActionLink: this.events_onMakeActionLink,
            onRequestInsertImage: this.events_onRequestInsertImage,
            onRequestSaveAs: this.events_onRequestSaveAs,
            onRequestMailMergeRecipients: this.events_onRequestMailMergeRecipients,
            onRequestCompareFile: this.events_onRequestCompareFile,
            onRequestEditRights: this.events_onRequestEditRights,
            onRequestHistory: this.events_onRequestHistory,
            onRequestHistoryClose: this.events_onRequestHistoryClose,
            onRequestHistoryData: this.events_onRequestHistoryData,
            onRequestRestore: this.events_onRequestRestore,
          },
          height: this.height,
          type: this.type,
          width: this.width,
          ...(this.config || {}),
        };
        const editor = window.DocsAPI.DocEditor(id, initConfig);
        window.DocEditor.instances[id] = editor;
      } catch (err) {
        console.error(err);
        this.events_onError(err);
      }
    },
    onAppReady() {
      const id = this.id || '';
      this.events_onAppReady(window.DocEditor.instances[id]);
    },
    onChangeProps() {
      const id = this.id || '';
      if (window?.DocEditor?.instances[id]) {
        window.DocEditor.instances[id].destroyEditor();
        window.DocEditor.instances[id] = undefined;

        console.log('Important props have been changed. Load new Editor.');
        this.onLoad();
      }
    },
  },
};
</script>

<style lang="scss" module="s">
.view {
  width: 100%;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}

</style>