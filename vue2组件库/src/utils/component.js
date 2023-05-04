import Vue from "vue";
import BaseConfirm from "@/components/BaseConfirm/index.vue";

export function confirm({
  icon,
  type,
  content,
  confirmButtonText,
  cancelButtonText,
  width,
}) {
  return new Promise((resolve, reject) => {
    const Confirm = Vue.extend({ ...BaseConfirm });
    let components = new Confirm({
      propsData: {
        icon,
        type,
        content,
        confirmButtonText,
        cancelButtonText,
        width,
      },
    });

    let el = components.$mount().$el;
    document.body.appendChild(el);
    components.$on("close", (flag) => {
      if (el) {
        document.body.removeChild(el);
        el = null;
      }

      if (flag) {
        resolve();
      } else {
        reject();
      }
    });
    components = null;
  });
}

export default {
  install(Vue) {
    Vue.prototype.$myConfirm = confirm;
  },
};
