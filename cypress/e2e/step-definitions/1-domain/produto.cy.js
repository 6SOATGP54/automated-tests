/// <reference types="cypress" />

const { Given, Then, When } = require('cypress-cucumber-preprocessor/steps')

Given('que consultei a lista de produtos', () => {
	cy.request({
		method: 'GET',
		url: '/produto/listarProdutos'
	}).as('response')
})

When('a API de produtos for chamada com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)
})

Then('a lista deve trazer todos os produtos cadastrados', () => {
	cy.get('@response')
		.its('body')
		.should('be.an', 'array')
		.and('not.be.empty')
		.then((response) => {
			cy.log(JSON.stringify(response))
		})
})

Given('que consultei a lista de produtos com desconto', () => {
	cy.request({
		method: 'POST', 
		url: '/produto/listarProdutosDesconto',
		headers: {
			Authorization: `Bearer ${Cypress.env('API_GTW_TOKEN')}`
		},
		body: {
			'id': 1
		}
	}).as('response')
})

Given('que consultei a lista de {string}', (categoria) => {
	cy.request({
		method: 'POST',
		url: '/produto/listarProdutosPorCategoria',
		body: `"${categoria}"`,
		headers: {
			'accept': '*/*',
			'Content-Type': 'application/json'
		}
	}).as('response')
})

Then('a lista de produtos deve conter somente {string}', (categoria) => {
	cy.get('@response')
		.its('body')
		.should('be.an', 'array')
		.and('not.be.empty')
		.and((produtos) => {
			expect(produtos.every((item) => item.categoria === categoria)).to.be.true
		}).then((response) => {
			cy.log(JSON.stringify(response))
		})
})

Given('que cadastrei um produto do tipo {string}', (categoria) => {
	cy.fixture('produtos').then((produtos) => {
		cy.request('POST', '/produto/cadastroProduto', produtos[categoria]).as('response')
	})
})

Then('a resposta deve conter os dados do produto cadastrado', () => {
	cy.get('@response')
		.its('body')
		.should('be.an', 'object')
		.and('not.be.empty')
		.then((response) => {
			cy.log(JSON.stringify(response))
		})
})

Given('que possuo um produto cadastrado', () => {
	cy.request('GET', '/produto/listarProdutos').as('produtos')

	cy.get('@produtos').its('status').should('eq', 200)

	cy.get('@produtos').its('body')
		.should('be.an', 'array')
		.and('not.be.empty')
		.then((produtos) => {
			const productId = produtos[produtos.length - 1]['id']
			Cypress.env('PRODUTO_CADASTRADO', productId)
		})
})

When('a API de exclusão for chamada', () => {
	const productId = Cypress.env('PRODUTO_CADASTRADO')
	cy.request('DELETE', `/produto/deletarProduto/${productId}`).as('response')
})

Then('o produto deve ser excluído com sucesso', () => {
	cy.get('@response').its('status').should('eq', 200)
})
