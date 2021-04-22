<template>
  <div style="padding: 30px">
    <div class="funny left">
      <div>美句赏析</div>
      <el-divider content-position="left"
        >我决定喜欢你一辈子，不是你的一辈子，是我的一辈子，只要我还活着，就会一直喜欢下去。</el-divider
      >
      <img
        src="https://pic.netbian.com/uploads/allimg/191011/232054-15708072547304.jpg"
      />
    </div>
    <div class="funny margin-left">
      <el-tag
        v-for="tag in siteTags"
        :key="tag.name"
        closable
        @close="removeSiteTags(tag.id)"
        style="margin: 5px"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ New Tag</el-button
    >
  </div>
</template>

<script>
import { getSiteTags, saveSiteTag, removeSiteTag } from "@/api/site-tag.js";
export default {
  data() {
    return {
      siteTags: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      const params = {};
      getSiteTags(params).then((res) => {
        this.siteTags = res.result;
      });
    },
    // saveSiteTagS() {
    //   const param = {};
    //   saveSiteTag(param).then((res) => {});
    // },
    removeSiteTags(row) {
      saveSiteTag(row.id).then((res) => {});
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
.left{
  float: left;
  padding: 20px;
}
.margin-left{
  padding-left: 20px;
}
.funny {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>