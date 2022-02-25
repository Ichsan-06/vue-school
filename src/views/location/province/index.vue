<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content">
          <el-button
            type="primary"
            style="margin-bottom: 30px"
            icon="el-icon-plus"
            @click="dialogVisible = true"
          >
            Add Province
          </el-button>
        </div>
      </el-col>
      <el-col :span="6" :offset="12">
        <el-input
          v-model="search"
          placeholder="Search"
        />
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      title="Add Province"
      width="30%"
      center
    >
      <el-form
        :label-position="labelPosition"
        :model="provinces"
        label-width="100px"
        size="small"
      >
        <el-form-item label="Name">
          <el-input v-model="provinces.name"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addProvince">Submit</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="updateDialogVisible"
      title="Update Province"
      width="30%"
      center
    >
      <el-form
        :label-position="labelPosition"
        :model="provinces"
        label-width="100px"
        size="small"
      >
        <el-form-item label="Name">
          <el-input v-model="provinces.name"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="updateProvince(provinces.uuid)"
        >Submit</el-button
        >
      </span>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="province"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="No" prop="uuid">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name"/>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Province from '@/service/Province'

export default {
  name: 'Province',
  data() {
    return {
      province: [],
      search: '',
      listLoading: true,
      dialogVisible: false,
      updateDialogVisible: false,
      labelPosition: 'top',
      formInline: {
        user: '',
        region: ''
      },
      provinces: {
        name: '',
        uuid: ''
      }
    }
  },
  watch: {
    search: {
      handler() {
        this.listLoading = true
        this.searchProvince()
      }
    }
  },
  mounted() {
    this.listProvince()
  },
  methods: {
    handleEdit(index, row) {
      this.updateDialogVisible = true
      this.provinces.name = row.name
      this.provinces.uuid = row.uuid
    },
    handleDelete(row) {
      this.deleteProvince(row.uuid)
    },
    resetForm() {
      this.provinces.name = ''
      this.provinces.uuid = ''
    },
    async searchProvince() {
      const { data } = await Province.listProvince({
        province: this.search
      })
      this.listLoading = false
      this.province = data.data
    },

    async listProvince() {
      const { data } = await Province.listProvince()
      this.listLoading = false
      this.province = data.data
    },

    async deleteProvince(uuid) {
      await Province.deleteProvince(uuid)
      this.listProvince()
      this.alertSuccess('Berhasil Delete province')
      this.listLoading = true
    },
    alertSuccess(msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    async addProvince() {
      await Province.addProvince(this.provinces)
      this.dialogVisible = false
      this.listProvince()
      this.alertSuccess('Success add province')
      this.listLoading = true
      this.resetForm()
    },
    async updateProvince(uuid) {
      await Province.updateProvince(this.provinces, uuid)
      this.updateDialogVisible = false
      this.listProvince()
      this.alertSuccess('Success update province')
      this.listLoading = true
      this.resetForm()
    }
  }
}
</script>
