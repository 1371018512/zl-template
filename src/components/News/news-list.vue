<template>
  <div
    class="news-list"
    ref="wrapper"
    @scroll="handleScroll"
    :style="{ height: height + 'px' }"
  >
    <div ref="w">
      <div :style="{ height: `${shimTopOffset}px` }"></div>
      <zl-news
        v-for="(item, i) in showList"
        :key="item.art.id"
        :news="item"
        @goDetail="goDetail"
      />
      <div :style="{ height: `${shimBottomOffset}px` }"></div>
    </div>
  </div>
</template>
<script>
import zlNews from "@/components/News/index.vue";

export default {
  name: "news-list",
  components: {
    zlNews,
  },
  computed: {},
  watch: {},
  props: {
    news: {},
  },
  async mounted() {},
  watch: {
    news(newV, oldV) {
      this.update(0);
      //   this.$nextTick(() => {
      //     this.maxHeight = this.$refs.wrapper.offsetHeight;
      //   });
    },
  },
  computed: {
    maxHeight() {
      console.info(this.$refs.w);
      return this.$refs.w.offsetHeight;
    },
  },
  data() {
    return {
      height: 500,
      showList: [],
      itemHeight: 197,
      shimTopOffset: 0,
      shimBottomOffset: 0,
    };
  },
  methods: {
    goDetail() {
      this.$emit("goDetail");
    },

    update(scrollTop) {
      const visibleStart = scrollTop;
      const visibleEnd = scrollTop + this.height;
      //console.log("update " + visibleStart, visibleEnd, this.news.length);
      this.showList = this.getShowList(visibleStart, visibleEnd, this.news);
    },
    handleScroll() {
      const scrollTop = this.$refs.wrapper.scrollTop;
      console.log(scrollTop);
      // 能否看到列表底部
      // scrollTop是wapper距离顶部的距离
      if (scrollTop >= 0 && scrollTop + this.height <= this.maxHeight) {
        window.requestAnimationFrame(() => {
          this.update(scrollTop);
        });
      }
    },
    getShowList(start, end, data) {
      if (start < end) {
        const lo = this.getStartIndex(start, this.itemHeight);
        const hi = this.getEndIndex(end, this.itemHeight);
        this.shimTopOffset = lo >= 0 ? lo * this.itemHeight : 0;
        this.shimBottomOffset =
          hi >= 0 ? (data.length - hi) * this.itemHeight : 0;
        //console.log(lo, hi);
        return data.slice(lo, hi);
      } else {
        this.shimTopOffset = 0;
        this.shimBottomOffset = 0;
        return [];
      }
    },
    getStartIndex(s, itemHeight) {
      const startIndex = ~~(s / itemHeight);
      return startIndex >= 0 ? startIndex : 0;
    },
    getEndIndex(e, itemHeight) {
      const endIndex = Math.ceil(e / itemHeight);
      //console.log("end", endIndex, this.news.length);
      return endIndex <= this.news.length ? endIndex : this.news.length;
    },
  },
};
</script>
<style scoped>
.news-list {
  overflow: auto;
}
</style>
