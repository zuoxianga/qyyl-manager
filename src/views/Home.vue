<template>
<div class="home">
  <div class="user">欢迎你：{{ username }} | 用户类型：{{ type }}</div>
  <img src="../assets/main.jpg" alt=""/>
</div>
</template>
<script>
import axios from "../hooks/request"
export default {
  data(){
    return {
      username:"",
      type:""
    }
  },
  created(){
    axios.get("/user/function/getUserInfo")
    .then((res) => {
      this.username=res.data.data.username
      this.type=res.data.data.userType
    })
  }
}
</script>
<style scoped lang='scss'>
.home{
  .user{
    font-size: 20px;
  }
  img{
    height: 600px;
  }
}
</style>