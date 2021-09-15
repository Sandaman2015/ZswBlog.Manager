<template>
  <div style="padding: 30px">
    <el-table :data="messageList">
      <el-table-column prop="id" label="编码" width="80"/>
      <el-table-column prop="content" label="留言内容" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div class="text" v-html="scope.row.content">
            {{ scope.row.content }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="location" label="位置" width="140" :show-overflow-tooltip="true"/>
      <el-table-column prop="browser" label="浏览器" width="110"/>
      <el-table-column prop="user.nickName" label="留言用户" width="150"/>
      <el-table-column prop="user.portrait" label="用户头像" width="80">
        <template slot-scope="scope">
          <el-image class="portrait" :src="scope.row.user.portrait" fit="fit"/>
        </template>
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isShow === true" size="medium" type="success">是</el-tag>
          <el-tag v-else size="medium" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="targetUser.nickName" label="目标用户" width="150"/>
      <el-table-column prop="targetUser.portrait" label="目标头像" width="80">
        <template v-if="scope.row.targetUser" slot-scope="scope">
          <!-- <div>{{scope.row.targetUser}}</div> -->
          <el-image class="portrait" :src="scope.row.targetUser.portrait" fit="fit"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.createDate | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isShow === true" type="warning" size="small" @click="messageEdit(scope.row)">禁用
          </el-button>
          <el-button v-else-if="scope.row.isShow === false" type="info" size="small" @click="messageEdit(scope.row)">
            启用
          </el-button>
          <el-button type="danger" size="small" @click="removeMessageById(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
import {
  getMessageList,
  removeMessage,
  updateMessage
} from '@/api/message'

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
      messageList: [],
      total: 0,
      pageIndex: 1,
      limit: 8
    }
  },
  mounted() {
    this.getInitPage()
  },
  methods: {
    getInitPage() {
      getMessageList(this.limit, this.pageIndex).then(res => {
        console.log(res)
        this.total = res.result.count
        this.messageList = res.result.data
      })
    },
    messageEdit(row) {
      updateMessage(row.id, !row.isShow).then(res => {
        if (res.result) {
          this.$notify.success({
            title: '更新成功',
            message: `更新成功`
          })
          this.getInitPage()
        }
      })
    },
    removeMessageById(row) {
      removeMessage(row.id).then(res => {
        if (res.result) {
          this.$notify.success({
            title: '删除成功',
            message: `删除成功`
          })
          this.getInitPage()
        }
      })
    },
    handleSizeChange() {
    },
    handleCurrentChange() {
      getMessageList(this.limit, this.pageIndex).then((res) => {
        this.total = res.result.count
        this.messageList = res.result.data
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
