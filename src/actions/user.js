import * as api from '../api'

export const register=(formData)=>async(dispatch)=>{
    try
    {
        //for check
        console.log('action dispatched')

    const data=await api.registerUser(formData)

    //for check
    console.log(data)

    dispatch({type:'REGISTER_SUCCESS',payload:data})
    }
    catch(err)
    {
       
        dispatch({type:'REGISTER_FAILED',payload:err.response})

    }

}

export const loadingScreen=(loading)=>(dispatch)=>{
    dispatch({type:'LOADING',payload:{loading:loading,failed:false}})
}