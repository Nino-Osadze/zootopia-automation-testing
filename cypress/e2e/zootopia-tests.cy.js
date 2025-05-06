import testdata from "../fixtures/data.json"

describe('Zootopia responsive tests', () => {

  beforeEach(() => {
    cy.viewport('macbook-13')  // Set this before every test
    cy.visit('https://testzootopia.loremipsum.ge/ka')
  })
   // რეგისტრაციის ველების სრულად შევსება წესების და პირობების მონიშვნის გარეშე
  it('complete registration without terms', () => {
    //(first_name, reg_email,personal_id,phone,reg_password,reg_password_confirmation)
    // რეგისტრაციის ველის სრულად შევსება
    cy.fillRegistrationFields(testdata.first_name,testdata.reg_email,testdata.personal_id,testdata.phone,testdata.reg_password,testdata.reg_password_confirmation)
  
    // რეგისტრაციის ღილაკზე თითის დაკლიკება 
    cy.get('.regsub').click()
    // შევამოწმოთ, რომ წესების და პირობების ღილაკი დაწითლდა 
    // როგორც მივხვდი  label[for="etx" მხოლოდ იმ შემთხვევაში "უჩნდება" კლასი err თუ აწითლებს.
    cy.get('label[for="etx"]').should('have.class','err')

   })

    // რეგისტრაციის მცდელობა პაროლის შეუსაბამობით წესების და პირობების მონიშვნით. 
  it('Register with mismatched passwords (terms accepted)', () => {
    //(first_name, reg_email,personal_id,phone,reg_password,reg_password_confirmation)
    // რეგისტრაციის ველის სრულად შევსება
    cy.fillRegistrationFields(testdata.first_name,testdata.reg_email,testdata.personal_id,testdata.phone,testdata.reg_password,testdata.mismatched_password)
    cy.get('label[for="etx"] svg g').first().click() // წესების და პირობების დაკლიკება. 
    // რეგისტრაციის ღილაკზე თითის დაკლიკება 
    cy.get('.regsub').click()
    // შევამოწმოთ, რომ alert ამოგვიგდო სისტემამ. 
    cy.get('.input-div.alert').should('exist')
   })
  // ავტორიზაცია არარეგისტრირებული მონაცემებით
   it('Authorization fails with non-existent user data', () => {
    cy.autorization(testdata.reg_email,testdata.reg_password)
    cy.get('.input-div.alert > .alert > img').should('exist')
   })
   // ავტორიზაცია რეგისტრირებული მონაცემებით
   it('Authorization fails with non-existent user data', () => {
    cy.autorization(testdata.log_in_email,testdata.log_in_password)
    cy.contains('გასვლა').should('be.visible')
    cy.contains('გასვლა').click()
   })
  //  პროდუქტის დამატება კალათაში და შემდეგ ავტორიზაცია
  it('ბლაბლს', () => {
    cy.contains('შესვლა').should('be.visible')
    // კალათაში ბოლოს დამატებული სექციიდან პირველი, რომელი კალათაც ჩანს იმის დაკლიკება
    cy.get('[onclick="addToCart(this)"]').first().click()
    // შემოწმება, რომ ნივთი დაემატა. 
    cy.get('#cart-items-count').should('have.text', '1')
    cy.contains('კალათა').click()
    cy.get('.cart-item').should('be.visible')
    cy.autorization(testdata.log_in_email,testdata.log_in_password)
    cy.get('.cart-item').should('be.visible')
    cy.contains('გასვლა').should('be.visible')
    cy.contains('გასვლა').click()
   })

})



