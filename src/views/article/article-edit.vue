<template>
  <el-dialog :title="article.title" :visible.sync="isShowEdit" width="70%" center @open="init" @closed="closedDialog">
    <el-form v-if="article" ref="article" :model="article" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="article.categoryId" placeholder="请选择文章所属分类">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属标签" prop="tags">
        <el-checkbox-group v-model="article.tags" @change="checkBoxChange">
          <el-checkbox v-for="(tag, index) in tagList" :key="index" :label="tag.id" :v-model="false">{{ tag.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-switch
          v-model="article.isShow"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="是否置顶" prop="isTop">
        <el-switch
          v-model="article.isTop"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="置顶排序" prop="topSort">
        <el-input-number v-model="article.topSort" controls-position="right" :min="1" :max="999" />
      </el-form-item>
      <el-form-item label="Banner图">
        <el-upload
          :action="uploadPictureAddress"
          :headers="uploadToken"
          name="files"
          list-type="picture-card"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" width="20%">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <quill-editor
          ref="myTextEditor"
          v-model="article.content"
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
  getAllCategory
} from '@/api/category'
import {
  updateArticle
} from '@/api/article'
import {
  getAllTag
} from '@/api/tag'
import {
  articleDetails
} from '@/api/article.js'
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
      type: Boolean
    }
  },
  data() {
    return {
      article: {
        id: 0,
        title: '',
        content: '',
        categoryId: '',
        isShow: true,
        coverImage: '',
        isTop: false,
        topSort: 0,
        tags: [],
        tagIdList: []
      },
      options: [],
      tagList: [],
      content: null,
      quillOption: quillConfig,
      dialogImageUrl: '',
      dialogVisible: true,
      disabled: false,
      uploadPictureAddress: process.env.VUE_APP_BASE_API + '/api/attachment/upload/image',
      uploadToken: {
        Authorization: 'Bearer ' + getToken()
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
      this.initLoad()
      this.dialogVisible = true
      articleDetails(this.articleId).then((res) => {
        this.article = res.result
        this.article.tags = this.article.tags.map((o) => o.id)
        this.dialogImageUrl = res.result.coverImage
      })
    },
    initLoad() {
      getAllCategory().then((res) => {
        this.options = res.result
      })
      getAllTag().then((res) => {
        this.tagList = res.result
      })
    },
    onSubmit() {
      this.article.tagIdList = this.article.tags
      updateArticle(this.article).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$notify.success({
            title: '保存成功',
            message: `文章保存成功`
          })
        } else {
          this.$notify.success({
            title: '未成功提示',
            message: res.message
          })
        }
        this.resetForm('article')
      })
      this.closedDialog()
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    closedDialog() {
      this.isShowEdit = false
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
      })
    },
    checkBoxChange(value) {
      this.article.tagIdList = value
    }
  }
}

</script>

<style>
  .ql-editor .ql-video {
    width: 100% !important;
    height: 100% !important;
  }

</style>
