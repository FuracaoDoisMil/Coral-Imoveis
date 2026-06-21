import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CadastrarImoveis(){
    const [idProprietario, setIdProprietario] = useState("")
    const [Proprietario, setProprietario] = useState([])
    const [idFuncionario, setIdFuncionario] = useState("")
    const [Funcionario, setFuncionario] = useState([])
    const [nomeImovel, setNomeImovel] = useState("")
    const [tipo, setTipo] = useState("")
    const [cep, setCep] = useState("")
    const [endereco, setEndereco] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [valorLocacao, setValorLocacao] = useState("")
    const [valorVenda, setValorVenda] = useState("")
    const [quartos, setQuartos] = useState("")
    const [suites, setSuites] = useState("")
    const [vagasGaragem, setVagasGaragem] = useState("")
    const [area, setArea] = useState("")
    const [iptu, setIptu] = useState("")
    const [observacoes, setObservacoes] = useState("")
    const [imagens, setImagens] = useState([])
    const [imagem_capa, setImagem_Capa] = useState("")
    const navigate = useNavigate()


    useEffect(()=>{
            fetch(`http://localhost:5000/proprietarios`)
            
            .then(resposta => resposta.json())

            .then(dados => setProprietario(dados))

            .catch(erro => {
                console.log("ERRO", erro)
            })

            
            fetch(`http://localhost:5000/funcionarios`)

            .then(resposta => resposta.json())

            .then(dados => setFuncionario(dados))

            .catch(erro => {
                console.log("ERRO", erro)
            })

    },[])

    async function cadastrarImovel(){

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
            alert("Preencha os campos obrigatórios!")
            return
        }

        try{

            const resposta = await fetch(
                "http://localhost:5000/imoveis",
                {

                    method: "POST",

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

            const idImovel = dados.id_imovel

            
            const formData1 = new FormData()
            formData1.append("id_imovel", idImovel)
            if(imagem_capa){
                formData1.append("imagem_capa", imagem_capa)
            }
            const respostaImagemCapa = await fetch(`http://localhost:5000/imagens-imovel-capa`,{
                
                method: "POST",
                body: formData1

            })            
            if(!respostaImagemCapa.ok){
                throw new Error("Erro ao enviar a imagem da capa")
            }



            if(imagens.length > 0){

                for(const imagem of imagens){

                    const formData2 = new FormData()

                    formData2.append("id_imovel", idImovel)

                    formData2.append("imagem", imagem)

                    const respostaImagem = await fetch(
                        `http://localhost:5000/imagens-imovel`,
                        {
                            method: "POST",
                            body: formData2
                        }
                    )

                    if(!respostaImagem.ok){

                        throw new Error("Erro ao enviar imagem")

                    }

                }

            }

            alert("Imóvel cadastrado com sucesso! :D")

            navigate("/admin/imoveis/mostrar-imoveis")

            

        }

        catch(erro){

            console.log("ERRO:", erro)

        }

    }

    return(

        <div className="cadastro-container">

            <h1>Cadastrar Imóvel</h1>

            <div className="form-grid">

                <select 
                    value={idProprietario}
                    onChange={(e) => setIdProprietario(e.target.value)}
                >
                    <option value="">
                        Selecione o Proprietario
                    </option>

                    {Proprietario.map(Proprietario=>(
                        <option
                            key={Proprietario.id_proprietario}
                            value={Proprietario.id_proprietario}
                        >
                            {Proprietario.nome} {Proprietario.sobrenome}
                        </option>
                    ))}

                </select>

                <select
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                >
                    <option value="">
                        Selecione o Corretor
                    </option>

                    {Funcionario.filter(Funcionario => Funcionario.tipo_funcionario === "Corretor").map(Funcionario =>
                        <option
                            key={Funcionario.id_funcionario}
                            value={Funcionario.id_funcionario}
                        >

                            {Funcionario.nome} {Funcionario.sobrenome}

                        </option>
                    )}

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
                    onChange={(e) => setEstado(e.target.value)}
                />

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
                    placeholder="Vagas Garagem"
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

                
                <div className="upload-container">

                    <label className="upload-box">
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setImagem_Capa(e.target.files[0])
                            }}
                        />
                        <span>📸 Selecione uma imagem para capa do anuncio</span>
                        {imagem_capa && <p>{imagem_capa.name}</p>}
                    </label>

                    <label className="upload-box">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                setImagens([...e.target.files])
                            }}
                        />
                        <span>🖼️ Selecione imagens do imóvel</span>

                        {imagens.length > 0 && (
                            <p>{imagens.length} imagem(ns) selecionada(s)</p>
                        )}
                    </label>

                </div>

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={cadastrarImovel}
            >
                Cadastrar
            </button>

            <button
                className="botao-cancelar"
                onClick={() => navigate("/admin/imoveis/mostrar-imoveis")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default CadastrarImoveis
