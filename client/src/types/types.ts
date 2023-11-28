export interface IUserData {
    email: string
    password: string
}

export interface IResponseUser {
    id: number
    email: string
    password: string
    createdAt: string
    updatedAt: string
}

export interface IResponseUserData {
    user: IResponseUser
    token: string
}

export interface IUser {
    id: number
    email: string
    token: string
}