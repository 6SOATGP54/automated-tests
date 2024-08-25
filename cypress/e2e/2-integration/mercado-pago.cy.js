/// <reference types="cypress" />

describe("Integração - Mercado Pago", () => {

    it("Cadastro de Credenciais", () => {
        const token = Cypress.env("MERCADO_PAGO_TOKEN");
        const userMP = Cypress.env("MERCADO_PAGO_USUARIO");
        const webhook = Cypress.env("APP_WEBHOOK");

        cy.request({
            method: "POST",
            url: "/integracoes/mercadoPago/cadastroCredenciais",
            body: {
                "nome": "MERCADO_PAGO",
                "token": token,
                "usuario": userMP,
                "webHook": webhook
            }
        })
    }).should((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).is.an("object");
        expect(response.body).is.not.empty;
    }).then((response) => {
        cy.log(JSON.stringify(response.body));
    })

    it("Cadastro da Loja", () => {
        cy.request({
            method: "POST",
            url: "/integracoes/mercadoPago/cadastroLojaMercadoPago",
            body: {
                "name": "Tech Challenge Filial - SP",
                "businessHours": [
                    {
                        "dia": "monday",
                        "intervalos": [
                            {
                                "open": "08:00",
                                "close": "17:00"
                            }
                        ]
                    }
                ],
                "location": {
                    "streetNumber": "3039",
                    "streetName": "Av. Paulista",
                    "cityName": "São Paulo",
                    "stateName": "São Paulo",
                    "latitude": -21.7108032,
                    "longitude": -46.6004147,
                    "reference": "Near to Mercado Pago"
                },
                "externalId": "TECHLOJA001",
                "credenciaisId": 1
            }
        })
    }).should((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).is.an("object");
        expect(response.body).is.not.empty;
    }).then((response) => {
        cy.log(JSON.stringify(response.body));
    })

    it("Cadastro do Caixa", () => {
        cy.request({
            method: "POST",
            url: "/integracoes/mercadoPago/cadastroCredenciais",
            body: {
                "category": null,
                "external_id": "TECHCAIXA001",
                "external_store_id": "TECHLOJA001",
                "fixed_amount": true,
                "name": "Caixa filial SP",
                "store_id": 62304251
            }
        })
    }).should((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).is.an("object");
        expect(response.body).is.not.empty;
    }).then((response) => {
        cy.log(JSON.stringify(response.body));
    })
})