<template>
  <el-dialog title="friendlink.title" :visible.sync="isShowEdit" width="70%" center @open="init" @closed="closedDialog">
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
      <el-form-item label="是否显示" prop="isShow">
        <el-switch
          v-model="friendlink.isShow"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        />
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
  updateFriendLink,
  getFriendLinkById
} from '@/api/friend-link'
export default {
  props: {
    friendLinkId: {
      type: Number,
      default: 0
    },
    centerDialogVisible: {
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
        isShow: false
      }
    }
  },
  computed: {
    isShowEdit: {
      get() {
        return this.centerDialogVisible
      },
      set(val) {
        this.$emit('showDialog', val)
      }
    }
  },
  methods: {
    init() {
      getFriendLinkById(this.friendLinkId).then((res) => {
        this.friendlink = res.result
      })
    },
    onSubmit() {
      var entity = this.friendlink
      updateFriendLink(entity).then(res => {
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
      this.isShowEdit = false
    }
  }
}

</script>

<style>

</style>
