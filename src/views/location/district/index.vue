<template>
  <div class="app-container">
    <el-button
      type="primary"
      style="margin-bottom: 30px"
      icon="el-icon-plus"
      @click="dialogVisible = true"
    >Add Regencies</el-button
    >

    <!-- ADD DIALOG -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="Add District"
      width="30%"
      center
    >
      <el-form
        :label-position="labelPosition"
        :model="district"
        label-width="10px"
      >
        <el-form-item label="Province">
          <el-select
            v-model="district.province_uuid"
            placeholder="please select your province"
            @change="changeListRegency"
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
          <el-select
            v-model="district.regencies_uuid"
            :placeholder="regenciesNull"
          >
            <el-option
              v-for="regenciesProv in regenciesByProvince"
              :label="regenciesProv.name"
              :value="regenciesProv.uuid"
              :key="regenciesProv.uuid"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Name">
          <el-input v-model="district.name"/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="addDistrict">Submit</el-button>
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
      :data="districts"
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
      <el-table-column label="Regencies" prop="regencies"/>

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
import District from '@/service/District'

export default {
  name: 'District',
  data() {
    return {
      districts: [],
      regencies: [],
      provinces: [],
      regenciesByProvince: [],
      search: '',
      listLoading: true,
      dialogVisible: false,
      updateDialogVisible: false,
      regenciesNull: 'please select your regencies',
      labelPosition: 'top',
      district: {
        name: '',
        uuid: '',
        province_uuid: '',
        regencies_uuid: ''
      }
    }
  },
  mounted() {
    this.listRegencies()
    this.listProvince()
    this.listDistrict()
  },
  methods: {
    handleCancel() {
      console.log('Hit aku')
      this.dialogVisible = false
      this.resetForm()
    },
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
      this.district.name = ''
      this.district.uuid = ''
      this.district.province_uuid = ''
      this.district.regencies_uuid = ''
    },
    async listProvince() {
      const { data } = await Province.listProvince()
      this.provinces = data.data
    },
    async listRegencies() {
      const { data } = await Regencies.listRegencies()
      this.listLoading = false
      this.regencies = data.data
    },
    async listDistrict() {
      const { data } = await District.listDistrict()
      this.listLoading = false
      this.districts = data.data
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
    async addDistrict() {
      await District.addDistrict(this.district)
      this.dialogVisible = false
      this.listDistrict()
      this.alertSuccess('Success add district')
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
    changeListRegency() {
      this.regenciesNull = 'please select your regencies'
      this.regenciesByProvince = this.regencies.filter(item => item.province_uuid === this.district.province_uuid)
      if (this.regenciesByProvince.length < 1) {
        this.regenciesNull = 'No data'
      }
    }
  }
}
</script>
