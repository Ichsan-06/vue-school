import lesson from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/lesson'

export default {
  listLesson(params = {}) {
    const paramsString = paramsConverter(params)

    return lesson.get(`${resource}${paramsString}`)
  },
  getLesson(uuid) {
    return lesson.get(`${resource}/${uuid}`)
  },
  deleteLesson(uuid) {
    return lesson.delete(`${resource}/${uuid}`)
  },
  addLesson(data) {
    return lesson.post(`${resource}`, data)
  },
  updateLesson(data, uuid) {
    return lesson.patch(`${resource}/${uuid}`, data)
  }

}
