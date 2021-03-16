<template>
  <div>
    <span class="title goDetail" @click="innerClick" v-if="data.title"
      ><strong>{{ data.title }}</strong></span
    >
    <p class="content">
      <template v-if="!replaceContent">
        <span
          v-for="(item, index) in data.tag"
          class="green"
          :key="item"
          v-if="data.tag"
        >
          #{{ item }}#
        </span>
        <span @click="innerClick" class="goDetail">{{ content }}</span>
        <span v-if="more && data.title" class="green" @click="innerClick"
          >...查看更多</span
        >
      </template>
      <template v-else>
        {{ replaceContent }}
      </template>
    </p>
    <div class="badgeContainer">
      <template v-if="needTags && data.title">
        <el-tag v-for="(item, index) in data.topic" size="mini" :key="item">
          {{ topicLabel[item] }}
        </el-tag>
      </template>
    </div>
    <div v-if="needDate" class="artFooter">
      发表于 {{ formatTime(new Date(data.date), "{y}-{m}-{d}") }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatTime } from "../../utils/index.js";

export default {
  components: {},
  //inject: ['news'],
  computed: {
    ...mapGetters(["badges", "level"]),
    content() {
      if (this.data.content.length < 20) {
        return this.data.content;
      } else {
        this.more = true;
        return this.data.content.slice(0, 25);
      }
    },
  },
  mounted() {},
  props: {
    index: {
      type: Number,
      default: 0,
    },
    data: {},
    needTags: {
      default: true,
    },
    needDate: {
      default: false,
    },
    replaceContent: {},
  },
  data() {
    return {
      more: false,
      formatTime: formatTime,
      topicLabel: {
        announcement: "站内公告",
        guide: "笔经面经",
        question: "我要提问",
        technology: "技术交流",
        recruit: "招聘信息",
        life: "猿生活",
      },
    };
  },
  methods: {
    innerClick() {
      if (!this.data.title) {
        console.log("blink 不打开detail");
        return;
      }
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 1.2em;
  display: block;
}

.content {
  line-height: 1.5em !important;
  font-size: 13px;
  margin: 5px 0;
  height: 19.2px;
}

.green {
  color: #25bb9b;
  cursor: pointer;
}

.badgeContainer {
  padding: 10px 0;
  height: 52px;
}

.badgeContainer > * {
  margin-right: 10px;
}

.artFooter {
  font-size: 13px;
  color: #888888;
  text-align: right;
}

.goDetail {
  cursor: pointer;
}

.goDetail:hover {
  color: #25bb9b;
}
</style>
