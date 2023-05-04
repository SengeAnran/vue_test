<template>
  <div
    :class="domId"
    :id="domId"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    {{ msg }}
  </div>
</template>
<script>
// 参数示例：
// option:{
//   appkey:"23464284",
//   secret:"EyTl3nQ3OvlYqkheTRXa",
//   ip:"10.254.10.10",
//   port:"80",
//   width:960,
//   height:540
// },
// camera:"f2d62cd79ca14929a019d7eb1bb9375e",
export default {
  props: {
    // 监控点编号，json 中必填,例：3084036496a5401ea3bd16f9091535ff
    cameraIndexCode: {
      type: String,
      default: '3084036496a5401ea3bd16f9091535ff',
    },
  },
  data() {
    return {
      domId: 'hikvideo',
      width: 800,
      height: 400,
      initCount: 0, // // 重新创建实例次数
      msg: '',
      oWebControl: null, // 创建 WebControl 实例
      pubKey: '', // RSA 公钥

      appkey: '23033722', // 平台提供的 appkey，必填,例：25637357
      secret: 'P8bQaCSflPwuZVGmChyM', // 平台提供的 secret，必填, setEncrypt对 secret 进行 RSA 公钥加密,例：Qau8w7Zxvg91lgNvOgJ9
      ip: '10.25.96.2', // 平台 IP 地址，必填,例：39.184.151.32
      playMode: 0, // 初始播放模式：0-预览，1-回放，必填
      port: 8443, // 平台端口，若启用 HTTPS 协议，默认 443，必填,例：1443
      snapDir: 'D:\\SnapDir', // 抓图存储路径，选填
      videoDir: 'D:\\VideoDir', // 紧急录像或录像剪辑存储路径，选填
      layout: '1x1', // playMode 指定模式的布局，选填
      enableHTTPS: 1, // 是否启用 HTTPS 协议与平台交互，是为 1，否为 0，选填
      encryptedFields: 'secret', // 加密字段，形如'字段 1,...,字段 n'，选填

      streamMode: 0, // 主子码流标识：0-主码流，1-子码流，json 中选填
      transMode: 1, // 传输协议：0-UDP，1-TCP，json 中选填
      gpuMode: 0, // 是否启用 GPU 硬解，0-不启用，1-启用，json 中选填
      wndId: -1, // 播放窗口序号（在 2x2 以上布局下可指定播放窗口），json 中选填
    };
  },
  watch: {
    cameraIndexCode: {
      handler: function () {
        // this.startPreview();
      },
      immediate: true,
    },
  },
  computed: {
    initOptions() {
      return {
        appkey: this.appkey,
        secret: this.secret,
        ip: this.ip,
        playMode: this.playMode,
        port: this.port,
        // snapDir: this.snapDir,
        // videoDir: this.videoDir,
        layout: this.layout,
        enableHTTPS: this.enableHTTPS,
        // encryptedFields: this.encryptedFields
      };
    },
    startOptions() {
      return {
        cameraIndexCode: this.cameraIndexCode,
        streamMode: this.streamMode,
        transMode: this.transMode,
        gpuMode: this.gpuMode,
        wndId: this.wndId,
      };
    },
  },
  mounted() {
    // window.addEventListener('resize', this.resizeEvent);
    // window.addEventListener('scroll', this.scrollEvent);
    window.addEventListener('unload', this.unloadEvent);
    setTimeout(() => {
      this.initPlugin();
    });
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.resizeEvent);
    // window.removeEventListener('scroll', this.scrollEvent);
    window.removeEventListener('unload', this.unloadEvent);
  },
  destroyed() {
    this.unloadEvent();
  },
  methods: {
    initPlugin() {
      console.log('初始化 WebControl 实例');
      const slef = this;
      // 初始化 WebControl 实例

      /* eslint-disable */

      slef.oWebControl = new WebControl({

        // 指定 DIV 窗口标识
        szPluginContainer: this.domId,
        // 指定起止端口号，建议使用该值
        iServicePortStart: 15900,
        iServicePortEnd: 15909,
        // 用于 IE10 使用 ActiveX 的 clsid
        szClassId: '23BF3B0A-2C56-4D97-9C03-0CB103AA8F11',
        // 创建 WebControl 实例成功
        cbConnectSuccess: function () {
          console.log('创建 WebControl 实例成功', slef);
          // 实例创建成功后启动服务
          slef.oWebControl
            .JS_StartService('window', {dllPath: './VideoPluginConnect.dll'})
            .then(
              // 启动插件服务成功
              function () {
                console.log('启动插件服务成功');
                // 设置消息回调
                slef.oWebControl.JS_SetWindowControlCallback({
                  cbIntegrationCallBack: slef.cbIntegrationCallBack,
                });
                // JS_CreateWnd 创建视频播放窗口，宽高可设定
                slef.oWebControl
                  .JS_CreateWnd(slef.domId, slef.width, slef.height)
                  .then(function () {
                    console.log('JS_CreateWnd 创建视频播放窗口');
                    // 创建播放实例成功后初始化
                    slef.init();
                  });
              },
              // 启动插件服务失败
              function () {
                console.error('启动插件服务失败');
              },
            );
        },
        // 创建 WebControl 实例失败
        cbConnectError: function () {
          console.error('创建 WebControl 实例失败');
          slef.oWebControl = null;
          slef.msg = '插件未启动，正在尝试启动，请稍候...';
          // 程序未启动时执行 error 函数，采用 wakeup 来启动程序
          WebControl.JS_WakeUp('VideoWebPlugin://');
          slef.initCount++;
          if (slef.initCount < 3) {
            setTimeout(function () {
              initPlugin();
            }, 3000);
          } else {
            slef.msg = '插件启动失败，请检查插件是否安装！';
          }
        },
        // 插件使用过程中发生的断开与插件服务连接的回调
        // bNormalClose = false 时表示异常断开
        // bNormalClose = true 时表示正常断开
        cbConnectClose: function (bNormalClose) {
          console.log(`插件服务连接${bNormalClose ? '正常断开' : '异常断开'}`);
          slef.oWebControl = null;
        },
      });

      /* eslint-disable */
    },
    init() {
      console.log('初始化实例');
      const slef = this;
      this.oWebControl
        .JS_RequestInterface({
          funcName: 'init',
          argument: JSON.stringify(this.initOptions),
        })
        .then(function (oData) {
          console.log(oData);
          slef.startPreview();
        });
    },
    startPreview() {
      console.log('播放对应视频');
      console.log(`${this.cameraIndexCode}-开始播放`);
      this.cameraIndexCode = this.cameraIndexCode.replace(/(^\s*)/g, '');
      this.cameraIndexCode = this.cameraIndexCode.replace(/(\s*$)/g, '');
      this.oWebControl
        .JS_RequestInterface({
          funcName: 'startPreview',
          argument: JSON.stringify(this.startOptions),
        })
        .then(function (oData) {
          console.log(oData);
        });
      this.oWebControl.JS_Resize(this.width, this.height);
    },
    unloadEvent() {
      if (this.oWebControl != null) {
        this.oWebControl.JS_HideWnd(); // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
        this.oWebControl.JS_Disconnect().then(
          function () {
          },
          function () {
          },
        );
      }
    },
    // 重绘插件窗口
    resizeVideo() {
      if (this.oWebControl != null) {
        // 重绘插件窗口
        this.oWebControl.JS_Resize(this.width, this.height);
        // 设置超出浏览器的部分插件窗口隐藏或显示，具体代码详见 demo
        this.setWndCover();
      }
    },
    // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
    setWndCover() {
      // 获取web页面的尺寸
      const iWidth = window.outerWidth;
      const iHeight = window.outerHeight;
      // 获取播放窗口div元素的左边界、右边界距离web页面左边界的长度、上边界、下边界距离web页面上边界的长度
      const oDivRect = document.getElementById(domId).getBoundingClientRect();
      // Math.round 为四舍五入    Math.abs 为取绝对值
      let iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0;
      let iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0;
      let iCoverRight =
        oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0;
      let iCoverBottom =
        oDivRect.bottom - iHeight > 0
          ? Math.round(oDivRect.bottom - iHeight)
          : 0;

      iCoverLeft = iCoverLeft > this.width ? this.width : iCoverLeft;
      iCoverTop = iCoverTop > this.height ? this.height : iCoverTop;
      iCoverRight = iCoverRight > this.width ? this.width : iCoverRight;
      iCoverBottom = iCoverBottom > this.height ? this.height : iCoverBottom;

      this.oWebControl.JS_RepairPartWindow(0, 0, this.width + 1, this.height); // 多1个像素点防止还原后边界缺失一个像素条
      // // 抠除左边界
      // if (iCoverLeft !== 0) {
      //   oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this.height + 1);
      // }
      // // 抠除上边界
      // if (iCoverTop !== 0) {
      //   oWebControl.JS_CuttingPartWindow(0, 0, this.width + 1, iCoverTop); // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
      // }
      // // 抠除右边界
      // if (iCoverRight !== 0) {
      //   oWebControl.JS_CuttingPartWindow(
      //     this.width + 1 - iCoverRight,
      //     0,
      //     iCoverRight,
      //     this.height + 1,
      //   );
      // }
      // // 抠除下边界
      // if (iCoverBottom !== 0) {
      //   oWebControl.JS_CuttingPartWindow(
      //     0,
      //     this.height + 1 - iCoverBottom,
      //     this.width + 1,
      //     iCoverBottom,
      //   );
      // }
    },
    // 申请 RSA 公钥
    getPubKey(callback) {
      this.oWebControl
        .JS_RequestInterface({
          funcName: 'getRSAPubKey',
          argument: JSON.stringify({
            // 指定秘钥长度为 1024bit
            keyLength: 1024,
          }),
        })
        .then(function (oData) {
          if (oData.responseMsg.data) {
            // 记录 RSA 公钥
            this.pubKey = oData.responseMsg.data;
            callback();
          }
        });
    },
    // RSA 公钥加密
    setEncrypt(value) {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    // 推送消息
    cbIntegrationCallBack(oData) {
      console.log('推送消息', oData.responseMsg);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
