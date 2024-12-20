export interface IUserEntity {
  id: number
  firstName: string
  lastName: string
}

export interface IUserList {
  users: IUserEntity[]
  skip: number
  total: number
}
