<template>
  <el-dialog title="申请友情链接" :visible.sync="isShowSave" width="70%" center @closed="closedDialog">
    <el-form v-if="friendlink" ref="friendlink" :model="friendlink" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="friendlink.title" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="图标" prop="portrait">
        <el-input v-model="friendlink.portrait" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="地址" prop="src">
        <el-input v-model="friendlink.src" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="friendlink.description" placeholder="请输入内容" />
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
  saveFriendLink
} from '@/api/friend-link'
export default {
  props: {
    _centerDialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      friendlink: {
        id: 0,
        title: '',
        portrait: '',
        src: '',
        description: '',
        operatorId: -1
      }
    }
  },
  computed: {
    isShowSave: {
      get() {
        return this._centerDialogVisible
      },
      set(val) {
        this.$emit('showDialog', val)
      }
    }
  },
  methods: {
    onSubmit() {
      var entity = this.friendlink
      saveFriendLink(entity).then(res => {
        if (res.code === 200) {
          this.$notify.success({
            title: '保存成功',
            message: `友情链接保存成功`
          })
        } else {
          this.$notify.success({
            title: '未成功提示',
            message: res.message
          })
        }
      })
      this.closedDialog()
    },
    closedDialog() {
      this.isShowSave = false
      console.log(this.isShowSave)
    }
  }
}

</script>

<style>

</style>
