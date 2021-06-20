<template>
  <el-dialog :visible.sync="isShowEdit" width="70%" center @closed="closedDialog">
    <el-form v-if="timeLine" ref="timeLine" :model="timeLine">
      <el-form-item label="分享标题" prop="title" label-width="100px">
        <el-input v-model="timeLine.title" />
      </el-form-item>
      <el-form-item label="分享内容预览" prop="content" label-width="100px">
        <quill-editor
          ref="myTextEditor"
          v-model="timeLine.content"
          style="height: 500px; padding-bottom: 50px"
          :options="quillOption"
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
  getToken
} from '@/utils/auth'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {
  quillEditor
} from 'vue-quill-editor'
import quillConfig from '@/store/modules/quill-editor-config.js'
import {
  saveTimeline
} from '@/api/timeline'
export default {
  components: {
    quillEditor
  },
  props: {
    _centerDialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      timeLine: {
        title: '',
        content: '',
        operatorId: -1
      },
      quillOption: quillConfig,
      uploadPictureAddress: process.env.VUE_APP_BASE_API + '/api/attachment/upload/image',
      uploadToken: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  computed: {
    isShowEdit: {
      get() {
        return this._centerDialogVisible
      },
      set(val) {
        this.$emit('showDialog', val)
      }
    }
  },
  methods: {
    closedDialog() {
      this.isShowEdit = false
    },
    onSubmit() {
      saveTimeline(this.timeLine).then((res) => {
        if (res.code === 200) {
          this.$notify.success({
            title: '保存成功',
            message: `旅行分享保存成功`
          })
        } else {
          this.$notify.success({
            title: '未成功提示',
            message: res.message
          })
        }
        this.resetForm('travel')
      })
      this.closedDialog()
    }
  }
}

</script>

<style>
</style>
