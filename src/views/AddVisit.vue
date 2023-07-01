<template>
  <div class="add">
    <div class="title">新增医生排期</div>
    <div class="content">
      <el-form size="mini"
          :model="visit"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
        <el-form-item label="科室" prop="department">
        <el-select v-model="department.departmentId" placeholder="请选择就诊科室">
          <el-option
            v-for="item in departments"
            :key="item.departmentId"
            :label="item.departmentName"
            :value="item.departmentId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生" prop="type">
        <el-select v-model="visit.doctor.doctorId" placeholder="请选择就诊科室">
          <el-option
            v-for="item,index in doctors"
            :key="index.doctorId"
            :label="item.doctorName"
            :value="item.doctorId"
          >
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="出诊时间" prop="visitDate">
          <el-input v-model="visit.callTime" type="date"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCallTime">保存</el-button>
          <el-button @click="$router.push('/layout/visitlist')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </template>
  <script>
import axios from '../hooks/request';
import { getDep,getDoc } from '../hooks/getTypes';
import dayjs from 'dayjs';
  
  export default {
    data() {
      return {
        department:{
            departmentId:""
          },
        // 出诊
        visit: {
          doctor:{
            doctorId:""
          },
          callTime:""
        },
        departments:[],
        doctors:[],
        // 验证
        rules: {
        },
      };
    },
    mounted(){
      getDep().then((res) => {
        this.departments=res.data.data
      })
      if(this.$route.query.callTime){
        this.visit=this.$route.query
        this.visit.callTime=dayjs(this.visit.callTime).format("YYYY-MM-DD")
        this.department=this.$route.query.doctor.department
      }
    },
    watch:{
    "department.departmentId":{
      handler(newVal,oldVal){
        getDoc(newVal).then((res) => {
          console.log(res.data);
          this.doctors=res.data.data
        })
      }
    }
  },
    methods: {
      addCallTime(){
        if(this.$route.query.callTime){
          axios.put("/doctorCall/changeCallTime",this.visit).then((res) => {
            if(res.data.code===200){
              this.$router.push("/layout/visitlist")
            }else {
              alert(res.data.msg)
            }
          })
        }else{
          axios.post("/doctorCall/addTime",this.visit)
        .then((res) => {
          if(res.data.code===200){
            this.$router.push("/layout/visitlist")
          }else{
            alert(res.data.msg)
          }
        })
        }
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