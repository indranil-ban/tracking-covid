import {API} from "./backend";





export const createUser = user => {
    return fetch(`${API}/category`, 
    {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}


export const getaUser = userId => {
    return fetch(`${API}/user/${userId}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
           
        },
    
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{console.log(err)})
}


export const getAllUser=() =>{
    return fetch(`${API}/users`, {
        method: "GET",
        headers: {
            Accept: "application/json",
           
        },
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err)
    })
}




