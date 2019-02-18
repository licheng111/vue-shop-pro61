<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card id="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryParmas.query"
            :clearable="true"
            @clear="getuserlist"
            @keyup.enter.native="getuserlist"
          >
            <el-button slot="append" icon="el-icon-search" @click="getuserlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogFormVisible = true">添加成员</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData" border style="width: 100%;margin-top:20px">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="130"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column label="状态" width="60">
          <el-switch
            v-model="info.row.mg_state"
            slot-scope="info"
            @change="editstate(info.row.id,info.row.id)"
          ></el-switch>
        </el-table-column>
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="sel(scope.row.id,'a')"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.id)"></el-button>
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="dis(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParmas.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryParmas.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryParmas.total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加成员" :visible.sync="dialogFormVisible" :rules="rules2" @close="addclose">
      <el-form :model="form" ref="addform">
        <el-form-item label="用户名" required :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" required :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" type="email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="form.mobile" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户信息" :visible.sync="edituser">
      <el-form :model="edit" ref="addform">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" :placeholder="edit.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="edit.email" :placeholder="edit.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="edit.mobile" :placeholder="edit.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edituser = false">取 消</el-button>
        <el-button type="primary" @click="editu">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="分配角色" :visible.sync="distribution">
      <el-form :model="edit" ref="addform">
        <el-form-item label="当前的用户：" :label-width="formLabelWidth">
          <span>{{disuser.username}}</span>
        </el-form-item>
        <el-form-item label="当前的角色：" :label-width="formLabelWidth">
           <span>{{disuser.role_name}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distribution = false">取 消</el-button>
        <el-button type="primary" @click="distribution = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getuserlist()
  },
  data() {
    return {
      input: '',
      value3: true,
      currentPage4: 4,
      tableData: [],
      queryParmas: {
        query: '', // 用户关键字搜索使用
        pagenum: 1, // 当前页码
        pagesize: 2, // 每页显示条数
        total: 0 // 记录总条数
      },
      dialogFormVisible: false,
      distribution: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      rules2: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      },
      edituser: false,
      edit: {},
      disuser: {}
    }
  },
  methods: {
    dis(obj) {
      this.disuser = obj
      this.distribution = true
      console.log(obj)
    },
    async editu() {
      const { data: ree } = await this.$http.put(
        `users/${this.edit.id}`,
        this.edit
      )
      if (ree.meta.status !== 200) {
        this.$message.error(ree.meta.msg)
        return
      }
      this.$message.success(ree.meta.msg)
      this.edituser = false
      this.getuserlist()
    },
    async sel(id, i) {
      const { data: sel } = await this.$http.get(`users/${id}`)
      if (sel.meta.status !== 200) {
        this.$message.error(sel.meta.msg)
        return
      }
      this.edit = sel.data
      this.edituser = true
    },
    addclose() {
      this.$refs.addform.resetFields()
    },
    del(id) {
      this.$confirm('确定删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        id
      }).then(async a => {
        const { data: del } = await this.$http.delete(`users/${id}`)
        if (del.meta.status !== 200) {
          this.$message.error(del.meta.msg)
        }
        this.$message.success(del.meta.msg)
        this.getuserlist()
      })
    },
    async add() {
      const { data: rea } = await this.$http.post('users', this.form)
      if (rea.meta.status !== 201) {
        this.$message.error(rea.meta.msg)
        this.$refs.addform.resetFields()
      }
      this.$message.success(rea.meta.msg)
      this.dialogFormVisible = false
      this.getuserlist()
    },
    async editstate(id, state) {
      const { data: ret } = await this.$http.put(`users/${id}/state/${state}`)
      if (ret.meta.status !== 200) {
        this.$message.error(ret.meta.msg)
      }
      this.$message.success(ret.meta.msg)
    },
    async getuserlist() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryParmas
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.queryParmas.total = res.data.total
      this.tableData = res.data.users
    },
    handleSizeChange(val) {
      this.queryParmas.pagesize = val
      this.getuserlist()
    },
    handleCurrentChange(val) {
      this.queryParmas.pagenum = val
      this.getuserlist()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
