/// <reference types="cypress" />

describe('Catálogo de Produtos', () => {

	it('Listagem de Produtos', () => {
		cy.request('GET', '/produto/listarProdutos').should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('array')
			expect(response.body).is.not.empty
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Listagem de Produtos com Desconto', () => {
		cy.request('POST', '/produto/listarProdutosDesconto', {
			'id': 1
		}).should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('array')
			expect(response.body).is.not.empty
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Listagem de Produtos por Categoria - Lanche', () => {
		cy.request({
			method: 'POST',
			url: '/produto/listarProdutosPorCategoria',
			body: '"LANCHE"',
			headers: {
				'accept': '*/*',
				'Content-Type': 'application/json'
			}
		}).should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('array')
			expect(response.body).is.not.empty
			expect(response.body.every((item) => item.categoria === 'LANCHE')).to.be.true
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Listagem de Produtos por Categoria - Acompanhamento', () => {
		cy.request({
			method: 'POST',
			url: '/produto/listarProdutosPorCategoria',
			body: '"ACOMPANHAMENTO"',
			headers: {
				'accept': '*/*',
				'Content-Type': 'application/json'
			}
		}).should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('array')
			expect(response.body).is.not.empty
			expect(response.body.every((item) => item.categoria === 'ACOMPANHAMENTO')).to.be.true
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Listagem de Produtos por Categoria - Bebida', () => {
		cy.request({
			method: 'POST',
			url: '/produto/listarProdutosPorCategoria',
			body: '"BEBIDA"',
			headers: {
				'accept': '*/*',
				'Content-Type': 'application/json'
			}
		}).should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('array')
			expect(response.body).is.not.empty
			expect(response.body.every((item) => item.categoria === 'BEBIDA')).to.be.true
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Listagem de Produtos por Categoria - Sobremesa', () => {
		cy.request({
			method: 'POST',
			url: '/produto/listarProdutosPorCategoria',
			body: '"SOBREMESA"',
			headers: {
				'accept': '*/*',
				'Content-Type': 'application/json'
			}
		}).should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('array')
			expect(response.body).is.not.empty
			expect(response.body.every((item) => item.categoria === 'SOBREMESA')).to.be.true
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Cadastro de Produto - Lanche', () => {
		cy.request('POST', '/produto/cadastroProduto', {
			'nome': 'CyLanche',
			'descricao': 'Lanche de teste cadastrado via Automação.',
			'preco': 29.90,
			'categoria': 'LANCHE',
			'imagem': 'https://raw.githubusercontent.com/6SOATGP54/tech-challenge/main/docs/products-example/OIG1.jpeg'
		}).should((response) => {
			expect(response.status).to.eq(201)
			expect(response.body).is.an('object')
			expect(response.body).is.not.empty
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Cadastro de Produto - Acompanhamento', () => {
		cy.request('POST', '/produto/cadastroProduto', {
			'nome': 'CyAcompanhamento',
			'descricao': 'Acompanhamento de teste cadastrado via Automação.',
			'preco': 22.35,
			'categoria': 'ACOMPANHAMENTO',
			'imagem': 'https://raw.githubusercontent.com/6SOATGP54/tech-challenge/main/docs/products-example/OIG1v94c580_vs.jpeg'
		}).should((response) => {
			expect(response.status).to.eq(201)
			expect(response.body).is.an('object')
			expect(response.body).is.not.empty
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Cadastro de Produto - Bebida', () => {
		cy.request('POST', '/produto/cadastroProduto', {
			'nome': 'CyCola',
			'descricao': 'Bebida de teste cadastrado via Automação.',
			'preco': 15.10,
			'categoria': 'BEBIDA',
			'imagem': 'https://raw.githubusercontent.com/6SOATGP54/tech-challenge/main/docs/products-example/OIG3fd09.jpeg'
		}).should((response) => {
			expect(response.status).to.eq(201)
			expect(response.body).is.an('object')
			expect(response.body).is.not.empty
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Cadastro de Produto - Sobremesa', () => {
		cy.request('POST', '/produto/cadastroProduto', {
			'nome': 'CyColate',
			'descricao': 'Sobremesa de teste cadastrado via Automação.',
			'preco': 15.10,
			'categoria': 'SOBREMESA',
			'imagem': 'https://raw.githubusercontent.com/6SOATGP54/tech-challenge/main/docs/products-example/OIG298mgv_f541.jpeg'
		}).should((response) => {
			expect(response.status).to.eq(201)
			expect(response.body).is.an('object')
			expect(response.body).is.not.empty
		}).then((response) => {
			cy.log(JSON.stringify(response.body))
		})
	})

	it('Exclusão de Produto', () => {
		cy.request('GET', '/produto/listarProdutos').should((response) => {
			expect(response.status).to.eq(200)
			expect(response.body).is.an('array')
			expect(response.body).is.not.empty
		}).then((response) => {
			const productId = response.body[response.body.length - 1]['id']
			cy.log(`Product ID = ${productId}`)

			cy.request('DELETE', `/produto/deletarProduto/${productId}`).should((response) => {
				expect(response.status).to.eq(200)
			})
		})
	})
})