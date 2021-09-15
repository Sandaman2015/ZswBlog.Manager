<template>
  <div style="padding: 30px">
    <el-button type="primary" size="small" icon="el-icon-edit" @click="isShow.showSave = true">新建友情链接</el-button>
    <el-table :data="friendLinkList" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"/>
      <el-table-column prop="title" label="标题" width="180"/>
      <el-table-column prop="portrait" label="图标" width="180">
        <template slot-scope="scope">
          <el-image class="portrait" :src="scope.row.portrait" fit="fit"/>
        </template>
      </el-table-column>
      <el-table-column prop="src" label="地址" width="370">
        <template slot-scope="scope">
          <a class="portrait" :href="scope.row.src" target="_blank">{{ scope.row.src }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="420"/>
      <el-table-column prop="isShow" label="是否显示">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isShow == true" size="medium" type="success">是</el-tag>
          <el-tag v-else size="medium" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="friendLinkEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="friendLinkRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page.sync="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="limit"
                   layout="total, prev, pager, next" :total="total" @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
    />
    <save-box :centerDialogVisible="isShow.showSave" @showDialog="disabledDialogSaveVisibility"/>
    <edit-box :centerDialogVisible="isShow.showEdit" :friendLinkId="isShow.showId"
              @showDialog="disabledDialogEditVisibility"
    />
  </div>
</template>

<script>
import {
  getFriendLink,
  removeFriendLink
} from '@/api/friend-link'
import SaveBox from './link-save'
import EditBox from './link-edit'

export default {
  components: {
    SaveBox,
    EditBox
  },
  data() {
    return {
      friendLinkList: [],
      total: 0,
      pageIndex: 1,
      limit: 5,
      isShow: {
        showSave: false,
        showId: 0,
        showEdit: false
      }
    }
  },
  mounted() {
    this.getInitPage()
  },
  methods: {
    getInitPage() {
      getFriendLink(this.limit, this.pageIndex).then(res => {
        this.total = res.result.count
        this.friendLinkList = res.result.data
      })
    },
    friendLinkRemove(row) {
      removeFriendLink(row.id).then(res => {
        if (res.result) {
          this.$notify.success({
            title: '删除成功',
            message: `删除成功`
          })
          this.getInitPage()
        }
      })
    },
    friendLinkEdit(row) {
      this.isShow.showEdit = true
      this.isShow.showId = row.id
    },
    handleCurrentChange() {
      getFriendLink(this.limit, this.pageIndex).then((res) => {
        this.total = res.result.count
        this.friendLinkList = res.result.data
      })
    },
    handleSizeChange() {
    },
    disabledDialogSaveVisibility(val) {
      this.isShow.showSave = val
      this.getInitPage()
    },
    disabledDialogEditVisibility(val) {
      this.isShow.showEdit = val
      this.getInitPage()
    }
  }
}

</script>

<style scoped>
.portrait {
  height: 80px;
  width: 80px;
}

</style>
