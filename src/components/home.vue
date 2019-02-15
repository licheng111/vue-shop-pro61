<template>
  <el-container>
    <el-header>
      <div id="logo-box">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :style="istrue?'width:65px;':'width:200px;'">
        <div id="nav" @click="istrue=!istrue">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :style="istrue?'width:65px;':'width:200px;'"
          :collapse="istrue"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="(item,k) in menusList" :key="item.id">
            <template slot="title">
              <i :class="'iconfont icon-' +menuicon[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getmenuslist()
  },
  data() {
    return {
      istrue: false,
      menusList: [],
      menuicon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    async getmenuslist() {
      const { data: ret } = await this.$http.get('menus')
      console.log(ret)
      if (ret.meta.status === 200) {
        this.menusList = ret.data
      }
    },
    logout() {
      this.$confirm('确认要退出系统么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: rgb(55, 61, 65);
    padding: 0;
    padding-right: 20px;
    // 弹性布局
    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-box {
      font-size: 22px;
      color: #fff;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    #nav {
      height: 25px;
      color: white;
      background-color: rgb(74, 80, 100);
      font-size: 12px;
      letter-spacing: 0.1em;
      cursor: pointer;
      user-select: none;
      line-height: 25px;
      text-align: center;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
