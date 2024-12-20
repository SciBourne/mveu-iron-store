import { action, observable, runInAction } from "mobx"

import { UserData, UserRegData } from "../models"
import { user } from "../services"




class UserStore {
  @observable accessor isAuth: boolean = false
  @observable accessor data: UserData | null = null

  constructor() {
    setTimeout(
      () => runInAction(() => this.login()),
      1000
    )
  }

  @action.bound
  async login(log?: string, pass?: string) {
    try {
      const data: UserData | null = await user.auth(log, pass)

      if (data) {
        runInAction(
          () => {
            this.isAuth = true
            this.data = data
          }
        )

      } else {
        runInAction(
          () => {
            this.isAuth = false
            this.data = null
          }
        )
      }

    } catch (err) {
      console.log(err)
      runInAction(() => this.isAuth = false)
    }
  }

  @action.bound
  clear() {
    this.isAuth = false
    this.data = null
  }

  @action.bound
  async logout() {
    if (this.data) {
      await user.logout(this.data.email)
    }
  }

  @action.bound
  async updateData(newData: UserData) {
    try {
      const status = await user.update(newData)

      if (status) {
        runInAction(
          () => {
            this.data = newData
          }
        )
      }

    } catch (err) {
      console.log(err)
    }
  }

  @action.bound
  async register(regData: UserRegData): Promise<boolean> {
    try {
      const status = await user.register(regData)

      if (status) {
        runInAction(
          () => {
            const { password, passwordRepeat, ...data } = regData

            this.isAuth = true
            this.data = data
          }
        )

        return true

      } else {
        return false
      }

    } catch (err) {
      console.log(err)
      return false
    }
  }
}




export { UserStore }
