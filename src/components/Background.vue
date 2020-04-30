<template>
  <div>
    <div class="bg">
      <img class="blue-block block-mobile" src="../assets/background/small-blue-block.svg">
      <img class="blue-block block-pc" src="../assets/background/small-blue-block-pc.svg">
      <img class="orange-block block-mobile" src="../assets/background/small-orange-block.svg">
      <img class="orange-block block-pc" src="../assets/background/small-orange-block-pc.svg">
    </div>
    <div class="app-content-wrapper">
      <div class="header">
        <img v-if="!isHome" class="back-buttom" src="../assets/back.svg" @click="goBack">
        <div v-else style="margin-left:10px;"></div>
        <div class="space"></div>
        <img v-if="!isWechat" class="logout-button" src="../assets/logout.svg" @click="logout">
      </div>
      <div class="app-content">
        <p v-if="desc" class="app-desc">{{desc}}</p>
        <div v-else style="margin-top:20px;"></div>
          <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  components: {
    "el-select": Select,
    "el-option": Option
  },
  data() {
    return {
      isWechat: true
    };
  },
  props: {
    desc: { type: String, default: "" },
    isHome: { type: Boolean, default: false }
  },
  computed: {
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    gotoHome() {
      this.$router.replace("/");
    },
    logout() {
      if (!this.isWechat) {
        this.$store.commit("clearCache");
        window.location = `https://newids.seu.edu.cn/authserver/logout?goto=https://seicwxbz.seu.edu.cn/vote`;
      }
    }
  },
  created() {
    this.isWechat = this.$device.isWechat;
  }
};
</script>

<style lang="less" scoped>
.role-select {
  width: 150px;
  margin-right: 10px;
}
.bg {
  z-index: -100;
  width: 100%;
  top: 0;
  position: fixed;
  @media screen and (min-width: 600px) {
    .block-mobile {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .block-pc {
      display: none;
    }
  }
  .blue-block {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: -98;
    // animation: blueSlideIn 1s;
  }
  .orange-block {
    width: 60%;
    position: fixed;
    right: 0;
    top: 160px;
    z-index: -99;
    // animation: orangeSlideIn 2s;
  }

  @keyframes blueSlideIn {
    from {
      top: -20px;
    }
    to {
      top: 0;
    }
  }
  @keyframes orangeSlideIn {
    from {
      top: 100px;
    }
    to {
      top: 160px;
    }
  }
}

.header {
  position: absolute;
  top: 5px;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  align-items: center;
  // animation: slideIn 1s;
  width: 100%;
  max-width: 1000px;
  .home-buttom {
    width: 30px;
    margin-left: 20px;
  }
  .back-buttom {
    width: 30px;
    margin-left: 10px;
  }
  .seu-logo {
    width: 50px;
    margin-left: 7px;
  }
  .title {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    margin-left: 7px;
  }
  .space {
    flex-grow: 1;
  }
  .logout-button {
    width: 25px;
    margin-right: 20px;
  }
  @media screen and (min-width: 600px) {
    .logout-button {
      margin-right: 40px;
    }
    .home-buttom {
      margin-left: 40px;
    }
  }
  @keyframes slideIn {
    from {
      margin-top: -5px;
    }
    to {
      margin-top: 5px;
    }
  }
}
@media screen and (min-width: 600px) {
  .header {
    top: 15px;
  }
}
.app-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app-content {
  position: absolute;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  top: 50px;
  // animation: appContentSlideIn 1s;
  .app-title {
    color: #fff;
    margin-bottom: 0;
    margin-left: 20px;
    margin-top: 30px;
  }
  .app-desc {
    color: #fff;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 16px;
  }
  .panel {
    background: #fff;
     margin: 0 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 20px 15px 17px 15px;
  }
  @media screen and (min-width: 600px) {
    .panel {
      margin: 0 40px;
      margin-bottom: 30px;
      margin-top: 30px;
    }
    .app-title {
      margin-left: 40px;
      margin-right: 40px;
      margin-top: 30px;
    }
    .app-desc {
      margin-left: 40px;
    }
  }
}
@keyframes appContentSlideIn {
  from {
    opacity: 0;
    top: 30px;
  }
  to {
    opacity: 1;
    top: 50px;
  }
}
</style>