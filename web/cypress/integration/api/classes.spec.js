/// <reference types="cypress" />
/// <reference types="@bahmutov/cy-api" />

context('Classes endpoint', () => {
    it('POST - Cadastrar um novo professor', () => {
        const from = 8
        const to = 9 
        cy.api({
            method: 'POST',
            url: `${Cypress.config().apiUrl}/classes`,
            body:{
                "name":"reports",
                "avatar":"https://pickaface.net/gallery/avatar/unr_fake_190524_1549_9fgji7.png",
                "whatsapp":"73999999999",
                "bio":"zdzxdsdas",
                "subject":"Educação Física",
                "cost":1000,
                "schedule":[
                  {
                    "week_day":0,
                    "from":`0${from}:00`,
                    "to":`0${to}:00`
                  }
                ]
              }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.duration).lessThan(50)
            expect(response.body[0]).to.have.property('class_id').an('number').greaterThan(0)
            expect(response.body[0]).to.have.property('week_day').an('number').equal(0)
            expect(response.body[0]).to.have.property('from').an('number').equal(`${from}`*60)
            expect(response.body[0]).to.have.property('to').an('number').equal(`${to}`*60)
        });
    });
});