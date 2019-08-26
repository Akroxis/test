import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    textBlocks: []
  },
  getters: {
    getAllBlocks(state) {
      return state.textBlocks;
    },
    getSelectedRedComplexBlocks(state) {
      return state.textBlocks.filter(block => {
        if (block.isSelected) {
          if (block.isComplexBlock && block.complexBlockColor === "red") {
            return block;
          }
        }
      });
    },
    getSelectedGreenComplexBlocks(state) {
      return state.textBlocks.filter(block => {
        if (block.isSelected) {
          if (block.isComplexBlock && block.complexBlockColor === "green") {
            return block;
          }
        }
      });
    },
    getSelectedBlocks(state) {
      return state.textBlocks.filter(block =>
        block.isSelected ? block : null
      );
    }
  },
  mutations: {
    addNewBlock(state, payload) {
      state.textBlocks.push(payload);
    },
    setNewComplexBlockColor(state, payload) {
      const currentBlock = state.textBlocks.find(
        block => block.id === payload.id
      );
      if (currentBlock.isComplexBlock && currentBlock.complexBlockColor) {
        if (currentBlock.complexBlockColor === "red") {
          currentBlock.complexBlockColor = "green";
        } else {
          currentBlock.complexBlockColor = "red";
        }
      }
    },
    deleteBlock(state, payload) {
      state.textBlocks = state.textBlocks.filter(block =>
        block.id !== payload.id ? block : null
      );
    },
    setSelectStateToBlock(state, payload) {
      const currentBlock = state.textBlocks.find(
        block => block.id === payload.id
      );
      currentBlock.isSelected = !payload.isSelected;
    }
  },
  actions: {
    ADD_NEW_BLOCK({ commit }, payload) {
      try {
        payload && commit("addNewBlock", payload);
      } catch (e) {
        throw new Error(e);
      }
    },
    SET_NEW_COMPLEX_BLOCK_COLOR({ commit }, payload) {
      try {
        payload && commit("setNewComplexBlockColor", payload);
      } catch (e) {
        throw new Error(e);
      }
    },
    DELETE_BLOCK({ commit }, payload) {
      try {
        payload && commit("deleteBlock", payload);
      } catch (e) {
        throw new Error(e);
      }
    },
    SET_SELECTED_STATE_TO_BLOCK({ commit }, payload) {
      try {
        payload && commit("setSelectStateToBlock", payload);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
});
