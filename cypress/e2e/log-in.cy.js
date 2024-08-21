describe("Auth", () => {
    beforeEach(() => {
        cy.task("resetDbUsers");
    });

    it("should fail when given an email that does not exist for any registered users", () => {
        // create 1 user
        cy.createUser("bobtest@example.com", "testing123");

        // attempt to log-in with bad credentials
        cy.request({
            method: "POST",
            url: "/auth/log-in",
            body: { email: "not_here@example.com", password: "testing123" },
            failOnStatusCode: false,
        }).then((response) => {
            // client error
            expect(response.status).to.equal(400);

            expect(response.body).to.deep.equal({ error: "Email is not found." });
        });
    });

    it("should fail when user tries to send an incorrect password to log-in", () => {
        cy.createUser("bobtest@example.com", "testing123");

        cy.request({
            method: "POST",
            url: "/auth/log-in",
            body: { email: "bobtest@example.com", password: "not_correct123" },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(400);

            expect(response.body).to.deep.equal({ error: "Invalid credentials provided. Please check your email and password then try again." });
        });
    });

    it("should successfully log-in and receive a response body with userId and accessToken properties", () => {
        cy.createUser("bobtest@example.com", "testing123");

        cy.request("POST", "/auth/log-in", { email: "bobtest@example.com", password: "testing123" })
            .then((response) => {
                expect(response.status).to.equal(200);

                expect(response.body).property("userId").to.not.be.undefined;

                expect(response.body).property("accessToken").to.not.be.undefined;
            });
    });
});
