import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function VitrinDetalhesImoveis() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [imovel, setImovel] = useState(null)
    const [imagens, setImagens] = useState([])
    const [imagemSelecionada, setImagemSelecionada] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/imoveis/${id}`)
            .then(r => r.json())
            .then(dados => setImovel(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/imagens-imovel")
            .then(r => r.json())
            .then(dados => setImagens(dados))
            .catch(erro => console.log("ERRO:", erro))

    }, [id])

    useEffect(() => {

        const imagemCapa = imagens.find(
            img => img.id_imovel === Number(id) &&
                   img.caminho_imagem_capa !== null
        )

        if (imagemCapa) setImagemSelecionada(imagemCapa)

    }, [imagens, id])

    if (!imovel) return <h2>Carregando...</h2>

    const miniaturas = imagens.filter(img => {
        if (img.id_imovel !== Number(id)) return false
        if (imagemSelecionada?.id_imagem === img.id_imagem) return false
        return true
    })

    return (
        <div className="app">
            <div className="detalhes-container">

                <h1 className="titulo-imovel">{imovel.nome_imovel}</h1>

                {/* Galeria de imagens */}
                <div className="galeria">

                    {imagemSelecionada && (
                        <img
                            className="imagem-capa"
                            src={`http://localhost:5000/${
                                imagemSelecionada.caminho_imagem_capa ??
                                imagemSelecionada.caminho_imagem
                            }`}
                            alt="Imagem Principal"
                        />
                    )}

                    <div className="galeria-secundaria">
                        {miniaturas.map(img => (
                            <img
                                key={img.id_imagem}
                                className="imagem-secundaria"
                                src={`http://localhost:5000/${
                                    img.caminho_imagem_capa ?? img.caminho_imagem
                                }`}
                                alt="Imagem do imóvel"
                                onClick={() => setImagemSelecionada(img)}
                            />
                        ))}
                    </div>

                </div>

                {/* Informações */}
                <div className="info-imovel">

                    <div className="card-info">

                        <h2>Informações do Imóvel</h2>

                        <div className="atributos">

                            <div className="atributo">
                                <strong>Tipo</strong>
                                <p>{imovel.tipo}</p>
                            </div>

                            <div className="atributo">
                                <strong>Quartos</strong>
                                <p>{imovel.quartos ?? "—"}</p>
                            </div>

                            <div className="atributo">
                                <strong>Suítes</strong>
                                <p>{imovel.suites ?? "—"}</p>
                            </div>

                            <div className="atributo">
                                <strong>Garagem</strong>
                                <p>{imovel.vagas_garagem ?? "—"}</p>
                            </div>

                            <div className="atributo">
                                <strong>Área</strong>
                                <p>{imovel.area ? `${imovel.area} m²` : "—"}</p>
                            </div>

                            <div className="atributo">
                                <strong>Status</strong>
                                <p>{imovel.status}</p>
                            </div>

                        </div>

                        <div className="descricao">
                            <h3>Descrição</h3>
                            <p>{imovel.observacoes || "Sem descrição cadastrada."}</p>
                        </div>

                    </div>

                    {/* Sidebar com valores e endereço */}
                    <div className="card-contato">

                        <h3>Localização e Valores</h3>

                        <br />

                        <p>
                            <strong>Endereço:</strong><br />
                            {imovel.endereco}, {imovel.numero}
                            {imovel.complemento ? `, ${imovel.complemento}` : ""}
                        </p>

                        <p>{imovel.bairro}</p>

                        <p>{imovel.cidade} — {imovel.estado}</p>

                        <p>CEP: {imovel.cep}</p>

                        <br />

                        <p>
                            <strong>Valor de Venda:</strong><br />
                            {imovel.valor_venda
                                ? `R$ ${Number(imovel.valor_venda).toLocaleString("pt-BR")}`
                                : "Não disponível"}
                        </p>

                        <br />

                        <p>
                            <strong>Valor de Locação:</strong><br />
                            {imovel.valor_locacao
                                ? `R$ ${Number(imovel.valor_locacao).toLocaleString("pt-BR")}/mês`
                                : "Não disponível"}
                        </p>

                        <br />

                        <p>
                            <strong>IPTU anual:</strong><br />
                            {imovel.iptu
                                ? `R$ ${Number(imovel.iptu).toLocaleString("pt-BR")}`
                                : "Não informado"}
                        </p>

                    </div>

                </div>

                {/* Só botão Voltar — sem Atualizar nem Deletar */}
                <div className="acoes-detalhes">
                    <button
                        className="btn-voltar"
                        onClick={() => navigate("/")}
                    >
                        ← Voltar
                    </button>
                </div>

            </div>
        </div>
    )
}

export default VitrinDetalhesImoveis
