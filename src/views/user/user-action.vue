<template>
  <div style="padding: 30px">
    <el-form :inline="true" :model="formInline" center>
      <el-form-item label="日志类型筛选" prop="logType">
        <el-select v-model="formInline.logType" clearable placeholder="请选择日志类型">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="日志详情" prop="dimTitle">
        <el-input v-model="formInline.dimTitle" placeholder="搜索日志详情">
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="actionLogList">
      <el-table-column label="所属类型" width="120" sortable>
        <template slot-scope="scope">
          <i class="el-icon-mouse" />
          <el-tag v-if="scope.row.logType ==1" style="margin-left: 10px" type="info">Info</el-tag>
          <el-tag v-if="scope.row.logType ==2" style="margin-left: 10px" type="info">Debug</el-tag>
          <el-tag v-if="scope.row.logType ==3" style="margin-left: 10px" type="danger">Error</el-tag>
          <el-tag v-if="scope.row.logType ==4" style="margin-left: 10px" type="warning">Warning</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="actionUrl" label="请求地址" width="280" />
      <el-table-column prop="actionDetail" label="操作详细" width="400" :show-overflow-tooltip="true"/>
      <el-table-column prop="operatorId" label="操作人" width="180" />
      <el-table-column label="IP地址" width="120">
        <template slot-scope="scope">
          <i class="el-icon-location-outline" />
          <span style="margin-left: 10px">{{ scope.row.ipAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{
            scope.row.createDate | timeFilter
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="actionLogDetail(scope.row)">查看详情</el-button>
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

    <el-dialog title="操作详情" :visible.sync="dialogVisible" width="30%" show-close>
      <div>
        <p>请求地址：<span>{{ actionLog.actionUrl }}</span></p>
        <p>操作详情：<span>{{ actionLog.actionDetail }}</span></p>
        <p>IP地址：<span>{{ actionLog.ipAddress }}</span></p>
        <p>请求时间：<span>{{ actionLog.createDate }}</span></p>
        <p>操作人：<span>{{ actionLog.operatorId }}</span></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getActionLogList,
  getActionLogById
} from '@/api/action.js'
export default {
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
      formInline: {
        logType: '',
        dimTitle: ''
      },
      actionLog: {},
      dialogVisible: false,
      actionLogList: [],
      total: 0,
      pageIndex: 1,
      limit: 12,
      options: [{
        id: 1,
        name: 'Info'
      },
      {
        id: 2,
        name: 'Debug'
      },
      {
        id: 3,
        name: 'Error'
      },
      {
        id: 4,
        name: 'Warning'
      }
      ]
    }
  },
  mounted() {
    this.initArticleList()
  },
  methods: {
    initArticleList() {
      var data = {
        limit: this.limit,
        pageIndex: this.pageIndex,
        logType: this.formInline.logType,
        dimTitle: this.formInline.dimTitle
      }
      getActionLogList(data).then((res) => {
        this.total = res.result.count
        this.actionLogList = res.result.data
      })
    },
    onSubmit() {
      var a = this.formInline.logType
      if (a === '' || a === null || a === undefined) {
        a = 0
      }
      var data = {
        limit: this.limit,
        pageIndex: this.pageIndex,
        logType: a,
        dimTitle: this.formInline.dimTitle
      }
      getActionLogList(data).then((res) => {
        this.total = res.result.count
        this.actionLogList = res.result.data
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {
      var data = {
        limit: this.limit,
        pageIndex: this.pageIndex,
        logType: this.formInline.logType,
        dimTitle: this.formInline.dimTitle
      }
      getActionLogList(data).then((res) => {
        this.total = res.result.count
        this.actionLogList = res.result.data
      })
    },
    actionLogDetail(row) {
      this.dialogVisible = true
      getActionLogById(row.id).then((res) => {
        this.actionLog = res.result
      })
    }
  }
}

</script>

<style>
</style>
