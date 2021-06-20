<template>
  <el-dialog :visible.sync="isShowSave" width="70%" center @closed="closedDialog">
    <el-form v-if="category" ref="category" :model="category">
      <el-form-item label="分类标题" prop="title" label-width="100px">
        <el-input v-model="category.name" />
      </el-form-item>
      <el-form-item label="副标题预览" prop="content" label-width="100px">
        <el-input v-model="category.description" type="textarea" :rows="2" placeholder="请输入内容" />
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
  saveCategory
} from '@/api/category'
export default {
  props: {
    categoryId: {
      type: Number,
      default: 0
    },
    centerDialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      category: {
        id: 0,
        name: '',
        operatorId: -1,
        description: ''
      }
    }
  },
  computed: {
    isShowSave: {
      get() {
        return this.centerDialogVisible
      },
      set(val) {
        this.$emit('showDialog', val)
      }
    }
  },
  methods: {
    closedDialog() {
      this.isShowSave = false
    },
    onSubmit() {
      saveCategory(this.category).then((res) => {
        if (res.code === 200) {
          this.$notify.success({
            title: '保存成功',
            message: `分类保存成功`
          })
        } else {
          this.$notify.success({
            title: '未成功提示',
            message: res.message
          })
        }
        this.resetForm('category')
      })
      this.closedDialog()
    }

  }
}

</script>

<style>

</style>
