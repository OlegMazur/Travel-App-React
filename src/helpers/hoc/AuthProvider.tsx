import { createContext, useState } from 'react'
import { IUser } from '../../common/interfaces/iuser'
import { Ivalue } from '../../common/interfaces/ivalue'


export const AuthContext = createContext<Ivalue | null>(null)
export const AuthProvider = ({ children }: any) => {
    const [users, setUser] = useState<IUser>({email:"",password:""});
    const signin = (user: IUser, cb: any) => {
        const newUser: IUser = {
            id: Math.random(),
            fullName: user.fullName,
            email: user.email,
            password: user.password,
        }
        setUser(newUser)
        cb()
    }
    const signout = (cb: any) => {
        setUser({email:"",password:""})
        cb()
    }
    const value = { users, signin, signout }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
