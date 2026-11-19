//Importando o axios
import axiosConfigurations from "../configurations/AxiosConfiguration.js";

//Criando as funções de comunicação
//Com o back-end (API em Express.js)
export default class PacienteService {

    //POST - Função de cadastro do paciente
    cadastrar(paciente) {
        return axiosConfigurations.post("/paciente", paciente)
    }

    //PUT - Função para alterar/atualizar dados do paciente
    alterar(paciente) {
        return axiosConfigurations.put("/paciente", paciente)
    }

    //GET - Função para consultar 1 paciente
    consultar(idPaciente) {
        return axiosConfigurations.get(`/paciente/${idPaciente}`)
    }

    //GET - Função para listar os pacientes
    listar() {
        return axiosConfigurations.get("/paciente")
    }

    //DELETE - Função para excluir 1 paciente
    excluir(idPaciente) {
        return axiosConfigurations.delete(`/paciente/${idPaciente}`)
    }
}