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

    it("creation of user with the same email is not allowed (email should be unique)", () => {
        cy.request({ method: "POST", url: "/auth/sign-up", body: { email: "bobtest@example.com", password: "testing123" }, failOnStatusCode: false })
            .then((response) => {
                // client error
                expect(response.status).to.eq(400);

                expect(response.body).to.deep.equal({ error: "Email already exists." });
            });
    });
});
