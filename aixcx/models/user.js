import {
  HTTP
} from '../utils/http-p.js'
class UserModel extends HTTP {
  // 用户登录
  getUser(code) {
    return this.request({
      url: '/get_user',
      data:{
        code
      },
      method: "POST"
    })
  }

  regiterUser(nickname, avatar,openid) {
    return this.request({
      url: '/regiter_user',
      data: {
        avatar,
        nickname,
        openid
      },
      method: "POST"
    })
  }

  getUserInfo(userId, type) {
    return this.request({
      url: "/api/users/" + userId,
      data: {
        type
      },
      method: "GET"
    })
  }
  getNear(userid, lng, lat, offset) {
    return this.request({
      url: "/api/users/" + userid,
      data: {
        lng,
        lat,
        type: "near",
        offset
      },
      method: "GET"
    })
  }

  getUserList(type, offset) {
    return this.request({
      url: "/api/users",
      data: {
        type,
        offset
      },
      method: "GET"
    })
  }
  getInvitation(invitation_code) {

    // code 为invitation_code时获取邀请码，为userid时获取邀请成功的人数
    return this.request({
      url: "/api/users/" + invitation_code,
      data: {
        type: "invitation"
      },
      method: "GET"
    })
  }

  putLocation(userid, location_lng, location_lat) {
    return this.request({
      url: "/api/users/" + userid,
      data: {
        type: "location",
        location_lng,
        location_lat
      },
      method: "PUT"
    })
  }
  putLocationPref(userid, approve_nearby) {
    return this.request({
      url: "/api/users/" + userid,
      data: {
        type: "locationPref",
        approve_nearby
      },
      method: "PUT"
    })
  }
  putUserInfo(userid, userInfo) {
    return this.request({
      url: "/api/users/" + userid,
      data: {
        type: "main",
        avatar: userInfo.avatar,
        nickname: userInfo.nickname,
        gender: userInfo.gender,
        birthday: userInfo.birthday,
        remark: userInfo.remark,
        photos: userInfo.photos,

      },
      method: "PUT"
    })
  }

  // 获取我的订单列表
  getOrderList(userid, offset, type) {
    return this.request({
      url: "/api/users/" + userid,
      data: {
        type,
        offset
      },
      method: "GET"
    })
  }

  // 提交评论
  setComment(data) {
    return this.request({
      url: "/api/shops",
      data,
      method: "POST"
    })
  }


}

export {
  UserModel
}