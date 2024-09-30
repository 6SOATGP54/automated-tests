/// <reference types="cypress" />

const { Given, Then, When, And } = require('cypress-cucumber-preprocessor/steps')

Given('que consultei a lista de Pedidos com status {string}', (status) => {

	//TODO refactor application to use a single endpoint
	const endpoint = {
		'RECEBIDO': '/pedido/pesquisarPedidosRecebidos',
		'PREPARACAO': '/pedido/pesquisarPedidosEmPreparacao',
		'PRONTO': '/pedido/pesquisarPedidosProntos'
	}[status]

	cy.request('GET', endpoint).as('response')
})

When('a API de pedidos for chamada com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)
})

Then('a lista deve trazer todos os pedidos com status {string}', (status) => {
	cy.get('@response')
		.its('body')
		.should('be.an', 'array')
		.and('not.be.empty')
		.and((pedidos) => {
			expect(pedidos.every((item) => item.statusPedido === status)).to.be.true
		}).then((response) => {
			cy.log(JSON.stringify(response))
		})
})

Given('que possuo minhas credenciais cadastradas', () => {
	//TODO get credentials ID
	Cypress.env('MERCADO_PAGO_CREDENTIAL_ID', 1)
})

And('a identificação do caixa', () => {
	const caixaId = Cypress.env('MERCADO_PAGO_CAIXA_ID')

	if (!caixaId) {
		throw new Error('Please, you need to register your "caixa" in "API Mercado Pago"')
	}
})

When('a API de cadastro for chamada com os dados do pedido', () => {
	cy.fixture('pedido').then((pedido) => {
		//TODO ClientID is fixed
		cy.request('POST', '/pedido/cadastroPedido', pedido).as('response')
	})
})

Then('o pedido deve ser cadastro com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)

	cy.get('@response')
		.its('body')
		.should('be.an', 'object')
		.and('not.be.empty')
		.then((body) => {
			cy.log(JSON.stringify(body))
		})
})