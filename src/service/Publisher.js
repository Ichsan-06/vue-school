import publisher from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/publisher'

export default {
  listPublisher(params = {}) {
    const paramsString = paramsConverter(params)

    return publisher.get(`${resource}${paramsString}`)
  },
  deletePublisher(uuid) {
    return publisher.delete(`${resource}/${uuid}`)
  },
  addPublisher(data) {
    return publisher.post(`${resource}`, data)
  },
  updatePublisher(data, uuid) {
    return publisher.patch(`${resource}/${uuid}`, data)
  }
}
