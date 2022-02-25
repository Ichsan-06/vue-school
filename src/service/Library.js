import library from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/library'

export default {
  listLibrary(params = {}) {
    const paramsString = paramsConverter(params)

    return library.get(`${resource}${paramsString}`)
  },
  deleteLibrary(uuid) {
    return library.delete(`${resource}/${uuid}`)
  },
  addLibrary(data) {
    return library.post(`${resource}`, data)
  },
  updateLibrary(data, uuid) {
    return library.patch(`${resource}/${uuid}`, data)
  }

}
