import regencies from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/regencies'

export default {
  listRegencies(params = {}) {
    const paramsString = paramsConverter(params)
    return regencies.get(`${resource}${paramsString}`)
  },
  deleteRegencies(uuid) {
    return regencies.delete(`${resource}/${uuid}`)
  },
  addRegencies(data) {
    return regencies.post(`${resource}`, data)
  },
  updateRegencies(data, uuid) {
    return regencies.patch(`${resource}/${uuid}`, data)
  }

}
