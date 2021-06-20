<template>
  <div style="padding: 30px">
    <el-button type="primary" size="small" icon="el-icon-edit" @click="isShow.showSave = true">新建公告</el-button>
    <el-table :data="announcementList" style="width: 100%">
      <el-table-column prop="id" label="编码" width="180"> </el-table-column>
      <el-table-column prop="content" label="公告内容" width="180"> </el-table-column>
      <el-table-column prop="isTop" label="是否置顶" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.isTop == true ? "是" : "否" }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="180"> </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
              scope.row.createDate | timeFilter
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束推送时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
              scope.row.endPushDate | timeFilter
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="removeAnnouncementById(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="limit" layout="total, prev, pager, next" :total="total">
    </el-pagination>
    <save-box @showDialog="disabledDialogVisibility" :_centerDialogVisible="isShow.showSave" />
  </div>
</template>

<script>
  import {
    getAnnouncement,
    saveAnnouncement,
    removeAnnouncement
  } from "@/api/announcement"
  import SaveBox from "./announcement-save"
  export default {
    components: {
      SaveBox,
    },
    data() {
      return {
        announcementList: [],
        total: 0,
        pageIndex: 1,
        limit: 15,
        isShow: {
          showSave: false,
          showId: 0,
        },
      }
    },
    filters: {
      timeFilter: function (date) {
        date = date.toString().replace("T", " ");
        if (date == "0001-01-01 00:00:00") {
          return "无";
        } else {
          return date;
        }
      },
    },
    mounted() {
      this.getInitPage();
    },
    methods: {
      getInitPage() {
        getAnnouncement(this.limit, this.pageIndex).then(res => {
          this.total = res.result.count;
          this.announcementList = res.result.data;
        })
      },
      removeAnnouncementById(row) {
        removeAnnouncement(row.id).then(res => {
          if (res.result) {
            this.$notify.success({
              title: "删除成功",
              message: `删除成功`,
            });
          }
        })
      },
      handleCurrentChange() {
        getAnnouncement(this.limit, this.pageIndex).then((res) => {
          this.total = res.result.count;
          this.announcementList = res.result.data;
        });
      },
      handleSizeChange() {},
      disabledDialogVisibility(val) {
        this.isShow.showSave = val;
      }
    }
  }

</script>

<style>

</style>
