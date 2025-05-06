
  // ფუნქციები 
  Cypress.Commands.add('fillRegistrationFields', (first_name, reg_email,personal_id,phone,reg_password,reg_password_confirmation) => {
    cy.contains('შესვლა').should('be.visible')
    cy.contains('შესვლა').click()
    cy.contains('გაიარეთ რეგისტრაცია').should('be.visible')
    cy.contains('გაიარეთ რეგისტრაცია').click()
    cy.get('input[name="first_name"]').type(first_name)
    cy.get('input[name="reg_email"]').type(reg_email)
    cy.get('input[name="personal_id"]').type(personal_id)
    cy.get('input[name="phone"]').type(phone)
    cy.get('input[name="reg_password"]').type(reg_password)
    cy.get('input[name="reg_password_confirmation"]').type(reg_password_confirmation)

  })
  // ავტორიზაცია 
  Cypress.Commands.add('autorization', (login_email,login_password) => {
     cy.contains('შესვლა').should('be.visible')
     cy.contains('შესვლა').click()
     cy.get('input[name="login_email"]').type(login_email)
     cy.get('input[name="login_password"]').type(login_password)
     cy.get('.avtorization > .input-shablon > .form-button').click()

  })
  

  
