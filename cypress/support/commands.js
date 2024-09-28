// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('cadastrarPedido', (cliente, produto, qtdProduto) => {
	cy.request('POST', '/pedido/cadastroPedido', {
		'cliente': cliente,
		'pedidoProdutos': [
			{
				'produto': produto,
				'quantidade': qtdProduto
			}
		],
		'statusPedido': 'RECEBIDO'
	}).then((response) => {
		Cypress.env('ID_PEDIDO', response.body.id)
	})
})

Cypress.Commands.add('atualizarPedido', (idPedido) => {
	cy.request({
		method: 'PUT',
		url: '/pedido/atualizarStatusPedido',
		body: {
			'id': idPedido
		},
		headers: { 'Content-Type': 'application/json' }
	})
})

Cypress.Commands.add('cadastrarCliente', (cpf) => {
	cy.request({
		method: 'POST',
		url: '/cliente/cadastroCliente',
		body: {
			'cpf': cpf,
			'nome': 'Cliente de Teste',
			'email': 'tech-challenge@email.test'
		},
		headers: { 'Content-Type': 'application/json' }
	})
})

Cypress.Commands.add('getApiToken', () => {
	cy.request({
		method: 'POST',
		url: `${Cypress.env('API_TOKEN_URL')}/food-api-autenticacao/login`,
		body: {
			'usuario': Cypress.env('API_TOKEN_USER'),
			'senha': Cypress.env('API_TOKEN_SECRET')
		}
	}).then((response) => {
		Cypress.env('API_TOKEN', response.body['response'])
		cy.log(Cypress.env('API_TOKEN'))
	})
})