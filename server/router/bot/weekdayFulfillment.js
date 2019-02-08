const {
  WebhookClient, Suggestion, Payload, Card, Text,
} = require("dialogflow-fulfillment");

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
  agent.add(new Text("I am really happy to hear that! 🤗 It's always nice to have a good day."));
  agent.add(new Text("So come on spill, why was it a good day?"));
  agent.add(new Suggestion("Good lessons"));
  agent.add(new Suggestion("Had a fun time"));
  agent.add(new Suggestion("Overcame a challenge"));
  agent.add(new Suggestion("Did well"));
  agent.add(new Suggestion("Other"));
};

exports.dontUsuallyEnjoyLesson = (agent) => {
  agent.add(new Text("What was it about this lesson that made you enjoy it this time?"));
  agent.add(new Suggestion("It was interesting"));
  agent.add(new Suggestion("I did well!"));
  agent.add(new Suggestion("I had fun with my friends"));
  agent.add(new Suggestion("My teacher was nice to me"));
};

exports.negative = (agent) => {
  agent.add(new Text("So, what was it about today that didn't go well?"));
  agent.add(new Suggestion("Bad lesson"));
  agent.add(new Suggestion("Friends"));
  agent.add(new Suggestion("Work"));
  agent.add(new Suggestion("School pressure"));
  agent.add(new Suggestion("Other"));
};

exports.finish = (agent) => {
  agent.add(new Suggestion("Finished"));
};

exports.newFinish = (agent) => {
  const userInput = agent.parameters.any;
  const finish = agent.parameters.finished;
  const userStarted = userInput.length > 0;
  const userFinished = finish.length > 0;

  if (userStarted && userFinished) {
    agent.add(new Text("Hopefully you feel better for doing that."));
    agent.add(
      new Text(
        "Add any more thoughts you like and if you feel it is someting serious then never be afraid to talk to someone you trust",
      ),
    );
  } else if (userStarted && !userFinished) {
    agent.add(new Suggestion("Finished"));
  } else {
    agent.add(new Text("You can type out how you feel below. Remember only you can see this..."))
    agent.add(new Text("Whenever you're done, press the 'Finished' button"))
  }
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
