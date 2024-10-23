describe('Teste de login', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('Deve levar para a pagina de Login', () => {
    cy.contains('Login de Usuário'); //assert
  });

  it('Deve autenticar os campos login e senha', () => {
    const campoLogin = cy.get('[data-cy=login]');
    const campoSenha = cy.get('[data-cy=senha]');

    campoLogin.type('juninho')
    campoSenha.type('Teste@123')

    const botaoLogar = cy.get('[data-cy=submit]');

    botaoLogar.click();

    cy.wait(1000);
    cy.contains('Painel de Controle')
  })

  it('Deve notificar formulario invalido', () => {
    cy.get('[data-cy=submit]').click();

    cy.contains('Preencha os campos corretamente')
  })
});
