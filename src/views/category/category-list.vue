<template>
  <div style="padding: 30px">
    <el-button type="primary" size="small" @click="disabledSaveDialogVisibility(true)">新增</el-button>
    <el-table :data="categoryList" border style="width: 100%">
      <el-table-column prop="id" label="编码" width="180" />
      <el-table-column prop="name" label="标题" width="180" />
      <el-table-column prop="description" label="副标题" width="180" />
      <el-table-column prop="articleCount" label="文章数量" width="180" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.createDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="categoryEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="removeCategoryById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-box :categoryId="isShow.showId" :centerDialogVisible="isShow.showEdit"
      @showDialog="disabledEditDialogVisibility" />
    <save-box :categoryId="isShow.showId" :centerDialogVisible="isShow.showSave"
      @showDialog="disabledSaveDialogVisibility" />
  </div>
</template>

<script>
  import {
    getAllCategory,
    removeCategory
  } from '@/api/category'
  import SaveBox from './category-save'
  import EditBox from './category-edit'
  export default {
    components: {
      SaveBox,
      EditBox
    },
    filters: {
      timeFilter: function (date) {
        date = date.toString().replace('T', ' ')
        if (date === '0001-01-01 00:00:00') {
          return '无'
        } else {
          return date
        }
      }
    },
    data() {
      return {
        categoryList: [],
        isShow: {
          showEdit: false,
          showSave: false,
          showId: 0,
          showDetails: false
        },
        options: []
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        const params = {}
        getAllCategory(params).then((res) => {
          this.categoryList = res.result
        })
      },
      categoryEdit(row) {
        this.isShow.showEdit = true
        this.isShow.showId = row.id
      },
      removeCategoryById(row) {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeCategory(row.id)
            .then((res) => {
              console.log(res)
              if (res.result === true) {
                this.$notify.success({
                  title: '删除成功',
                  message: `删除成功`
                })
              } else {
                this.$notify.success({
                  title: '未成功提示',
                  message: res.message
                })
              }
            })
        })
        this.initPage()
      },
      disabledEditDialogVisibility(val) {
        this.isShow.showEdit = val
        this.initPage()
      },
      disabledSaveDialogVisibility(val) {
        this.isShow.showSave = val
        this.initPage()
      }
    }
  }

</script>

<style>
</style>
