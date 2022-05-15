export  interface IUser{
    name: string;
    email:string
    password:string
}

export type ILogin = Omit<IUser,'name'>