<template>
  <div>
    <background :isHome="false">
      <div class="app-content">
        <el-card :style="{width: this.$device.isDesktop?'70%':'95%'}" v-if="already">
          <!-- <h3 style="text-align: center; margin: auto;">{{info.name}}</h3> -->
          <h4 style="text-align: center; margin: auto;">{{currentProblem === 0 ? '参与者身份' : '投票结果'}}</h4>
          <div class="app-content">
            <div
              id="myChart"
              :style="{width: this.$device.isDesktop?'500px':'300px', height: this.$device.isDesktop?'500px':'300px'}"
            ></div>
          <el-row style="text-align: center;">
            <el-button
              v-if="currentProblem >= 1"
              style="margin: auto;"
              size="medium"
              type="primary"
              @click="toLast()"
            >上一题</el-button>
            <el-button
              v-if="currentProblem < tableData.length - 1"
              style="margin: auto;"
              size="medium"
              type="primary"
              @click="toNext()"
            >下一题</el-button>
          </el-row>
          </div>
        </el-card>
        <h2 v-else>参与投票之后才能看到结果哦</h2>
      </div>
    </background>
  </div>
</template>

<script>
import { Card, Row } from "element-ui";
import Background from "../components/Background.vue";
export default {
  name: "graph",
  data() {
    return {
      testId: "",
      already: false,
      screenWidth: document.body.clientWidth,
      currentProblem: 0,
      info: {
        name: "投票结果"
      },
      tableData: []
    };
  },
  components: {
    "el-card": Card,
    "el-row": Row,
    background: Background
  },
  async created() {
    this.testId = this.$route.query.testId;
    const state = await this.$axios.get("/answer/voted");
    this.already = state.data.result.isVoted;
    const tableData = await this.$axios.get("/answer/chart");
    if (tableData.data.success===true) {
      this.tableData = tableData.data.result;
    }
    else {
      this.tableData = [];
    }
    console.log(this.tableData.length);
    this.draw();
  },
  methods: {
    draw() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var legendData = [];
      var selected = {};
      var seriesData = [];
      for (let choice in this.tableData[this.currentProblem]) {
        legendData.push(choice);
        seriesData.push({
          name: choice,
          value: this.tableData[this.currentProblem][choice]
        });
        selected[choice] = true;
      }
      var option = {
        title: {
          text: "",
          subtext: "",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: legendData,
          selected: selected
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    toNext() {
      if (this.currentProblem >= this.tableData.length - 1) {
        this.$message({
          type: "warning",
          message: "最后一题了~"
        });
        return ;
      }
      this.currentProblem++;
      this.draw();
    },
    toLast() {
      if (this.currentProblem <= 0) {
        this.$message({
          type: "warning",
          message: "没有上一题了"
        });
        return ;
      }
      this.currentProblem--;
      this.draw();
    }
  }
};
</script>

<style lang="less" scoped>
.bg-orange {
  z-index: -10;
  width: 70%;
  position: fixed;
  left: -550px;
  bottom: 0px;
  animation: orange-move-in 2s;
}
.bg-blue {
  z-index: -10;
  width: 70%;
  position: fixed;
  right: -400px;
  top: 0px;
  animation: blue-move-in 2s;
}
.app-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@keyframes orange-move-in {
  from {
    left: -900px;
  }
  to {
    left: -550px;
  }
}
@keyframes blue-move-in {
  from {
    right: -700px;
  }
  to {
    right: -400px;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
}
@keyframes line-extract {
  from {
    width: 0;
  }
  to {
    width: 7em;
  }
}
</style>