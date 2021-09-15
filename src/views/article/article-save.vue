<template>
  <div style="padding:30px;">
    <el-form ref="article" :model="article" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="article.title"/>
      </el-form-item>
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="article.categoryId" placeholder="请选择文章所属分类">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="所属标签" prop="tagIdList">
        <el-checkbox-group v-model="article.tagIdList" @change="checkBoxChange">
          <el-checkbox v-for="(tag,index) in tagList" :key="index" :label="tag.id" :v-model="false">{{ tag.name }}
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
        <el-input-number v-model="article.topSort" controls-position="right" :min="1" :max="999"/>
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
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <mavon-editor
          ref="md"
          v-model="article.content"
          :ishljs="true"
          style="height: 700px; padding-bottom: 50px;"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
        />
        <!--        <quill-editor-->
        <!--          ref="myTextEditor"-->
        <!--          v-model="article.content"-->
        <!--          style="height: 500px; padding-bottom: 50px;"-->
        <!--          :options="quillOption"-->
        <!--        />-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加文章</el-button>
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
  getAllCategory
} from '@/api/category'
import {
  saveArticle
} from '@/api/article'
import {
  getAllTag
} from '@/api/tag'
import { upload } from '@/api/attachment'

export default {
  components: {},
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
      imgFile: [],
      options: [],
      tagList: [],
      content: null,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      uploadPictureAddress: process.env.VUE_APP_BASE_API + '/api/attachment/upload/image',
      uploadToken: {
        'Authorization': 'Bearer ' + getToken()
      }
    }
  },
  created() {
    this.initLoad()
  },
  methods: {
    initLoad() {
      getAllCategory().then(res => {
        this.options = res.result
      })
      getAllTag().then(res => {
        this.tagList = res.result
      })
    },
    onSubmit() {
      console.log(this.article)
      saveArticle(this.article).then(res => {
        if (res.code === 200) {
          this.$notify.success({
            title: '保存成功',
            message: `文章保存成功`
          })
        } else {
          this.$notify.success({
            title: '提示',
            message: res.message
          })
        }
        this.resetForm('article')
      })
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
      })
    },
    checkBoxChange(value) {
      this.article.tagIdList = value
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('files', $file)
      upload(null, formdata, null).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        const _res = res.result.result[0]
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.path)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
      })
    },
    $imgDel(pos) {
      delete this.imgFile[pos]
    }
  }
}

</script>

<style>

</style>
