import chapter from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/chapter'

export default {
  listChapter(params = {}) {
    const paramsString = paramsConverter(params)

    return chapter.get(`${resource}${paramsString}`)
  },
  getChapter(uuid) {
    return chapter.get(`${resource}/${uuid}`)
  },
  deleteChapter(uuid) {
    return chapter.delete(`${resource}/${uuid}`)
  },
  addChapter(data) {
    return chapter.post(`${resource}`, data)
  },
  updateChapter(data, uuid) {
    return chapter.patch(`${resource}/${uuid}`, data)
  }

}
