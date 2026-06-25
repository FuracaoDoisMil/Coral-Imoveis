import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AtualizarUsoCarro(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [idRegistro, setIdRegistro] = useState(null)
    const [dataRetorno, setDataRetorno] = useState("")
    const [horaRetorno, setHoraRetorno] = useState("")

    useEffect(() => {

        fetch("http://localhost:5000/uso-carro")

            .then(resposta => resposta.json())

            .then(dados => {

                const registros = dados.filter(
                    r => r.id_carro === Number(id) && !r.data_retorno
                )

                if(registros.length > 0){
                    setIdRegistro(registros[registros.length - 1].id_registro)
                }

            })

            .catch(erro => {
                console.log("ERRO:", erro)
            })

    }, [id])

    function registrarRetorno(){

        if(!dataRetorno || !horaRetorno){
            alert("Preencha a data e hora de retorno!")
            return
        }

        fetch(`http://localhost:5000/uso-carro/${idRegistro}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data_retorno: dataRetorno,
                hora_retorno: horaRetorno
            })
        })

        .then(resposta => resposta.json())

        .then(() => {

            return fetch(`http://localhost:5000/carros/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    situacao: "disponivel"
                })
            })

        })

        .then(() => {
            alert("Retorno registrado com sucesso!")
            navigate("/admin/carros/mostrar-carros")
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })

    }

    return(

        <div className="cadastro-container">

            <h1>Registrar Retorno do Carro</h1>

            <div className="form-grid">

                <input
                    type="date"
                    value={dataRetorno}
                    onChange={(e) => setDataRetorno(e.target.value)}
                />

                <input
                    type="time"
                    value={horaRetorno}
                    onChange={(e) => setHoraRetorno(e.target.value)}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={registrarRetorno}
            >
                Registrar Retorno
            </button>

            <button
                className="botao-cadastrar"
                onClick={() => navigate("/admin/carros/mostrar-carros")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default AtualizarUsoCarro
