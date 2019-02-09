// general fulfillment messages used across multiple flows

const { Suggestion, Card, Text } = require("dialogflow-fulfillment");

const finalOptions = (agent) => {
  const adviceCard = new Card({
    title: "View Advice",
    text: "Check out useful articles and resources",
  });
  adviceCard.setButton({ text: "Select", url: "/advice" });
  const convCard = new Card({
    title: "Previous Conversations",
    text: "Read previous conversations we've had to reflect on how you've been feeling",
  });
  convCard.setButton({ text: "Select", url: "/conversations" });

  agent.add(new Text("Thanks for chatting. I hope it was helpful. What would you like to do now?"));
  agent.add(new Suggestion("Add more thoughts"));
  agent.add(adviceCard);
  agent.add(convCard);
};

exports.dontTalk = (agent) => {
  agent.add(new Text("OK, no worries. Remember I'm here to talk if you want."));
  finalOptions(agent);
};

exports.negativeDontTalk = (agent) => {
  agent.add(
    new Text(
      "OK, that's fine, but I'd suggest you talk to your form tutor or teacher about this. It will really help you.",
    ),
  );
  agent.add(
    new Text(
      "And if it's about this or anything, you can always write down your thoughts here. It's good practice. ",
    ),
  );
  finalOptions(agent);
};

exports.positiveOther = (agent) => {
  agent.add(new Text("OK, well whatever it is it sounds good!"));
  agent.add(
    new Text(
      "Remember you can always write about what's going on :) It's a good habit to get into!",
    ),
  );
  finalOptions(agent);
};

exports.positiveGeneral = (agent) => {
  agent.add(new Text("Cool! I'm happy to hear that 😁"));
  agent.add(
    new Text(
      "Remember you can always write down your thoughts about it - or anything else for that matter! It's a good habit to get into 👍",
    ),
  );
  finalOptions(agent);
};

exports.negativeGeneral = (agent) => {
  agent.add(new Text("Sorry to hear that"));
  agent.add(
    new Text(
      "If it continues being a problem, I'd recommend speaking to your teacher about it... they might be able to help!",
    ),
  );
  agent.add(
    new Text(
      "And remember you can always write down your thoughts about it here - or anything else for that matter! It's a good habit to get into 👍",
    ),
  );
  finalOptions(agent);
};

exports.bulliedChildline = (agent) => {
  agent.add(new Text("Their number is 0800 1111. Give them a ring."));
  agent.add(
    new Text("Also, just remember that you are not alone in this. People are there to help."),
  );
  finalOptions(agent);
};

exports.bulliedChildlineNo = (agent) => {
  agent.add(new Text("Ok, but here is their number just in case.  0800 1111"));
  agent.add(
    new Text("Also, just remember that you are not alone in this. People are there to help."),
  );
  finalOptions(agent);
};
