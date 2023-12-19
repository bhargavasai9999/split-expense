import config from '../apis/config'
import api from '../apis/axiosConfig';

export const fetch_friends= (config)=>{
     api.get("/friends",config).then((res)=>{
            return res.data
    })
    .catch((err)=>{
        console.log("Something went wrong",err)
    })
}

export const fetch_groups= async (config)=>{
    await api.get("/group",config).then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log("something went wrong",err);
    })
}

export const add_Expense=(config,data)=>{
    
}

export const fetch_owe_details=(config)=>{

}
export const settle=(config,data)=>{


}
