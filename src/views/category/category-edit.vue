<template>
  <el-dialog :visible.sync="isShowEdit" width="70%" @open="init" @closed="closedDialog" center>
    <el-form ref="category" v-if="category" :model="category">
      <el-form-item label="分类标题" prop="title" label-width="100px">
        <el-input v-model="category.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题预览" prop="content" label-width="100px">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="category.description">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closedDialog">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    getCategory,
    updateCategory
  } from "@/api/category";
  export default {
    data() {
      return {
        category: {
          id: 0,
          name: "",
          operatorId: -1,
          description: ""
        }
      }
    },
    props: {
      categoryId: {
        type: Number,
        default: 0,
      },
      _centerDialogVisible: {
        type: Boolean,
      },
    },
    computed: {
      isShowEdit: {
        get() {
          return this._centerDialogVisible
        },
        set(val) {
          this.$emit("showDialog", val)
        },
      },
    },
    methods: {
      init() {
        getCategory(this.categoryId).then((res) => {
          this.category = res.result;
        });
      },
      closedDialog() {
        this.isShowEdit = false
      },
      onSubmit() {
        updateCategory(this.category).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$notify.success({
              title: '保存成功',
              message: `分类保存成功`
            });
          } else {
            this.$notify.success({
              title: '未成功提示',
              message: res.message
            });
          }
          this.resetForm('category')
        })
        this.closedDialog();
      }
    }
  }

</script>

<style>

</style>
