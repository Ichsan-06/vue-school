<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        :placeholder="$t('table.title')"
        v-model="listQuery.library"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t("table.search") }}</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t("table.add") }}</el-button
      >
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Writer" prop="writer.name" />
      <el-table-column label="Publisher" prop="publisher.name" />
      <el-table-column label="Level" prop="level.name" width="90" />

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >{{ $t("table.edit") }}</el-button
          >

          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        v-show="total > 0"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.per_page"
        :total="total"
        layout="total, prev, pager, next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="library"
        label-position="left"
        label-width="110px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="library.name" />
        </el-form-item>

        <el-form-item label="Category" prop="name">
          <el-select
            v-model="library.category.uuid"
            placeholder="please select your category"
          >
            <el-option
              v-for="category in listCategory"
              :label="category.name"
              :value="category.uuid"
              :key="category.uuid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Writer" prop="name">
          <el-select
            v-model="library.writer.uuid"
            :value="library.writer.uuid"
            filterable
            placeholder="please select your Writer"
          >
            <el-option
              v-for="writer in listWriter"
              :label="writer.name"
              :value="writer.uuid"
              :key="writer.uuid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Publisher" prop="name">
          <el-select
            v-model="library.publisher.uuid"
            :value="library.publisher.uuid"
            filterable
            placeholder="please select your publisher"
          >
            <el-option
              v-for="publisher in listPublisher"
              :label="publisher.name"
              :value="publisher.uuid"
              :key="publisher.uuid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Level" prop="name">
          <el-select
            v-model="library.level.uuid"
            filterable
            placeholder="please select your level"
          >
            <el-option
              v-for="level in listLevel"
              :label="level.name"
              :value="level.uuid"
              :key="level.uuid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Year">
          <el-input v-model="library.year" />
        </el-form-item>

        <el-form-item label="Audio">
          <el-input v-model="library.audio" />
        </el-form-item>

        <el-form-item label="E Book">
          <el-input v-model="library.ebook" />
        </el-form-item>

        <el-form-item label="Description">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="library.description"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
        >{{ $t("table.cancel") }}
        </el-button>

        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="createData"
        >{{ $t("table.confirm") }}</el-button
        >
        <el-button v-else type="primary" @click="updateData">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Library from '@/service/Library'
import Category from '@/service/Category'
import Writer from '@/service/Writer'
import Publisher from '@/service/Publisher'
import Level from '@/service/Level'

export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      listCategory: [],
      listWriter: [],
      listPublisher: [],
      listLevel: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        per_page: 10
        // library: ""
      },

      library: {
        name: '',
        category: {
          uuid: ''
        },
        writer: {
          uuid: ''
        },
        publisher: {
          uuid: ''
        },
        level: {
          uuid: ''
        },
        year: '',
        audio: '',
        ebook: '',
        description: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [
          {
            required: true,
            message: 'field is required',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getListCategory()
    this.getListWriter()
    this.getListPublisher()
    this.getListLevel()
  },
  methods: {
    async getList() {
      this.listLoading = true
      await Library.listLibrary(this.listQuery)
        .then(({ data }) => {
          this.list = data.data
          this.total = data.meta.total
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },

    async getListCategory() {
      await Category.listCategory().then(({ data }) => {
        this.listCategory = data.data
      })
    },

    async getListWriter() {
      await Writer.listWriter({ per_page: 'all' }).then(({ data }) => {
        this.listWriter = data.data
      })
    },
    async getListPublisher() {
      await Publisher.listPublisher({ per_page: 'all' }).then(({ data }) => {
        this.listPublisher = data.data
      })
    },

    async getListLevel() {
      await Level.listLevel({ per_page: 'all' }).then(({ data }) => {
        this.listLevel = data.data
      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      this.library = {
        name: '',
        category: {
          uuid: ''
        },
        writer: {
          uuid: ''
        },
        publisher: {
          uuid: ''
        },
        level: {
          uuid: ''
        },
        year: '',
        audio: '',
        ebook: '',
        description: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    async createData() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) {
          return false
        }
      })
      await Library.addLibrary({
        name: this.library.name,
        category_uuid: this.library.category.uuid,
        writer_uuid: this.library.writer.uuid,
        level_uuid: this.library.level.uuid,
        publisher_uuid: this.library.publisher.uuid,
        description: this.library.description,
        year: this.library.year,
        audio: this.library.audio,
        ebook: this.library.ebook
      }).then(res => {
        this.$notify({
          title: 'Berhasil',
          message: 'berhasil',
          type: 'success',
          duration: 2000
        })

        this.dialogFormVisible = false
        this.getList()
      })
    },

    handleUpdate(row) {
      // this.publisher = Object.assign({}, row); // copy obj
      this.library = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      console.log(this.library)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    async updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          return false
        }
      })
      try {
        await Library.updateLibrary(this.library, this.library.uuid)
        this.$notify({
          title: 'Berhasil',
          message: 'berhasil update library',
          type: 'success',
          duration: 2000
        })

        this.dialogFormVisible = false
        this.getList()
      } catch (err) {
        this.$notify.error({
          title: 'Gagal',
          message: err.message,
          duration: 2000
        })
      }
    },

    async handleDelete(row) {
      await Library.deleteLibrary(row.uuid)

      this.$notify({
        title: 'Success',
        message: 'Delete Library',
        type: 'success',
        duration: 2000
      })
      this.getList()
    }
  }
}
</script>
