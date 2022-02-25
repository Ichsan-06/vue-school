import district from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/district'

export default {
  listDistrict(params = {}) {
    const paramsString = paramsConverter(params)

    return district.get(`${resource}${paramsString}`)
  },
  deleteDistrict(uuid) {
    return district.delete(`${resource}/${uuid}`)
  },
  addDistrict(data) {
    return district.post(`${resource}`, data)
  },
  updateDistrict(data, uuid) {
    return district.patch(`${resource}/${uuid}`, data)
  }

}
