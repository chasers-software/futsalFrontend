export const user=(user={userData:{},loading:false,success:false,failed:false,errormsg:''},action)=>{
    if(action.type==='REGISTER_SUCCESS')
    {
        //for check
        console.log('final',action.payload.data)

        localStorage.setItem('user',JSON.stringify(action.payload.data))
        return {...user,userData:action.payload.data,success:true,failed:false,loading:false}
    }
    
    else if(action.type==='REGISTER_FAILED')
    {
        //for check
        console.log('error',action.payload.data)

        return {...user,errormsg:action.payload.data.msg,failed:true,success:false,loading:false}



    }

    else if(action.type==='LOADING')
    {
        
        return {...user,loading:action.payload.loading,failed:action.payload.failed}

    }


    return user



}