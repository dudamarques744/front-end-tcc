<template>
  <div class="pagina-consulta">
    <div class="fundo-decorativo" aria-hidden="true">
      <div class="mancha mancha-verde"></div>
      <div class="mancha mancha-dourada"></div>
      <div class="mancha mancha-clara"></div>
      <div class="anel anel-grande"></div>
      <div class="anel anel-pequeno"></div>

      <svg
        class="padrao-cruzes"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="cruzes"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 12v16M12 20h16"
              stroke="#2f5d54"
              stroke-width="1.4"
              stroke-linecap="round"
              opacity="0.10"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cruzes)" />
      </svg>

      <svg
        class="linha-pulso"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 60 H380 L410 20 L440 100 L470 60 H600 L630 30 L655 90 L680 60 H1000"
          fill="none"
          stroke="#2f5d54"
          stroke-width="2"
          opacity="0.12"
        />
      </svg>
    </div>

    <div class="card-consulta">
      <div class="card-topo">
        <button
          class="btn-voltar"
          @click="voltar"
          aria-label="Voltar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Voltar</span>
        </button>

        <div class="menu-opcoes">
          <button
            class="btn-pontinhos"
            @click="menuAberto = !menuAberto"
            aria-label="Mais opções"
            :aria-expanded="menuAberto"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="5" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="12" cy="19" r="1.8" />
            </svg>
          </button>

          <ul v-if="menuAberto" class="lista-opcoes">
            <li>
              <button @click="acao('editar')">
                Editar consulta
              </button>
            </li>
            <li>
              <button @click="acao('remarcar')">
                Remarcar
              </button>
            </li>
            <li>
              <button
                class="opcao-perigo"
                @click="acao('cancelar')"
              >
                Cancelar consulta
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="card-icone">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path
            d="M8 3v4M16 3v4M3 10h18"
            stroke-linecap="round"
          />
          <path
            d="M8.5 14.5l2 2 4-4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <h1 class="titulo">Consulta</h1>

      <dl class="detalhes">
        <div class="linha-detalhe">
          <dt>Médico</dt>
          <dd>{{ nomeMedico }}</dd>
        </div>

        <div class="linha-detalhe">
          <dt>Dia</dt>
          <dd>{{ dia }}</dd>
        </div>
      </dl>

      <div class="acoes">
        <button
          class="btn btn-secundario"
          @click="voltar"
        >
          Voltar
        </button>

        <button
          class="btn btn-primario"
          @click="entrar"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Consulta",

  props: {
    nomeMedico: {
      type: String,
      default: "Dr. Carlos Andrade"
    },

    dia: {
      type: String,
      default: "30 de setembro, 14h00"
    }
  },

  data() {
    return {
      menuAberto: false
    };
  },

  methods: {
    voltar() {
      this.$emit("voltar");
      this.$router.push("/telaPrincipal");
    },

    entrar() {
      this.$emit("entrar");
      this.$router.push("/detalhesConsulta");
    },

    acao(nome) {
      this.menuAberto = false;
      this.$emit("acao", nome);
    }
  }
};
</script>

<style scoped>
.pagina-consulta {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: linear-gradient(
    160deg,
    #f6f3ec 0%,
    #eef1ea 45%,
    #e6ede8 100%
  );
  padding: 24px;
  font-family: Georgia, "Times New Roman", serif;
  overflow: hidden;
}

.fundo-decorativo {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.padrao-cruzes {
  position: absolute;
  inset: 0;
}

.mancha {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.35;
}

.mancha-verde {
  width: 420px;
  height: 420px;
  background: #2f5d54;
  top: -140px;
  left: -120px;
}

.mancha-dourada {
  width: 360px;
  height: 360px;
  background: #c99a4b;
  bottom: -160px;
  right: -100px;
  opacity: 0.28;
}

.mancha-clara {
  width: 260px;
  height: 260px;
  background: #7fa89a;
  top: 45%;
  right: 8%;
  opacity: 0.18;
  filter: blur(90px);
}

.anel {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid #2f5d54;
  opacity: 0.14;
}

.anel-grande {
  width: 260px;
  height: 260px;
  top: 8%;
  right: 6%;
}

.anel-pequeno {
  width: 120px;
  height: 120px;
  bottom: 10%;
  left: 6%;
  border-color: #c99a4b;
  opacity: 0.22;
}

.linha-pulso {
  position: absolute;
  left: 0;
  right: 0;
  top: 14%;
  width: 100%;
  height: 90px;
}

.card-consulta {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 4px;
  padding: 32px 28px 28px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-consulta::before,
.card-consulta::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    #2f5d54 0%,
    #2f5d54 55%,
    #c99a4b 100%
  );
}

.card-consulta::before {
  top: 0;
  border-radius: 4px 4px 0 0;
}

.card-consulta::after {
  bottom: 0;
  border-radius: 0 0 4px 4px;
}

.card-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn-voltar {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #5b5b52;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
}

.btn-voltar:hover {
  color: #2f5d54;
  background: #f1efe8;
}

.menu-opcoes {
  position: relative;
}

.btn-pontinhos {
  background: none;
  border: none;
  color: #5b5b52;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
}

.btn-pontinhos:hover {
  background: #f1efe8;
  color: #2f5d54;
}

.lista-opcoes {
  position: absolute;
  top: 36px;
  right: 0;
  min-width: 190px;
  background: #ffffff;
  border: 1px solid #e7e3d8;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  list-style: none;
  margin: 0;
  padding: 6px;
  z-index: 10;
}

.lista-opcoes li + li {
  margin-top: 2px;
}

.lista-opcoes button {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 13.5px;
  color: #33332e;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.lista-opcoes button:hover {
  background: #f1efe8;
}

.opcao-perigo {
  color: #a8402f !important;
}

.card-icone {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #eef2ef;
  color: #2f5d54;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.titulo {
  font-size: 26px;
  color: #23291f;
  margin: 0 0 18px;
  font-weight: 700;
}

.detalhes {
  margin: 0 0 26px;
}

.linha-detalhe {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid #ece8dd;
  font-family: "Segoe UI", Arial, sans-serif;
}

.linha-detalhe:first-child {
  padding-top: 0;
}

.linha-detalhe dt {
  font-size: 13px;
  color: #8a8a7d;
  letter-spacing: 0.2px;
}

.linha-detalhe dd {
  margin: 0;
  font-size: 15px;
  color: #23291f;
  font-weight: 600;
  text-align: right;
}

.acoes {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: filter 0.15s ease;
}

.btn:hover {
  filter: brightness(0.95);
}

.btn-secundario {
  background: #ffffff;
  border-color: #d8d4c8;
  color: #4a4a42;
}

.btn-primario {
  background: #2f5d54;
  color: #ffffff;
}

@media (max-width: 480px) {
  .pagina-consulta {
    padding: 16px;
  }

  .card-consulta {
    padding: 26px 20px;
  }

  .linha-detalhe dd {
    font-size: 14px;
  }
}
</style>