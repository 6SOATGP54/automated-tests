/// <reference types="cypress" />

describe("Gestão de Pedidos", () => {

    it("Listagem de Pedidos - Recebidos", () => {
        cy.request("GET", "/pedido/pesquisarPedidosRecebidos").should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.an("array");
            expect(response.body).is.not.empty;
            expect(response.body.every((pedido) => pedido.statusPedido === "RECEBIDO")).to.be.true;
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
        })
    })

    it("Listagem de Pedidos - Em Preparação", () => {
        const cliente = 1;
        const produto = 1;
        const qtdProduto = 2;

        cy.cadastrarPedido(cliente, produto, qtdProduto).then(() => {
            const idPedido = Cypress.env("ID_PEDIDO");
            cy.atualizarPedido(idPedido);
        });

        cy.request("GET", "/pedido/pesquisarPedidosEmPreparacao").should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).is.an("array");
            expect(response.body).is.not.empty;
            expect(response.body.every((pedido) => pedido.statusPedido === "PREPARACAO")).to.be.true;
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
        })
    })

    it("Listagem de Pedidos - Pronto", () => {
        const cliente = 1;
        const produto = 2;
        const qtdProduto = 3;

        cy.cadastrarPedido(cliente, produto, qtdProduto).then(() => {
            const idPedido = Cypress.env("ID_PEDIDO");
            cy.atualizarPedido(idPedido);
            cy.atualizarPedido(idPedido);
        }).then(() => {
            cy.request("GET", "/pedido/pesquisarPedidosProntos").should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).is.an("array");
                expect(response.body).is.not.empty;
                expect(response.body.every((pedido) => pedido.statusPedido === "PRONTO")).to.be.true;
            }).then((response) => {
                cy.log(JSON.stringify(response.body));
            })
        });
    })

    it("Cadastro de Pedido", () => {
        cy.request("POST", "/pedido/cadastroPedido", {
            "cliente": 1,
            "pedidoProdutos": [
                {
                    "produto": 1,
                    "quantidade": 2
                }
            ],
            "statusPedido": "RECEBIDO"
        }).should((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).is.an("object");
            expect(response.body).is.not.empty;
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
        })
    })

    it("Atualização de Pedido", () => {
        const cliente = 1;
        const produto = 2;
        const qtdProduto = 3;

        cy.cadastrarPedido(cliente, produto, qtdProduto).then(() => {
            const idPedido = Cypress.env("ID_PEDIDO");
            cy.request({
                method: "PUT",
                url: "/pedido/atualizarStatusPedido",
                body: {
                    "id": idPedido
                },
                headers: { "Content-Type": "application/json" }
            }).should((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).is.an("object");
                expect(response.body).is.not.empty;
                expect(response.body.statusPedido === "PREPARACAO").to.be.true;
            }).then(() => {
                cy.request({
                    method: "PUT",
                    url: "/pedido/atualizarStatusPedido",
                    body: {
                        "id": idPedido
                    },
                    headers: { "Content-Type": "application/json" }
                }).should((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).is.an("object");
                    expect(response.body).is.not.empty;
                    expect(response.body.statusPedido === "PRONTO").to.be.true;
                }).then((response) => {
                    cy.log(JSON.stringify(response.body));
                })
            })
        })
    })
})