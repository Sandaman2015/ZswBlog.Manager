<template>
  <el-dialog title="friendlink.title" :visible.sync="isShowEdit" @open="init" width="70%" @closed="closedDialog" center>
    <el-form ref="friendlink" v-if="friendlink" :model="friendlink" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入内容" v-model="friendlink.title">
        </el-input>
      </el-form-item>
      <el-form-item label="图标" prop="portrait">
        <el-input placeholder="请输入内容" v-model="friendlink.portrait">
        </el-input>
      </el-form-item>
      <el-form-item label="地址" prop="src">
        <el-input placeholder="请输入内容" v-model="friendlink.src">
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input placeholder="请输入内容" v-model="friendlink.description">
        </el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-switch v-model="friendlink.isShow" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closedDialog">返回</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    updateFriendLink,
    getFriendLinkById
  } from "@/api/friend-link"
  export default {
    props: {
      friendLinkId: {
        type: Number,
        default: 0,
      },
      _centerDialogVisible: {
        type: Boolean,
      },
    },
    computed: {
      isShowEdit: {
        get() {
          return this._centerDialogVisible;
        },
        set(val) {
          this.$emit("showDialog", val);
        },
      },
    },
    data() {
      return {
        friendlink: {
          id: 0,
          title: "",
          portrait: "",
          src: "",
          description: "",
          isShow: false
        }
      };
    },
    methods: {
      init() {
        getFriendLinkById(this.friendLinkId).then((res) => {
          this.friendlink = res.result;
        });
      },
      onSubmit() {
        var entity = this.friendlink;
        updateFriendLink(entity).then(res => {
          if (res.code == 200) {
            this.$notify.success({
              title: '保存成功',
              message: `友情链接保存成功`
            });
          } else {
            this.$notify.success({
              title: '未成功提示',
              message: res.message
            });
          }
        })
        this.closedDialog();
      },
      closedDialog() {
        this.isShowEdit = false;
      }
    },
  };

</script>

<style>

</style>
