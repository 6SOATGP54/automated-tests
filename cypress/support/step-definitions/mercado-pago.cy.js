/// <reference types="cypress" />

const { Given, Then, When, And } = require('cypress-cucumber-preprocessor/steps')

Given('que tenho um usuário e um token da API Mercado Pago', () => {
	const token = Cypress.env('MERCADO_PAGO_TOKEN')
	const userMP = Cypress.env('MERCADO_PAGO_USUARIO')

	if (!token || !userMP) {
		throw new Error('Please, review your "Mercado Pago" credentials')
	}
})

And('o endereço do webhook da aplicação', () => {
	const webhook = Cypress.env('APP_WEBHOOK')

	if (!webhook) {
		throw new Error('Please, review your application "Webhook" URL')
	}
})

When('realizar a chamada da API do Mercado Pago com minhas credenciais', () => {
	const token = Cypress.env('MERCADO_PAGO_TOKEN')
	const userMP = Cypress.env('MERCADO_PAGO_USUARIO')
	const webhook = Cypress.env('APP_WEBHOOK')

	cy.request({
		method: 'POST',
		url: '/integracoes/mercadoPago/cadastroCredenciais',
		body: {
			'nome': 'MERCADO_PAGO',
			'token': token,
			'usuario': userMP,
			'webHook': webhook
		}
	}).as('response')
})

Then('o cadastro das credenciais deve ser realizado com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)

	cy.get('@response')
		.its('body')
		.then((body) => {
			cy.log(JSON.stringify(body))
		})

	//TODO save credentials ID
})

Given('que possuo minhas credenciais da API Mercado Pago cadastradas', () => {
	//TODO get credentials ID
})

When('realizar a chamada da API do Mercado Pago para cadastrar a loja', () => {
	cy.fixture('loja').then((payload) => {
		payload['externalId'] = 'TECHLOJA' + new Date().getMilliseconds()

		cy.request({
			method: 'POST',
			url: '/integracoes/mercadoPago/cadastroLojaMercadoPago',
			body: payload
		}).as('response')
	})
})

Then('o cadastro da loja deve ser realizado com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)

	cy.get('@response').its('body')
		.should('be.an', 'object')
		.and('not.be.empty')
		.then((body) => {
			cy.log(JSON.stringify(body))
		})
})

And('devo receber a identificação da loja', () => {
	cy.get('@response').its('body')
		.then((loja) => {
			const storeID = loja['userId']
			Cypress.env('MERCADO_PAGO_LOJA_ID', storeID)
			Cypress.env('MERCADO_PAGO_LOJA_EXTERNAL_ID', loja['externalId'])
		})
})

Given('que possuo uma loja cadastrada na API Mercado Pago', () => {
	const storeID = Cypress.env('MERCADO_PAGO_LOJA_ID')
	const externalId = Cypress.env('MERCADO_PAGO_LOJA_EXTERNAL_ID')

	if (!storeID || !externalId) {
		throw new Error('Please, you need to register your store in "API Mercado Pago"')
	}
})

When('realizar a chamada da API do Mercado Pago para cadastrar um caixa', () => {
	const storeID = Cypress.env('MERCADO_PAGO_LOJA_ID')
	const externalStoreId = Cypress.env('MERCADO_PAGO_LOJA_EXTERNAL_ID')

	cy.fixture('caixa').then((payload) => {
		payload['external_id'] = 'TECHCAIXA' + new Date().getMilliseconds()
		payload['external_store_id'] = externalStoreId
		payload['store_id'] = storeID

		cy.request({
			method: 'POST',
			url: '/integracoes/mercadoPago/cadastrarCaixaLojaMercadoLivre',
			body: payload
		}).as('response')
	})
})

Then('o cadastro do caixa deve ser realizado com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)

	cy.get('@response').its('body')
		.should('be.an', 'object')
		.and('not.be.empty')
		.then((body) => {
			cy.log(JSON.stringify(body))
		})
})

And('devo receber a identificação do caixa', () => {
	cy.get('@response').its('body')
		.then((response) => {
			const caixaId = response['id']

			if (!caixaId) {
				throw new Error('"Caixa" not registered')
			}

			Cypress.env('MERCADO_PAGO_CAIXA_ID', caixaId)
		})
})