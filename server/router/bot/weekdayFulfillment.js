// bespoke fulfillment requests for the weekday flow

const { Suggestion, Card, Text } = require("dialogflow-fulfillment");


const updateMood = require("../../database/queries/updateConversationMood");

const storeInDB = (agent) => {
  console.log("asaaala hi");
  console.log("agent", agent);
  console.log("session", agent.session);
  const { session } = agent;
  const userId = (session.split("/")[session.split("/").length - 1]);
  const mood = agent.query;
  console.log("User ID is", userId);
  console.log("Mood", mood);
  switch (mood) {
  case "Amazing":
    updateMood(userId, mood = 0)
      .catch((error) => {
        console.log(error);
      });
    console.log("mood Amazing", mood);
    break;
  case "Good":
    updateMood(mood = 1, userId);
    console.log("mood Good", mood);
    break;
  case "Meh":
    updateMood(mood === 2, userId);
    console.log("mood Meh", mood);
    break;
  case "Not great":
    updateMood(mood === 3, userId);
    console.log("mood Not Great", mood);
    break;
  default:
    updateMood(mood === 4, userId);
    console.log("mood Terrible", mood);
    break;
  }
};


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

exports.extraThoughts = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    finalOptions(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(
      new Text(
        "Cool. Write about anything you like below. When you're done, select the 'Finished' button.",
      ),
    );
  }
};

exports.mood = (agent) => {
  agent.add(new Text("Hi! 👋"));
  agent.add(new Text("How was your school day?"));
  agent.add(new Suggestion("Amazing"));
  agent.add(new Suggestion("Good"));
  agent.add(new Suggestion("Meh"));
  agent.add(new Suggestion("Not great"));
  agent.add(new Suggestion("Terrible"));
};

exports.positive = (agent) => {
  storeInDB(agent);

  agent.add(new Text("I am really happy to hear that! 🤗 It's always nice to have a good day."));
  agent.add(new Text("So come on spill, why was it a good day?"));
  agent.add(new Suggestion("Good lessons"));
  agent.add(new Suggestion("Had a fun time"));
  agent.add(new Suggestion("Overcame a challenge"));
  agent.add(new Suggestion("Did well"));
  agent.add(new Suggestion("Other"));
};

exports.dontUsuallyEnjoyLesson = (agent) => {
  storeInDB(agent);

  agent.add(new Text("What was it about this lesson that made you enjoy it this time?"));
  agent.add(new Suggestion("It was interesting"));
  agent.add(new Suggestion("I did well!"));
  agent.add(new Suggestion("I had fun with my friends"));
  agent.add(new Suggestion("My teacher was nice to me"));
};

exports.negative = (agent) => {
  storeInDB(agent);

  agent.add(new Text("So, what was it about today that didn't go well?"));
  agent.add(new Suggestion("Bad lesson"));
  agent.add(new Suggestion("Friends"));
  agent.add(new Suggestion("Work"));
  agent.add(new Suggestion("School pressure"));
  agent.add(new Suggestion("Other"));
};

exports.dontlikeLesson = (agent) => {
  agent.add(new Text("What is it that you don't enjoy?"));
  agent.add(new Suggestion("It isn't interesting"));
  agent.add(new Suggestion("I find it difficult"));
  agent.add(new Suggestion("I don't like my classmates"));
  agent.add(new Suggestion("Other"));
};

exports.classmates = (agent) => {
  agent.add(new Text("Is that because your friends aren't there or are your classmates mean?"));
  agent.add(new Suggestion("They're pretty mean"));
  agent.add(new Suggestion("My friends aren't in that class"));
};

exports.usallyLikeLesson = (agent) => {
  agent.add(new Text("Oh, how come it wasn't great this time?"));
  agent.add(new Suggestion("It wasn't interesting"));
  agent.add(new Suggestion("It was difficult"));
  agent.add(new Suggestion("My classmates weren't nice to me"));
  agent.add(new Suggestion("Other"));
};

exports.pressure = (agent) => {
  agent.add(
    new Text("Pressure at school is not nice. Your well-being is the most important thing"),
  );
  agent.add(new Text("What do you feel is causing the pressure at the moment?"));
  agent.add(new Suggestion("School work"));
  agent.add(new Suggestion("Friends"));
  agent.add(new Suggestion("Exams"));
  agent.add(new Suggestion("Other students"));
  agent.add(new Suggestion("Other"));
};

exports.funTime = (agent) => {
  agent.add(new Text("Awesome - make sure you keep having fun!"));
  agent.add(
    new Text(
      "Remember you can write down your thoughts on anything you want... it's a good practice to get into!",
    ),
  );
  finalOptions(agent);
};

exports.tryHardNo = (agent) => {
  agent.add(new Text("If you tried hard you could do so well and you'd feel great about it!"));
  agent.add(new Text("Maybe think about it for next time 😛"));
  agent.add(
    new Text(
      "Feel free to write down your thoughts about anything else that's going on... it can help clear your head!",
    ),
  );
  finalOptions(agent);
};

exports.tryHardYes = (agent) => {
  agent.add(new Text("Hard work pays! 🙌"));
  agent.add(new Text("Great you got your rewards. Keep up the good work!"));
  agent.add(
    new Text(
      "Feel free to write down your thoughts about anything else that's going on... it can help clear your head!",
    ),
  );
  finalOptions(agent);
};

exports.lessonUninteresting = (agent) => {
  agent.add(new Text("Sorry to hear that, it's rare to find every lesson interesting."));
  agent.add(
    new Text(
      "I'd suggest that you speak to your form tutor or teacher about this. They might be able to help you find it interesting.",
    ),
  );
  agent.add(
    new Text(
      "Feel free though to add any more thoughts about it or anything else here. Writing down your thoughts is a good practice to get into.",
    ),
  );
  finalOptions(agent);
};

exports.lessonDifficult = (agent) => {
  agent.add(new Text("That's tough. It's hard to enjoy a difficult subject."));
  agent.add(
    new Text(
      "I'd suggest that you speak to your form tutor or teacher about this. Trust me it will really help you out.",
    ),
  );
  agent.add(
    new Text(
      "And feel free to add any more thoughts here about it or anything else. It's good practice.",
    ),
  );
  finalOptions(agent);
};

exports.friendsNotThere = (agent) => {
  agent.add(new Text("That's not ideal... if it's really troubling you then you should speak to your teacher or form tutor."));
  agent.add(
    new Text(
      "I'm sure you could make friends with one person in that class, these things take time!",
    ),
  );
  agent.add(
    new Text(
      "If you want to write down your thoughts about this then please do. I know this can be difficult.",
    ),
  );
  finalOptions(agent);
};

// bespoke fulfillments if they want to talk

exports.finish = (agent) => {
  agent.add(new Suggestion("Finished"));
};

exports.negativeFinish = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    agent.add(new Text("Hopefully you feel better for doing that."));
    agent.add(
      new Text(
        "And if you feel it is something serious then never be afraid to talk to someone you trust",
      ),
    );
    finalOptions(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(new Text("You can type out how you feel below. Remember only you can see this..."));
    agent.add(new Text("Whenever you're done, press the 'Finished' button"));
  }
};

exports.neutralFinish = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    finalOptions(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(new Text("Great, go for it! And remember, only you can see this..."));
    agent.add(new Text("Whenever you're done, press the 'Finished' button"));
  }
};

exports.positiveFinish = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    finalOptions(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(new Text("Cool! Let loose! And remember, only you can see this..."));
    agent.add(new Text("Whenever you're done, press the 'Finished' button"));
  }
};

exports.negativeFinish = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    finalOptions(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(
      new Text("OK. You can type out what happened below. And remember, only you can see this..."),
    );
    agent.add(new Text("Whenever you're done, press the 'Finished' button"));
  }
};
