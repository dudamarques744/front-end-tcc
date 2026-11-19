
<template>
  <div class="pagina-pagamento">
    <!-- Menu lateral -->
    <aside class="menu-lateral">
      <div class="marca">
        <span class="icone-marca">♡</span>
        <div>
          <h2>Saúde Mental</h2>
          <p>Cuidar também é<br />um ato de força</p>
        </div>
      </div>

      <nav class="navegacao">
        <button @click="navegar('/telaPrincipal')">
          <span>⌂</span> Painel
        </button>

        <button @click="navegar('/consulta')">
          <span>▣</span> Consultas
        </button>

        <button @click="navegar('/listaAtendimentos')">
          <span>▤</span> Histórico
        </button>

        <button @click="navegar('/mensagens')">
          <span>▱</span> Mensagens
        </button>

        <button class="ativo" @click="navegar('/formularioPagamento')">
          <span>▣</span> Pagamento
        </button>
      </nav>

      <div class="frase-menu">
        Cuidar da sua mente é<br />
        cuidar do seu futuro.
      </div>
    </aside>

    <!-- Conteúdo principal -->
    <main class="conteudo">
      <header class="topo">
        <div>
          <h1>Forma de pagamento</h1>
          <p>Finalize seu agendamento com segurança.</p>
        </div>

        <button
          class="botao-voltar"
          type="button"
          @click="voltar"
        >
          ← Voltar
        </button>
      </header>

      <!-- Resumo -->
      <section class="cartao resumo">
        <div class="icone-resumo">▣</div>

        <div class="dados-consulta">
          <small>RESUMO DA CONSULTA</small>
          <h2>Consulta psicológica</h2>
          <p>Atendimento psicológico</p>
        </div>

        <div class="detalhes-resumo">
          <p><strong>Data:</strong> {{ agendamento.data || 'A definir' }}</p>
          <p><strong>Horário:</strong> {{ agendamento.horario || 'A definir' }}</p>
          <p><strong>Profissional:</strong> {{ agendamento.profissional || 'Psicóloga' }}</p>
        </div>

        <div class="preco">
          <small>Valor demonstrativo</small>
          <strong>{{ formatarMoeda(valor) }}</strong>
        </div>
      </section>

      <!-- Formas de pagamento -->
      <section class="cartao escolha">
        <h2>Escolha a forma de pagamento</h2>
        <p class="subtitulo">
          Selecione uma opção para continuar.
        </p>

        <div class="opcoes">
          <button
            type="button"
            class="opcao"
            :class="{ selecionada: forma === 'pix' }"
            @click="selecionarForma('pix')"
          >
            <span class="icone-opcao pix">◆</span>
            <span class="texto-opcao">
              <strong>Pix</strong>
              <small>Rápido e prático</small>
              <small>Aprovação imediata na simulação</small>
            </span>
            <span v-if="forma === 'pix'" class="marcado">✓</span>
          </button>

          <button
            type="button"
            class="opcao"
            :class="{ selecionada: forma === 'cartao' }"
            @click="selecionarForma('cartao')"
          >
            <span class="icone-opcao cartao-icone">▰</span>
            <span class="texto-opcao">
              <strong>Cartão de crédito</strong>
              <small>Preenchimento demonstrativo</small>
              <small>Sem cobrança real</small>
            </span>
            <span v-if="forma === 'cartao'" class="marcado">✓</span>
          </button>

          <button
            type="button"
            class="opcao"
            :class="{ selecionada: forma === 'boleto' }"
            @click="selecionarForma('boleto')"
          >
            <span class="icone-opcao boleto-icone">▥</span>
            <span class="texto-opcao">
              <strong>Boleto bancário</strong>
              <small>Visualização demonstrativa</small>
              <small>Sem boleto bancário real</small>
            </span>
            <span v-if="forma === 'boleto'" class="marcado">✓</span>
          </button>
        </div>

        <!-- Pix -->
        <div v-if="forma === 'pix'" class="detalhe-pagamento">
          <h3>Pagamento via Pix</h3>
          <p>
            Esta é uma demonstração. Nenhuma chave Pix real será gerada.
          </p>
          <div class="aviso-pix">
            <span>◆</span>
            <div>
              <strong>Pix selecionado</strong>
              <p>Valor: {{ formatarMoeda(valor) }}</p>
            </div>
          </div>
        </div>

        <!-- Cartão -->
        <div v-if="forma === 'cartao'" class="detalhe-pagamento">
          <h3>Dados demonstrativos do cartão</h3>
          <p>Use apenas informações fictícias nesta demonstração.</p>

          <form @submit.prevent="confirmarPagamento">
            <label for="nomeCartao">Nome no cartão</label>
            <input
              id="nomeCartao"
              v-model.trim="cartao.nome"
              type="text"
              placeholder="Ex.: Maria da Silva"
              autocomplete="off"
              required
            />

            <label for="numeroCartao">Número fictício do cartão</label>
            <input
              id="numeroCartao"
              v-model="cartao.numero"
              type="text"
              inputmode="numeric"
              maxlength="19"
              placeholder="0000 0000 0000 0000"
              autocomplete="off"
              @input="formatarNumeroCartao"
              required
            />

            <div class="campos-duplos">
              <div>
                <label for="validade">Validade fictícia</label>
                <input
                  id="validade"
                  v-model="cartao.validade"
                  type="text"
                  maxlength="5"
                  placeholder="MM/AA"
                  autocomplete="off"
                  @input="formatarValidade"
                  required
                />
              </div>

              <div>
                <label for="parcelas">Parcelas demonstrativas</label>
                <select id="parcelas" v-model="cartao.parcelas">
                  <option value="1">1x</option>
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                  <option value="6">6x</option>
                  <option value="12">12x</option>
                </select>
              </div>
            </div>

            <p class="aviso-seguranca">
              Não informe dados reais de cartão. Este formulário não realiza
              cobranças e não deve ser usado com dados financeiros verdadeiros.
            </p>

            <button class="botao-confirmar" type="submit">
              Simular pagamento · {{ formatarMoeda(valor) }}
            </button>
          </form>
        </div>

        <!-- Boleto -->
        <div v-if="forma === 'boleto'" class="detalhe-pagamento">
          <h3>Boleto bancário demonstrativo</h3>
          <p>
            Um boleto válido depende de um serviço de pagamento integrado.
            Nenhum documento bancário real será emitido aqui.
          </p>
          <div class="boleto-falso">
            <span>▥</span>
            <div>
              <strong>Boleto de demonstração</strong>
              <p>Valor ilustrativo: {{ formatarMoeda(valor) }}</p>
              <small>Documento sem validade para pagamento.</small>
            </div>
          </div>
        </div>

        <!-- Mensagens -->
        <div v-if="mensagem" class="mensagem" :class="tipoMensagem" role="status">
          {{ mensagem }}
        </div>

        <div v-if="!pagamentoConcluido" class="acoes">
          <button
            type="button"
            class="botao-confirmar"
            @click="confirmarPagamento"
          >
            Confirmar pagamento <span>→</span>
          </button>

          <p class="seguranca">♙ Seus dados são tratados com cuidado.</p>
        </div>

        <div v-else class="resultado">
          <div class="resultado-icone">✓</div>
          <h3>Simulação concluída!</h3>
          <p>
            Forma escolhida: {{ nomeFormaPagamento }}.
          </p>
          <p>
            Valor demonstrativo: {{ formatarMoeda(valor) }}.
          </p>
          <p class="aviso-seguranca">
            Nenhum pagamento real foi realizado.
          </p>

          <button
            type="button"
            class="botao-confirmar"
            @click="navegar('/telaPrincipal')"
          >
            Voltar ao painel →
          </button>
        </div>
      </section>

      <footer>
        Saúde Mental · Seu bem-estar importa.
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: "FormularioPagamento",

  data() {
    return {
      forma: "pix",
      valor: 120,
      mensagem: "",
      tipoMensagem: "",
      pagamentoConcluido: false,

      cartao: {
        nome: "",
        numero: "",
        validade: "",
        parcelas: "1",
      },

      agendamento: {
        data: "",
        horario: "",
        profissional: "",
      },
    };
  },

  computed: {
    nomeFormaPagamento() {
      const nomes = {
        pix: "Pix",
        cartao: "Cartão de crédito",
        boleto: "Boleto bancário",
      };

      return nomes[this.forma];
    },
  },

  mounted() {
    // Recupera os dados do agendamento, se existirem.
    try {
      const salvo = sessionStorage.getItem("agendamentoSelecionado");

      if (salvo) {
        const dados = JSON.parse(salvo);

        this.agendamento.data =
          dados.data || dados.dataAtendimento || "";

        this.agendamento.horario =
          dados.horario || dados.hora || "";

        this.agendamento.profissional =
          dados.profissional || dados.nomeProfissional || "";
      }
    } catch (erro) {
      console.warn("Não foi possível ler o agendamento salvo.", erro);
    }
  },

  methods: {
    navegar(caminho) {
      this.$router.push(caminho);
    },

    voltar() {
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.navegar("/telaPrincipal");
      }
    },

    selecionarForma(forma) {
      this.forma = forma;
      this.mensagem = "";
      this.tipoMensagem = "";
      this.pagamentoConcluido = false;
    },

    formatarMoeda(valor) {
      return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },

    formatarNumeroCartao() {
      const numeros = this.cartao.numero.replace(/\D/g, "").slice(0, 16);

      this.cartao.numero = numeros.replace(/(\d{4})(?=\d)/g, "$1 ");
    },

    formatarValidade() {
      const numeros = this.cartao.validade.replace(/\D/g, "").slice(0, 4);

      this.cartao.validade =
        numeros.length > 2
          ? numeros.slice(0, 2) + "/" + numeros.slice(2)
          : numeros;
    },

    confirmarPagamento() {
      this.mensagem = "";
      this.tipoMensagem = "";

      if (this.forma === "cartao") {
        const numero = this.cartao.numero.replace(/\D/g, "");
        const partes = this.cartao.validade.split("/");
        const mes = Number(partes[0]);
        const ano = Number(partes[1]);

        if (this.cartao.nome.length < 3) {
          this.mostrarMensagem("Preencha o nome demonstrativo do cartão.", "erro");
          return;
        }

        if (numero.length !== 16) {
          this.mostrarMensagem(
            "Para a simulação, informe 16 dígitos fictícios.",
            "erro"
          );
          return;
        }

        if (
          partes.length !== 2 ||
          partes[0].length !== 2 ||
          partes[1].length !== 2 ||
          mes < 1 ||
          mes > 12 ||
          ano < 0
        ) {
          this.mostrarMensagem(
            "Confira a validade fictícia no formato MM/AA.",
            "erro"
          );
          return;
        }
      }

      this.pagamentoConcluido = true;
      this.mostrarMensagem(
        "A simulação foi concluída. Nenhuma cobrança foi realizada.",
        "sucesso"
      );
    },

    mostrarMensagem(texto, tipo) {
      this.mensagem = texto;
      this.tipoMensagem = tipo;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.pagina-pagamento {
  display: flex;
  min-height: 100vh;
  background: #f2f7ff;
  color: #102f68;
  font-family: Arial, Helvetica, sans-serif;
}

.menu-lateral {
  width: 265px;
  min-width: 230px;
  background: linear-gradient(180deg, #1d4c9e, #10336e);
  color: white;
  padding: 28px 10px;
  display: flex;
  flex-direction: column;
}

.marca {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px 28px;
  border-bottom: 1px solid #ffffff25;
}

.icone-marca {
  font-size: 48px;
  line-height: 1;
}

.marca h2 {
  margin: 0 0 5px;
  font-size: 20px;
}

.marca p {
  margin: 0;
  line-height: 1.5;
  font-size: 13px;
}

.navegacao {
  display: grid;
  gap: 9px;
  margin-top: 28px;
}

.navegacao button {
  display: flex;
  align-items: center;
  gap: 17px;
  width: 100%;
  padding: 15px 18px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: white;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.navegacao button span {
  font-size: 23px;
  width: 25px;
  text-align: center;
}

.navegacao button:hover,
.navegacao button.ativo {
  background: #3474df;
}

.frase-menu {
  margin-top: auto;
  padding: 30px 15px 5px;
  color: #bcd6ff;
  line-height: 1.7;
  font-size: 14px;
}

.conteudo {
  flex: 1;
  min-width: 0;
  padding: 36px;
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}

.topo h1 {
  margin: 0 0 9px;
  font-size: clamp(25px, 3vw, 36px);
  font-weight: 800;
}

.topo p {
  margin: 0;
  color: #6b89b7;
  font-size: 17px;
}

.botao-voltar {
  padding: 11px 17px;
  border: 1px solid #c9daf6;
  border-radius: 9px;
  color: #17488e;
  background: white;
  cursor: pointer;
}

.cartao {
  background: white;
  border: 1px solid #dce8fa;
  border-radius: 14px;
  box-shadow: 0 3px 14px #1c4d9010;
}

.resumo {
  display: grid;
  grid-template-columns: auto minmax(180px, 1.2fr) minmax(190px, 1fr) auto;
  align-items: center;
  gap: 24px;
  padding: 28px;
  margin-bottom: 24px;
}

.icone-resumo,
.icone-opcao {
  width: 65px;
  height: 65px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #def5ed;
  color: #159b76;
  font-size: 30px;
}

.dados-consulta small,
.preco small {
  color: #718db8;
  font-size: 12px;
}

.dados-consulta h2 {
  margin: 10px 0;
  font-size: 22px;
}

.dados-consulta p {
  margin: 0;
  color: #7891b7;
}

.detalhes-resumo {
  border-left: 1px solid #d7e5fa;
  padding-left: 22px;
  color: #617da8;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.detalhes-resumo p {
  margin: 8px 0;
}

.detalhes-resumo strong {
  color: #173c78;
}

.preco {
  border-left: 1px solid #d7e5fa;
  padding-left: 22px;
}

.preco strong {
  display: block;
  margin-top: 10px;
  color: #149b75;
  font-size: 28px;
  white-space: nowrap;
}

.escolha {
  padding: 28px;
}

.escolha > h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.subtitulo {
  margin: 0 0 23px;
  color: #718ab0;
}

.opcoes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.opcao {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  min-height: 126px;
  padding: 17px;
  text-align: left;
  border: 1px solid #cfdef5;
  border-radius: 12px;
  background: white;
  color: #123773;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.opcao:hover,
.opcao.selecionada {
  border: 2px solid #3478ed;
  background: #f5f9ff;
}

.icone-opcao {
  width: 54px;
  height: 54px;
  font-size: 25px;
}

.texto-opcao {
  display: grid;
  gap: 7px;
  min-width: 0;
}

.texto-opcao strong {
  font-size: 15px;
}

.texto-opcao small {
  color: #728cb4;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.marcado {
  position: absolute;
  right: 10px;
  top: 9px;
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  background: #3679e7;
  color: white;
  border-radius: 50%;
}

.detalhe-pagamento {
  margin-top: 28px;
  padding: 23px;
  border-radius: 12px;
  background: #f4f8ff;
  border: 1px solid #e0eafa;
}

.detalhe-pagamento h3 {
  margin: 0 0 10px;
  font-size: 19px;
}

.detalhe-pagamento > p {
  color: #6b83a7;
  line-height: 1.6;
}

.aviso-pix,
.boleto-falso {
  display: flex;
  align-items: center;
  gap: 17px;
  margin-top: 18px;
  padding: 17px;
  border-radius: 10px;
  background: white;
  border: 1px solid #dce8fa;
}

.aviso-pix > span,
.boleto-falso > span {
  font-size: 32px;
  color: #159b76;
}

.aviso-pix p,
.boleto-falso p {
  margin: 7px 0;
  color: #657fa5;
}

.boleto-falso small {
  color: #a45e27;
}

.detalhe-pagamento form {
  display: grid;
  gap: 10px;
}

.detalhe-pagamento label {
  font-size: 14px;
  font-weight: 700;
}

.detalhe-pagamento input,
.detalhe-pagamento select {
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid #cbdaf0;
  border-radius: 8px;
  background: white;
  color: #16376d;
  font: inherit;
}

.detalhe-pagamento input:focus,
.detalhe-pagamento select:focus {
  outline: 2px solid #8db7ff;
  border-color: #3478ed;
}

.campos-duplos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.campos-duplos > div {
  display: grid;
  gap: 10px;
}

.aviso-seguranca {
  font-size: 13px;
  color: #80653b;
  line-height: 1.6;
}

.acoes {
  display: grid;
  justify-items: center;
  gap: 15px;
  margin-top: 28px;
}

.botao-confirmar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: min(100%, 430px);
  padding: 17px 22px;
  border: 0;
  border-radius: 30px;
  background: #3478e8;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.botao-confirmar:hover {
  background: #225ec0;
  transform: translateY(-1px);
}

.seguranca {
  margin: 0;
  color: #6e88b0;
  font-size: 14px;
}

.mensagem {
  margin-top: 20px;
  padding: 14px 17px;
  border-radius: 9px;
  line-height: 1.5;
}

.mensagem.erro {
  background: #fff0f0;
  color: #a12727;
  border: 1px solid #f2c4c4;
}

.mensagem.sucesso {
  background: #e8f8f0;
  color: #15764e;
  border: 1px solid #bce8d3;
}

.resultado {
  display: grid;
  justify-items: center;
  gap: 12px;
  text-align: center;
  margin-top: 25px;
  padding: 25px;
  border-radius: 12px;
  background: #effaf4;
}

.resultado-icone {
  display: grid;
  place-items: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #20a575;
  color: white;
  font-size: 30px;
}

.resultado h3,
.resultado p {
  margin: 0;
}

.resultado p {
  color: #527b6b;
}

footer {
  padding: 25px 0 5px;
  text-align: center;
  color: #8298b8;
  font-size: 13px;
}

@media (max-width: 1100px) {
  .conteudo {
    padding: 24px;
  }

  .resumo {
    grid-template-columns: auto 1fr;
  }

  .detalhes-resumo,
  .preco {
    border-left: 0;
    padding-left: 0;
  }

  .opcoes {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .pagina-pagamento {
    display: block;
  }

  .menu-lateral {
    width: 100%;
    min-width: 0;
    padding: 15px;
  }

  .marca {
    padding-bottom: 15px;
  }

  .navegacao {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 15px;
  }

  .navegacao button {
    width: auto;
    padding: 10px;
    gap: 7px;
    font-size: 13px;
  }

  .navegacao button span {
    width: auto;
    font-size: 18px;
  }

  .frase-menu {
    display: none;
  }

  .conteudo {
    padding: 18px 12px;
  }

  .topo {
    align-items: flex-start;
  }

  .topo p {
    font-size: 14px;
  }

  .resumo,
  .escolha {
    padding: 18px;
  }

  .campos-duplos {
    grid-template-columns: 1fr;
  }
}
</style>
