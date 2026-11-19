<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import LoginService from "../services/LoginService.js"

const router = useRouter()
const loginService = new LoginService()

// ===== CONFIRA ESTES NOMES (podem ser diferentes no seu projeto) =====
const ROTA_PACIENTE_PRIMEIRO_ACESSO = "/boasVindas"
const ROTA_PACIENTE = "/telaPrincipal"
const ROTA_PROFISSIONAL = "/agenda"
const ROTA_CADASTRO_PACIENTE = "/cadastroPaciente"
const ROTA_CADASTRO_PROFISSIONAL = "/cadastroProfissional"
// =====================================================================

const cpf = ref(localStorage.getItem("cpfLembrado") || "")
const senha = ref("")
const lembrar = ref(!!localStorage.getItem("cpfLembrado"))
const erro = ref("")
const carregando = ref(false)

async function entrar() {
  erro.value = ""
  carregando.value = true

  try {
    // CONFIRA: nomes dos campos que o back-end espera (LoginControllers.js, função logar)
    const resposta = await loginService.autenticarUsuario({
      cpf: cpf.value,
      senha: senha.value
    })

    // CONFIRA: campos que o back-end devolve (tipo, nome, token e id)
    const { tipo, nome, token, id } = resposta.data

    sessionStorage.setItem("token", token)
    sessionStorage.setItem("tipo", tipo)
    sessionStorage.setItem("nome", nome)
    sessionStorage.setItem("id", id)

    if (lembrar.value) {
      localStorage.setItem("cpfLembrado", cpf.value)
    } else {
      localStorage.removeItem("cpfLembrado")
    }

    if (tipo === "paciente") {
      // Primeira vez deste paciente neste navegador: vai para a explicação
      const jaViu = localStorage.getItem(`boasVindasVisto_${id}`)
      router.push(jaViu ? ROTA_PACIENTE : ROTA_PACIENTE_PRIMEIRO_ACESSO)
    } else {
      router.push(ROTA_PROFISSIONAL)
    }
  } catch (e) {
    erro.value = "CPF ou senha inválidos."
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div class="pagina-login">
    <div class="caixa-login">
      <div class="lado-verde">
        <h2>Cuide da sua saúde</h2>
        <p>Consultas, horários e pagamentos em um só lugar.</p>
      </div>

      <div class="lado-form">
        <h1>Login</h1>

        <form @submit.prevent="entrar">
          <label for="cpf">Usuário (CPF)</label>
          <input
            id="cpf"
            v-model="cpf"
            type="text"
            placeholder="Digite seu CPF"
            autocomplete="off"
            required
          />

          <label for="senha">Senha</label>
          <input
            id="senha"
            v-model="senha"
            type="password"
            placeholder="Digite sua senha"
            autocomplete="new-password"
            required
          />

          <div class="linha-opcoes">
            <label class="lembrar">
              <input v-model="lembrar" type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <a href="#" class="link" @click.prevent>Esqueceu a senha?</a>
          </div>

          <p v-if="erro" class="erro">{{ erro }}</p>

          <button type="submit" class="botao-entrar" :disabled="carregando">
            {{ carregando ? "Entrando..." : "Entrar" }}
          </button>
        </form>

        <p class="cadastro-texto">Não tem uma conta? Cadastre-se como</p>
        <div class="cadastro-links">
          <router-link :to="ROTA_CADASTRO_PROFISSIONAL" class="botao-cadastro">Profissional</router-link>
          <router-link :to="ROTA_CADASTRO_PACIENTE" class="botao-cadastro">Paciente</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagina-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.caixa-login {
  display: flex;
  width: 100%;
  max-width: 820px;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(31, 77, 66, 0.25);
}

.lado-verde {
  flex: 1;
  background: linear-gradient(160deg, #2f5f55, #4f8a7c);
  color: #ffffff;
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lado-verde h2 {
  margin: 0 0 12px;
  font-size: 26px;
}

.lado-verde p {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  opacity: 0.9;
}

.lado-form {
  flex: 1;
  padding: 36px 32px;
  background: #f6f3ec;
}

.lado-form h1 {
  margin: 0 0 20px;
  text-align: center;
  color: #2f5f55;
  font-size: 26px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333333;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 14px;
  margin-bottom: 14px;
  border: 1px solid #a9c3bb;
  border-radius: 999px;
  background: #ffffff;
  color: #222222;
  font-size: 14px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #2f5f55;
  box-shadow: 0 0 0 3px rgba(47, 95, 85, 0.2);
}

.linha-opcoes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-size: 13px;
}

.lembrar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
}

.link {
  color: #2f5f55;
  text-decoration: underline;
}

.erro {
  margin: 0 0 12px;
  color: #b3261e;
  font-size: 13px;
  text-align: center;
}

.botao-entrar {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 999px;
  background: #2f5f55;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.botao-entrar:hover {
  background: #3b7567;
}

.botao-entrar:disabled {
  background: #9aa9a4;
  cursor: not-allowed;
}

.cadastro-texto {
  margin: 20px 0 10px;
  text-align: center;
  font-size: 14px;
  color: #444444;
}

.cadastro-links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.botao-cadastro {
  padding: 8px 18px;
  border: 1px solid #2f5f55;
  border-radius: 999px;
  color: #2f5f55;
  font-size: 14px;
  text-decoration: none;
}

.botao-cadastro:hover {
  background: #2f5f55;
  color: #ffffff;
}

@media (max-width: 640px) {
  .caixa-login {
    flex-direction: column;
  }

  .lado-verde {
    padding: 24px;
  }
}
</style>