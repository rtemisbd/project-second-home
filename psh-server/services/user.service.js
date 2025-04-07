import User from "../models/User.js"

const getUserById = async (id)=>{
    const result = await User.findOne({_id : ""});

    return result
}


export const userServices = {
    getUserById
}