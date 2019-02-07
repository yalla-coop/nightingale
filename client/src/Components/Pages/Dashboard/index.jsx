import React, { Component } from "react";
import Chart from "../../Common/Chart";
import jwt_decode from "jwt-decode";
import jsCookie from "js-cookie";
import uuid from "uuid";
import axios from "axios";
import {
  TopDiv,
  Name,
  Welcome,
  Message,
  DailyDiv,
  Daily,
  Dailyparagraph
} from "./index.style";

class Dashboard extends Component {
  state = {
    message: "",
    dailyMood: [],
    statusMood: null
  };

  componentDidMount = () => {
    axios
      .get("/api/user/dashboard")
      .then(res => {
        const { data } = res;
        if (
          data[0].moodsBystatus.length === 0 &&
          data[0].moodsByDays.length === 0
        ) {
          const message =
            "hey! there is no information about your mood! Start chatting to get it";
          this.setState({ message, dailyMood: [], statusMood: null });
        } else {
          const { moodsBystatus, moodsByDays } = data[0];
          // Put the mood by status in chart object to show
          const statusMood = moodsBystatus.map(row => ({
            decription: row.moodEmoji,
            percentage: row.theAverage.toFixed(1),
            mood: row.moodDescription,
            count: row.count
          }));
          const { dailyMood } = this.state;
          // Get the mood by days
          moodsByDays.map(row => dailyMood.push([row.moodEmoji, row._id]));
          // Set new data in the State
          this.setState({ statusMood, dailyMood });
        }
      })
      .catch(() => {
        const msg = " Sorry, There is an error!!";
        this.setState({ message: msg, conversations: [] });
      });
  };

  render() {
    const { message, statusMood, dailyMood } = this.state;
    return (
      <>
        <TopDiv>
          <Name>Hi {this.props.name} !</Name>
          <Welcome>It’s great to see you again</Welcome>
          {message && <Message>{message}</Message>}
          {statusMood && dailyMood && (
            <Message>
              Here’s a breakdown of how you’ve felt before each of our
              conversations over the last 30 days:
            </Message>
          )}
        </TopDiv>

        {statusMood && <Chart sections={statusMood} width={200} />}
        {dailyMood && (
          <DailyDiv>
            {dailyMood.map(day => (
              <Daily key={uuid()}>
                {day.map(value => (
                  <Dailyparagraph key={uuid()}>{value}</Dailyparagraph>
                ))}
              </Daily>
            ))}
          </DailyDiv>
        )}
      </>
    );
  }
}
export default Dashboard;
