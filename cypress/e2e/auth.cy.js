describe("Auth", () => {
    it("creates a new user with an email and password", () => {
        cy.request("POST", "/auth/sign-up", { email: "bobtest@example.com", password: "testing123" })
            .then(
                (response) => {
                    expect(response.body).to.include("Success! You created an account!");
                },
            );
    });
});
