/// <reference types="cypress" />

describe('Gestão de Clientes', () => {

	it('Cadastro de Cliente', () => {
		const { generate } = require('gerador-validador-cpf')
		const cpf = generate()
		Cypress.env('CPF', cpf)

		cy.request('POST', '/cliente/cadastroCliente', {
			'cpf': cpf,
			'nome': 'Cliente de Teste',
			'email': 'tech-challenge@email.test'
		}).should((response) => {
			expect(response.status).to.eq(201)
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Pesquisar Cliente', () => {
		const cpf = Cypress.env('CPF')

		cy.request('GET', `/cliente/pesquisarCliente/${cpf}`).should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('object')
			expect(response.body).is.not.empty
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

})