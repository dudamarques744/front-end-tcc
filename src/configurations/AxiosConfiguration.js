
import axios from "axios"

const axiosConfigurations = axios.create({
    baseURL: "http://localhost:80",
});

axiosConfigurations.interceptors.request.use((requisicao) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        requisicao.headers.Authorization = token;
    }

    return requisicao;
});

export default axiosConfigurations;
