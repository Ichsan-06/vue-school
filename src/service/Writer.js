import writer from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/writer'

export default {
  listWriter(params = {}) {
    const paramsString = paramsConverter(params)

    return writer.get(`${resource}${paramsString}`)
  },
  deleteWriter(uuid) {
    return writer.delete(`${resource}/${uuid}`)
  },
  addWriter(data) {
    return writer.post(`${resource}`, data)
  },
  updateWriter(data, uuid) {
    return writer.patch(`${resource}/${uuid}`, data)
  }
}
