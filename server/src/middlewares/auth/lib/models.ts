import { ObjectId } from "mongodb"




enum TokenName {
  ACCESS  = "ACCESS_TOKEN",
  REFRESH = "REFRESH_TOKEN",
}


enum UserGroup {
  ADMINS   = 0,
  MANAGERS = 1,
  USERS    = 3,
  GUESTS   = 4
}


interface Payload {
  userID: ObjectId
  group: UserGroup
}


interface AccessData {
  accessToken: string,
  refreshToken: string
}




export {
  UserGroup,
  TokenName,

  Payload,
  AccessData
}
