<template>
  <div class="welcome">
    <background title>
      <el-dialog :visible.sync="dialogVisible" :width="this.$device.isDesktop?'60%':'95%'">
        <el-form
          v-if="configQuestions===false"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="85px"
        >
          <el-form-item label="问卷名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="beginTime">
            <el-date-picker
              class="value"
              v-model="form.beginTime"
              type="date"
              placeholder="点击选择"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              class="value"
              v-model="form.endTime"
              type="date"
              placeholder="点击选择"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-form
          v-if="configQuestions===true"
          ref="questionForm"
          :model="questions"
          :rules="questionRules"
          label-width="85px"
          label-position="left"
        >
          <el-form-item label="问题" prop="question">
            <el-input v-model="questions.question"></el-input>
          </el-form-item>
          <el-form-item label="是否多选" prop="type">
            <el-radio label="radio" v-model="questions.type">单选</el-radio>
            <el-radio label="checkbox" v-model="questions.type">多选</el-radio>
          </el-form-item>
          <el-form-item label="其他" prop="other">
            <el-checkbox v-model="questions.other"></el-checkbox>
          </el-form-item>
          <el-form-item label="选项A" prop="choiceA">
            <el-input v-model="questions.choiceA" placeholder="至少一项，不超过9字"></el-input>
          </el-form-item>
          <el-form-item label="选项B" prop="choiceB">
            <el-input v-model="questions.choiceB"></el-input>
          </el-form-item>
          <el-form-item label="选项C" prop="choiceC">
            <el-input v-model="questions.choiceC"></el-input>
          </el-form-item>
          <el-form-item label="选项D" prop="choiceD">
            <el-input v-model="questions.choiceD"></el-input>
          </el-form-item>
          <el-form-item label="选项E" prop="choiceE">
            <el-input v-model="questions.choiceE"></el-input>
          </el-form-item>
          <el-form-item label="选项F" prop="choiceF">
            <el-input v-model="questions.choiceF"></el-input>
          </el-form-item>
          <el-form-item label="选项G" prop="choiceG">
            <el-input v-model="questions.choiceG"></el-input>
          </el-form-item>
          <el-form-item label="选项H" prop="choiceH">
            <el-input v-model="questions.choiceH"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          v-if="configQuestions===false"
          style="display: flex; text-align: center; margin: auto;"
          type="primary"
          @click="changeForm('form')"
        >配置题目</el-button>
        <el-row style="text-align: center; margin: auto;">
          <el-button
            v-if="configQuestions===true"
            type="primary"
            @click="toNext('questionForm')"
          >再来一题</el-button>
          <el-button
            v-if="configQuestions===true"
            type="success"
            @click="submit('questionForm')"
          >点击提交</el-button>
        </el-row>
      </el-dialog>
      <div class="app-title">
        <el-card shadow="always" :style="{width: this.$device.isDesktop?'50%':'95%'}">
          <el-tabs v-model="activeName">
            <el-tab-pane label="进行中" name="first"></el-tab-pane>
            <el-tab-pane label="已结束" name="second"></el-tab-pane>
          </el-tabs>
          <el-input v-model="searchText" placeholder="按名称模糊搜索"></el-input>
          <el-table :data="tableDisplay()" @row-click="gotoTest">
            <el-table-column prop="testId" label="编号" width="60px"></el-table-column>
            <el-table-column prop="name" label="问卷名称"></el-table-column>
            <el-table-column prop="beginTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column label="统计列表" width="100px">
              <template slot-scope="props">
                <el-button type="primary" size="mini" @click="gotoGraph(props)">查看数据</el-button>
              </template>
            </el-table-column>
          </el-table>
          <p v-if="activeName === 'first'">
            <el-button
              style="display: flex; text-align: center; margin: auto;"
              type="primary"
              icon="el-icon-plus"
              @click="newRegister()"
              circle
            ></el-button>
          </p>
        </el-card>
      </div>
    </background>
  </div>
</template>

<script>
import {
  Button,
  Table,
  TableColumn,
  Input,
  Card,
  Tabs,
  TabPane,
  Dialog,
  Form,
  FormItem,
  Radio,
  Checkbox,
  DatePicker,
  Row
} from "element-ui";
import Background from "../components/Background.vue";
export default {
  name: "list",
  data() {
    return {
      dialogVisible: false,
      configQuestions: false,
      searchText: "",
      activeName: "first",
      screenWidth: document.body.clientWidth,
      targetToSend: new Array(),
      form: {
        name: "",
        beginTime: "",
        endTime: "",
        testId: 0
      },
      questions: {
        question: "",
        type: "radio",
        other: false,
        choiceA: "",
        choiceB: "",
        choiceC: "",
        choiceD: "",
        choiceE: "",
        choiceF: "",
        choiceG: "",
        choiceH: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入问卷名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        beginTime: [{ required: true, trigger: "blur" }],
        endTime: [{ required: true, trigger: "blur" }]
      },
      questionRules: {
        question: [
          { required: true, message: "请输入题面", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        choiceA: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ],
        choiceB: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ],
        choiceC: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ],
        choiceD: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ],
        choiceE: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ],
        choiceF: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ],
        choiceG: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ],
        choiceH: [
          { min: 0, max: 9, message: "长度在 0 到 9 个字符", trigger: "blur" }
        ]
      },
      tableData: [
        {
          name: "关于辣辣军等级的统计",
          beginTime: "2020/3/10",
          endTime: "2020/4/10",
          testId: 1
        },
        {
          name: "大学生心理健康调查问卷",
          beginTime: "2020/3/10",
          endTime: "2020/4/10",
          testId: 2
        },
        {
          name: "你在的群有没有内鬼",
          beginTime: "2020/2/10",
          endTime: "2020/3/10",
          testId: 1
        }
      ]
    };
  },
  components: {
    "el-button": Button,
    "el-table": Table,
    "el-table-column": TableColumn,
    "el-input": Input,
    "el-card": Card,
    "el-tabs": Tabs,
    "el-tab-pane": TabPane,
    "el-dialog": Dialog,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-radio": Radio,
    "el-checkbox": Checkbox,
    "el-date-picker": DatePicker,
    "el-row": Row,
    background: Background
  },
  created: {
    getData() {
      //Todo
    }
  },
  methods: {
    newRegister() {
      this.dialogVisible = true;
      this.configQuestions = false;
      this.form.name = "";
      this.form.beginTime = "";
      this.form.endTime = "";
      this.form.testId = this.tableData.length + 1;
      this.questions.question = "";
      this.questions.type = "radio";
      this.questions.other = false;
      this.questions.choiceA = "";
      this.questions.choiceB = "";
      this.questions.choiceC = "";
      this.questions.choiceD = "";
      this.questions.choiceE = "";
      this.questions.choiceF = "";
      this.questions.choiceG = "";
      this.questions.choiceH = "";
    },
    sendData() {
      console.log(this.form);
      console.log(typeof this.targetToSend);
      console.log(this.targetToSend);
    },
    changeForm(formName) {
      //Todo sendform
      this.$refs[formName].validate(valid => {
        if (valid) {
          //Todo Send
          this.configQuestions = true;
        }
      });
    },
    targetPush() {
      this.targetToSend.push({
        question: this.questions.question,
        type: this.questions.type,
        other: this.questions.other,
        choiceA: this.questions.choiceA,
        choiceB: this.questions.choiceB,
        choiceC: this.questions.choiceC,
        choiceD: this.questions.choiceD,
        choiceE: this.questions.choiceE,
        choiceF: this.questions.choiceF,
        choiceG: this.questions.choiceG,
        choiceH: this.questions.choiceH,
      });
      this.questions.question = "";
      this.questions.name = "";
      this.questions.type = "radio";
      this.questions.other = false;
      this.questions.choiceA = "";
      this.questions.choiceB = "";
      this.questions.choiceC = "";
      this.questions.choiceD = "";
      this.questions.choiceE = "";
      this.questions.choiceF = "";
      this.questions.choiceG = "";
      this.questions.choiceH = "";
    },
    toNext(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.targetPush();
          console.log('pass');
        }
        else return false;
      });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.targetPush();
          this.dialogVisible = false;
          return true;
        }
        else return false;
      });
      this.sendData();
    },
    tableDisplay() {
      return this.tableData.filter(data => {
        let tmp = data.name.toLowerCase().includes(this.searchText);
        let date = new Date();
        if (this.activeName === "first") {
          tmp = tmp && data.endTime >= date.toLocaleDateString();
        } else tmp = tmp && data.endTime < date.toLocaleDateString();
        return tmp;
      });
    },
    gotoGraph(props) {
      //console.log(props.row.testId);
      this.$router.push({
        name: "graph",
        query: {
          testId: props.row.testId
        }
      });
    },
    gotoTest(row) {
      console.log(row.testId);
      this.$router.push({
        name: "test",
        query: {
          testId: row.testId
        }
      });
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
.app-title {
  position: flex;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 2s;
  .app-text {
    color: #000;
    margin-top: 120px;
    padding: 10px;
    .app-button {
      text-align: center;
      margin: auto;
    }
    .line-decoration {
      animation: line-extract 2s;
      height: 2px;
      width: 7em;
      background: rgb(218, 150, 26);
      margin: 40px;
      font-size: 24px;
    }
  }
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