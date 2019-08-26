<template>
  <div
    class="text-block__container"
    :class="{ selected__block: isSelected }"
    ref="mainContainer"
  >
    <div
      class="text-block__upper-panel"
      :class="{
        'complex-red__block': complexBlockColor === 'red',
        'complex-green__block': complexBlockColor === 'green',
        default__block: !complexBlockColor
      }"
    >
      <button class="close__btn" @click="removeBlock">x</button>
    </div>
    <div class="text-block__body">
      {{ textValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TextBlock",
  props: {
    id: {
      type: Number,
      required: true
    },
    textValue: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    },
    isComplexBlock: {
      type: Boolean,
      required: true
    },
    complexBlockColor: {
      type: String,
      required: false
    }
  },
  methods: {
    removeBlock(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit("removeBlock");
    },
    clickHandler() {
      const targetElement = this.$refs.mainContainer;
      let prevent = false;
      let timer = null;
      let delay = 500;
      const clickListener = e => {
        e.preventDefault();
        e.stopPropagation();
        timer = setTimeout(() => {
          if (!prevent) {
            this.$emit("setSelectedState");
          }
          prevent = false;
        }, delay);
      };
      const doubleClickListener = e => {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(timer);
        prevent = true;
        this.$emit("setNewColor");
      };
      targetElement.addEventListener("click", clickListener);
      targetElement.addEventListener("dblclick", doubleClickListener);
    }
  },
  mounted() {
    this.clickHandler();
  }
};
</script>

<style scoped lang="scss">
.text-block__container {
  display: flex;
  flex-flow: column nowrap;
  margin: 20px 0;
  width: 140px;
  height: 180px;
  border: 1px solid gray;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  .text-block__upper-panel {
    display: flex;
    flex-flow: row nowrap;
    .close__btn {
      border: none;
      font-size: 14px;
      cursor: pointer;
      color: white;
      background: transparent;
      margin-left: auto;
      outline: none;
      user-select: none;
    }
  }
  .text-block__body {
    border-top: none;
    margin: 10px auto;
    box-sizing: border-box;
    max-width: 90%;
    word-wrap: break-word;
    user-select: none;
  }

  .default__block {
    background-color: dodgerblue;
  }
  .complex-red__block {
    background-color: red;
  }
  .complex-green__block {
    background-color: green;
  }
}
.selected__block {
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-color: black;
}
</style>
