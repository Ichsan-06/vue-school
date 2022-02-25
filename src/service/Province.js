import province from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/province'

export default {
  listProvince(params = {}) {
    const paramsString = paramsConverter(params)

    return province.get(`${resource}${paramsString}`)
  },
  deleteProvince(uuid) {
    return province.delete(`${resource}/${uuid}`)
  },
  addProvince(data) {
    return province.post(`${resource}`, data)
  },
  updateProvince(data, uuid) {
    return province.patch(`${resource}/${uuid}`, data)
  }

}
