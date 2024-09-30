# language: pt
Funcionalidade: API de Cliente

  Cenário: Cadastro de Cliente
    Dado que gerei um CPF válido
    Quando a API for chamada com os dados do cliente
    Então o cliente deve ser cadastrado com sucesso

  Cenário: Pesquisar Cliente
    Dado que possuo o CPF de um cliente cadastrado
    Quando a API for chamada com o CPF do cliente com sucesso
    Então a resposta deve recuperar os dados do cliente cadastrado

  Cenário:
    Dado que possuo o CPF de um cliente cadastrado
    Quando a API de autenticação for chamada com o CPF do cliente
    Então o cliente deve ser autenticado com sucesso
