describe("My example test for JSON Placeholder", () => {
    it("passes the test", () => {
        cy.request("https://jsonplaceholder.typicode.com/todos/1");
    });
});
