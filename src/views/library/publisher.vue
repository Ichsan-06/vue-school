<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        :placeholder="$t('table.title')"
        v-model="listQuery.publisher"
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
      <el-table-column label="Year" prop="year" />

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
        :model="publisher"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="publisher.name" />
        </el-form-item>

        <el-form-item label="Year" prop="year">
          <el-input v-model="publisher.year" />
        </el-form-item>

        <!-- <el-form-item :label="$t('table.status')">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="temp.remark"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item> -->
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
import Publisher from '@/service/Publisher'

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
        publisher: ''
      },

      publisher: {
        uuid: '',
        name: '',
        year: ''
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
        ],
        year: [
          { required: true, message: 'year is required', trigger: 'blur' }
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
      await Publisher.listPublisher(this.listQuery)
        .then(({ data }) => {
          this.list = data.data
          this.total = data.meta.total
          this.listLoading = false
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
      this.publisher = {
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
      await Publisher.addPublisher(this.publisher)
        .then((res) => {
          this.$notify({
            title: 'berhasil',
            message: 'Berhasil',
            type: 'success',
            duration: 2000
          })

          this.dialogFormVisible = false
          this.getList()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    handleUpdate(row) {
      // this.publisher = Object.assign({}, row); // copy obj
      this.publisher = { ...row }
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
        await Publisher.updatePublisher(this.publisher, this.publisher.uuid)
        this.$notify({
          title: 'Berhasil',
          message: 'berhasil update publisher',
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
      await Publisher.deletePublisher(row.uuid)

      this.$notify({
        title: 'Success',
        message: 'Delete Publisher',
        type: 'success',
        duration: 2000
      })
      this.getList()
    }
  }
}
</script>
