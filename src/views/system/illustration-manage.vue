<template>
  <div style="padding:30px">
    <div>
      <h3>上传列表：</h3>
      <el-divider></el-divider>
      <el-upload class="upload-demo" :limit="5" :action="uploadPictureAddress" :headers="uploadToken"
        :on-exceed="beforeUpload" :on-remove="handleRemove" :file-list="fileList" name="files" :on-error="handleError"
        :on-success="handleSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传图片文件，且最佳格式为1920 × 479像素</div>
      </el-upload>
      <el-divider></el-divider>
      <el-button size="small" type="primary" @click="onSubmit">点我更新</el-button>
    </div>
    <div class="zp">
      <h3>插图预览：</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="4.5" v-for="(item, index) in fileList" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.src" class="image">
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="handleRemove">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {
    getToken
  } from "@/utils/auth";
  import {
    getIllustrationConfig,
    updateIllustrationConfig
  } from "@/api/common"
  export default {
    data() {
      return {
        fileList: [],
        uploadPictureAddress: process.env.VUE_APP_BASE_API + "/api/attachment/upload/image",
        uploadToken: {
          Authorization: "Bearer " + getToken(),
        },
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        getIllustrationConfig().then((res) => {
          this.fileList = res.result;
          for (let i = 0; i < this.fileList.length; i++) {
            this.fileList[i].name = "插图" + (i + 1);
          }
        })
      },
      onSubmit() {
        let data = this.fileList;
        updateIllustrationConfig(data).then((res) => {
          if (res.result) {
            this.$notify.success({
              title: "更新插图列表成功",
              message: `更新插图列表成功`,
            });
          }
        })
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        this.$notify.success({
          title: "上传Banner成功",
          message: `Banner图上传成功`,
        });
        file.src = res.result.result[0].path;
        this.fileList.push(file);
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$notify.error({
          title: "上传Banner错误",
          message: `Banner图上传失败`,
        });
      },
      handleRemove(file) {
        console.log(file);
        console.log(this.fileList)
        this.fileList.splice(this.fileList.findIndex(item => item.name === file.name), 1)
      },
      beforeUpload(file) {
        if (this.fileList.length >= 5) {
          this.$notify({
            title: "上传插图错误",
            message: `插图上传最多允许5张`,
            type: 'warning'
          });
        }
      }
    }
  }

</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .zp {
    margin-top: 20px;
  }

</style>
