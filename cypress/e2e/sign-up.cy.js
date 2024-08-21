describe("Auth", () => {
    beforeEach(() => {
        cy.task("resetDbUsers");
    });

    // sign-up route
    it("creates a new user with an email and password", () => {
        // create 1 user first
        cy.createUser("bobtest@example.com", "testing123")
            .then((response) => {
                expect(response.status).to.equal(201);

                expect(response.body).to.deep.equal({ message: "Success! You created an account!" });
            });
    });

    it("creation of user with the same email is not allowed (email should be unique)", () => {
        // create 1 user first
        cy.createUser("bobtest@example.com", "testing123");

        cy.request({ method: "POST", url: "/auth/sign-up", body: { email: "bobtest@example.com", password: "testing123" }, failOnStatusCode: false })
            .then((response) => {
                // client error
                expect(response.status).to.equal(400);

                expect(response.body).to.deep.equal({ error: "Email already exists." });
            });
    });
});
