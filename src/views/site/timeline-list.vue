<template>
  <div style="padding: 30px">
    <el-button type="primary" size="small" @click="disabledDialogVisibility(true)">新增</el-button>
    <el-table :data="timeLineList" style="width: 100%">
      <el-table-column prop="id" label="编码" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.createDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column class="container" label="内容" width="600">
        <template slot-scope="scope">
          <div class="container" v-html="scope.row.content"> {{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="timeLineRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-box :centerDialogVisible="isShow.showEdit" @showDialog="disabledDialogVisibility" />
  </div>
</template>

<script>
  import {
    getTimeLineList,
    removeTimeLine
  } from '@/api/timeline.js'
  import EditBox from './timeline-save'
  export default {
    components: {
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
        timeLineList: [],
        isShow: {
          showEdit: false,
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
        getTimeLineList().then((res) => {
          this.timeLineList = res.result
        })
      },
      // 编辑事件
      timeLineSave(row) {
        this.isShow.showEdit = true
        this.isShow.showId = row.id
      },
      // 删除事件
      timeLineRemove(row) {
        this.$confirm('此操作将永久删除该分享, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            removeTimeLine(row.id).then((res) => {
              if (res.code === 200) {
                this.$notify.success({
                  title: '删除成功',
                  message: `删除成功`
                })
                this.initPage()
              } else {
                this.$notify.success({
                  title: '未成功提示',
                  message: res.message
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      disabledDialogVisibility(val) {
        this.isShow.showEdit = val
        this.initPage()
      }
    }
  }

</script>

<style scoped>
  .container {
    max-width: 600px;
    max-height: 200px;
    overflow-y: scroll;
    overflow-y: scroll；
  }

</style>
