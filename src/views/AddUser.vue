<template>
<div class="add">
  <div class="title">添加用户</div>
  <div class="content">
    <el-form size="mini"
        :model="user"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
      <el-form-item label="账号" prop="account">
        <el-input v-model="user.account"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="user.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pwd2">
        <el-input type="password" v-model="user.pwd2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="user.userType" placeholder="请选择用户类型">
          <el-option
            v-for="item,index in options"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就诊科室" prop="department" v-if="user.userType==='普通用户'">
        <el-select v-model="user.department.departmentId" placeholder="请选择就诊科室">
          <el-option
            v-for="item in departments"
            :key="item.departmentId"
            :label="item.departmentName"
            :value="item.departmentId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生" prop="type" v-if="user.userType==='普通用户'">
        <el-select v-model="user.doctor.doctorId" placeholder="请选择就诊科室">
          <el-option
            v-for="item,index in doctors"
            :key="index.doctorId"
            :label="item.doctorName"
            :value="item.doctorId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser()">保存</el-button>
        <el-button @click="$router.push('/layout/userlist')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
import axios from '../hooks/request';
import {getTypes} from '../hooks/getTypes'
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
        account:"",
        // 密码
        pwd: "",
        pwd2:"",
        userType:"",
        department:{
          departmentId:"",
        },
        doctor:{
          doctorId:"",
        }
      },
      // 验证
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
      // 类型
      options: [
        
      ],
      //科室
      departments:[

      ],
      doctors:[

      ]
      
    };
  },
  mounted(){
    getTypes().then((res) => {
      console.log(this.options);
      console.log(1111);
      this.options=res.data.data
      console.log(this.options);
    })
    this.getDep()

  },
  watch:{
    "user.department.departmentId":{
      handler(newVal,oldVal){
        console.log(1111);
        this.getDoctors()
      }
    }
  },
  methods: {
    addUser(){
      axios.post("/user/function/addUser",this.user)
      .then((res) => {
        if(res.data.code===200){
          this.$router.push("/layout/userlist")
        }else{
          alert(res.data.msg)
        }
        
      })
    },

    getDep(){
      axios.get("/dep/getDep").then((res) => {
        this.departments=res.data.data
      })
    },
    getDoctors(){
      this.doctors=[]
      this.user.doctor.doctorId=""
      axios.get("/doctor/getDoctorByDep/"+this.user.department.departmentId).then((res) => {
        this.doctors=res.data.data
      })
    }
  },
}
</script>
<style scoped lang='scss'>
.add{
  .title {
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .content{
    width: 50%;
  }
}
</style>