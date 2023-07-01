<template>
  <div class="login">
    <div class="box">
      <h2>青芽在线医疗</h2>
      <el-form size="mini"
        :model="user"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="40px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "../hooks/request.js"
export default {
  data() {
    // 验证账号
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      }else{
        callback();
      }
    }
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    }
    return {
      // 登录账户
      user: {
        // 账号
        username:"",
        // 密码
        password: "",
      },
      // 验证
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    login(){
      axios.post("/user/login",{
        account:this.user.username,
        pwd:this.user.password
      },{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
      .then((res) => {
        if(res.data.code===200){
          localStorage.setItem("token",res.data.data)
          this.$router.push("/layout")
        }else{
          alert(res.data.msg)
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #2b4054;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 400px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px black;
    h2 {
      font-size: 20px;
      color: #666;
      text-align: center;
      margin-bottom: 20px;
      font-weight: normal;
    }
  }
}
</style>
