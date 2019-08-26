<template>
  <div class="main-page__container">
    <div class="statistics__container">
      <div class="selected-blocks__counter">
        Количество выделенных блоков: {{ selectedBlocks }}
      </div>
      <div class="selected-red-blocks__counter">
        Количество выделенных красных блоков: {{ selectedRedBlocks }}
      </div>
      <div class="selected-green-blocks__counter">
        Количество выделенных зеленых блоков: {{ selectedGreenBlocks }}
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
    <RemoveBlockPop
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
    </RemoveBlockPop>
  </div>
</template>

<script>
import TextBlock from "../components/TextBlock";
import RemoveBlockPop from "../components/DefaultPopUp";
export default {
  name: "MainPage",
  components: { TextBlock, RemoveBlockPop },
  data() {
    return {
      isRemoveBlockModalVisible: false,
      selectedBlock: null
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
  methods: {
    triggerRemoveBlockPop(block) {
      const data = { ...block };
      this.$store.dispatch("DELETE_BLOCK", data).then(resolve => {
        this.isRemoveBlockModalVisible = false;
      });
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
    setSelectedState(block) {
      const data = { ...block };
      console.log("state");
      this.$store.dispatch("SET_SELECTED_STATE_TO_BLOCK", data);
    },
    setNewColor(block) {
      if (block.isComplexBlock) {
        const data = { ...block };
        console.log(data);
        this.$store.dispatch("SET_NEW_COMPLEX_BLOCK_COLOR", data);
      }
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
</style>
