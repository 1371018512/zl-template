<template>
  <div class="art-container" ref="container">
    <div class="art-header">
      <div class="art-header-left">
        <el-container>
          <el-aside width="80px" class="art-header-left-aside">
            <zl-profile
              :data="$store.getters['art/user']"
              :size="50"
              v-popover:popover1
            />
            <el-popover
              :open-delay="600"
              ref="popover1"
              placement="bottom"
              title=""
              width="350"
              trigger="hover"
              content=""
            >
              <zl-personal-detail :data="$store.getters['art/user']" />
            </el-popover>
          </el-aside>
          <el-main class="art-header-left-main">
            <div>
              <zl-name :data="$store.getters['art/user']" />
            </div>
            <div>
              {{
                $store.getters["art/art"].lastModify ==
                $store.getters["art/art"].date
                  ? "发布于"
                  : "编辑于"
              }}
              <span style="margin-left: 20px;">{{
                formatTime(
                  new Date($store.getters["art/art"].lastModify),
                  "{y}-{m}-{d}"
                )
              }}</span>
            </div>
          </el-main>
        </el-container>
      </div>
      <div class="art-header-right">
        <div>
          <span
            v-for="item in $store.getters['art/art'].tag"
            class="green"
            :key="item"
          >
            #{{ item }}#
          </span>
        </div>
        <div>
          <span>赞 {{ $store.getters["art/art"].likes }}</span>
          <span>收藏 {{ $store.getters["art/art"].collects }}</span>
          <span>回复 {{ $store.getters["art/art"].commentIds.length }}</span>
          <span>浏览 {{ $store.getters["art/art"].views }}</span>
        </div>
      </div>
    </div>
    <hr />
    <div class="art-body">
      <pre>{{ $store.getters["art/art"].content }}</pre>
      <div class="art-body-bottom">
        <span>
          <span class="iconfont">&#xe66d;</span>
          收藏({{ $store.getters["art/art"].collects }})
        </span>
        <span>
          <span class="iconfont">&#xe600;</span>
          分享
        </span>
        <span :class="{ active: myLike }" @click="likeArt">
          <span class="iconfont">&#xe71a;</span>
          赞({{ $store.getters["art/art"].likes }})
        </span>
        <span>举报</span>
      </div>
    </div>
    <hr />
    <div class="art-footer">
      <div class="art-footer-header">
        <div>
          <zl-title
            :data="$store.getters['art/art'].commentIds.length + '条回帖'"
          />
        </div>
        <el-dropdown @command="sortComments">
          <span class="el-dropdown-link">
            排序方式<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="time"
              ><span class="iconfont">&#xe659;</span>较近在前</el-dropdown-item
            >
            <el-dropdown-item command="like"
              ><span class="iconfont">&#xe71a;</span>较赞在前</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="success" @click.native="scrollToEnd"
          ><span class="iconfont" style="color: white;font-size: 0.7em;"
            >&#xf06c;</span
          >
          回帖</el-button
        >
      </div>
      <div class="comment">
        <zl-comment
          @commentsRefresh="sortComments(sort)"
          v-for="(item, i) in $store.getters['art/comments']"
          :data="item"
          :index="i"
          :key="item.comment.id"
          :sort="sort"
        />
      </div>
    </div>
    <el-input
      type="textarea"
      style="margin-top: 10px;"
      v-model="commentContent"
      placeholder="请在这里添加你的回帖吧"
    ></el-input>
    <div class="buttons">
      <el-button type="primary" size="small" @click.native="publishComment"
        >发布</el-button
      >
    </div>
  </div>
</template>

<script>
import zlProfile from "@/components/Profile/profile2.vue";
import { mapGetters } from "vuex";
import { formatTime } from "../../utils/index.js";
import zlComment from "@/components/comment/index.vue";
import zlName from "@/components/name/index.vue";
import zlPersonalDetail from "@/components/Popovers/PersonalDetail.vue";
import zlTitle from "@/components/common/title.vue";
import { scrollTo } from "../../utils/scroll-to.js";

export default {
  components: {
    zlProfile,
    zlComment,
    zlName,
    zlPersonalDetail,
    zlTitle,
  },
  computed: {
    ...mapGetters(["badges", "level"]),
    myLike() {
      return this.$store.getters["user/artLikes"].find((item) => {
        return this.$store.getters["art/art"].id == item;
      });
    },
  },
  watch: {
    sort(v) {
      console.log(v);
    },
  },
  provide() {},
  mounted() {},
  data() {
    return {
      formatTime: formatTime,
      collectFlag: false,
      commentContent: "",
      sort: "",
    };
  },
  methods: {
    sortComments(c) {
      this.sort = c;
      // 更新评论区
      this.$store
        .dispatch("art/getComments", {
          commentIds: this.$store.getters["art/art"].commentIds,
          sort: this.sort,
        })
        .then((data) => {
          data = data.data;
          //console.log(data)
          this.$store.commit("art/setComments", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likeArt() {
      this.$store.commit(
        "user/toggleArtLike",
        this.$store.getters["art/art"].id
      );
      this.$store
        .dispatch("user/likeArt", {
          uId: this.$store.getters["user/uId"],
          aId: this.$store.getters["art/art"].id,
        })
        .then((data) => {
          data = data.data;
          this.$store.commit("art/modifyLikes", data);
          //console.log(data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scrollToEnd() {
      scrollTo(
        3333,
        1000,
        () => {},
        this.$refs.container.parentElement.parentElement.parentElement
      );
    },
    publishComment() {
      console.log("尝试上传回复");
      this.$store
        .dispatch("art/submitComment", {
          uId: this.$store.getters["user/uId"],
          tId: this.$store.getters["art/user"].uId,
          content: this.commentContent,
          ArtId: this.$store.getters["art/art"].id,
          date: new Date(),
        })
        .then((data) => {
          //console.log(data.data)

          this.$store.commit("art/addCommentIds", data.data.id);
          // 更新评论区
          this.$store
            .dispatch("art/getComments", {
              commentIds: this.$store.getters["art/art"].commentIds,
              sort: this.sort,
            })
            .then((data) => {
              data = data.data;
              console.log(data);
              this.$store.commit("art/setComments", data);
            })
            .catch((err) => {
              console.log(err);
            });

          this.$message({
            message: "成功发布回复",
            type: "success",
            customClass: "mzindex",
          });
          this.commentContent = "";
          this.$emit("Refresh");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.buttons {
  margin-top: 10px;
  float: right;
}

.art-header {
  display: flex;
  justify-content: space-between;
}

.art-header-left,
.art-header-right {
}

.art-header-right > div {
  text-align: right;
  > span {
    padding-right: 12px;
  }
}

.art-header-left-aside {
  background-color: transparent;
}

.art-header-left-main,
.art-header-right {
  padding: 10px;
  font-size: 10px;
  line-height: 20px;
}

.green {
  color: #25bb9b;
  cursor: pointer;
}

.art-body {
  padding: 0px 10px;
}

hr {
  transform: scale(1.05);
  border: none;
  border-top: 1px dashed #cfcfcf;
}

.art-body-bottom {
  text-align: right;
  margin-top: 20px;
  > * {
    padding: 0 5px;
  }
  > span:hover {
    color: #25bb9b;
    cursor: pointer;
  }
}

.active {
  color: #25bb9b !important;
}

.art-footer-header {
  position: relative;
  margin-bottom: 20px;
  :first-child {
    span {
      font-size: 20px;
      color: #4a4a4a;
    }
  }
  > * {
    display: inline-block;
    margin-left: 15px;
  }
  :nth-child(3) {
    position: absolute;
    right: 0;
  }
}

.art-container {
  padding-bottom: 20px;
}

hr {
  border: none;
  border-top: 1px dashed #cfcfcf;
}
</style>
