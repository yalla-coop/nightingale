const EventIntent = require("./../models/EventIntent");

const buildEventIntent = async () => {
  const eventsIntents = [{
    intent: "WeekdayStart",
    event: "weekday",
  }, {
    intent: "WeekdayNeutral",
    event: "WeekdayNeutral",
  }, {
    intent: "WeekdayNeutral - no",
    event: "WeekdayNeutralNo",
  }, {
    intent: "WeekdayNeutral - Yes",
    event: "WeekdayNeutralYes",
  }, {
    intent: "WeekdayPositive",
    event: "WeekdayPositive",
  }, {
    intent: "OvercameChallenge",
    event: "OvercameChallenge",
  }, {
    intent: "DontWriteAboutChallenge",
    event: "DontWriteAboutChallenge",
  }, {
    intent: "WriteAboutChallenge",
    event: "WriteAboutChallenge",
  }, {
    intent: "FunTime",
    event: "FunTime",
  }, {
    intent: "DidWell",
    event: "DidWell",
  }, {
    intent: "TryHard-No",
    event: "TryHardNo",
  }, {
    intent: "TryHard-Yes",
    event: "TryHardYes",
  }, {
    intent: "Other",
    event: "Other",
  }, {
    intent: "GoodLessons",
    event: "GoodLessons",
  }, {
    intent: "DontUsuallyEnjoy",
    event: "DontUsuallyEnjoy",
  }, {
    intent: "Lesson-DidWell",
    event: "LessonDidWell",
  }, {
    intent: "Lesson-NiceTeacher",
    event: "LessonNiceTeacher",
  }, {
    intent: "Lesson-Interesting",
    event: "LessonInteresting",
  }, {
    intent: "Lesson-FunFriends",
    event: "LessonFunFriends",
  }, {
    intent: "UsuallyEnjoy",
    event: "UsuallyEnjoy",
  }, {
    intent: "WeekdayNegative",
    event: "WeekdayNegative",
  }, {
    intent: "Talk-No",
    event: "TalkNo",
  }, {
    intent: "Talk-Yes",
    event: "TalkYes",
  }, {
    intent: "Negative-Work",
    event: "NegativeWork",
  }, {
    intent: "Negative-Work - yes",
    event: "NegativeWorkYes",
  }, {
    intent: "Negative-Work-Talk - Fallback",
    event: "NegativeWorkTalkFallback",
  }, {
    intent: "Negative-Work-Talk - Finished",
    event: "NegativeWorkTalkFinished",
  }, {
    intent: "Negative-Work - no",
    event: "NegativeWorkNo",
  }, {
    intent: "Negative-Lesson",
    event: "NegativeLesson",
  }, {
    intent: "Dont-Like-Lesson",
    event: "DontLikeLesson",
  }, {
    intent: "Lesson-Uninteresting",
    event: "LessonUninteresting",
  }, {
    intent: "Lesson-Other",
    event: "LessonOther",
  }, {
    intent: "Lesson-Other - yes",
    event: "LessonOtherYes",
  }, {
    intent: "TalkLesson-Other-Fallback",
    event: "TalkLessonOtherFallback",
  }, {
    intent: "TalkLesson-Finished",
    event: "TalkLessonFinished",
  }, {
    intent: "Lesson-Other - no",
    event: "LessonOtherNo",
  }, {
    intent: "Lesson-Difficult",
    event: "LessonDifficult",
  }, {
    intent: "Lesson-Classmates",
    event: "LessonClassmates",
  }, {
    intent: "Friends-Not-There",
    event: "FriendsNotThere",
  }, {
    intent: "Usually-Like-Lesson",
    event: "UsuallyLikeLesson",
  }, {
    intent: "LikeLesson-Other",
    event: "LikeLessonOther",
  }, {
    intent: "LikeLesson-Other - yes",
    event: "LikeLessonOtherYes",
  }, {
    intent: "LikeLesson-Other - Fallback",
    event: "LikeLessonOtherFallback",
  }, {
    intent: "LikeLesson-Other - Finished",
    event: "LikeLessonOtherFinished",
  }, {
    intent: "LikeLesson-Other - no",
    event: "LikeLessonOtherNo",
  }, {
    intent: "LikeLesson-Interesting",
    event: "LikeLessonInteresting",
  }, {
    intent: "LikeLesson-Difficult",
    event: "LikeLessonDifficult",
  }, {
    intent: "Negative-Friends",
    event: "NegativeFriends",
  }, {
    intent: "Friends-No",
    event: "FriendsNo",
  }, {
    intent: "Friends-Yes",
    event: "FriendsYes",
  }, {
    intent: "TalkFriends-Finished",
    event: "TalkFriendsFinished",
  }, {
    intent: "TalkFriends-Fallback",
    event: "TalkFriendsFallback",
  }, {
    intent: "Negative-Pressure",
    event: "NegativePressure",
  }, {
    intent: "Pressure-Exams",
    event: "PressureExams",
  }, {
    intent: "Pressure-Exams - yes",
    event: "PressureExamsYes",
  }, {
    intent: "Talk-Exams - Finish",
    event: "TalkExamsFinish",
  }, {
    intent: "Talk-Exams - fallback",
    event: "TalkExamsFallback",
  }, {
    intent: "Pressure-Exams - no",
    event: "PressureExamsNo",
  }, {
    intent: "Bullied",
    event: "Bullied",
  }, {
    intent: "Bullied - yes",
    event: "BulliedYes",
  }, {
    intent: "Bullied - Childline",
    event: "BulliedChildline",
  }, {
    intent: "Bullied - Childline - no",
    event: "BulliedChildlineNo",
  }, {
    intent: "Bullied - no",
    event: "BulliedNo",
  }, {
    intent: "Bullied-Talk-No",
    event: "BulliedTalkNo",
  }, {
    intent: "Bullied-Talk-Yes",
    event: "BulliedTalkYes",
  }, {
    intent: "Bullied-Talk-Yes - fallback",
    event: "BulliedTalkYesFallback",
  }, {
    intent: "Bullied-Talk-Yes - Finish",
    event: "BulliedTalkYesFinish",
  }, {
    intent: "Extra-Thoughts",
    event: "ExtraThoughts",
  }, {
    intent: "Fave-Subject - fallback",
    event: "FaveSubjectFallback",
  }, {
    intent: "faveSubject",
    event: "faveSubj",
  }, {
    intent: "fave-negativeLesson",
    event: "faveNegativeLesson",
  }, {
    intent: "fave-neutral",
    event: "faveNeutral",
  }, {
    intent: "fave-neutral-yes",
    event: "faveNeutralYes",
  }, {
    intent: "fave-neutral-no",
    event: "faveNeutralNo",
  }, {
    intent: "fave-positiveLesson",
    event: "favePositiveLesson",
  }, {
    intent: "Friend-Issue",
    event: "FriendIssue",
  }, {
    intent: "Friend-Issue - yes",
    event: "FriendIssueYes",
  }, {
    intent: "Friend-Issue-Talk - fallback",
    event: "FriendIssueTalkFallback",
  }, {
    intent: "Friend-Issue-Talk - Finish",
    event: "FriendIssueTalkFinish",
  }, {
    intent: "Friend-Issue - no",
    event: "FriendIssueNo",
  }, {
    intent: "General-Other",
    event: "GeneralOther",
  }, {
    intent: "General-Other - yes",
    event: "GeneralOtherYes",
  }, {
    intent: "General-Other - yes - fallback",
    event: "GeneralOtherYesFallback",
  }, {
    intent: "General-Other-Talk - Finish",
    event: "GeneralOtherTalkFinish",
  }, {
    intent: "General-Other - no",
    event: "GeneralOtherNo",
  }, {
    intent: "leastFaveSubject",
    event: "leastFaveSubj",
  }, {
    intent: "leastFave-NegativeLesson",
    event: "leastFaveNegativeLesson",
  }, {
    intent: "leastFave-Negative-Uninteresting",
    event: "leastFaveNegativeUninteresting",
  }, {
    intent: "leastFave-Negative-Difficult",
    event: "leastFaveNegativeDifficult",
  }, {
    intent: "leastFave-PositiveLesson",
    event: "leastFavePositiveLesson",
  }, {
    intent: "leastFave-Positive-DidWell",
    event: "leastFavePositiveDidWell",
  }, {
    intent: "leastFave-DidWell-Work",
    event: "leastFaveDidWellWork",
  }, {
    intent: "leastFave-DidWell-Work-yes",
    event: "leastFaveDidWellWorkYes",
  }, {
    intent: "leastFave-DidWell-Work-yes-talk",
    event: "leastFaveDidWellWorkYesTalk",
  }, {
    intent: "leastFave-DidWell-Work-yes-donttalk",
    event: "leastFaveDidWellWorkYesDonttalk",
  }, {
    intent: "leastFave-DidWell-Work-no",
    event: "leastFaveDidWellWorkNo",
  }, {
    intent: "leastFave-DidWell-Work-no-donttalk",
    event: "leastFaveDidWellWorkNoDonttalk",
  }, {
    intent: "leastFave-DidWell-Work-no-talk",
    event: "leastFaveDidWellWorkNoTalk",
  }, {
    intent: "leastFave-DidWell-Other",
    event: "leastFaveDidWellOther",
  }, {
    intent: "leastFave-DidWell-Challenge",
    event: "leastFaveDidWellChallenge",
  }, {
    intent: "leastFave-Challenge-Anxiety",
    event: "leastFaveChallengeAnxiety",
  }, {
    intent: "leastFave-Challenge-Anxiety-yes",
    event: "leastFaveChallengeAnxietyYes",
  }, {
    intent: "leastFave-Challenge-Anxiety-no",
    event: "leastFaveChallengeAnxietyNo",
  }, {
    intent: "leastFave-Challenge-Other",
    event: "leastFaveChallengeOther",
  }, {
    intent: "leastFave-DidWell-Concentrating",
    event: "leastFaveDidWellConcentrating",
  }, {
    intent: "Concentrating-Understand",
    event: "ConcentratingUnderstand",
  }, {
    intent: "Concentrating-Understood-yes",
    event: "ConcentratingUnderstoodYes",
  }, {
    intent: "Concentrating-Understand-no",
    event: "ConcentratingUnderstandNo",
  }, {
    intent: "Concentrating-Other",
    event: "ConcentratingOther",
  }, {
    intent: "leastFave-Challenge-Work",
    event: "leastFaveChallengeWork",
  }, {
    intent: "leastFave-Challenge-Work-yes",
    event: "leastFaveChallengeWorkYes",
  }, {
    intent: "leastFave-Challenge-Work-yes-donttalk",
    event: "leastFaveChallengeWorkYesDonttalk",
  }, {
    intent: "leastFave-Challenge-Work-yes-talk",
    event: "leastFaveChallengeWorkYesTalk",
  }, {
    intent: "leastFave-Challenge-Work-no",
    event: "leastFaveChallengeWorkNo",
  }, {
    intent: "leastFave-Challenge-Work-no-talk",
    event: "leastFaveChallengeWorkNoTalk",
  }, {
    intent: "leastFave-Challenge-Work-no-donttalk",
    event: "leastFaveChallengeWorkNoDonttalk",
  }, {
    intent: "leastFaveSubject-Neutral",
    event: "leastFaveSubjectNeutral",
  }, {
    intent: "leastfave-neutral-no",
    event: "leastfaveNeutralNo",
  }, {
    intent: "leastfave-neutral-yes",
    event: "leastfaveNeutralYes",
  },
  // --------
  {
    intent: "negativeLesson-Classmates",
    event: "negativeLessonClassmates",
  }, {
    intent: "friendsNotThere",
    event: "friendsNotThere2",
  }, {
    intent: "friendsNotThere-no",
    event: "friendsNotThereNo",
  }, {
    intent: "friendsNotThere-yes",
    event: "friendsNotThereYes",
  }, {
    intent: "negativeLesson-Difficult",
    event: "negativeLessonDifficult",
  }, {
    intent: "negativeLesson-Difficult-yes",
    event: "negativeLessonDifficultYes",
  }, {
    intent: "negativeLesson-Difficult-no",
    event: "negativeLessonDifficultNo",
  }, {
    intent: "negativeLesson-Uninteresting",
    event: "negativeLessonUninteresting",
  }, {
    intent: "positiveLesson-didwell",
    event: "positiveLessonDidwell",
  }, {
    intent: "didWell-Work",
    event: "didWellWork",
  }, {
    intent: "didWell-Other",
    event: "didWellOther",
  }, {
    intent: "didWell-Challenge",
    event: "didWellChallenge",
  }, {
    intent: "Challenge-Anxiety",
    event: "ChallengeAnxiety",
  }, {
    intent: "Challenge-Anxiety-no",
    event: "ChallengeAnxietyNo",
  }, {
    intent: "Challenge-Anxiety-yes",
    event: "ChallengeAnxietyYes",
  }, {
    intent: "Challenge-HardWork",
    event: "ChallengeHardWork",
  }, {
    intent: "Challenge-HardWork-yes",
    event: "ChallengeHardWorkYes",
  }, {
    intent: "Challenge-HardWork-yes-yes",
    event: "ChallengeHardWorkYesYes",
  }, {
    intent: "Challenge-HardWork-yes-no",
    event: "ChallengeHardWorkYesNo",
  }, {
    intent: "Challenge-HardWork-no",
    event: "ChallengeHardWorkNo",
  }, {
    intent: "Challenge-HardWork-no-yes",
    event: "ChallengeHardWorkNoYes",
  }, {
    intent: "Challenge-HardWork-no-no",
    event: "ChallengeHardWorkNoNo",
  }, {
    intent: "Challenge-Concentrating",
    event: "ChallengeConcentrating",
  }, {
    intent: "Challenge-Other",
    event: "ChallengeOther",
  },
  ];


  return EventIntent.insertMany(eventsIntents);
};

module.exports = buildEventIntent;
