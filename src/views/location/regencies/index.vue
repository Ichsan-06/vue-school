<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button
          type="primary"
          style="margin-bottom: 30px"
          icon="el-icon-plus"
          @click="dialogVisible = true"
        >Add Regencies
        </el-button>
      </el-col>

      <el-col :span="6" :offset="12">
        <el-input
          v-model="search"
          placeholder="Search"
        />
      </el-col>

    </el-row>

    <!-- ADD DIALOG -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="Add Regencies"
      width="30%"
      center
    >
      <el-form
        :label-position="labelPosition"
        :model="regencies"
        label-width="10px"
      >
        <el-form-item label="Regencies">
          <el-select
            v-model="regencies.province_uuid"
            placeholder="please select your province"
          >
            <el-option
              v-for="province in provinces"
              :label="province.name"
              :value="province.uuid"
              :key="province.uuid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Regencies">
          <el-input v-model="regencies.name"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addRegencies">Submit</el-button>
      </span>
    </el-dialog>

    <!-- UPDATE DIALOG -->
    <el-dialog
      :visible.sync="updateDialogVisible"
      title="Update Regencies"
      width="30%"
      center
    >
      <el-form
        :label-position="labelPosition"
        :model="regencies"
        label-width="100px"
        size="small"
      >
        <el-form-item label="Regencies">
          <el-select
            v-model="regencies.province_uuid"
            :value="regencies.province_uuid"
            placeholder="please select your province"
          >
            <el-option
              v-for="province in provinces"
              :label="province.name"
              :value="province.uuid"
              :key="province.uuid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Name">
          <el-input v-model="regencies.name"/>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="updateRegencies(regencies.uuid)"
        >Submit</el-button
        >
      </span>
    </el-dialog>

    <!-- LIST TABLE -->
    <el-table
      v-loading="listLoading"
      :data="regency"
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

      <el-table-column label="Province" prop="province"/>

      <el-table-column label="Name" prop="name"/>

      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Regencies from '@/service/Regencies'
import Province from '@/service/Province'

export default {
  name: 'Regencies',
  data() {
    return {
      regency: [],
      provinces: [],
      search: '',
      listLoading: true,
      dialogVisible: false,
      updateDialogVisible: false,
      labelPosition: 'top',
      regencies: {
        name: '',
        uuid: '',
        province_uuid: ''
      }
    }
  },

  watch: {
    search: {
      handler() {
        this.listLoading = true
        this.searchRegencies()
      }
    }
  },
  mounted() {
    this.listRegencies()
    this.listProvince()
  },
  methods: {
    handleEdit(index, row) {
      this.updateDialogVisible = true
      this.regencies.name = row.name
      this.regencies.uuid = row.uuid
      this.regencies.province_uuid = row.province_uuid
    },
    handleDelete(row) {
      this.deleteRegencies(row.uuid)
    },
    resetForm() {
      this.regencies.name = ''
      this.regencies.uuid = ''
      this.regencies.province_uuid = ''
    },
    async listProvince() {
      const { data } = await Province.listProvince()
      this.provinces = data.data
    },
    async listRegencies() {
      const { data } = await Regencies.listRegencies()
      this.listLoading = false
      this.regency = data.data
    },
    async deleteRegencies(uuid) {
      await Regencies.deleteRegencies(uuid)
      this.listRegencies()
      this.alertSuccess('Berhasil Delete regencies')
      this.listLoading = true
    },
    alertSuccess(msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    async addRegencies() {
      await Regencies.addRegencies(this.regencies)
      this.dialogVisible = false
      this.listRegencies()
      this.alertSuccess('Success add regencies')
      this.listLoading = true
      this.resetForm()
    },
    async updateRegencies(uuid) {
      await Regencies.updateRegencies(this.regencies, uuid)
      this.updateDialogVisible = false
      this.listRegencies()
      this.alertSuccess('Success update regencies')
      this.listLoading = true
      this.resetForm()
    },
    async searchRegencies() {
      const { data } = await Regencies.listRegencies({
        regencies: this.search
      })
      this.listLoading = false
      this.regency = data.data
    }
  }
}
</script>
