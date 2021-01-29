<template>
  <div style="padding: 30px">
    <el-form :inline="true" :model="formInline" center>
      <el-form-item label="分类筛选" prop="categoryId">
        <el-select
          clearable
          v-model="formInline.categoryId"
          placeholder="请选择文章所属分类"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题" prop="dimTitle">
        <el-input placeholder="搜索文章标题" v-model="formInline.dimTitle">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" v-loading="loading" element-loading-background = "rgba(0, 0, 0, 0.2)"
       element-loading-text = "数据正在加载中"
       element-loading-spinner = "el-icon-loading">
      <el-table-column prop="title" label="文章名称" width="250">
      </el-table-column>
      <el-table-column prop="category.name" label="所属分类" width="100">
      </el-table-column>
      <el-table-column label="是否显示" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="显示"
            inactive-text="不显示"
            @change="changeShowSwitch(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="topSort" sortable label="排序" width="80">
      </el-table-column>
      <el-table-column label="浏览次数" width="100">
        <template slot-scope="scope">
          <i class="el-icon-view"></i>
          <span style="margin-left: 10px">{{ scope.row.visits }}</span>
        </template>
      </el-table-column>
      <el-table-column label="喜爱数" width="100">
        <template slot-scope="scope">
          <i class="el-icon-sunny"></i>
          <span style="margin-left: 10px">{{ scope.row.like }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.createDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.lastUpdateDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="articleEdit(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button
            @click="articleRemove(scope.row)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <edit-box
      :articleId="isShow.showId"
      @showDialog="disabledDialogVisibility"
      :_centerDialogVisible="isShow.showEdit"
    />
  </div>
</template>

<script>
import {
  articleList,
  disabledArticle,
  removeArticle,
  categoryArticleList,
} from "@/api/article.js";
import { getAllCategory } from "@/api/category";
import EditBox from "./article-edit";
export default {
  components: {
    EditBox,
  },
  data() {
    return {
      formInline: {
        categoryId: "",
        dimTitle: "",
      },
      article: {},
      articleList: [],
      total: 0,
      pageIndex: 1,
      limit: 15,
      isShow: {
        showEdit: false,
        showId: 0,
        showDetails: false,
      },
      options: [],
      loading: true,
    };
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
    this.initArticleList();
  },
  methods: {
    initArticleList() {
      this.loading = true;
      articleList(this.limit, this.pageIndex).then((res) => {
        this.total = res.result.count;
        this.articleList = res.result.data;
      });
      getAllCategory().then((res) => {
        this.options = res.result;
      });
      this.loading = false;
    },
    onSubmit() {
      this.loading = true;
      var a = this.formInline.categoryId;
      if (a == "" || a == null || a == undefined) {
        a = 0;
      }
      categoryArticleList(
        this.limit,
        this.pageIndex,
        a,
        this.formInline.dimTitle
      ).then((res) => {
        this.total = res.result.count;
        this.articleList = res.result.data;
      });
      this.loading = false;
    },
    changeShowSwitch(row) {
      var data = {
        id: row.id,
        isShow: row.isShow,
      };
      disabledArticle(data).then((res) => {
        if (res.code == 200) {
          this.$notify.success({
            title: "更新成功",
            message: `更新成功`,
          });
          this.disabledDialogVisibility(false);
        } else {
          this.$notify.success({
            title: "未成功提示",
            message: res.message,
          });
        }
      });
    },
    disabledDialogVisibility(val) {
      this.isShow.showEdit = val;
      this.initArticleList();
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
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeArticle(row.id).then((res) => {
            if (res.code == 200) {
              this.$notify.success({
                title: "删除成功",
                message: `删除成功`,
              });
              this.initArticleList();
            } else {
              this.$notify.success({
                title: "未成功提示",
                message: res.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>
