/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Realizar cadastro de aula', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('div a.give-classes').click();
        cy.url().should('contain', 'give-classes');
    });
    it('Cadastrar nova aula', () => {
        // Rotas
        cy.server();
        cy.route('POST', `${Cypress.config().apiUrl}/classes`).as('postClasses');

        // Criação do nome completo
        const fullName = chance.first()+chance.last();
        
        // Array de matérias 
        const subjects = ['Artes','Biologia','Ciências','Educação Física','Física','Geografia','Química','História','Matemática','Português','Inglês'];
        
        // Construção da(s) hora(s) de inicio e término da aula
        var fromHour = chance.hour({twentyfour: true});
        var toHour = '';

        if (fromHour == 23) {
            toHour = '00';
        } else if (fromHour == 24) {
            fromHour = '00';
            toHour = '01';
        } else if (fromHour < 10 ) {
            toHour = fromHour+1;
            fromHour = '0'+fromHour;
            if (fromHour != 9) {
                toHour = '0'+toHour;
            }
        } else {
            toHour = fromHour+1
        }

        // Construção do(s) minuto(s) da aula
        var min = chance.minute();
        if (min < 10) {
            min = '0'+min;
        }
        
        // Construção dos horários de inicio e término da aula
        const from = fromHour+':'+min;
        const to = toHour+':'+min;

        //Preenchimento dos campos
        cy.get('#name').type(fullName);
        cy.get('#avatar').type(chance.avatar());
        cy.get('#whatsapp').type(chance.phone({formatted: false}));
        cy.get('#bio').type(chance.sentence());
        cy.get('#subject').select(chance.pickone(subjects));
        cy.get('#cost').type(chance.natural({min: 50, max: 2000}));
        cy.get('#week_day').select(chance.natural({min: 0, max: 6}).toString());
        cy.get('#from').type(from);
        cy.get('#to').type(to);

        //Submetendo cadastro
        cy.get('button[type=submit]').click();

        //Validando cadastro com sucesso
        cy.on('window:alert',(txt)=>{
            expect(txt).to.eq('Cadastro realizado com sucesso!');
         });
        
        cy.wait('@postClasses').then((respClasses) => {
            expect(respClasses.status).to.eq(201);
        });
        
    });
});

// Elementos
// #name
// #avatar
// #whatsapp
// #bio
// #subject
// #cost
// #week_day
// #from
// #to
// button[type=submit]