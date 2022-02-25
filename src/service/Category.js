import category from './clients/AxiosDev'
import paramsConverter from './utils/paramsConverter'

const resource = 'api/v1/category'
// const config = { headers: { 'Content-Type': 'multipart/form-data' }}

export default {
  listCategory(params = {}) {
    const paramsString = paramsConverter(params)

    return category.get(`${resource}${paramsString}`)
  },
  deleteCategory(uuid) {
    return category.delete(`${resource}/${uuid}`)
  },
  addCategory(asaas) {
    return category.post(`${resource}`, asaas)
  },
  updateCategory(data, uuid) {
    return category.patch(`${resource}/${uuid}`, data)
  }

}
