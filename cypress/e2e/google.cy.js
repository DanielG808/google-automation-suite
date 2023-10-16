describe("Google Critical Features", () => {
  it("Signs a user in via Google OAuth API", () => {
    cy.log("Logging in to Google");
    // Exchanges the refresh token for an id and access token
    cy.request({
      method: "POST",
      url: "https://www.googleapis.com/oauth2/v4/token",
      body: {
        grant_type: "refresh_token",
        client_id: Cypress.env("googleClientId"),
        client_secret: Cypress.env("googleClientSecret"),
        refresh_token: Cypress.env("googleRefreshToken"),
      },
    }).then(({ body }) => {
      const { access_token, id_token } = body;

      // Stores the access token in local storage and navigates to Google
      cy.request({
        method: "GET",
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        cy.log(body);
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        };

        window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
        cy.visit("/");
      });
    });
  });

  it("Performs a Google Search", () => {
    // searches with the enter key
    cy.visit("/");
    cy.url().then((url) => {
      cy.get(".a4bIc").type("getclair{enter}");
      cy.url().should("not.eq", url);
    });

    // searches with the 'I'm feeling lucky' button
    cy.visit("/");
    cy.get(".a4bIc").type("getclair");
    cy.get(".RNmpXc").click();

    // searches with the 'Google search' button and clicks link to the main page
    cy.visit("/");
    cy.url().then((url) => {
      cy.get(".a4bIc").type("getclair");
      cy.get(".aajZCb > .lJ9FBc > center > .gNO89b").click();
      cy.get(
        '.eKjLze > .g > [lang="en"] > .tF2Cxc > .yuRUbf > :nth-child(1) > [jscontroller="msmzHf"] > a > .LC20lb'
      ).click();
      cy.url().should("not.eq", url);
    });

    // searches with the suggested search option and clicks link to a specific page
    cy.visit("/");
    cy.url().then((url) => {
      cy.get(".a4bIc").type("getclair");
      cy.get("#jZ2SBf > .wM6W7d > span").click();
      cy.get(
        ":nth-child(2) > .cIkxbf > .usJj9c > .VttTV > :nth-child(1) > h3 > .l"
      ).click();
      cy.url().should("not.eq", url);
    });
  });

  it("Tests the Shopping page routing", () => {
    cy.visit("/");
    cy.get(
      '[href="https://store.google.com/US?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=en-US"]'
    ).click();
  });

  it("Checks about page routing", () => {
    cy.visit("/");
    cy.get(
      '[href="https://about.google/?fg=1&utm_source=google-US&utm_medium=referral&utm_campaign=hp-header"]'
    ).click();
  });

  it("Tests hyperlinks in footer", () => {
    cy.visit("/");
    cy.get(
      '[href="https://www.google.com/intl/en_us/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1"]'
    ).click();
    cy.visit("/");
    cy.get(
      '[href="https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1"]'
    ).click();
    cy.visit("/");
    cy.get('[href="https://google.com/search/howsearchworks/?fg=1"]').click();
    cy.visit("/");
    cy.get('[href="https://policies.google.com/privacy?hl=en&fg=1"]').click();
    cy.visit("/");
    cy.get('[href="https://policies.google.com/terms?hl=en&fg=1"]').click();
  });
});
