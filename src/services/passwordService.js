import { supabase } from "./supabaseClient"


export async function verifyPassword(password){


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser()



    if(!user){

        return {
            success:false,
            error:"No authenticated user."
        }

    }



    const {
        error
    } = await supabase.auth.signInWithPassword({

        email:user.email,

        password

    })



    if(error){

        return {
            success:false,
            error:"Incorrect password."
        }

    }



    return {
        success:true
    }

}