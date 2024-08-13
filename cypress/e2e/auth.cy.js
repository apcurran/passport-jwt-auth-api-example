describe("Auth", () => {
    before(() => {
        cy.task("resetDbUsers");
    });

    it("creates a new user with an email and password", () => {
        cy.request("POST", "/auth/sign-up", { email: "bobtest@example.com", password: "testing123" })
            .then((response) => {
                expect(response.status).to.eq(201);

                expect(response.body).to.deep.equal({ message: "Success! You created an account!" });
            });
    });
});
