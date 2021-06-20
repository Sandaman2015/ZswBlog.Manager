<template>
  <div style="padding: 30px">
    <el-table :data="commentList">
      <el-table-column prop="id" label="编码" width="80"> </el-table-column>
      <el-table-column prop="content" label="留言内容">
        <template slot-scope="scope">
          <div class="text" v-html="scope.row.content">
            {{scope.row.content}}
          </div>
        </template> </el-table-column>
      <el-table-column prop="location" label="位置" width="140"> </el-table-column>
      <el-table-column prop="browser" label="浏览器" width="110"> </el-table-column>
      <el-table-column prop="user.nickName" label="留言用户" width="150"> </el-table-column>
      <el-table-column prop="user.portrait" label="用户头像" width="80">
        <template slot-scope="scope">
          <el-image class="portrait" :src="scope.row.user.portrait" fit="fit" />
        </template>
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示">
        <template slot-scope="scope">
          <el-tag size="medium" v-if="scope.row.isShow == true" type="success">是</el-tag>
          <el-tag size="medium" v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="targetUser.nickName" label="目标用户" width="150"> </el-table-column>
      <el-table-column prop="targetUser.portrait" label="目标头像" width="80">
        <template slot-scope="scope" v-if="scope.row.targetUser">
          <!-- <div>{{scope.row.targetUser}}</div> -->
          <el-image class="portrait" :src="scope.row.targetUser.portrait" fit="fit" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.createDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isShow == true" @click="commentEdit(scope.row)" type="warning" size="small">禁用
          </el-button>
          <el-button v-else-if="scope.row.isShow == false" @click="commentEdit(scope.row)" type="info" size="small">
            启用</el-button>
          <el-button @click="removeCommentById(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getCommentList,
    removeComment,
    updateComment
  } from "@/api/comment"
  export default {
    data() {
      return {
        commentList: [],
        total: 0,
        pageIndex: 1,
        limit: 15,
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
        getCommentList(this.limit, this.pageIndex).then(res => {
          this.total = res.result.count;
          this.commentList = res.result.data;
        })
      },
      commentEdit(row) {
        updateComment(row.id, !row.isShow).then(res => {
          if (res.result) {
            this.$notify.success({
              title: "更新成功",
              message: `更新成功`,
            });
            this.getInitPage();
          }
        })
      },
      removeCommentById(row) {
        removeComment(row.id).then(res => {
          if (res.result) {
            this.$notify.success({
              title: "删除成功",
              message: `删除成功`,
            });
            this.getInitPage();
          }
        })
      }
    }
  }

</script>

<style scoped>
  .text {
    -webkit-line-clamp: 2;
    /* （用来限制在一个块元素显示的文本的行数，2 表示最多显示 2 行。为了实现该效果，它需要组合其他的 WebKit 属性） */
    display: -webkit-box;
    /* （和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ） */
    -webkit-box-orient: vertical;
    /* （和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ） */
    overflow: hidden;
    /* （文本溢出限定的宽度就隐藏内容） */
    text-overflow: ellipsis
  }

</style>
