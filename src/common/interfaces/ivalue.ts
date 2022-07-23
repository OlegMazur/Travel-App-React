import { IUser } from "./iuser"

export interface Ivalue {
    users: IUser
    signin: (user: IUser, cb: () => void) => void
    signout:  (user: IUser,cb: () => void) => void
}