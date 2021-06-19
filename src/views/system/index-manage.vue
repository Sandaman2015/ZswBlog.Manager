<template>
  <div style="padding:30px">
    <div class="demonstration" style="padding:30px">
      <h3>首页配置预览：</h3>
      <el-divider></el-divider>
      <video v-show="videoInfo.videosrc" autoplay controls ref="localVideo" loop :src="videoInfo.videosrc"></video>
      <img v-show="videoInfo.poster" :src="videoInfo.poster" alt="视频图片" />
    </div>
    <div class="content" style="padding:30px">
      <h3>首页配置：</h3>
      <el-divider></el-divider>
      <el-form ref="videoInfo" :model="videoInfo" label-width="80px">
        <el-form-item label="视频地址">
          <el-input v-model="videoInfo.videosrc" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="视频插图">
          <el-input v-model="videoInfo.poster" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item v-if="videoInfo.videosrc" label="视频音量">
          <el-input-number v-model="videoInfo.volume" :min="0" :max="1" :step="0.1" label="视频音量"></el-input-number>
        </el-form-item>
        <el-divider></el-divider>
        <el-button size="small" type="primary" @click="onSubmit">点我更新</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    getInitVideoConfig,
    updateIndexConfig
  } from "@/api/common"
  export default {
    data() {
      return {
        videoInfo: {
          videosrc: "",
          poster: "",
          volume: 0.0
        }
      }
    },
    mounted() {
      this.getInitData();
    },
    methods: {
      getInitData() {
        getInitVideoConfig().then((res) => {
          this.videoInfo = res.result;
          this.$refs.localVideo.volume = this.videoInfo.volume;
        })
      },
      onSubmit() {
        updateIndexConfig(this.videoInfo).then(res => {
          if (res.result) {
            this.$notify.success({
              title: "更新首页配置成功",
              message: `更新首页配置成功`,
            });
          }
        })
      }
    }
  }

</script>

<style scoped>
  .demonstration {
    text-align: center;
    height: 600
  }

  video {
    display: inline-block;
    width: 500px
  }

  img {
    display: inline-block;
    width: 500px
  }

</style>
