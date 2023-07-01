describe('Test password generator', () => {
  beforeEach('Open page',()=>{
    cy.visit('../../index.html')
  })
  it('Test page ', function () {

    cy.title().should('exist', 'Password-Generator/index.html');
    
})
it('Test of h2 title',function(){
  cy.get('h2').should('have.text', 'Password Generator');
})
it('Test of Rezults box',function(){
  cy.get('.result-container')
  .invoke('text')
  .then((text) => {
    const trimmedText = String(text).trim();
    cy.wrap(trimmedText).should('have.length', 0);
  });
})
it('Test labels',function(){
  cy.get(':nth-child(1) > label').should('be.visible')
  .and('have.text', 'Password length');

  cy.get(':nth-child(2) > label').should('be.visible')
  .and('have.text', 'Include uppercase letters');

  cy.get(':nth-child(3) > label').should('be.visible')
  .and('have.text','Include lowercase letters');

  cy.get(':nth-child(4) > label').should('be.visible')
  .and('have.text','Include numbers');

  cy.get(':nth-child(5) > label').should('be.visible')
  .and('have.text','Include symbols');

  cy.get('#length').clear().type(20)
  
})
it('Test checkboxes',function(){
  cy.get('#uppercase').uncheck();
  cy.get('#uppercase').should('not.be.checked')
  cy.get('#uppercase').check();
  cy.get('#uppercase').should('be.checked')  

  cy.get('#lowercase').uncheck();
  cy.get('#lowercase').should('not.be.checked');
  cy.get('#lowercase').check();
  cy.get('#lowercase').should('be.checked');

  cy.get('#numbers').uncheck();
  cy.get('#numbers').should('not.be.checked');
  cy.get('#numbers').check();
  cy.get('#numbers').should('be.checked');

  cy.get('#symbols').uncheck();
  cy.get('#symbols').should('not.be.checked');
  cy.get('#symbols').check();
  cy.get('#symbols').should('be.checked');

})
it('Test Generate password button and its result',function(){
  cy.get('#generate').click()
  it('Test Generate password button',function(){
    cy.get('#generate').click();
  
    //-----------------general  for all fields and all length-------------------
    // uzima password iz rezultata
    cy.get('#password').should('not.be.empty')
    .then(($password) => {
      const password = $password.text();
  
      // provera  da li password ima zadatu duzinu 
      expect(password).to.have.lengthOf(parseInt(Cypress.$('#length').val()));
  
      // 
      if (Cypress.$('#uppercase').is(':checked')){
          expect(password).to.match(/[A-Z]/);
      }
  
      if (Cypress.$('#lowercase').is(':checked')){
          expect(password).to.match(/[a-z]/);
      }
  
      if (Cypress.$('#numbers').is(':checked')){
          expect(password).to.match(/[0-9]/);
      }
  
      if (Cypress.$('#symbols').is(':checked')){
          expect(password).to.match(/[!@#$%^&*(),.?":{}|<>]/);
      }
      
    })
  })
})


})
