import section from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/section'

export default {
  listSection(params = {}) {
    const paramsString = paramsConverter(params)

    return section.get(`${resource}${paramsString}`)
  },
  deleteSection(uuid) {
    return section.delete(`${resource}/${uuid}`)
  },
  addSection(data) {
    return section.post(`${resource}`, data)
  },
  updateSection(data, uuid) {
    return section.patch(`${resource}/${uuid}`, data)
  }

}
