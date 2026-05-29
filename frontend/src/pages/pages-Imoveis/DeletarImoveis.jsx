import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function DeletarImoveis(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [imovel, setImovel] = useState(null)

    const [imagem, setImagem] = useState("")

    useEffect(() => {

        fetch(`http://localhost:5000/imoveis/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setImovel(dados)

                return fetch(`http://localhost:5000/imagens-imovel`)
            })

            .then(resposta => resposta.json())

            .then(dados => {

                const imagemImovel = dados.find(
                    img => img.id_imovel === Number(id)
                )

                if(imagemImovel){

                    setImagem(
                        `http://localhost:5000/${imagemImovel.caminho_imagem}`
                    )

                }

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function deletarImovel(){

        const confirmar = window.confirm(
            "Tem certeza que deseja deletar este imóvel?"
        )

        if(!confirmar){

            return

        }

        fetch(`http://localhost:5000/imoveis/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Imóvel deletado com sucesso! :D")

            navigate("/imoveis/mostrar-imoveis")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    if(!imovel){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Deletar Imóvel</h1>

            <div className="card-deletar">

                {imagem && (

                    <img
                        src={imagem}
                        alt="Imagem do imóvel"
                        className="imagem-preview"
                    />

                )}

                <p>
                    <strong>ID:</strong> {imovel.id_imovel}
                </p>

                <p>
                    <strong>Nome:</strong> {imovel.nome_imovel}
                </p>

                <p>
                    <strong>Tipo:</strong> {imovel.tipo}
                </p>

                <p>
                    <strong>CEP:</strong> {imovel.cep}
                </p>

                <p>
                    <strong>Endereço:</strong> {imovel.endereco}
                </p>

                <p>
                    <strong>Número:</strong> {imovel.numero}
                </p>

                <p>
                    <strong>Complemento:</strong>{" "}
                    {imovel.complemento || "Sem complemento"}
                </p>

                <p>
                    <strong>Bairro:</strong> {imovel.bairro}
                </p>

                <p>
                    <strong>Cidade:</strong> {imovel.cidade}
                </p>

                <p>
                    <strong>Estado:</strong> {imovel.estado}
                </p>

                <p>
                    <strong>Status:</strong> {imovel.status}
                </p>

                <p>
                    <strong>Valor Locação:</strong>{" "}
                    {imovel.valor_locacao || "Não informado"}
                </p>

                <p>
                    <strong>Valor Venda:</strong>{" "}
                    {imovel.valor_venda || "Não informado"}
                </p>

                <p>
                    <strong>Quartos:</strong>{" "}
                    {imovel.quartos || "Não informado"}
                </p>

                <p>
                    <strong>Suítes:</strong>{" "}
                    {imovel.suites || "Não informado"}
                </p>

                <p>
                    <strong>Vagas Garagem:</strong>{" "}
                    {imovel.vagas_garagem || "Não informado"}
                </p>

                <p>
                    <strong>Área:</strong>{" "}
                    {imovel.area || "Não informado"}
                </p>

                <p>
                    <strong>IPTU:</strong>{" "}
                    {imovel.iptu || "Não informado"}
                </p>

                <p>
                    <strong>Observações:</strong>{" "}
                    {imovel.observacoes || "Nenhuma"}
                </p>

                <button
                    className="btn-deletar"
                    onClick={deletarImovel}
                >
                    Confirmar Exclusão
                </button>

                <button
                    className="btn-cancelar"
                    onClick={() => navigate("/imoveis/mostrar-imoveis")}
                >
                    Cancelar
                </button>

            </div>

        </div>

    )

}

export default DeletarImoveis
