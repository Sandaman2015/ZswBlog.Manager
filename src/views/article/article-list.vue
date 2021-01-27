<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="formInline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList">
      <el-table-column prop="title" label="文章名称" width="280">
      </el-table-column>
      <el-table-column prop="category.name" label="所属分类" width="120">
      </el-table-column>
      <el-table-column label="是否显示" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isShow" active-color="#13ce66" inactive-color="#ff4949" active-text="显示"
            inactive-text="不显示" @change="changeShowSwitch(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="是否置顶" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isTop" active-color="#13ce66" inactive-color="#ff4949" active-text="置顶"
            inactive-text="不置顶" @change="changeTopSwitch(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="浏览次数" sortable width="100">
        <template slot-scope="scope">
          <i class="el-icon-view"></i>
          <span style="margin-left: 10px">{{ scope.row.visits}}</span>
        </template>
      </el-table-column>
      <el-table-column label="喜爱数" sortable width="100">
        <template slot-scope="scope">
          <i class="el-icon-sunny"></i>
          <span style="margin-left: 10px">{{ scope.row.like}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.lastUpdateDate | timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="articleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="articleRemove(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="limit" layout="total, prev, pager, next" :total="total">
    </el-pagination>
    <edit-box :articleId="isShow.showId" @showDialog="disabledDialogVisibility" :_centerDialogVisible="isShow.showEdit" />
  </div>
</template>

<script>
  import {
    articleList
  } from '@/api/article.js'
  import EditBox from './article-edit'
  export default {
    components: {
      EditBox
    },
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        articleList: [],
        total: 0,
        pageIndex: 1,
        limit: 15,
        isShow: {
          showEdit: false,
          showId: 0,
          showDetails: false
        }
      }
    },
    filters: {
      timeFilter: function (date) {
        date = date.toString().replace("T", " ");
        if (date == "0001-01-01 00:00:00") {
          return "无"
        } else {
          return date;
        }
      }
    },
    mounted() {
      this.initArticleList();
    },
    methods: {
      initArticleList() {
        articleList(this.limit, this.pageIndex).then((res) => {
          this.total = res.result.count;
          this.articleList = res.result.data;
        });
      },
      onSubmit() {
        console.log('submit!');
      },
      changeShowSwitch(row) {
        console.log(row);
      },
      changeTopSwitch(row) {

      },
      disabledDialogVisibility(val){
        this.isShow.showEdit = val;
      },
      handleSizeChange() {},
      handleCurrentChange() {
        this.pageIndex++;
        articleList(this.limit, this.pageIndex).then((res) => {
          this.total = res.result.count;
          this.articleList = res.result.data;
        });
      },
      articleEdit(row) {
        this.isShow.showEdit = true;
        this.isShow.showId = row.id;
      },
      articleRemove(row) {

        console.log(row);
      }
    }
  }

</script>

<style>

</style>
