<template>
  <div class="main-page__container">
    <div class="upper__container">
      <button class="confirm__btn" @click="triggerAddBlockPop">
        Добавить новый блок
      </button>
    </div>
    <div class="statistics__container" v-if="!!allTextBlocks.length">
      <div class="selected-blocks__counter">
        Всего блоков: {{ allTextBlocks.length }}
      </div>
      <div class="selected-blocks__counter">
        Выделено блоков: {{ selectedBlocks }}
      </div>
      <div class="selected-red-blocks__counter">
        Выделено <span class="red__text">красных</span> блоков:
        {{ selectedRedBlocks }}
      </div>
      <div class="selected-green-blocks__counter">
        Выделено <span class="green__text">зеленых</span> блоков:
        {{ selectedGreenBlocks }}
      </div>
    </div>
    <div class="text-blocks__container">
      <div
        class="text-block__item"
        v-for="block in allTextBlocks"
        :key="block.id"
      >
        <TextBlock
          :id="block.id"
          @setNewColor="setNewColor(block)"
          @removeBlock="removeCurrentBlock(block)"
          @setSelectedState="setSelectedState(block)"
          :text-value="block.textValue"
          :is-complex-block="block.isComplexBlock"
          :is-selected="block.isSelected"
          :complex-block-color="
            block.isComplexBlock ? block.complexBlockColor : null
          "
        ></TextBlock>
      </div>
    </div>
    <PopUp
      @close="isRemoveBlockModalVisible = false"
      v-if="isRemoveBlockModalVisible"
      :title="`Удаление блока ${selectedBlock.id}`"
    >
      <template v-slot:body>
        <button
          class="confirm__btn"
          @click="triggerRemoveBlockPop(selectedBlock)"
        >
          Подтвердить
        </button>
      </template>
    </PopUp>
    <PopUp
      @close="isAddNewBlockModalVisible = false"
      v-if="isAddNewBlockModalVisible"
      title="Добавление блока"
    >
      <template v-slot:body>
        <div class="block-complexity__content">
          <label class="container"
            >Сложный блок
            <input type="checkbox" v-model="isChecked" />
            <span class="checkmark"></span>
          </label>
        </div>
        <button class="confirm__btn" @click="addNewBlock(isChecked)">
          Подтвердить
        </button>
      </template>
    </PopUp>
  </div>
</template>

<script>
import TextBlock from "../components/TextBlock";
import PopUp from "../components/DefaultPopUp";
const uuid = require("uuid/v1");
export default {
  name: "MainPage",
  components: { TextBlock, PopUp },
  data() {
    return {
      isRemoveBlockModalVisible: false,
      selectedBlock: null,
      isAddNewBlockModalVisible: false,
      isChecked: false,
      newBlockContent: "",
      isNewBlockContentFilled: null
    };
  },
  computed: {
    allTextBlocks() {
      return this.$store.getters.getAllBlocks;
    },
    selectedBlocks() {
      return this.$store.getters.getSelectedBlocks.length;
    },
    selectedRedBlocks() {
      return this.$store.getters.getSelectedRedComplexBlocks.length;
    },
    selectedGreenBlocks() {
      return this.$store.getters.getSelectedGreenComplexBlocks.length;
    }
  },
  created() {
    this.generateInitialBlocks(Math.floor(Math.random() * 9) + 1);
  },
  methods: {
    generateInitialBlocks(blocksCount) {
      for (let i = 0; i < blocksCount; i++) {
        const randomBoolean = Math.random() >= 0.5;
        this.addNewBlock(randomBoolean);
      }
    },
    addNewBlock(isComplex) {
      const data = {
        id: uuid(),
        textValue: this.generateBlockContent(
          Math.floor(Math.random() * 71) + 10
        ),
        isComplexBlock: isComplex,
        complexBlockColor: isComplex ? "red" : null,
        isSelected: false
      };
      this.$store.dispatch("ADD_NEW_BLOCK", data).then(
        resolve => {
          this.isAddNewBlockModalVisible = false;
          this.newBlockContent = "";
          this.isChecked = false;
        },
        reject => {
          throw new Error("An error");
        }
      );
    },
    triggerRemoveBlockPop(block) {
      const data = { ...block };
      this.$store.dispatch("DELETE_BLOCK", data).then(
        resolve => {
          this.isRemoveBlockModalVisible = false;
          this.selectedBlock = null;
        },
        reject => {
          throw new Error("An error");
        }
      );
    },
    removeCurrentBlock(block) {
      const data = { ...block };
      if (!block.isComplexBlock) {
        this.$store.dispatch("DELETE_BLOCK", data);
      } else {
        this.selectedBlock = block;
        this.isRemoveBlockModalVisible = true;
      }
    },
    triggerAddBlockPop() {
      this.isAddNewBlockModalVisible = true;
    },
    setSelectedState(block) {
      const data = { ...block };
      this.$store.dispatch("SET_SELECTED_STATE_TO_BLOCK", data);
    },
    setNewColor(block) {
      if (block.isComplexBlock) {
        const data = { ...block };
        this.$store.dispatch("SET_NEW_COMPLEX_BLOCK_COLOR", data);
      }
    },
    generateBlockContent(textLength) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < textLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
.main-page__container {
  margin: 0 auto;
  max-width: 980px;

  .statistics__container {
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    user-select: none;
  }
  .text-blocks__container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
.red__text {
  color: red;
}

.green__text {
  color: green;
}

.confirm__btn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 14px;
  margin: 30px auto;
}

/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}


.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #2196f3;
}


.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}


.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
