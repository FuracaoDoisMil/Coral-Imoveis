import { Navigate } from "react-router-dom"

function RotaProtegida({ children }){

    const funcionario = JSON.parse(localStorage.getItem("funcionario"))

    if(!funcionario){
        return <Navigate to="/login" />
    }

    return children

}

export default RotaProtegida