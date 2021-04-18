<template>
  <el-dialog :visible.sync="isShowEdit" width="70%" @open="init" @closed="closedDialog" center>
    <el-form ref="travel" v-if="travel" :model="travel">
      <el-form-item label="分享标题" prop="title" label-width="100px">
        <el-input v-model="travel.title"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow" label-width="100px">
        <el-switch v-model="travel.isShow" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="分享内容预览" prop="content" label-width="100px">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="travel.content">
        </el-input>
      </el-form-item>
      <el-form-item label="底部发布端" prop="createBy" label-width="100px">
        <el-input v-model="travel.createBy"></el-input>
      </el-form-item>
      <el-form-item label="分享图" label-width="100px">
        <el-upload :action="uploadPictureAddress" :headers="uploadToken" name="files" :file-list="travel.imgList"
          list-type="picture" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
  } from "@/utils/auth";
  import {
    getTravelById,
    updateTravel
  } from "@/api/travel";
  import {
    remove
  } from "@/api/attachment";
  export default {
    data() {
      return {
        travel: {
          id: 0,
          title: "",
          isShow: 0,
          createBy: "",
          content: "",
          imgList: [],
          fileList: []
        },
        uploadPictureAddress: process.env.VUE_APP_BASE_API + "/api/attachment/upload/image",
        uploadToken: {
          Authorization: "Bearer " + getToken(),
        }
      }
    },
    props: {
      travelId: {
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
        getTravelById(this.travelId).then((res) => {
          this.travel = res.result;
        });
      },
      closedDialog() {
        this.isShowEdit = false
      },
      onSubmit() {
        let arr = this.travel.imgList.map(a => a.id);
        this.travel.fileList = arr;
        updateTravel(this.travel).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$notify.success({
              title: '保存成功',
              message: `旅行分享保存成功`
            });
          } else {
            this.$notify.success({
              title: '未成功提示',
              message: res.message
            });
          }
          this.resetForm('travel')
        })
        this.closedDialog();
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        res.result.result[0].url = res.result.result[0].path;
        res.result.result[0].name = res.result.result[0].fileName;
        this.travel.imgList.push(res.result.result[0]);
        this.$notify.success({
          title: "上传图片成功",
          message: `图片上传成功`,
        });
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$notify.error({
          title: "上传图片错误",
          message: `图片上传失败`,
        });
      },
      handleRemove(file) {
        var fileObj = file;
        var params = {
          prefix: "attachment/",
          fileName: fileObj.name,
          fileExt: fileObj.fileExt
        }
        if (file.response !== undefined && file.response !== null) {
          fileObj = file.response.result.result[0];
          var params = {
            prefix: "attachment/",
            fileName: fileObj.fileName,
            fileExt: fileObj.fileExt
          };
        }
        remove(params).then((res) => {
          if (res.result.flag) {
            this.$notify.success({
              title: "删除图片成功",
              message: `删除图片成功`,
            });
          } else {
            this.$notify.error({
              title: "删除图片失败",
              message: `删除图片失败`,
            });
          }
        });
      },
    }
  }

</script>

<style>

</style>
