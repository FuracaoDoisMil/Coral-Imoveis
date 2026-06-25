import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function DeletarContratos(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [contrato, setContrato] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/contratos/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                setContrato(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function deletarContrato(){

        const confirmar = window.confirm(
            "Deseja realmente deletar este contrato?"
        )

        if(!confirmar){
            return
        }

        fetch(`http://localhost:5000/contratos/${id}`, {
            method: "DELETE"
        })

        .then(resposta => resposta.json())

        .then(dados => {

            if(dados.erro){
                alert(dados.erro)
                return
            }

            alert("Contrato deletado!")
            navigate("/admin/contratos/mostrar-contratos")

        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })

    }

    if(!contrato){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Deletar Contrato</h1>

            <div className="card-deletar">

                <p>
                    <strong>ID Contrato:</strong> {contrato.id_contrato}
                </p>

                <p>
                    <strong>Tipo:</strong> {contrato.tipo_contrato}
                </p>

                <p>
                    <strong>Status:</strong> {contrato.status}
                </p>

                <p>
                    <strong>ID Venda:</strong>{" "}
                    {contrato.id_venda || "—"}
                </p>

                <p>
                    <strong>ID Locação:</strong>{" "}
                    {contrato.id_locacao || "—"}
                </p>

                <p>
                    <strong>Data de Criação:</strong>{" "}
                    {new Date(contrato.criado_em).toLocaleDateString()}
                </p>

                <p>
                    <strong>Observações:</strong>{" "}
                    {contrato.observacoes || "Nenhuma"}
                </p>

                <button
                    className="btn-deletar"
                    onClick={deletarContrato}
                >
                    Confirmar Exclusão
                </button>

                <button
                    className="btn-cancelar"
                    onClick={() => navigate("/admin/contratos/mostrar-contratos")}
                >
                    Cancelar
                </button>

            </div>

        </div>

    )

}

export default DeletarContratos
