import level from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/level'

export default {
  listLevel(params = {}) {
    const paramsString = paramsConverter(params)

    return level.get(`${resource}${paramsString}`)
  },
  deleteLevel(uuid) {
    return level.delete(`${resource}/${uuid}`)
  },
  addLevel(data) {
    return level.post(`${resource}`, data)
  },
  updateLevel(data, uuid) {
    return level.patch(`${resource}/${uuid}`, data)
  }

}
