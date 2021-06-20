<template>
  <div style="padding: 30px">
    <el-form v-if="travel" ref="travel" :model="travel" label-width="100px">
      <el-form-item label="分享标题" prop="title" label-width="100px">
        <el-input v-model="travel.title" />
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow" label-width="100px">
        <el-switch
          v-model="travel.isShow"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="分享内容预览" prop="content" label-width="100px">
        <el-input v-model="travel.content" type="textarea" :rows="2" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="底部发布端" prop="createBy" label-width="100px">
        <el-input v-model="travel.createBy" />
      </el-form-item>
      <el-form-item label="分享图" label-width="100px">
        <el-upload
          :action="uploadPictureAddress"
          :headers="uploadToken"
          name="files"
          :file-list="travel.imgList"
          list-type="picture"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getToken
} from '@/utils/auth'
import {
  saveTravel
} from '@/api/travel'
import {
  remove
} from '@/api/attachment'
export default {
  data() {
    return {
      travel: {
        title: '',
        isShow: 0,
        createBy: '',
        content: '',
        imgList: [],
        fileList: []
      },
      uploadPictureAddress: process.env.VUE_APP_BASE_API + '/api/attachment/upload/image',
      uploadToken: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  methods: {
    onSubmit() {
      const arr = this.travel.imgList.map(a => a.id)
      this.travel.fileList = arr
      saveTravel(this.travel).then((res) => {
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
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      res.result.result[0].url = res.result.result[0].path
      res.result.result[0].name = res.result.result[0].fileName
      this.travel.imgList.push(res.result.result[0])
      this.$notify.success({
        title: '上传图片成功',
        message: `图片上传成功`
      })
    },
    handleRemove(file) {
      var fileObj = file
      var params = {
        prefix: 'attachment/',
        fileName: fileObj.name,
        fileExt: fileObj.fileExt
      }
      if (file.response !== undefined && file.response !== null) {
        fileObj = file.response.result.result[0]
        params = {
          prefix: 'attachment/',
          fileName: fileObj.fileName,
          fileExt: fileObj.fileExt
        }
      }
      remove(params).then((res) => {
        if (res.result.flag) {
          this.$notify.success({
            title: '删除图片成功',
            message: `删除图片成功`
          })
        } else {
          this.$notify.error({
            title: '删除图片失败',
            message: `删除图片失败`
          })
        }
      })
    }
  }
}

</script>

<style>

</style>
