<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card id="box-card">
      <el-table :data="tableData" border style="width: 100%;margin-top:20px">
        <el-table-column type="index" label="序号" width="180px"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="250px"></el-table-column>
        <el-table-column prop="path" label="路径" width="200px"></el-table-column>
        <el-table-column label="等级">
          <template slot-scope="info">
            <el-tag v-if="info.row.level==0">一级</el-tag>
            <el-tag v-if="info.row.level==1" type="success">二级</el-tag>
            <el-tag v-if="info.row.level==2" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getrighrlist()
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async getrighrlist() {
      const { data: ret } = await this.$http.get('rights/list')
      this.tableData = ret.data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
