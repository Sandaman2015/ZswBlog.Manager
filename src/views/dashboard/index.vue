<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <video
        src="https://d1--cn-gotcha04.bilivideo.com/live-bvc/314195/live_622863_332_c521e483.flv?expires=1624186175&len=0&oi=1955976787&pt=web&qn=0&trid=1000259e68f568494e0a9bfcc26ae3a9d3a6&sigparams=cdn,expires,len,oi,pt,qn,trid&cdn=cn-gotcha04&sign=0955238f90b83fb99a6ea983156e6382&p2p_type=0&src=9&sl=2&free_type=0&sk=417e709c171a500"
      />
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: '',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}

</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

</style>
