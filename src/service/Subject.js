import subject from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/subject'

export default {
  listSubject(params = {}) {
    const paramsString = paramsConverter(params)

    return subject.get(`${resource}${paramsString}`)
  },
  getSubject(uuid) {
    return subject.get(`${resource}/${uuid}`)
  },
  deleteSubject(uuid) {
    return subject.delete(`${resource}/${uuid}`)
  },
  addSubject(data) {
    return subject.post(`${resource}`, data)
  },
  updateSubject(data, uuid) {
    return subject.patch(`${resource}/${uuid}`, data)
  }

}
