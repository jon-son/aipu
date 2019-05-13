import {
  HTTP
} from '../utils/http-p.js'
class UploadModel extends HTTP {

  upPic() {
    return this.request({
      url: "/api/shops",
      data: {
        lng,
        lat,
        type,
        offset
      },
      method: "GET"
    })
  }


}

export {
  UploadModel
}