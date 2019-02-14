// bespoke fulfillment requests for the weekday flow

const { Suggestion, Card, Text } = require("dialogflow-fulfillment");

const updateMood = require("../../database/queries/update_mood");
const weeklyEvents = require("../../database/queries/getWeeklyEvents");

const storeInDB = (agent) => {
  const { session } = agent;
  const userId = session.split("/")[session.split("/").length - 1];
  let mood = agent.query;
  switch (mood) {
  case "Amazing":
    updateMood(userId, (mood = 0));
    break;
  case "Good":
    updateMood(userId, (mood = 1));
    break;
  case "It was OK":
    updateMood(mood === 2, userId);
    break;
  case "Not great":
    updateMood(mood === 3, userId);
    break;
  default:
    updateMood(mood === 4, userId);
    break;
  }
};

const finalOptions = (agent) => {
  const { originalRequest } = agent;
  const { name } = originalRequest.payload;
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

  agent.add(
    new Text(`Thanks for chatting, ${name}. I hope it was helpful. What would you like to do now?`),
  );
  agent.add(new Suggestion("Add more thoughts"));
  agent.add(adviceCard);
  agent.add(convCard);
};

exports.subjectMood = (agent) => {
  storeInDB(agent);
  const { originalRequest } = agent;
  const { eventTitle, name } = originalRequest.payload;
  agent.add(new Text(`Hi ${name}! 👋`));
  agent.add(new Text(`How was ${eventTitle} today?`));
  agent.add(new Suggestion("Amazing"));
  agent.add(new Suggestion("Good"));
  agent.add(new Suggestion("It was OK"));
  agent.add(new Suggestion("Not great"));
  agent.add(new Suggestion("Terrible"));
};

exports.positive = (agent) => {
  agent.add(new Text("That's great to hear!"));
  agent.add(new Text("Why was it so good?"));
  agent.add(new Suggestion("The lesson was interesting"));
  agent.add(new Suggestion("I did well today"));
  agent.add(new Suggestion("I had fun with my friends in the lesson"));
  agent.add(new Suggestion("My teacher was very nice today"));
};

exports.interestingLesson = (agent) => {
  agent.add(new Text("Great to hear you found it interesting!"));
  agent.add(new Text("What was it about the lesson you found interesting?"));
  agent.add(new Suggestion("It was taught well"));
  agent.add(new Suggestion("The subject matter was fun"));
  agent.add(new Suggestion("Other"));
};

exports.tellTeacherYes = (agent) => {
  agent.add(new Text("Great! Hopefully they'll try to make sure more lessons are like that."));
  finalOptions(agent);
};

exports.tellTeacherNo = (agent) => {
  agent.add(
    new Text(
      "Okay, well consider it! It may help make sure more of your lessons are fun in future.",
    ),
  );
  finalOptions(agent);
};

exports.funSubject = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    finalOptions(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(new Text("Cool! Let's hope it stays fun!"));
    agent.add(
      new Text(
        "What was it that you found fun about it? Write down your thoughts below and just hit 'Finished' when you're done :)",
      ),
    );
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
    agent.add(new Text("Okay, let loose! And remember, only you can see this..."));
    agent.add(new Text("Whenever you're done, press the 'Finished' button"));
  }
};

exports.niceTeacher = (agent) => {
  agent.add(new Text("That must feel lovely. Did you do anything different for them to be nice?"));
  agent.add(new Suggestion("I worked hard"));
  agent.add(new Suggestion("I got good grades"));
  agent.add(new Suggestion("I behaved well"));
  agent.add(new Suggestion("I'm not sure"));
};

exports.wontBehaveAgain = (agent) => {
  agent.add(
    new Text(
      "That's a shame... You should remember that it makes you feel good and keep trying to behave well!",
    ),
  );
  finalOptions(agent);
};

exports.behaveAgain = (agent) => {
  agent.add(new Text("Great! Hopefully your teacher will keep being nice :)"));
  agent.add(
    new Text(
      "Feel free to write down your thoughts about all this - it may help you keep up the good work! ",
    ),
  );
  finalOptions(agent);
};

exports.goodGrades = (agent) => {
  agent.add(new Text("Well done! You must feel proud!"));
  agent.add(new Text("It's good to remember that getting good grades feels good."));
  agent.add(
    new Text(
      "If you want to write about how it feels then please go ahead! It's good practice and could be fun to read back to remember your success!",
    ),
  );
  finalOptions(agent);
};

exports.friends = (agent) => {
  agent.add(new Text("Glad you had fun! Hope you did some work too 😝"));
  finalOptions(agent);
};

exports.didWell = (agent) => {
  agent.add(new Text("Well done! You must feel proud about doing well in class! "));
  agent.add(new Text("My work"));
  agent.add(new Suggestion("I overcame a challenge"));
  agent.add(new Suggestion("Other"));
};

exports.didWellOther = (agent) => {
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
        "What was it that you feel you did well at? Write down your thoughts below and just hit 'Finished' when you're done :)",
      ),
    );
  }
};

exports.challenge = (agent) => {
  agent.add(
    new Text(
      "That must feel awesome, it's always great to overcome a challenge. What was the challenge this time?",
    ),
  );
  agent.add(new Suggestion("Work that's been hard"));
  agent.add(new Suggestion("Concentrating"));
  agent.add(new Suggestion("Anxiety"));
  agent.add(new Suggestion("Other"));
};

const challengeFinish = (agent) => {
  agent.add(
    new Text(
      "Hope that was helpful! If you want to write any more at any time you're always welcome!",
    ),
  );
  agent.add(new Text("And BTW, I'm sure you don't need me to tell you, but keep it up!"));
  finalOptions(agent);
};

exports.challengeOther = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    challengeFinish(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(
      new Text(
        "I'm bursting to know! What was the challenge that you overcame? Write down your thoughts below and just hit 'Finished' when you're done!",
      ),
    );
  }
};

exports.positiveChallengeFinish = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    challengeFinish(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(new Text("Okay, let loose! And remember, only you can see this..."));
    agent.add(new Text("Whenever you're done, press the 'Finished' button"));
  }
};

exports.favouriteConcentrating = (agent) => {
  agent.add(new Text("Thats good! I mean it is your favorite lesson after all haha"));
  agent.add(new Text("But either way its great to hear that you did! Keep it up!"));
  finalOptions(agent);
};

exports.dontTalkAnxiety = (agent) => {
  agent.add(
    new Text(
      "Alright, let me know if you can change your mind! In your own time you should tell a trusted adult they would love to hear about it.",
    ),
  );
  finalOptions(agent);
};

exports.talkAnxiety = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    agent.add(
      new Text(
        "Thanks for that! I hope that helped. In your own time you should probably share this with a a trusted adult who can help you out.",
      ),
    );
    finalOptions(agent);
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(new Text("Okay, let loose! And remember, only you can see this..."));
    agent.add(new Text("Whenever you're done, press the 'Finished' button"));
  }
};

exports.didWellWork = (agent) => {
  agent.add(new Text("It's good to know that you are enjoying the work in lesson!"));
  agent.add(
    new Text(
      "Be sure to tell your teacher about this! Also if there are improvements that can be made to make it even better!",
    ),
  );
  agent.add(new Text("If you want to put down what happened you know you can do here too!"));
};

exports.negative = (agent) => {
  agent.add(new Text("Sorry to hear that, what was it about the lesson that didn't go well?"));
  agent.add(new Suggestion("It wasn't interesting this time"));
  agent.add(new Suggestion("The lesson was difficult"));
  agent.add(new Suggestion("I had a bad time with my classmates"));
  agent.add(new Suggestion("Other"));
};

exports.uninteresting = (agent) => {
  agent.add(new Text("Sorry to hear that, it's rare to find every lesson interesting."));
  agent.add(
    new Text(
      "I know that's not usually the case with this lesson, but if things change then do speak to your teacher about it. They might be able to do something about it!",
    ),
  );
  finalOptions(agent);
};

exports.faveDifficultYes = (agent) => {
  agent.add(
    new Text("That's pretty impressive that it's still your favourite when you find it difficult!"),
  );
  agent.add(
    new Text(
      "Even though it is your favourite, if you find the lessons difficult I would speak to your form tutor or teacher about this. They might help you enjoy the lesson even more!",
    ),
  );
  finalOptions(agent);
};

exports.faveDifficultNo = (agent) => {
  agent.add(new Text("Okay, that's good to hear.. "));
  agent.add(
    new Text(
      "I know that's not usually the case with this lesson, but if things change then do speak to your teacher about it. They might be able to do something about it!",
    ),
  );
  finalOptions(agent);
};

exports.negativeClassmates = (agent) => {
  agent.add(new Text("Is that because your friends aren't there or are they mean?"));
  agent.add(new Suggestion("My friends aren't in that class"));
  agent.add(new Suggestion("They're pretty mean"));
};

exports.friendsNotThere = (agent) => {
  agent.add(
    new Text(
      "That's not ideal.. If it's really troubling you then should speak to your teacher or form tutor. ",
    ),
  );
  agent.add(
    new Text(
      "I'm sure you could make friends with one person in that class, these things take time!",
    ),
  );
  agent.add(
    new Text(
      "If you want to write down your thoughts about this then please do.. I know this can be difficult. Want to give it a try?",
    ),
  );
};
