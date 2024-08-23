describe("auth protected", () => {
    beforeEach(() => {
        cy.task("resetDbUsers");
    });

    it("gets access to auth-restricted route after successful log-in", () => {
        const userEmail = "bobtest@example.com";
        const userPassword = "testing123";

        cy.createUser(userEmail, userPassword);

        cy.logIn(userEmail, userPassword)
            .then((response) => {
                cy.request({
                    url: "/user/protected",
                    method: "GET",
                    auth: {
                        bearer: response.body.accessToken,
                    },
                }).then((response) => {
                    expect(response.status).to.equal(200);

                    expect(response.body).to.deep.equal({ message: "You successfully accessed the protected user route!" });
                });
            });
    });

    it("gives an unauthorized error code after attempting to use a bad (altered) token", () => {
        const userEmail = "bobtest@example.com";
        const userPassword = "testing123";

        cy.createUser(userEmail, userPassword);

        cy.logIn(userEmail, userPassword)
            .then((response) => {
                const alteredToken = response.body.accessToken.slice(0, -2);

                cy.request({
                    url: "/user/protected",
                    method: "GET",
                    auth: {
                        bearer: alteredToken,
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(401); // unauthorized
                });
            });
    });
});
