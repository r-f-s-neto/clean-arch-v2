describe("Login", () => {
  it("Should starts", () => {
    cy.visit("login");
    cy.getByTestId("email-status").should(
      "have.attr",
      "title",
      "Campo Obrigatório"
    );
    cy.get('[data-testid="password-status"]').should(
      "have.attr",
      "title",
      "Campo Obrigatório"
    );
    cy.get('[data-testid="submit"]').should("have.attr", "disabled");
  });
});
