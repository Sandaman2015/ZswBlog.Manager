<template>
    <div style="padding: 30px">
    <el-table :data="categoryList" border style="width: 100%">
      <el-table-column prop="id" label="编码" width="180"> </el-table-column>
      <el-table-column prop="name" label="标题" width="180"> </el-table-column>
      <el-table-column prop="description" label="副标题" width="180"> </el-table-column>
      <el-table-column prop="articleCount" label="文章数量" width="180"> </el-table-column>
       <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.createDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="categoryEdit(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button @click="removeCategoryById(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <edit-box :categoryId="isShow.showId" @showDialog="disabledEditDialogVisibility"
      :_centerDialogVisible="isShow.showEdit" />
    <save-box :categoryId="isShow.showId" @showDialog="disabledSaveDialogVisibility"
      :_centerDialogVisible="isShow.showSave" />
</div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
}
</script>

<style>

</style>