<template>
  <div class="new-contact-pop__backdrop">
    <div class="new-contact-pop__content">
      <header class="modal-header">
        <slot name="header">{{ title }}</slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
          aria-label="Close modal"
        >
          x
        </button>
      </header>
      <section class="modal-body">
        <slot name="body"></slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultPopUp",
  props: {
    title: {
      type: String,
      default: "Default Title"
    },
    block: {
      type: Object,
      required: false
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
.new-contact-pop__backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .new-contact-pop__content {
    min-height: 200px;
    min-width: 300px;
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    .modal-header,
    .modal-footer {
      padding: 15px;
      display: flex;
    }

    .modal-header {
      display: flex;
      border-bottom: 1px solid #eeeeee;
      background-color: DodgerBlue;
      color: white;
      justify-content: center;
      .btn-close {
        border: none;
        font-size: 16px;
        cursor: pointer;
        color: white;
        background: transparent;
        margin-left: auto;
      }
    }
    .modal-body {
      height: 100%;
      padding: 20px 10px;

    }
  }
}
</style>
