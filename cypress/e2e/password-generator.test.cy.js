describe('Test password generator', () => {
  beforeEach('Open page', () => {
    cy.visit('../../index.html')
  })
  it('Test page ', function () {

    cy.title().should('exist', 'Password-Generator/index.html');

  })
  it('Test of h2 title', function () {
    cy.get('h2').should('have.text', 'Password Generator');
  })
  it('Test of Rezults box', function () {
    cy.get('.result-container')
      .invoke('text')
      .then((text) => {
        const trimmedText = String(text).trim();
        cy.wrap(trimmedText).should('have.length', 0);
      });
  })
  it('Test labels', function () {
    cy.get(':nth-child(1) > label').should('be.visible')
      .and('have.text', 'Password length');

    cy.get(':nth-child(2) > label').should('be.visible')
      .and('have.text', 'Include uppercase letters');

    cy.get(':nth-child(3) > label').should('be.visible')
      .and('have.text', 'Include lowercase letters');

    cy.get(':nth-child(4) > label').should('be.visible')
      .and('have.text', 'Include numbers');

    cy.get(':nth-child(5) > label').should('be.visible')
      .and('have.text', 'Include symbols');

    cy.get('#length').clear().type(20)

  })
  it('Test checkboxes', function () {
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
  it('Test Generate password button and its result', function () {
    cy.get('#generate').click()
    it('Test Generate password button', function () {
      cy.get('#generate').click();

      //-----------------general  for all fields and all length-------------------
      // uzima password iz rezultata
      cy.get('#password').should('not.be.empty')
        .then(($password) => {
          const password = $password.text();

          // provera  da li password ima zadatu duzinu 
          expect(password).to.have.lengthOf(parseInt(Cypress.$('#length').val()));

          // 
          if (Cypress.$('#uppercase').is(':checked')) {
            expect(password).to.match(/[A-Z]/);
          }

          if (Cypress.$('#lowercase').is(':checked')) {
            expect(password).to.match(/[a-z]/);
          }

          if (Cypress.$('#numbers').is(':checked')) {
            expect(password).to.match(/[0-9]/);
          }

          if (Cypress.$('#symbols').is(':checked')) {
            expect(password).to.match(/[!@#$%^&*(),.?":{}|<>]/);
          }

        }) //-----------**-------------------
    })
  })
  it('Test of results', function () {
    cy.get('#length').clear().type(5);
    cy.get('#uppercase').check();
    cy.get('#lowercase').uncheck();
    cy.get('#numbers').uncheck();
    cy.get('#symbols').uncheck();
    cy.get('#generate').click();


    cy.get('#result', { timeout: 10000 }).should('be.visible').and('not.be.empty').then(($password) => {
      const password = $password.text();

      expect(password).to.have.lengthOf(5);
      expect(password).to.match(/[A-Z]/);
    });

    cy.get('#length').clear().type(5);
    cy.get('#uppercase').uncheck();
    cy.get('#lowercase').check();
    cy.get('#numbers').uncheck();
    cy.get('#symbols').uncheck();
    cy.get('#generate').click();


    cy.get('#result', { timeout: 10000 }).should('be.visible').and('not.be.empty').then(($password) => {
      const password = $password.text();

      expect(password).to.have.lengthOf(5);
      expect(password).to.match(/[a-z]/);
    });
    cy.get('#length').clear().type(5);
    cy.get('#uppercase').uncheck();
    cy.get('#lowercase').uncheck();
    cy.get('#numbers').check();
    cy.get('#symbols').uncheck();
    cy.get('#generate').click();


    cy.get('#result', { timeout: 10000 }).should('be.visible').and('not.be.empty').then(($password) => {
      const password = $password.text();

      expect(password).to.have.lengthOf(5);
      expect(password).to.match(/[0-9]/);
    });
    cy.get('#length').clear().type(5);
    cy.get('#uppercase').uncheck();
    cy.get('#lowercase').uncheck();
    cy.get('#numbers').uncheck();
    cy.get('#symbols').check();
    cy.get('#generate').click();


    cy.get('#result', { timeout: 10000 }).should('be.visible').and('not.be.empty').then(($password) => {
      const password = $password.text();

      expect(password).to.have.lengthOf(5);
      expect(password).to.match(/[!@#$%^&*(),.?":{}|<>]/);
    });
    cy.get('#length').clear().type(11);
    cy.get('#uppercase').check();
    cy.get('#lowercase').uncheck();
    cy.get('#numbers').uncheck();
    cy.get('#symbols').check();
    cy.get('#generate').click();


    cy.get('#result', { timeout: 10000 }).should('be.visible').and('not.be.empty').then(($password) => {
      const password = $password.text();

      expect(password).to.have.lengthOf(11);
      expect(password).to.match(/[A-Z]|[!@#$%^&*(),.?":{}|<>]/); // '|' operator  
    });

  });
  it('Test  copy and paste password ', function () {
    cy.get('#length').clear().type(14);
    cy.get('#uppercase').check();
    cy.get('#lowercase').check();
    cy.get('#numbers').check();
    cy.get('#symbols').check();
    cy.get('#generate').click();


    cy.get('#result', { timeout: 10000 }).should('be.visible').and('not.be.empty').then(($password) => {
      const password = $password.text();

      expect(password).to.have.lengthOf(14);
      expect(password).to.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}\[\];:'",.<>/?`~\\|]).{14}$/);

    })
    it('Test copy and paste password', function () {
      cy.get('#length').clear().type(14);
      cy.get('#uppercase').check();
      cy.get('#symbols').check();
      cy.get('#generate').click();

      cy.get('#result', { timeout: 10000 }).should('be.visible').and('not.be.empty').then(($password) => {
        const password = $password.text();

        expect(password).to.have.lengthOf(14);
        expect(password).to.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}\[\];:'",.<>\/?`~\\|]).{14}$/);
      });

      cy.get('.far');
      cy.get('#result').clear();

      cy.tick(1000);

      cy.get('#result').invoke('val', '').trigger('paste'); //https://docs.cypress.io/api/commands/trigger#docusaurus_skipToContent_fallback

      cy.tick(1000);

      cy.get('#result').should('have.value', password);
    });
  });

  it('Test bottom text', function () {
    cy.get('.floating-text > p').should('be.visible')
      .and('have.text', '© All Right Reserved 2020');

  })

  it('Test dead link', function () {
    cy.get('.floating-btn').click();
    cy.get(':nth-child(1) > a > .fab').should('be.visible');
    cy.get(':nth-child(2) > a > .fab').should('be.visible');
    cy.get(':nth-child(3) > a > .fab').should('be.visible');
    cy.get(':nth-child(4) > a > .fab').should('be.visible');
    cy.get(':nth-child(5) > a > .fab').should('be.visible')

    cy.get('a').each(link => {
      if (link.prop('href')) {
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.be.oneOf([200, 301, 302]) // or any other valid status codes you want to check for
        })
      }
    })
      
    })
      
    })
  

