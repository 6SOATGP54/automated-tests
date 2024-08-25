# language: pt

Funcionalidade: API de Catálogo de Produtos

	Cenário: Listagem de Produtos
        Dado que consultei a lista de produtos
        Quando a API de produtos for chamada com sucesso
        Então a lista deve trazer todos os produtos cadastrados

	Cenário: Listagem de Produtos com Desconto
        Dado que consultei a lista de produtos com desconto
        Quando a API de produtos for chamada com sucesso
        Então a lista deve trazer todos os produtos cadastrados

	Cenário: Listagem de Produtos pela Categoria Lanche
        Dado que consultei a lista de 'LANCHE'
        Quando a API de produtos for chamada com sucesso
        Então a lista de produtos deve conter somente 'LANCHE'

	Cenário: Listagem de Produtos pela Categoria Acompanhamento
        Dado que consultei a lista de 'ACOMPANHAMENTO'
        Quando a API de produtos for chamada com sucesso
        Então a lista de produtos deve conter somente 'ACOMPANHAMENTO'

	Cenário: Listagem de Produtos pela Categoria Bebida
        Dado que consultei a lista de 'BEBIDA'
        Quando a API de produtos for chamada com sucesso
        Então a lista de produtos deve conter somente 'BEBIDA'

	Cenário: Listagem de Produtos pela Categoria Sobremesa
        Dado que consultei a lista de 'SOBREMESA'
        Quando a API de produtos for chamada com sucesso
        Então a lista de produtos deve conter somente 'SOBREMESA'

	Cenário: Cadastro de Produto - Lanche
        Dado que cadastrei um produto do tipo 'LANCHE'
        Quando a API de produtos for chamada com sucesso
        Então a resposta deve conter os dados do produto cadastrado

	Cenário: Cadastro de Produto - Acompanhamento
        Dado que cadastrei um produto do tipo 'ACOMPANHAMENTO'
        Quando a API de produtos for chamada com sucesso
        Então a resposta deve conter os dados do produto cadastrado

	Cenário: Cadastro de Produto - Bebida
        Dado que cadastrei um produto do tipo 'BEBIDA'
        Quando a API de produtos for chamada com sucesso
        Então a resposta deve conter os dados do produto cadastrado

	Cenário: Cadastro de Produto - Sobremesa
        Dado que cadastrei um produto do tipo 'SOBREMESA'
        Quando a API de produtos for chamada com sucesso
        Então a resposta deve conter os dados do produto cadastrado

	Cenário: Exclusão de Produto
        Dado que possuo um produto cadastrado
        Quando a API de exclusão for chamada
        Então o produto deve ser excluído com sucesso
