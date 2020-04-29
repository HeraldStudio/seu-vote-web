<template>
  <div>
    <background :isHome="false">
      <div class="app-content">
        <el-card :style="{width: this.$device.isDesktop?'70%':'95%'}">
          <!-- <h3 style="text-align: center; margin: auto;">{{info.name}}</h3> -->
          <h4 style="text-align: center; margin: auto;">第{{currentProblem + 1}}题</h4>
          <div class="app-content">
            <div
              id="myChart"
              :style="{width: this.$device.isDesktop?'500px':'300px', height: this.$device.isDesktop?'500px':'300px'}"
            ></div>
            <el-button
              style="text-align: center; margin: auto;"
              size="medium"
              type="success"
              @click="toNext()"
            >下一题</el-button>
          </div>
        </el-card>
      </div>
    </background>
  </div>
</template>

<script>
import { Card } from "element-ui";
import Background from "../components/Background.vue";
export default {
  name: "graph",
  data() {
    return {
      testId: "",
      screenWidth: document.body.clientWidth,
      currentProblem: 0,
      info: {
        name: "第一套问卷"
      },
      tableData: [
        {
          Aanswer: 10,
          Banswer: 5,
          Canswer: 7,
          Danswer: 0,
          Eanswer: 20,
          Fanswer: 13,
          Ganswer: 17,
          Hanswer: 1
        },
        {
          Aanswer: 20,
          Banswer: 6,
          Canswer: 12,
          Danswer: 5,
          Eanswer: 10,
          Fanswer: 2,
          Ganswer: 47,
          Hanswer: 12
        }
      ]
    };
  },
  mounted() {
    this.draw();
  },
  components: {
    "el-card": Card,
    background: Background
  },
  created() {
    this.testId = this.$route.query.testId;
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
            name: "姓名",
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
      if (this.currentProblem >= this.tableData.length) {
        this.$message({
          type: "warning",
          message: "最后一题了~"
        });
        return ;
      }
      this.currentProblem++;
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