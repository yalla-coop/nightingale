module.exports = (userInfo, messages, keywords) => {
  const userInfoSection = Object.entries(userInfo).reduce((accu, array) => `
    ${accu}
    <div class="tableX2">
      <span class="heading">${array[0]}</span>
      <span>${array[1]}</span>
    </div>
  `, "");

  const chatSection = messages.reduce((accu, message) => `
    ${accu}
    ${message.text.reduce((accu2, curVal) => `
      ${accu2}
      <div class="tableX2 messages">
        <span class="heading">${message.sender}:</span>
        <span>${curVal}</span>
      </div>
    `, "")}
  `, "");

  const threatSection = keywords.reduce((accu, keyword) => `
    <div class="tableX2">
      <span>${keyword.category}</span>
      <span>${keyword.score}</span>
    </div>
  `, "");

  const mailSkeleton = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: monospace;
        color: #555555
      }
  
      .container {
        max-width: 550px;
        width: 90%;
        margin: 0 auto;
        box-shadow: 0px 0px 11px #80808040;
        padding: 25px
      }
  
      .container p {
        margin: 12px 0;
      }
  
      .table {
        width: 100%
      }
  
      .tableX2 {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 10px 0
      }
  
      .tableX2 span {
        width: 50%
      }
  
      .tableX1{
        margin: 20px auto
      }
  
      .heading {
        font-size: 1.2rem;
        font-weight: 700
      }

      .messages {
        padding: 30px 0;
        margin: 10px 0;
        border-top: 1px solid #80808038;
      }

    </style>
    <title>Document</title>
  </head>
  
  <body>
    <div class="container">
      <h4>Hi there,</h4>
      <p>I've detected that there is a student maybe need an immediate help.
        I figure out that from his/her chating with me:
        threat type:</p>
      <div class="table">
        <div class="tableX2">
          <span class="heading">Threat type:</span>
          <span class="heading">Score:</span>
        </div>
        ${threatSection}
        <hr>
        <div class="tableX1">
          <span class="heading">Student info</span>
        </div>
        ${userInfoSection}
        <hr>
        <div class="tableX1">
          <span class="heading">Chat context:</span>
        </div>
        ${chatSection}
      </div>
    </div>
  </body>
  </html>`;

  return mailSkeleton;
};
