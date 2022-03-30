<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <el-form ref="form" :model="form" label-width="120px">
          <h3 style="margin:1px">Add Materi ( Wajib Diisi )</h3>
          <span>Materi akan ditambahkan kedalam BAB</span>

          <el-form-item label="Materi Ke" style="margin-top:20px">
            <el-input v-model="form.chapter_of" />
          </el-form-item>

          <el-form-item label="Judul">
            <el-input v-model="form.name" />
          </el-form-item>

          <h3 style="margin:1px">Isi Materi ( Wajib Diisi )</h3>
          <span>Materi bisa berupa teks atau video</span>

          <el-form-item label="Link Video" style="margin-top:20px">
            <el-input v-model="form.video" />
          </el-form-item>

          <el-form-item label="Content">
            <el-input v-model="form.content" type="textarea" />
          </el-form-item>

          <el-form-item label="Is Comment">
            <el-switch v-model="form.comment" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createData">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
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
import Lesson from '@/service/Lesson'
import Chapter from '@/service/Chapter'

export default {
  data() {
    return {
      currentDate: new Date(),
      list: [],
      form: {
        name: '',
        chapter_of: '',
        video: '',
        comment: '',
        content: ''
      },
      params: ''
    }
  },
  created() {
    this.params = this.$route.params.id
    // this.getList()
  },
  methods: {
    async createData() {
      await Chapter.addChapter({
        section_uuid: this.params,
        type: 'lesson',
        name: this.form.name,
        chapter_of: this.form.chapter_of
      }).then(({ data }) => {
        this.form.chapter_uuid = data.data.uuid
      })

      await Lesson.addLesson(this.form).then(res => {
        this.$notify({
          title: 'Berhasil',
          message: 'berhasil',
          type: 'success',
          duration: 2000
        })

        //   this.dialogFormVisible = false
        this.getList()
      })
    }
  }
}
</script>
