<template>
  <div class="list">
    <div class="search">
      <div class="title">用户信息管理</div>
      <div class="types">
        <span>用户类型：</span>
        <el-select class="txt" size="mini" placeholder="请选择用户类型" v-model=value>
          <el-option 
          label="全部"
          value=""
          ></el-option>
          <el-option
            v-for="item,index in options"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <span>账号：</span>
        <el-input class="txt" size="mini" placeholder="请输入账号" v-model="account"></el-input>
        <span>用户名：</span>
        <el-input class="txt" size="mini" placeholder="请输入用户名" v-model="username"></el-input>
        <el-button class="btn" size="mini" @click="searchUser()">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-button size="mini" @click="$router.push('/layout/adduser')">添加</el-button>
      <el-table size="mini" :data="pageInfo.list" style="width: 98%">
        <el-table-column prop="uid" label="编号" width="100"> </el-table-column>
        <el-table-column prop="userType" label="用户类型" width="180"></el-table-column>
        <el-table-column prop="account" label="账号" width="120"></el-table-column>
        <el-table-column prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column prop="createdate" label="创建时间" width="180">
          <template slot-scope="myslot">
            {{ time(myslot.row.createDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="doctor.doctorName" label="就诊医师" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
            @click="handleEdit(scope.$index, scope.row)">
            {{ scope.row.status==="正常"?"禁用":"启用" }}
          </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
          <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="pageInfo.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../hooks/request"
import dayjs from "dayjs"
export default {
  data() {
    return {
      options: [
        
      ],
      pageInfo: {},
      value:"",
      account:"",
      username:""
    };
  },
  computed:{
    time(){
      return date=>dayjs(date).format("YYYY-MM-DD")
      
    }
  },
  created(){
    this.getUser(1);
    this.getTypes()
  },
  methods: {
    handleEdit(index, row) {
      axios.put("/user/function/setStatus",{
        uid:row.uid,
        status:row.status==="正常"?"冻结":"正常"
      }).then((res) => {
        if(res.data.code==240){
          alert(res.data.msg)
          return
        }
        row.status=row.status==="正常"?"冻结":"正常"
      })
    },
    handleCurrentChange(val) {
      this.getUser(val)
    },
    getUser(pageNum){
      axios.post("/user/function/getUserCondition",{
        pageNum,
        userType:this.value,
        account:this.account,
        username:this.username
      },{headers:{ "Content-Type":"application/x-www-form-urlencoded"}})
      .then((res) => {
        this.pageInfo=res.data.data
        console.log(this.pageInfo);
      })
    },
    getTypes(){
      axios.get("/user/function/getTypes").then((res) => {
        this.options=res.data.data
      })
    },
    searchUser(){
      this.getUser(1)
    }
  }
};
</script>
<style scoped lang="scss">
.list {
  .search {
    background-color: white;
    padding: 10px;
    border: 1px solid #ddd;
    .title {
      font-size: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    .types {
      display: flex;
      align-items: center;
      .txt {
        width: 200px;
      }
      span {
        margin-left: 10px;
      }
      .btn {
        margin-left: 10px;
        background-color: #3979b8;
        color: white;
      }
    }
  }
  .content{
    background-color: white;
    padding: 10px;
    border: 1px solid #ddd;
    margin-top: 10px;
  }
}
</style>
