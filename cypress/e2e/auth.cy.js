describe("Auth", () => {
    before(() => {
        cy.task("resetDbUsers");
    });

    // sign-up route
    it("creates a new user with an email and password", () => {
        cy.request("POST", "/auth/sign-up", { email: "bobtest@example.com", password: "testing123" })
            .then((response) => {
                expect(response.status).to.equal(201);

                expect(response.body).to.deep.equal({ message: "Success! You created an account!" });
            });
    });

    it("creation of user with the same email is not allowed (email should be unique)", () => {
        cy.request({ method: "POST", url: "/auth/sign-up", body: { email: "bobtest@example.com", password: "testing123" }, failOnStatusCode: false })
            .then((response) => {
                // client error
                expect(response.status).to.equal(400);

                expect(response.body).to.deep.equal({ error: "Email already exists." });
            });
    });

    // log-in route
    it("should fail when given an email that does not exist for any registered users", () => {
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
        cy.request("POST", "/auth/log-in", { email: "bobtest@example.com", password: "testing123" })
            .then((response) => {
                expect(response.status).to.equal(200);

                expect(response.body).property("userId").to.not.be.undefined;

                expect(response.body).property("accessToken").to.not.be.undefined;
            });
    });
});
