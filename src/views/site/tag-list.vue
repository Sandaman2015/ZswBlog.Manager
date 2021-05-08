<template>
  <div style="padding: 30px">
    <div class="funny left">
      <div>美句赏析</div>
      <el-divider content-position="left">{{ randomText }}</el-divider>
      <img class="container" src="https://api.ixiaowai.cn/mcapi/mcapi.php" />
    </div>
    <div class="margin-left">
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
import { getRandomText } from "@/api/common";
export default {
  data() {
    return {
      siteTags: [],
      inputVisible: false,
      inputValue: "",
      randomText: "",
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
      getRandomText().then((res) => {
        this.randomText = res.data;
      });
    },
    saveSiteTagS(inputValue) {
      const param = {
        title: inputValue,
        operatorId: -1,
      };
      saveSiteTag(param).then((res) => {
        if (res.result == true)
          this.$notify.success({
            title: "成功",
            message: `添加站点标签成功`,
          });
        location.reload();
      });
    },
    removeSiteTags(row) {
      this.$confirm("此操作将删除该站点标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        removeSiteTag(row).then((res) => {
          if (res.result == true)
            this.$notify.success({
              title: "成功",
              message: `删除站点标签成功`,
            });
          location.reload();
        });
      });
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
        this.saveSiteTagS(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
.left {
  float: left;
  padding: 20px;
}
.margin-left {
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
.container {
  max-height: 800px;
  max-width: 500px;
}
</style>