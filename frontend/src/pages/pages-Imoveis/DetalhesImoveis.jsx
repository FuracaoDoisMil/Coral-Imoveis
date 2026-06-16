import { useState, useEffect } from "react"
import {Navigate ,useNavigate,useParams } from "react-router-dom"

function DetalhesImoveis(){
    const {id} = useParams()
    
    const navigate = useNavigate()
    
    const [funcionarios, setFuncionarios] = useState([])

    const [proprietarios, setProprietarios] = useState([])

    const [imoveis, setImoveis] = useState([])

    const [imagens, setImagens] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/imoveis/${id}`)
            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)

                setImoveis(dados)
            })

            .catch(erro => {
                console.log("ERRO", erro)
            })

        
        fetch("http://localhost:5000/funcionarios")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setFuncionarios(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })



        fetch("http://localhost:5000/proprietarios")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setProprietarios(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

        fetch("http://localhost:5000/imagens-imovel")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setImagens(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [])

    return(
        
        <div className="detalhes-container">
            
            <h1>Detalhes do imovel {imoveis.nome_imovel}</h1>

            <div className="galeria">

                {capa && (
                    <img className=""/>
                )}
            </div>

        </div>
        
    )

}

export default DetalhesImoveis