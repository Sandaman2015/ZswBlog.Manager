<template>
  <div style="padding: 30px">
    <el-button type="primary" size="small" icon="el-icon-edit" @click="isShow.showSave = true">新建公告</el-button>
    <el-table :data="announcementList" style="width: 100%">
      <el-table-column prop="id" label="编码" width="180" />
      <el-table-column prop="content" label="公告内容" width="180" />
      <el-table-column prop="isTop" label="是否置顶" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.isTop == true ? "是" : "否" }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.createDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束推送时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.endPushDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="removeAnnouncementById(scope.row)">删除</el-button>
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
    <save-box :-center-dialog-visible="isShow.showSave" @showDialog="disabledDialogVisibility" />
  </div>
</template>

<script>
import {
  getAnnouncement,
  removeAnnouncement
} from '@/api/announcement'
import SaveBox from './announcement-save'
export default {
  components: {
    SaveBox
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
      announcementList: [],
      total: 0,
      pageIndex: 1,
      limit: 15,
      isShow: {
        showSave: false,
        showId: 0
      }
    }
  },
  mounted() {
    this.getInitPage()
  },
  methods: {
    getInitPage() {
      getAnnouncement(this.limit, this.pageIndex).then(res => {
        this.total = res.result.count
        this.announcementList = res.result.data
      })
    },
    removeAnnouncementById(row) {
      removeAnnouncement(row.id).then(res => {
        if (res.result) {
          this.$notify.success({
            title: '删除成功',
            message: `删除成功`
          })
        }
      })
    },
    handleCurrentChange() {
      getAnnouncement(this.limit, this.pageIndex).then((res) => {
        this.total = res.result.count
        this.announcementList = res.result.data
      })
    },
    handleSizeChange() {},
    disabledDialogVisibility(val) {
      this.isShow.showSave = val
    }
  }
}

</script>

<style>

</style>
