<template>
  <el-dialog title="通知公告" :visible.sync="isShowSave" width="70%" @closed="closedDialog" center>
    <el-form ref="announcement" v-if="announcement" :model="announcement" label-width="80px">
      <el-form-item label="公告内容" prop="content">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
          v-model="announcement.content">
        </el-input>
      </el-form-item>
      <el-form-item label="是否置顶" prop="isTop">
        <el-switch v-model="announcement.isTop" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="置顶排序" prop="sort">
        <el-input-number v-model="announcement.sort" controls-position="right" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="结束推送时间" prop="endPushDate">
        <el-date-picker v-model="announcement.endPushDate" type="date" placeholder="选择日期">
        </el-date-picker>
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
    saveAnnouncement
  } from "@/api/announcement"
  export default {
    props: {
      _centerDialogVisible: {
        type: Boolean,
      },
    },
    computed: {
      isShowSave: {
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
        announcement: {
          id: 0,
          content: "",
          isTop: false,
          sort: 0,
          endPushDate: ""
        }
      };
    },
    methods: {
      onSubmit() {
        var entity = this.announcement;
        saveAnnouncement(entity).then(res => {
          if (res.code == 200) {
            this.$notify.success({
              title: '保存成功',
              message: `通知公告保存成功`
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
        this.isShowSave = false;
        console.log(this.isShowSave);
      }
    },
  };

</script>

<style>

</style>
