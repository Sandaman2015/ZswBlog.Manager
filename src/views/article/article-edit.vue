<template>
  <el-dialog :title="article.title" :visible.sync="centerDialogVisible" width="70%" @open="init" center>
    <el-form ref="article" v-if="article" :model="article" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="article.categoryId" placeholder="请选择文章所属分类">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属标签" prop="tagIdList">
        <el-checkbox-group v-model="article.tagIdList" @change="checkBoxChange">
          <el-checkbox v-for="(tag,index) in tagList" :label="tag.id" :key="index" :v-model="false">{{tag.name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-switch v-model="article.isShow" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否置顶" prop="isTop">
        <el-switch v-model="article.isTop" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="置顶排序" prop="topSort">
        <el-input-number v-model="article.topSort" controls-position="right" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="Banner图">
        <el-upload :action="uploadPictureAddress" :headers="uploadToken" name="files" list-type="picture-card"
          :limit="1" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error="handleError"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <quill-editor ref="myTextEditor" style="height: 500px; padding-bottom: 50px;" v-model="article.content"
          :options="quillOption"></quill-editor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">返回</el-button>
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
    getAllCategory
  } from '@/api/category'
  import {
    saveArticle
  } from '@/api/article'
  import {
    getAllTag
  } from '@/api/tag'
  import {
    articleDetails
  } from '@/api/article.js';
  export default {
    components: {
      quillEditor
    },
    props: {
      articleId: {
        type: Number,
        default: 0
      },
      centerDialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        article: {
          title: '',
          content: '',
          categoryId: '',
          isShow: true,
          coverImage: '',
          isTop: false,
          topSort: 0,
          tagIdList: []
        },
        options: [],
        tagList: [],
        content: null,
        quillOption: quillConfig,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        uploadPictureAddress: process.env.VUE_APP_BASE_API + "/api/attachment/upload/image",
        uploadToken: {
          "Authorization": "Bearer " + getToken()
        }
      }
    },
    methods: {
      init() {
        this.initLoad()
        articleDetails(this.articleId).then((res) => {
          console.log(res);
          this.article = res.result
        })
      },
      initLoad() {
        getAllCategory().then(res => {
          this.options = res.result
        })
        getAllTag().then(res => {
          this.tagList = res.result
        })
      },
      onSubmit() {
        saveArticle(this.article).then(res => {
          if (res.code == 200) {
            this.$notify.success({
              title: '保存成功',
              message: `文章保存成功`
            });
          } else {
            this.$notify.success({
              title: '提示',
              message: res.message
            });
          }
          this.resetForm('article')
        })
        this.centerDialogVisible = false;
      },
      resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields()
        }
      },
      handleRemove(file) {
        console.log(file)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, fileList) {
        this.article.coverImage = res.result.result[0].path
        this.$notify.success({
          title: '上传Banner成功',
          message: `Banner图上传成功`
        });
      },
      // 文件上传失败时的钩子
      handleError(err, file, fileList) {
        this.$notify.error({
          title: '上传Banner错误',
          message: `Banner图上传失败`
        });
      },
      checkBoxChange(value) {
        this.article.tagIdList = value
      }
    }
  }

</script>

<style>
.ql-editor .ql-video{
    width: 100%!important;
    height: 100%!important;
}
</style>
