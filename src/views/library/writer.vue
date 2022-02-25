<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        :placeholder="$t('table.title')"
        v-model="listQuery.writer"
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
      <el-table-column label="No" width="60">
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
        :model="writer"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="writer.name" />
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
import Writer from '@/service/Writer'

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
        per_page: 10
        // writer: ""
      },

      writer: {
        uuid: '',
        name: ''
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
          { required: true, message: 'name is required', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      await Writer.listWriter(this.listQuery)
        .then(({ data }) => {
          this.list = data.data
          this.total = data.meta.total
          this.listLoading = false
          console.log(this.list)
        })
        .catch((err) => {
          console.log(err)
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
      this.writer = {
        uuid: '',
        name: '',
        year: ''
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
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
      })
      await Writer.addWriter(this.writer)
        .then((res) => {
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
      this.writer = { ...row }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    async updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          return false
        }
      })
      try {
        await Writer.updateWriter(this.writer, this.writer.uuid)
        this.$notify({
          title: 'Berhasil',
          message: 'berhasil update writer',
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
      await Writer.deleteWriter(row.uuid)

      this.$notify({
        title: 'Success',
        message: 'Delete Writer',
        type: 'success',
        duration: 2000
      })
      this.getList()
    }
  }
}
</script>
