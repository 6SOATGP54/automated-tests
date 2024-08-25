# language: pt
Funcionalidade: API de Pedidos

  Cenário: Listagem de Pedidos - Recebidos
    Dado que consultei a lista de Pedidos com status 'RECEBIDO'
    Quando a API de pedidos for chamada com sucesso
    Então a lista deve trazer todos os pedidos com status 'RECEBIDO'

  Cenário: Listagem de Pedidos - Em Preparação
    Dado que consultei a lista de Pedidos com status 'PREPARACAO'
    Quando a API for chamada com sucesso
    Então a lista deve trazer todos os pedidos com status 'PREPARACAO'

  Cenário: Listagem de Pedidos - Pronto
    Dado que consultei a lista de Pedidos com status 'PRONTO'
    Quando a API for chamada com sucesso
    Então a lista deve trazer todos os pedidos com status 'PRONTO'

  Cenário: Cadastro de Pedido
    Dado que possuo minhas credenciais cadastradas
    E a identificação do caixa
    Quando a API de cadastro for chamada com os dados do pedido
    Então o pedido deve ser cadastro com sucesso

  Cenário: Atualização de Pedido
    Dado que possuo um pedido em aberto
    Quando a API de atualização do pedido for chamada
    Então o pedido deve ser atualizado com sucesso
