<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        :placeholder="$t('table.title')"
        v-model="listQuery.category"
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
      <el-table-column label="No" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Name" prop="name" />

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
        :model="category"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="category.name" />
        </el-form-item>

        <el-form-item label="Thumbnail">
          <el-upload
            :on-preview="handlePreview"
            :on-change="handleBefore"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :file-list="fileList"
            v-model="category.thumbnail"
            class="upload-demo"
            action="#"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </el-upload>
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
import waves from '@/directive/waves' // 水波纹指令
import Category from '@/service/Category'

export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        per_page: 10,
        category: ''
      },
      category: {
        uuid: '',
        parent_category: '',
        name: '',
        thumbnail: null
      },
      fileList: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleRemove(file) {
      console.log(file)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`)
    },
    handleBefore(file) {
      this.category.thumbnail = file
    },

    async getList() {
      this.listLoading = true
      await Category.listCategory(this.listQuery).then(({ data }) => {
        this.list = data.data
        this.total = data.meta.total
        this.listLoading = false
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
      this.fileList = []
      this.category = {
        uuid: '',
        parent_category: '',
        name: '',
        thumbnail: null
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

      const formData = new FormData()
      formData.append('name', this.category.name)

      if (this.category.thumbnail) formData.append('thumbnail', this.category.thumbnail.raw)

      await Category.addCategory(formData)
        .then(res => {
          this.$notify({
            title: 'berhasil',
            message: 'Berhasil',
            type: 'success',
            duration: 2000
          })

          this.dialogFormVisible = false
          this.getList()
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleUpdate(row) {
      // this.category = Object.assign({}, row); // copy obj
      this.category = { ...row }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
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
        await Category.updateCategory(this.category, this.category.uuid)
        this.$notify({
          title: 'Berhasil',
          message: 'berhasil update category',
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
      await Category.deleteCategory(row.uuid)

      this.$notify({
        title: 'Success',
        message: 'Delete Category',
        type: 'success',
        duration: 2000
      })
      this.getList()
    }
  }
}
</script>
