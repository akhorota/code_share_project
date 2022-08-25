/// <reference types="cypress" />

import React from 'react'
import PageHeader from '../../src/components/PageHeader'
import { mount } from 'cypress-react-unit-test'
import { BrowserRouter as Router } from 'react-router-dom'

context('PageHeader component', () => {

    const baseCss =  '/__root/src/assets/styles/global.css'
    const indexCss = '/__root/src/components/PageHeader/styles.css'
    const title = "Que incrível que você quer dar aulas."
    const description = "O primeiro passo é preencher esse formulário de inscrição."

    it('Deve ser renderizado com sucesso', () => {
        mount(
            <Router>
                <PageHeader
                    title={title}
                    description={description}
                />
            </Router>   
            ,
            {
                stylesheets: [baseCss, indexCss]
            } 
        )


        cy.get('.page-header').as('header');
        cy.get('@header').find('strong').as('title');
        cy.get('@header').find('p').as('description');

        cy.get('@title').should('have.text',title);
        cy.get('@description').should('have.text',description);
        cy.get('@header').then(($elemento) => {
            expect($elemento.css('background-color')).to.be.equal('rgb(130, 87, 229)');
            expect($elemento.css('flex-direction')).to.be.equal('column');

        });

    });
});