/// <reference types="cypress" />

const { Given, Then, When } = require('cypress-cucumber-preprocessor/steps')
const { generate } = require('gerador-validador-cpf')

Given('que gerei um CPF válido', () => {
	const cpf = generate()
	Cypress.env('CPF', cpf)
})

When('a API for chamada com os dados do cliente', () => {
	const cpf = Cypress.env('CPF')

	cy.request('POST', '/cliente/cadastroCliente', {
		'cpf': cpf,
		'nome': 'Cliente de Teste',
		'email': 'tech-challenge@email.test'
	}).as('response')
})

Then('o cliente deve ser cadastrado com sucesso', () => {
	cy.get('@response')
		.its('status')
		.should('eq', 200)

	cy.get('@response')
		.its('body')
		.should('be.an', 'object')
		.and('not.be.empty')
		.then((response) => {
			cy.log(JSON.stringify(response))
		})
})

Given('que possuo o CPF de um cliente cadastrado', () => {
	const cpf = Cypress.env('CPF')

	if (!cpf) {
		const novoCpf = generate()
		cy.cadastrarCliente(novoCpf)
		Cypress.env('CPF', cpf)
	}
})

When('a API for chamada com o CPF do cliente com sucesso', () => {
	const cpf = Cypress.env('CPF')
	cy.request('GET', `/cliente/pesquisarCliente/${cpf}`).as('response')
	cy.get('@response').its('status').should('eq', 200)
})

Then('a resposta deve recuperar os dados do cliente cadastrado', () => {
	cy.get('@response')
		.its('body')
		.should('be.an', 'object')
		.and('not.be.empty')
		.then((response) => {
			cy.log(JSON.stringify(response))
		})
})

When('a API de autenticação for chamada com o CPF do cliente', () => {
	const cpf = Cypress.env('CPF')
	cy.request('POST', '/cliente/loginCliente', {
		'cpf': cpf,
		'nome': 'Cliente de Teste',
		'email': 'tech-challenge@email.test'
	}
	).as('response')
})

Then('o cliente deve ser autenticado com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)
})

