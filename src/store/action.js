import { LOGIN, SIGHNOUT} from "./constants"

export const login = data =>({
    type:LOGIN,
    payload:{
        userId:data.userId,
    }
})

export const signout = data =>({
    type:SIGHNOUT,
    payload:{},
})

