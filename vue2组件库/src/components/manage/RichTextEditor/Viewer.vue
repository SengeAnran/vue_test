<template>
  <div class="viewer-com-root">
    <div class="w-e-text-container" :class="isFull ? 'w-e-full-screen-container' : ''">
      <div class="viewer-com-content" data-slate-editor v-html="value"></div>
      <div class="full-screen" :class="isFull ? 'full-screen-small' : ''" @click="handleFull">
        <svg viewBox="0 0 1024 1024">
          <path
            d="M133.705143 335.433143V133.851429h201.581714a29.622857 29.622857 0 0 0 29.622857-29.549715V68.754286a29.622857 29.622857 0 0 0-29.622857-29.622857H61.732571A22.893714 22.893714 0 0 0 38.765714 62.025143V335.725714c0 16.310857 13.238857 29.622857 29.622857 29.622857h35.547429a29.842286 29.842286 0 0 0 29.696-29.842285zM690.980571 133.851429h201.581715v201.654857c0 16.310857 13.238857 29.549714 29.622857 29.549714h35.547428a29.622857 29.622857 0 0 0 29.549715-29.549714V61.952a22.893714 22.893714 0 0 0-22.820572-22.893714h-273.554285a29.622857 29.622857 0 0 0-29.549715 29.622857v35.547428c0 16.310857 13.238857 29.696 29.622857 29.696zM335.286857 892.781714H133.705143V691.2a29.622857 29.622857 0 0 0-29.622857-29.622857H68.534857a29.622857 29.622857 0 0 0-29.549714 29.622857v273.554286c0 12.653714 10.24 22.893714 22.820571 22.893714h273.554286a29.622857 29.622857 0 0 0 29.696-29.622857v-35.547429a29.769143 29.769143 0 0 0-29.769143-29.696z m557.348572-201.581714v201.581714H690.907429a29.622857 29.622857 0 0 0-29.622858 29.622857v35.547429c0 16.310857 13.238857 29.622857 29.622858 29.622857h273.554285c12.580571 0 22.893714-10.313143 22.893715-22.893714V691.2a29.622857 29.622857 0 0 0-29.622858-29.622857h-35.547428a29.622857 29.622857 0 0 0-29.696 29.622857z">
          </path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: String,
  },
  data() {
    return {
      isFull: false,
    };
  },
  beforeDestroy() {
    this.lock(false);
  },
  methods: {
    isLocked() {
      const isLock = document.body.classList.contains('rich-text-editor-lock');
      return isLock;
    },
    lock(lock) {
      if (this.isLocked()) {
        if (!lock) {
          document.body.classList.remove('rich-text-editor-lock');
        }
      } else {
        if (lock) {
          document.body.classList.add('rich-text-editor-lock');
        }
      }
    },
    handleFull() {
      this.isFull = !this.isFull;
      this.lock(this.isFull);
    }
  }
};
</script>

<style lang="scss" scoped>
.viewer-com-root {
  border: 1px solid #ccc;
  border-top: 1px solid #ccc !important;
  // z-index: 1000;
  position: relative;

  .viewer-com-content {
    min-height: 200px !important;
    max-height: 400px !important;
    overflow: auto !important;
    user-select: auto !important;
  }
}

.full-screen {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: #ccc;
  color: var(--w-e-toolbar-color);
  cursor: pointer;
  opacity: 0.3;

  &:hover {
    opacity: 0.8;
  }

  svg {
    padding: 10px;
  }

  &.full-screen-small {
    z-index: 1001;
    top: 20px;
    right: 20px;

    svg {
      padding: 12px;
    }
  }
}
</style>
