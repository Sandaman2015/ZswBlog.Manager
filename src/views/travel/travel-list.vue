<template>
  <div style="padding: 30px">
    <el-table :data="travelList" style="width:100%;">
      <el-table-column prop="id" label="编码" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="createBy" label="发布端" />
      <el-table-column prop="content" label="内容" />
      <el-table-column label="是否显示" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="显示"
            inactive-text="不显示"
          />
        </template>
      </el-table-column>
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
          <el-button type="primary" size="small" @click="travelEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="travelRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <edit-box
      :travel-id="isShow.showId"
      :-center-dialog-visible="isShow.showEdit"
      @showDialog="disabledDialogVisibility"
    />
  </div>
</template>

<script>
import {
  travelList,
  removeTravel
} from '@/api/travel.js'
import EditBox from './travel-edit'
export default {
  components: {
    EditBox
  },
  filters: {
    timeFilter: function(date) {
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
      total: 0,
      pageIndex: 1,
      limit: 15,
      travelList: [],
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
      travelList(this.limit, this.pageIndex).then((res) => {
        this.travelList = res.result.data
        this.total = res.result.count
      })
    },
    handleCurrentChange() {
      travelList(this.limit, this.pageIndex).then((res) => {
        this.travelList = res.result.data
        this.total = res.result.count
      })
    },
    handleSizeChange() {

    },
    // 编辑事件
    travelEdit(row) {
      this.isShow.showEdit = true
      this.isShow.showId = row.id
    },
    // 删除事件
    travelRemove(row) {
      this.$confirm('此操作将永久删除该分享, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeTravel(row.id).then((res) => {
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
  .img-content {
    width: 100%;
    height: 80px;
  }

  .img-content>>>img {
    width: 80px;
    height: 100%;
  }

</style>
