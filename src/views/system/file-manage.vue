<template>
  <div style="padding:30px">
    <div v-for="(item,index) in imgList" :key="index" class="item">
      <div class="container">
        <el-image
          :src="item.path"
          :preview-src-list="imgList.path"
          alt="图片列表"
          style="width: 220px; height: 200px"
          fit="cover"
        />
        <span class="intro display"> {{ item.fileName }}</span>
        <el-button class="display stration" @click="removeFile(item)">删除</el-button>
      </div>
    </div>
    <div class="block">
      <el-pagination
        background
        :page-size="page.pageSize"
        :current-page.sync="page.pageIndex"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {
  getAll,
  remove
} from '@/api/attachment'
export default {
  data() {
    return {
      page: {
        pageSize: 48,
        pageIndex: 1
      },
      imgList: [],
      total: 0
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      getAll(this.page).then((res) => {
        this.imgList = res.result.data
        this.total = res.result.count
      })
    },
    removeFile(file) {
      var params = {
        prefix: 'attachment/',
        fileName: file.fileName,
        fileExt: file.fileExt
      }
      remove(params).then((res) => {
        if (res.result.flag) {
          this.$notify.success({
            title: '删除图片成功',
            message: `删除图片成功`
          })
          this.initPage()
        } else {
          this.$notify.error({
            title: '删除图片失败',
            message: `删除图片失败`
          })
        }
      })
    },
    handleCurrentChange() {
      getAll(this.page).then((res) => {
        this.imgList = res.result.data
        this.total = res.result.count
      })
    }
  }
}

</script>

<style scoped>
  .item {
    float: left;
    padding: 1.5em;
  }

  .block {
    float: right;
    /* padding: 1.5em; */
  }

  .container {
    position: relative;
  }

  .container button {
    display: none;
    position: absolute;
    left: -1px;
    top: 200px;
    width: 220px;
  }

  .container:hover .display {
    display: block;
  }

  .display {
    display: none;
  }

  .container .intro {
    position: absolute;
    left: -1px;
    top: 185px;
    width: 220px;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

</style>
