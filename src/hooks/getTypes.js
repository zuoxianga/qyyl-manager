import axios from "../hooks/request"
function getTypes(){
    return axios.get("/user/function/getTypes")
}

function getDep(){
    return axios.get("/dep/getDep")
}

function getDoc(departmentId){
    return axios.get("/doctor/getDoctorByDep/"+departmentId)
}

export {
    getTypes,getDep,getDoc
}