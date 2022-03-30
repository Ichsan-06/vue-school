<template>
  <div class="app-container">
    <h2>Belajar Matematika</h2>
    <el-row :gutter="20">
      <el-col :span="20">
        <div
          v-for="section in list.section"
          :key="section.uuid"
          class="section"
        >
          <b> {{ section.section_of }} - {{ section.name }}</b>

          <el-row :gutter="20" class="section-row">
            <div v-if="section.chapter[0] === undefined">
              <button>Add</button>
            </div>

            <el-col v-else>
              <el-col
                v-for="(chapter, index) in section.chapter"
                :key="index"
                :span="8"
                style="margin-bottom:10px"
              >
                <el-card class="box-card">
                  <img src="../.../../../assets/icon/book.png" class="image" >
                  <div>
                    <h4 style="margin-bottom:5px">
                      {{ index + 1 }}. {{ chapter.name }}
                    </h4>
                  </div>
                </el-card>
              </el-col>

              <el-col :span="8">
                <el-card class="box-card">
                  <div>
                    <el-button
                      type="primary"
                      style="margin-top:19px"
                      @click="handleDialog(section.uuid)"
                    >Add Chapter <i
                      class="el-icon-plus el-icon-plus"
                    /></el-button>
                  </div>
                </el-card>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <h1>Hello</h1>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialog" title="Add Chapter" width="30%" center>
      <el-row class="button-raw">
        <el-col :span="24">
          <router-link
            :to="'/elearning/lesson/add/' + subject_uuid"
            class="link-type"
          >
            <el-button size="medium"><b>Add Lesson</b></el-button>
          </router-link>
        </el-col>
        <el-col :span="24">
          <el-button size="medium"><b>Add Exercise</b></el-button>
        </el-col>
        <el-col :span="24">
          <el-button size="medium"><b>Add Exam</b></el-button>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialog = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.image {
  width: 20%;
  display: block;
  /* height: 200px; */
  text-align: center;
}
.section {
  margin-block: 30px;
}
.section-row {
  margin-top: 30px;
}
.button-raw div {
  margin-bottom: 20px;
}
.button-raw button {
  width: 100%;
}
</style>

<script>
import Subject from '@/service/Subject'

export default {
  data() {
    return {
      currentDate: new Date(),
      params: '',
      list: [],
      dialog: false,
      subject_uuid: ''
    }
  },
  created() {
    this.params = this.$route.params.id
    this.getList(this.params)
  },
  methods: {
    async getList(uuid) {
      await Subject.getSubject(uuid)
        .then(({ data }) => {
          this.list = data.data
          console.log(this.list)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addChapter() {
      console.log('Section')
    },
    handleDialog(uuid) {
      this.dialog = true
      this.subject_uuid = uuid
    }
  }
}
</script>
