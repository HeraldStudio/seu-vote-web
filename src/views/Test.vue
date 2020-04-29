/* eslint-disable vue/no-unused-components */
<template>
  <div class="test">
    <background title :isHome="true">
      <div class="app-title">
        <el-card  style="text-align: center;">
          <h3>问题{{currentPage}}</h3>
          <el-form
            :model="result"
            style="font-size:24px; margin-left: 15px; margin-right: 15px; margin-top: -30px;"
          >
            <el-form-item>
              <h4 v-html="tableData[currentPage - 1].question"></h4>
              <el-radio-group
                v-if="tableData[currentPage - 1].type==='radio'"
                v-model="result.qa[currentPage - 1]"
                class="app-question"
              >
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceA!=''"
                    :label="tableData[currentPage - 1].choiceA"
                    class="app-choice"
                  ></el-radio>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceB!=''"
                    :label="tableData[currentPage - 1].choiceB"
                    class="app-choice"
                  ></el-radio>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceC!=''"
                    :label="tableData[currentPage - 1].choiceC"
                    class="app-choice"
                  ></el-radio>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceD!=''"
                    :label="tableData[currentPage - 1].choiceD"
                    class="app-choice"
                  ></el-radio>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceE!=''"
                    :label="tableData[currentPage - 1].choiceE"
                    class="app-choice"
                  ></el-radio>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceF!=''"
                    :label="tableData[currentPage - 1].choiceF"
                    class="app-choice"
                  ></el-radio>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceG!=''"
                    :label="tableData[currentPage - 1].choiceG"
                    class="app-choice"
                  ></el-radio>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-radio
                    v-if="tableData[currentPage - 1].choiceH!=''"
                    :label="tableData[currentPage - 1].choiceH"
                    class="app-choice"
                  ></el-radio>
                </el-row>
              </el-radio-group>
              <el-checkbox-group
                v-if="tableData[currentPage - 1].type==='checkbox'"
                v-model="result.qa[currentPage - 1]"
                class="app-question"
              >
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceA!=''"
                    :label="tableData[currentPage - 1].choiceA"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceB!=''"
                    :label="tableData[currentPage - 1].choiceB"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceC!=''"
                    :label="tableData[currentPage - 1].choiceC"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceD!=''"
                    :label="tableData[currentPage - 1].choiceD"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceE!=''"
                    :label="tableData[currentPage - 1].choiceE"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceF!=''"
                    :label="tableData[currentPage - 1].choiceF"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceG!=''"
                    :label="tableData[currentPage - 1].choiceG"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
                <el-row type="flex" justify="start">
                  <el-checkbox
                    v-if="tableData[currentPage - 1].choiceH!=''"
                    :label="tableData[currentPage - 1].choiceH"
                    class="app-choice2"
                  ></el-checkbox>
                </el-row>
              </el-checkbox-group>
              <el-row type="flex" justify="start">
                <el-input
                  type="textarea"
                  :rows="3"
                  v-if="tableData[currentPage-1].other===true"
                  class="true-input"
                  placeholder="其他"
                  v-model="input"
                  clearable
                ></el-input>
              </el-row>
            </el-form-item>
          </el-form>
          <el-row style="text-align: center;">
            <el-button v-if="currentPage>1" type="primary" size="mini" @click="toLast">上一题</el-button>
            <el-button
              v-if="currentPage<tableData.length"
              type="primary"
              size="mini"
              @click="toNext"
            >下一题</el-button>
            <el-button
              v-if="currentPage===tableData.length"
              type="success"
              size="mini"
              @click="submit"
            >点击提交</el-button>
            <el-button
              v-if="already===true"
              type="success"
              size="mini"
              @click="gotoGraph"
            >查看结果</el-button>
          </el-row>
        </el-card>
      </div>
    </background>
  </div>
</template>

<script>
import {
  Button,
  Form,
  FormItem,
  Radio,
  Row,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Card
} from "element-ui";
import Background from "../components/Background.vue";
export default {
  name: "test",
  data() {
    return {
      testId: 0,
      totalSize: 20,
      already: false,
      input: "",
      screenWidth: document.body.clientWidth,
      currentPage: 1,
      pageSize: 1,
      tableData: [
        {
          type: "radio",
          other: false,
          question: "你的身份是？",
          choiceA: "A.在读本科生",
          choiceB: "B.在读研究生",
          choiceC: "C.学校教职工",
          choiceD: "D.校友",
          choiceE: "E.其他",
          choiceF: "",
          choiceG: "",
          choiceH: ""
        },
        {
          type: "radio",
          other: false,
          question: "你最喜欢哪一款门户新皮肤？",
          choiceA: "A.第一款：红蓝学院风",
          choiceB: "B.第二款：暖黄松绿风",
          choiceC: "C.第三款：清爽蓝白配",
          choiceD: "",
          choiceE: "",
          choiceF: "",
          choiceG: "",
          choiceH: ""
        }
      ],
      result: {
        qa: []
      },
      answer: []
    };
  },
  components: {
    "el-button": Button,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-row": Row,
    "el-radio": Radio,
    "el-radio-group": RadioGroup,
    "el-checkbox": Checkbox,
    "el-checkbox-group": CheckboxGroup,
    "el-input": Input,
    "el-card": Card,
    background: Background
  },
  async created() {
    this.getTestID();
    await setTimeout(() => {}, 10);
    //Todo get data
    for (let i = 0; i < this.tableData.length; i++) {
      this.result.qa.push([]);
      this.answer.push([]);
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "list"
      });
    },
    getTestID() {
      this.testId = this.$route.query.testId;
      console.log(this.testId);
    },
    showTable() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    toNext() {
      this.answer[this.currentPage - 1] = this.result.qa[this.currentPage - 1];
      if (this.tableData[this.currentPage - 1].other === true) {
        if (this.input != "") {
          this.answer[this.currentPage - 1] = "O." + this.input;
          this.input = "";
        }
      }
      this.currentPage++;
    },
    toLast() {
      this.currentPage--;
    },
    gotoGraph() {
      this.$router.push({
        path: '/graph',
        name: 'graph'
      });
    },
    async submit() {
      if (this.already === true) {
        this.$message({
          type: "info",
          message: "您已经提交过了哦~"
        });
        return;
      }
      var fg = true;
      this.answer[this.currentPage - 1] = this.result.qa[this.currentPage - 1];
      for (let i = 0; i < this.tableData.length; i++) {
        var s = this.answer[i];
        if (fg === true && s.length === 0) {
          this.$message({
            type: "warning",
            message: "还有题没做哦~"
          });
          fg = false;
        }
      }
      if (fg === true) {
        console.log(this.answer);
        const res = await this.$axios.post("/vote", this.answer);
        this.$message({
          type: "success",
          message: "提交成功~"
        });
        this.already = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app-question {
  margin-left: 10px;
  margin-right: 10px;
}
.app-choice {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 8px;
}
.app-choice2 {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: -5px;
}
.bg-orange {
  z-index: -10;
  width: 70%;
  position: fixed;
  left: 0;
  bottom: -500px;
  animation: orange-move-in 2s;
}
.bg-blue {
  z-index: -10;
  width: 70%;
  position: fixed;
  right: 0;
  top: -400px;
  animation: blue-move-in 2s;
}
.app-title {
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 2s;
  margin-top: 150px;
}
@media screen and (max-height: 720px) {
  .app-title {
    margin-top: 50px;
  }
}
@keyframes orange-move-in {
  from {
    bottom: -900px;
  }
  to {
    bottom: -500px;
  }
}
@keyframes blue-move-in {
  from {
    top: -700px;
  }
  to {
    top: -400px;
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