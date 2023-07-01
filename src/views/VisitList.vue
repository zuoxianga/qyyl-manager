<template>
  <div class="list">
    <div class="search">
      <div class="title">医生出诊信息管理</div>
      <div class="types">
        <span>就诊科室：</span>
        <el-select class="txt" size="mini" placeholder="请选择就诊科室" v-model="depId">
          <el-option
          label="全部"
            value=""
          ></el-option>
          <el-option
            v-for="item in options"
            :key="item.departmentId"
            :label="item.departmentName"
            :value="item.departmentId"
          >
          </el-option>
        </el-select>
        <span>医生名称：</span>
        <el-input class="txt" size="mini" placeholder="请输入门诊医师" v-model="doctorName"></el-input>
        <el-button class="btn" size="mini" @click="searchCallTime()">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-button size="mini" @click="$router.push('/layout/addvisit')">添加</el-button>
      <el-table size="mini" :data="pageInfo.list" style="width: 98%">
        <el-table-column prop="timeId" label="编号" width="100"> </el-table-column>
        <el-table-column prop="doctor.department.departmentName" label="科室" width="180"></el-table-column>
        <el-table-column prop="doctor.doctorName" label="门诊医师" width="120"></el-table-column>
        <el-table-column prop="callTime" label="出诊时间" width="180">
          <template slot-scope="scope1">
            {{ callTimeFormat(scope1.row.callTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="goAddVisit(scope.row)">编辑</el-button>
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
import axios from '../hooks/request';
import dayjs from 'dayjs';
import getDep from '../hooks/getTypes';
export default {
  data() {
    return {
      options: [
        
      ],
      depId: "",
      doctorName: "",
      pageInfo: {},
    };
      
      
  },
  created(){
    this.getAll(1)
    getDep().then((res) => {
      this.options=res.data.data
    })
  },
  computed:{
    callTimeFormat(){
      return time=>dayjs(time).format("YYYY-MM-DD")
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.getAll(val)
    },
    searchCallTime(){
      this.getAll(1)
    },
    goAddVisit(item){
      item.callTime=this.callTimeFormat(item.callTime)
      this.$router.push({
        path:"/layout/addvist",
        query: item
      })
    },
    getAll(pageNum){
      axios.post("/doctorCall/getAll/",{
        pageNum,depId:this.depId,
      doctorName: this.doctorName
      },{headers:{ "Content-Type":"application/x-www-form-urlencoded"}})
      .then((res) => {
        this.pageInfo=res.data.data
      })
    },
    
  },
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
