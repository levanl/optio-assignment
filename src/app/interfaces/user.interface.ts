export interface UserInfo {
  avatarId: string,
  email: string,
  firstName: string,
  id?: number,
  lastName: string,
  locked: boolean,
  roles: string[]
}

export interface RoleOption{
  code: string,
  name: string
}