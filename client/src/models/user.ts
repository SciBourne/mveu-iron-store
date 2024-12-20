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
  login: string
  password: string
}


interface UserRegData extends UserData {
  password: string
  passwordRepeat: string
}




export type { UserData, UserAuth, UserRegData }
