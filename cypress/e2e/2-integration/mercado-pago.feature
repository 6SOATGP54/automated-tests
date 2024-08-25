# language: pt

Funcionalidade: Integração - Mercado Pago

    Cenário: Cadastro de Credenciais
        Dado que tenho um usuário e um token da API Mercado Pago
        E o endereço do webhook da aplicação
        Quando realizar a chamada da API do Mercado Pago com minhas credenciais
        Então o cadastro das credenciais deve ser realizado com sucesso

    Cenário: Cadastro da Loja
        Dado que possuo minhas credenciais da API Mercado Pago cadastradas
        Quando realizar a chamada da API do Mercado Pago para cadastrar a loja
        Então o cadastro da loja deve ser realizado com sucesso
        E devo receber a identificação da loja

    Cenário: Cadastro do Caixa
        Dado que possuo uma loja cadastrada na API Mercado Pago 
        Quando realizar a chamada da API do Mercado Pago para cadastrar um caixa
        Então o cadastro do caixa deve ser realizado com sucesso
        E devo receber a identificação do caixa