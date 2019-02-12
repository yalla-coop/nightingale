const mailBuilder = require("./../../router/bot/mail_builder");

describe("Testing the mailBuilder function", () => {
  test("test mailBuilder", async () => {
    // declare dummy user info
    const userInfo = { username: "nadia-2009", name: "Nadia" };

    // declare dummy messages
    const messages = [
      { text: ["dummy message"], sender: "user" },
    ];
    // declare dummy keywords
    const keywords = [{ category: "dummy category", score: 5 }];

    // build new email
    const email = mailBuilder(userInfo, messages, keywords);

    // email must includes "name" span
    expect(email).toMatch("<span class=\"heading\">name</span>");

    // email must includes "Nadia" span
    expect(email).toMatch("<span>Nadia</span>");

    // email must includes "dummy category" span
    expect(email).toMatch("<span>dummy category</span>");

    // email must includes "dummy message" span
    expect(email).toMatch("<span>dummy message</span>");
  });
});
