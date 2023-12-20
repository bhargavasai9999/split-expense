import config from '../apis/config'
import api from '../apis/axiosConfig';
import {  useToasts } from 'react-toast-notifications';


export const fetch_friends= async()=>{
     await api.get("/friends",config).then((res)=>{
            return res.data
    })
    .catch((err)=>{
        console.log("Something went wrong",err)
    })
}

export const fetch_groups= async ()=>{
    await api.get("/group",config).then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log("something went wrong",err);
    })
}

export const add_Expense=async (formData)=>{
    const {addToast}=useToasts()
    await api.post("/splitExpense",{title:formData.title,description:formData.description,amount:formData.amount,friendIds:formData.selectedFriends},config).then((res)=>{
        return addToast(res.message,{appearance:"success"})
    }).catch((err)=>{
    console.log(err);
})
    
}

export const fetch_owe_details=(config)=>{

}
export const settle=(config,data)=>{


}
