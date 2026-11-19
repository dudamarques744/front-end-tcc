<template>
    <div class="login-container">
        <div class="login-box">

            <!-- Lado esquerdo - ilustração -->
            <div class="login-illustration">
                <div class="cloud cloud-1"></div>
                <div class="cloud cloud-2"></div>
                <div class="cloud cloud-3"></div>

                <!-- Nome do site -->
                <div class="marca">
                    <h2 class="marca-nome">Mente Viva</h2>
                    <p class="marca-significado">Valorização da saúde mental</p>
                </div>

                <div class="illustration-icon">
                    <div class="icones-saude">
                        <Icon icon="mdi:heart-pulse" class="icone-saude icone-coracao" />
                        <Icon icon="mdi:stethoscope" class="icone-saude icone-estetoscopio" />
                        <Icon icon="mdi:medical-bag" class="icone-saude icone-maleta" />
                        <Icon icon="mdi:needle" class="icone-saude icone-seringa" />
                    </div>
                </div>
            </div>

            <!-- Lado direito - formulário -->
            <div class="login-form-side">
                <div class="form-wrapper">

                    <h1 class="login-title">LOGIN</h1>

                    <form class="formulario" @submit.prevent="realizarLogin()">
                        <!-- Tipo de acesso -->
                        <div class="campo">
                            <span class="rotulo">Entrar como</span>
                            <div class="tipo-usuario">
                                <button
                                    type="button"
                                    class="btn-tipo"
                                    :class="{ ativo: tipoUsuario === 'paciente' }"
                                    @click="tipoUsuario = 'paciente'"
                                >
                                    <Icon icon="material-symbols:person" width="18" height="18" />
                                    Paciente
                                </button>
                                <button
                                    type="button"
                                    class="btn-tipo"
                                    :class="{ ativo: tipoUsuario === 'profissional' }"
                                    @click="tipoUsuario = 'profissional'"
                                >
                                    <Icon icon="material-symbols:stethoscope" width="18" height="18" />
                                    Profissional
                                </button>
                            </div>
                        </div>

                        <!-- CPF -->
                        <div class="campo">
                            <label for="usuario" class="rotulo">Usuário (CPF)</label>
                            <input
                                type="text"
                                id="usuario"
                                class="entrada"
                                v-model="usuario.cpfUsuario"
                                v-mask="'###.###.###-##'"
                                placeholder="000.000.000-00"
                                required
                            />
                        </div>

                        <!-- Senha -->
                        <div class="campo">
                            <label for="senha" class="rotulo">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                class="entrada"
                                v-model="usuario.senhaUsuario"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <!-- Lembrar-me / Esqueceu a senha -->
                        <div class="linha-opcoes">
                            <label class="lembrar" for="lembrar">
                                <input type="checkbox" id="lembrar" />
                                Lembrar-me
                            </label>
                            <a href="#" class="link-esqueceu">Esqueceu a senha?</a>
                        </div>

                        <!-- Entrar -->
                        <button class="btn-entrar" type="submit" :disabled="carregando">
                            {{ carregando ? "Entrando..." : "Entrar" }}
                        </button>
                    </form>

                    <!-- Cadastro -->
                    <p class="cadastro-titulo">Cadastre-se como</p>
                    <div class="cadastro-opcoes">
                        <router-link to="/cadastre-se/profissional" class="btn-pill">
                            <Icon icon="material-symbols:stethoscope" width="16" height="16" />
                            Profissional
                        </router-link>
                        <router-link to="/cadastre-se/paciente" class="btn-pill">
                            <Icon icon="material-symbols:person" width="16" height="16" />
                            Paciente
                        </router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//Importando as bibliotecas necessárias
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import LoginService from '../services/LoginService.js'

//Pegando o router do vue-router (evita importar o RouterConfigurations de volta)
const router = useRouter()

//Criando as variáveis do usuário
const usuario = ref({
    cpfUsuario: "",
    senhaUsuario: ""
})

//Tipo de acesso selecionado (paciente por padrão)
const tipoUsuario = ref("paciente")

//Indica se o login está em andamento (desabilita o botão enquanto envia)
const carregando = ref(false)

//Tela para onde cada tipo de usuário é enviado após o login
const rotasPorTipo = {
    paciente: "/telaPrincipal",
    profissional: "/telaPrincipalProfissional"
}

//Criando a função para autenticar o usuário
async function realizarLogin() {
    console.log("Clicou em entrar:", usuario.value, tipoUsuario.value)
    carregando.value = true
    try {
        const loginService = new LoginService()
        const resposta = await loginService.autenticarUsuario(usuario.value, tipoUsuario.value)
        console.log("Resposta da API:", resposta.data)

        if (resposta.data.token) {
            //Confere se o tipo devolvido pela API é o mesmo que o usuário escolheu
            const tipoRetornado = String(resposta.data.tipo || '').toLowerCase().trim()

            if (tipoRetornado !== tipoUsuario.value) {
                alert(`A API retornou o tipo "${tipoRetornado}", mas você selecionou "${tipoUsuario.value}".`)
                return
            }

            sessionStorage.setItem("token", resposta.data.token)
            sessionStorage.setItem("idUsuario", resposta.data.id)
            sessionStorage.setItem("nomeUsuario", resposta.data.nome)
            sessionStorage.setItem("tipoUsuario", resposta.data.tipo)
            router.push(rotasPorTipo[resposta.data.tipo])
        } else {
            //Caso o usuário não exista, manda mensagem
            alert(resposta.data.mensagem || "Usuário ou senha inválidos.")
        }
    } catch (erro) {
        //Se o login der erro (inclusive servidor fora do ar), manda mensagem
        console.error("Erro no login:", erro)
        alert(erro.response?.data?.mensagem || `Erro: ${erro.message}`)
    } finally {
        carregando.value = false
    }
}
</script>

<style scoped>
/* ===== Base (não depende do Bootstrap) ===== */
.login-container,
.login-container *,
.login-container *::before,
.login-container *::after {
    box-sizing: border-box;
}

.login-container {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    color: #1a2b4c;
}

/* ===== Container geral ===== */
.login-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, #5fd4ff 0%, #eaf7ff 70%);
    padding: 30px;
}

.login-box {
    display: flex;
    width: 100%;
    max-width: 860px;
    min-height: 480px;
    background: #fff;
    border-radius: 60px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.18);
}

/* ===== Painel esquerdo ===== */
.login-illustration {
    flex: 1;
    background: #29b6f6;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 60px 0 0 60px;
}

/* ===== Nome do site ===== */
.marca {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
    padding: 0 20px;
    z-index: 2;
}

.marca-nome {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
}

.marca-significado {
    margin: 4px 0 0;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    opacity: 0.9;
}

.illustration-icon {
    color: #fff;
    z-index: 2;
    opacity: 0.95;
}

.icones-saude {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 26px;
    align-items: center;
    justify-items: center;
}

.icone-saude {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.icone-coracao {
    width: 72px;
    height: 72px;
    color: #ff5c5c;
    grid-column: 1 / span 2;
}

.icone-estetoscopio {
    width: 60px;
    height: 60px;
    color: #fff;
}

.icone-maleta {
    width: 56px;
    height: 56px;
    color: #1a2b4c;
    background: #fff;
    border-radius: 12px;
    padding: 8px;
}

.icone-seringa {
    width: 60px;
    height: 60px;
    color: #fff;
    grid-column: 1 / span 2;
    transform: rotate(45deg);
}

.cloud {
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    bottom: -40px;
}

.cloud-1 { width: 140px; height: 140px; left: 10px;  opacity: 0.85; }
.cloud-2 { width: 200px; height: 200px; left: 70px;  bottom: -80px; opacity: 0.9; }
.cloud-3 { width: 150px; height: 150px; right: 10px; opacity: 0.85; }

/* ===== Painel direito ===== */
.login-form-side {
    flex: 1;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-wrapper {
    width: 100%;
    max-width: 320px;
}

.login-title {
    text-align: center;
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 1.6rem;
    margin: 0 0 28px;
    color: #1a2b4c;
}

/* ===== Formulário: tudo empilhado, mesma largura ===== */
.formulario {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.rotulo {
    display: block;
    font-size: 0.85rem;
    color: #6c757d;
    margin: 0;
    padding-left: 6px;
}

/* Seletor Paciente / Profissional */
.tipo-usuario {
    display: flex;
    gap: 8px;
}

.btn-tipo {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: none;
    border-radius: 999px;
    padding: 10px 8px;
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
    background: #edecf1;
    color: #1a2b4c;
    font-weight: 500;
    transition: background 0.15s ease, color 0.15s ease;
}

.btn-tipo:hover {
    background: #dcd9e6;
}

.btn-tipo.ativo {
    background: #29b6f6;
    color: #fff;
}

/* Campos de texto */
.entrada {
    display: block;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 999px;
    padding: 0 22px;
    font-family: inherit;
    font-size: 0.95rem;
    color: #1a2b4c;
    background-color: #edecf1;
    outline: none;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
}

.entrada::placeholder {
    color: #9aa0ab;
}

.entrada:focus {
    background-color: #faf2f2;
    box-shadow: 0 0 0 3px rgba(41, 182, 246, 0.25);
}

/* Lembrar-me / Esqueceu a senha */
.linha-opcoes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
}

.lembrar {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: #6c757d;
    cursor: pointer;
}

.lembrar input {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: #29b6f6;
    cursor: pointer;
}

.link-esqueceu {
    font-size: 0.85rem;
    color: #9505fc;
    text-decoration: none;
    font-weight: 500;
}

.link-esqueceu:hover {
    text-decoration: underline;
}

/* Botão entrar */
.btn-entrar {
    display: block;
    width: 100%;
    height: 50px;
    margin-top: 4px;
    background: #4829f6;
    border: none;
    color: #f0f4f2;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 999px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.btn-entrar:hover:not(:disabled) {
    background: #3a1fd1;
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(72, 41, 246, 0.35);
    color: #fff;
}

.btn-entrar:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* ===== Cadastro ===== */
.cadastro-titulo {
    text-align: center;
    font-size: 0.875rem;
    color: #6c757d;
    margin: 26px 0 10px;
}

.cadastro-opcoes {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.btn-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    border-radius: 999px;
    padding: 10px 18px;
    border: 1px solid #ced4da;
    background: transparent;
    color: #5c6670;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.btn-pill:hover {
    background: #29b6f6;
    border-color: #29b6f6;
    color: #fff;
}

/* ===== Responsivo ===== */
@media (max-width: 700px) {
    .login-box {
        flex-direction: column;
        border-radius: 40px;
    }

    .login-illustration {
        min-height: 260px;
        padding-top: 70px;
        border-radius: 40px 40px 0 0;
    }

    .marca {
        top: 20px;
    }

    .marca-nome {
        font-size: 1.5rem;
    }

    .login-form-side {
        padding: 30px 20px;
    }
}
</style>