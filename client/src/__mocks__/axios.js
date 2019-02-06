const conversations = [
  {
    _id: "5c5a12ea642a9610d8339326",
    mood: [
      {
        _id: "5c5a12e9642a9610d833931e",
        moodEmoji: "😃",
        moodDescription: "amazing",
        score: 5,
        __v: 0
      }
    ],
    dayOfWeek: "Yesterday",
    date: "5 Feb"
  },
  {
    _id: "5c5a12ea642a9610d8339327",
    mood: [
      {
        _id: "5c5a12e9642a9610d833931f",
        moodEmoji: "😌",
        moodDescription: "good",
        score: 4,
        __v: 0
      }
    ],
    dayOfWeek: "Sunday",
    date: "27 Jan"
  },
  {
    _id: "5c5a12ea642a9610d8339328",
    mood: [
      {
        _id: "5c5a12e9642a9610d833931f",
        moodEmoji: "😌",
        moodDescription: "good",
        score: 4,
        __v: 0
      }
    ],
    dayOfWeek: "Monday",
    date: "28 Jan"
  }
];

const routeData = {
  "/api/user/conversations": conversations
};

export default {
  get: jest.fn(url => Promise.resolve({ data: routeData[url] }))
};
