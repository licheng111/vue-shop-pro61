<template>
  <div id="login-container">
    <div id="login-box">
      <div id="avatar-box">
        <img src="../assets/logo.png">
      </div>
      <el-form ref="form" :model="loginForm" :rules="rules2">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>

        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules2: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: ret } = await this.$http.post('login', this.loginForm)
          if (ret.meta.status !== 200) {
            return this.$message.error('用户名或密码不存在')
          }
          this.$message.success('登陆成功')
          window.sessionStorage.setItem('token', ret.data.token)
          this.$router.push('/home')
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  background: #2b4b6b;
  overflow: hidden;
  height: 100%;
  #login-box {
    width: 450px;
    height: 304px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #avatar-box {
      width: 150px;
      height: 150px;
      border: 1px solid #eee;
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 75px;
      padding: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 10px #eee;
      background: #fff;
      img {
        width: 130px;
        height: 130px;
        border-radius: 65px;
        background: #eee;
      }
    }
    .el-form {
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
