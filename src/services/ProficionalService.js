//Importando o axios
import axiosConfigurations from "../configurations/AxiosConfigurations.js";

//Criando as funções de comunicação
//Com o back-end (API em Express.js)
export default class ProfissionalService {

    //POST - Função de cadastro do profissional
    cadastrar(profissional) {
        return axiosConfigurations.post("/profissional", profissional)
    }

    //PUT - Função para alterar/atualizar dados do profissional
    alterar(profissional) {
        return axiosConfigurations.put("/profissional", profissional)
    }

    //GET - Função para consultar 1 profissional
    consultar(idProfissional) {
        return axiosConfigurations.get(`/profissional/${idProfissional}`)
    }

    //GET - Função para listar os profissionais
    listar() {
        return axiosConfigurations.get("/profissional")
    }

    //DELETE - Função para excluir 1 profissional
    excluir(idProfissional) {
        return axiosConfigurations.delete(`/profissional/${idProfissional}`)
    }
}