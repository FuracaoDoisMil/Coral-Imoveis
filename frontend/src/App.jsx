import { Link, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Admin from "./pages/Home"
import VitrinDetalhesImoveis from "./pages/VitrineDetalhesImoveis"

function PaginaInicial() {

    const [imoveis, setImoveis] = useState([])
    const [imagens, setImagens] = useState([])
    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("nome")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:5000/imoveis")
            .then(r => r.json())
            .then(dados => setImoveis(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/imagens-imovel")
            .then(r => r.json())
            .then(dados => setImagens(dados))
            .catch(erro => console.log("ERRO:", erro))

    }, [])

    const imoveisFiltrados = imoveis
        .filter(imovel => imovel.status === "disponivel")
        .filter(imovel => {
            const texto = pesquisa.toLowerCase()
            if (filtro === "id")     return imovel.id_imovel?.toString().includes(pesquisa)
            if (filtro === "nome")   return imovel.nome_imovel?.toLowerCase().includes(texto)
            if (filtro === "tipo")   return imovel.tipo?.toLowerCase().includes(texto)
            if (filtro === "cidade") return imovel.cidade?.toLowerCase().includes(texto)
            if (filtro === "bairro") return imovel.bairro?.toLowerCase().includes(texto)
            return true
        })

    return (
        <div className="app">

            {/* Navbar */}
            <nav className="navbar">
                <span className="logo">🪸 Coral Imóveis</span>
                <div className="menu">
                    <Link to="/admin">
                        <button className="btn-admin">Sistema Administrativo</button>
                    </Link>
                </div>
                <span className="telefone-imobiliaria">
                    📞 (44) 99999-9999</span>
                    <p className="frase">Gostou de algum imovel? Ligue e agende uma visita!</p>
            </nav>

            {/* Conteúdo */}
            <div className="conteudo">
                <h2>Imóveis Disponíveis</h2>
                <p>Encontre o imóvel ideal para você</p>
            </div>

            {/* Filtro */}
            <div className="filtro-container">
                <select
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                >
                    <option value="nome">Nome</option>
                    <option value="tipo">Tipo</option>
                    <option value="cidade">Cidade</option>
                    <option value="bairro">Bairro</option>
                    <option value="id">ID</option>
                </select>

                <input
                    type="text"
                    placeholder="Pesquisar imóvel..."
                    value={pesquisa}
                    onChange={e => setPesquisa(e.target.value)}
                />
            </div>

            {/* Cards */}
            <div className="cards-imoveis">

                {imoveisFiltrados.map(imovel => {

                    const imagemCapa = imagens.find(
                        img => img.id_imovel === imovel.id_imovel &&
                               img.caminho_imagem_capa !== null
                    )

                    return (
                        <div className="card-imovel" key={imovel.id_imovel}>

                            {imagemCapa && (
                                <img
                                    className="imagem-imovel"
                                    src={`http://localhost:5000/${imagemCapa.caminho_imagem_capa}`}
                                    alt="Imagem do imóvel"
                                />
                            )}

                            <h2>{imovel.nome_imovel}</h2>

                            <p><strong>Tipo:</strong> {imovel.tipo}</p>

                            <p><strong>Cidade:</strong> {imovel.cidade}</p>

                            <p><strong>Bairro:</strong> {imovel.bairro}</p>

                            <p>
                                <strong>Venda:</strong>{" "}
                                {imovel.valor_venda
                                    ? `R$ ${Number(imovel.valor_venda).toLocaleString("pt-BR")}`
                                    : "Não disponível"}
                            </p>

                            <p>
                                <strong>Locação:</strong>{" "}
                                {imovel.valor_locacao
                                    ? `R$ ${Number(imovel.valor_locacao).toLocaleString("pt-BR")}/mês`
                                    : "Não disponível"}
                            </p>

                            <div className="acoes-imovel">
                                <button onClick={() => navigate(`/imoveis/${imovel.id_imovel}`)}>
                                    Ver Detalhes
                                </button>
                            </div>

                        </div>
                    )
                })}

                {imoveisFiltrados.length === 0 && (
                    <p style={{ color: "#ddd", marginTop: "40px" }}>
                        Nenhum imóvel encontrado.
                    </p>
                )}

            </div>

        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/imoveis/:id" element={<VitrinDetalhesImoveis />} />
            <Route path="/admin/*" element={<Admin />} />
        </Routes>
    )
}

export default App
