import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AtualizarImoveis(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [proprietarios, setProprietarios] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [idProprietario, setIdProprietario] = useState("")
    const [idFuncionario, setIdFuncionario] = useState("")
    const [nomeImovel, setNomeImovel] = useState("")
    const [tipo, setTipo] = useState("")
    const [cep, setCep] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [status, setStatus] = useState("")
    const [valorLocacao, setValorLocacao] = useState("")
    const [valorVenda, setValorVenda] = useState("")
    const [quartos, setQuartos] = useState("")
    const [suites, setSuites] = useState("")
    const [vagasGaragem, setVagasGaragem] = useState("")
    const [area, setArea] = useState("")
    const [iptu, setIptu] = useState("")
    const [observacoes, setObservacoes] = useState("")
    const [imagem, setImagem] = useState(null)
    const [imagemAtual, setImagemAtual] = useState("")

    useEffect(() => {

        fetch(`http://localhost:5000/proprietarios`)
            .then(resposta => resposta.json())
            .then(dados => setProprietarios(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch(`http://localhost:5000/funcionarios`)
            .then(resposta => resposta.json())
            .then(dados => setFuncionarios(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch(`http://localhost:5000/imoveis`)
            .then(resposta => resposta.json())
            .then(dados => {

                const imovel = dados.find(
                    item => item.id_imovel === Number(id)
                )

                if(!imovel){

                    alert("Imóvel não encontrado!")
                    navigate("/imoveis/mostrar-imoveis")
                    return

                }

                setIdProprietario(imovel.id_proprietario)
                setIdFuncionario(imovel.id_funcionario)
                setNomeImovel(imovel.nome_imovel)
                setTipo(imovel.tipo)
                setCep(imovel.cep)
                setEndereco(imovel.endereco)
                setNumero(imovel.numero)
                setComplemento(imovel.complemento || "")
                setBairro(imovel.bairro)
                setCidade(imovel.cidade)
                setEstado(imovel.estado)
                setStatus(imovel.status)
                setValorLocacao(imovel.valor_locacao || "")
                setValorVenda(imovel.valor_venda || "")
                setQuartos(imovel.quartos || "")
                setSuites(imovel.suites || "")
                setVagasGaragem(imovel.vagas_garagem || "")
                setArea(imovel.area || "")
                setIptu(imovel.iptu || "")
                setObservacoes(imovel.observacoes || "")

            })

            .catch(erro => console.log("ERRO:", erro))

        fetch(`http://localhost:5000/imagens-imovel`)
            .then(resposta => resposta.json())
            .then(dados => {

                const imagemImovel = dados.find(
                    item => item.id_imovel === Number(id)
                )

                if(imagemImovel){

                    setImagemAtual(
                        `http://localhost:5000/${imagemImovel.caminho_imagem}`
                    )

                }

            })

            .catch(erro => console.log("ERRO:", erro))

    }, [id, navigate])

    async function atualizarImovel(){

        if(
            !idProprietario ||
            !idFuncionario ||
            !nomeImovel ||
            !tipo ||
            !cep ||
            !endereco ||
            !numero ||
            !bairro ||
            !cidade ||
            !estado
        ){
            alert("Preencha todos os campos obrigatórios!")
            return
        }

        try{

            const resposta = await fetch(
                `http://localhost:5000/imoveis/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        id_proprietario: idProprietario,
                        id_funcionario: idFuncionario,
                        nome_imovel: nomeImovel,
                        tipo,
                        cep,
                        endereco,
                        numero,
                        complemento,
                        bairro,
                        cidade,
                        estado,
                        status,
                        valor_locacao: valorLocacao,
                        valor_venda: valorVenda,
                        quartos,
                        suites,
                        vagas_garagem: vagasGaragem,
                        area,
                        iptu,
                        observacoes
                    })
                }
            )

            const dados = await resposta.json()

            console.log(dados)

            if(imagem){

                const formData = new FormData()

                formData.append("id_imovel", id)
                formData.append("imagem", imagem)

                await fetch(
                    "http://localhost:5000/imagens-imovel",
                    {
                        method: "POST",
                        body: formData
                    }
                )

            }

            alert("Imóvel atualizado com sucesso! :D")

            navigate("/imoveis/mostrar-imoveis")

        }catch(erro){

            console.log("ERRO:", erro)

        }

    }

    return(

        <div className="cadastro-container">

            <h2>Atualizar Imóvel</h2>

            <div className="form-grid">

                <select
                    value={idProprietario}
                    onChange={(e) => setIdProprietario(e.target.value)}
                >
                    <option value="">Selecione o Proprietário</option>

                    {proprietarios.map(proprietario => (
                        <option
                            key={proprietario.id_proprietario}
                            value={proprietario.id_proprietario}
                        >
                            {proprietario.nome} {proprietario.sobrenome}
                        </option>
                    ))}
                </select>

                <select
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                >
                    <option value="">Selecione o Funcionário</option>

                    {funcionarios.map(funcionario => (
                        <option
                            key={funcionario.id_funcionario}
                            value={funcionario.id_funcionario}
                        >
                            {funcionario.nome} {funcionario.sobrenome}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Nome do Imóvel"
                    value={nomeImovel}
                    onChange={(e) => setNomeImovel(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Estado"
                    value={estado}
                    maxLength={2}
                    onChange={(e) => setEstado(e.target.value.toUpperCase())}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="disponivel">Disponível</option>
                    <option value="alugado">Alugado</option>
                    <option value="vendido">Vendido</option>
                </select>

                <input
                    type="number"
                    placeholder="Valor Locação"
                    value={valorLocacao}
                    onChange={(e) => setValorLocacao(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor Venda"
                    value={valorVenda}
                    onChange={(e) => setValorVenda(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Quartos"
                    value={quartos}
                    onChange={(e) => setQuartos(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Suítes"
                    value={suites}
                    onChange={(e) => setSuites(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Vagas de Garagem"
                    value={vagasGaragem}
                    onChange={(e) => setVagasGaragem(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Área"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="IPTU"
                    value={iptu}
                    onChange={(e) => setIptu(e.target.value)}
                />

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

                <div>

                    <p>Imagem atual:</p>

                    {imagemAtual ? (
                        <img
                            src={imagemAtual}
                            alt="Imagem do imóvel"
                            width="250"
                        />
                    ) : (
                        <p>Sem imagem cadastrada</p>
                    )}

                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagem(e.target.files[0])}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={atualizarImovel}
            >
                Atualizar
            </button>

            <button
                className="botao-cadastrar"
                onClick={() => navigate("/imoveis/mostrar-imoveis")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default AtualizarImoveis
