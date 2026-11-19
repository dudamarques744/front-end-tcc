import { createWebHistory, createRouter } from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/listaPacientes",
            name: "lista-pacientes",
            component: () => import("../views/ListaPacientes.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioPaciente",
            name: "formulario-paciente-cadastro",
            component: () => import("../views/FormularioPaciente.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/consulta",
            name: "consulta",
            component: () => import("../views/Consulta.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/detalhesConsulta",
            name: "detalhes-consulta",
            component: () => import("../views/DetalhesConsulta.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/mensagens",
            name: "mensagens",
            component: () => import("../views/Mensagens.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/historico",
            name: "historico",
            component: () => import("../views/Historico.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioPaciente/:idPaciente",
            name: "formulario-paciente-alteracao",
            component: () => import("../views/FormularioPaciente.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/listaProfissionais",
            name: "lista-profissionais",
            component: () => import("../views/ListaProfissionais.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioProfissional",
            name: "formulario-profissional-cadastro",
            component: () => import("../views/FormularioProfissional.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioProfissional/:idProfissional",
            name: "formulario-profissional-alteracao",
            component: () => import("../views/FormularioProfissional.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/listaPagamentos",
            name: "lista-pagamentos",
            component: () => import("../views/ListaPagamentos.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioPagamento",
            name: "formulario-pagamento-cadastro",
            component: () => import("../views/FormularioPagamento.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioPagamento/:idPagamento",
            name: "formulario-pagamento-alteracao",
            component: () => import("../views/FormularioPagamento.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/listaAtendimentos",
            name: "lista-atendimentos",
            component: () => import("../views/ListaAtendimentos.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioAtendimento",
            name: "formulario-atendimento-cadastro",
            component: () => import("../views/FormularioAtendimento.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/formularioAtendimento/:idAtendimento",
            name: "formulario-atendimento-alteracao",
            component: () => import("../views/FormularioAtendimento.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/agenda",
            name: "agenda",
            component: () => import("../views/Agenda.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/horarios",
            name: "horarios-disponiveis",
            component: () => import("../views/HorariosDisponiveis.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/",
            name: "login",
            component: () => import("../views/Login.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/telaPrincipal",
            name: "telaPrincipal",
            component: () => import("../views/paginaPrincipal.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/telaPrincipalProfissional",
            name: "telaPrincipalProfissional",
            component: () => import("../views/PainelProfissional.vue"),
            meta: {
                autenticado: false
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "pagina-inexistente",
            redirect: "/"
        },
        {
            path: "/cadastre-se/profissional",
            name: "cadastrar-se como profissional",
            component: () => import("../views/FormularioProfissional.vue"),
            props: {
                primeiroCadastro: false
            },
            meta: {
                autenticado: false
            }
        },
        {
            path: "/cadastre-se/paciente",
            name: "cadastrar-se como paciente",
            component: () => import("../views/FormularioPaciente.vue"),
            props: {
                primeiroCadastro: false
            },
            meta: {
                autenticado: false
            }
        }
    ]
})

export default router
