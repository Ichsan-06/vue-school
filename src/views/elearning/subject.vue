<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col v-for="lists in list" :span="8" :key="lists.uuid">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../.../../../assets/images/elearning.png" class="image" >
          <div style="padding: 14px;">
            <h4 style="margin-bottom:5px">{{ lists.name }}</h4>
            <span style="color:#909399">{{ lists.teacher.employee.name }}</span>
            <hr >
            <el-row :gutter="1">
              <el-col :span="12">
                <h5>20 Orang sudah bergabung</h5>
              </el-col>
              <el-col :span="12">
                <router-link
                  :to="'/elearning/section/' + lists.uuid"
                  class="link-type"
                >
                  <el-button type="primary" style="margin-top:19px">Start Elearning<i class="el-icon-arrow-right el-icon-right"/></el-button>
                </router-link>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.image {
  width: 100%;
  display: block;
  height: 200px;
}
</style>

<script>
import Subject from '@/service/Subject'

export default {
  data() {
    return {
      currentDate: new Date(),
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      await Subject.listSubject(this.listQuery)
        .then(({ data }) => {
          this.list = data.data
          this.total = data.meta.total
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
