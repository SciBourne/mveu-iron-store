import { ObjectId, Timestamp } from "mongodb";




enum UserGroup {
  ADMINS   = 0,
  MANAGERS = 1,
  USERS    = 3,
  GUESTS   = 4
}


interface UserData {
  firstName: string
  secondName: string
  patronymic: string

  email: string
  phone: number

  region: string
  city: string
  street: string
  house: number
  apartment?: number
}


interface UserAuth {
  token: string
  expireIn: Timestamp

  hash?: string
  salt?: string
}


interface User {
  _id?: ObjectId
  group: UserGroup

  auth: UserAuth
  data?: UserData
}


interface UserRegData extends UserData {
  password: string
}


interface UserAccess {
  userID: ObjectId
  accessToken: string
  refreshToken: string
}




export {
  User,
  UserAuth,
  UserData,
  UserRegData,
  UserAccess,
  UserGroup
}
