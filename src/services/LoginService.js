import axiosConfigurations from "../configurations/AxiosConfiguration.js";

export default class LoginService {
    autenticarUsuario(usuario, tipo) {
        return axiosConfigurations.post("/login", {
            ...usuario,
            tipo: tipo
        });
    }

    verificarToken() {
        return axiosConfigurations.get("/login");
    }
}
