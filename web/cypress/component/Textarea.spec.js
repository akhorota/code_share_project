/// <reference types="cypress" />

import React from 'react'
import Textarea from '../../src/components/Textarea'
import { mount } from 'cypress-react-unit-test'
import { BrowserRouter as Router } from 'react-router-dom'

context('Textarea component from TeacherForm', () => {

    //Declaração das variáveis
    const baseCss =  '/__root/src/assets/styles/global.css'
    const indexCss = '/__root/src/components/PageHeader/styles.css'
    const name = "bio"
    const label = "Biografia"

    it('Deve ser renderizado com sucesso', () => {
        //Montando o componente
        mount(
            <Router>
                <Textarea
                    name={name}
                    label={label}
                />
            </Router>
            ,
            {
                stylesheets: [baseCss, indexCss] //Aplicando o CSS do componente
            } 
        )

        //Preparação
        cy.get('.textarea-block').as('textareablock');
        cy.get('@textareablock').find('label').as('label');
        cy.get('@textareablock').find('textarea').as('textarea');

        //Validações
        cy.get('@textarea').should('exist');
        cy.get('@label').should('have.text',label);

    });
});