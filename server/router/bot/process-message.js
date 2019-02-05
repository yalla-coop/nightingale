// handles message request to be rendered
const Dialogflow = require("dialogflow");
const Pusher = require("pusher");

const projectId = "nightingale-456a9";
const sessionId = "123456";
const languageCode = "en-US";

const config = {
  credentials: {
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDTF5DHftYtKdg9\nbFg7dv/91b2v8CPDop+qtuX7Naddsrl4iVeKNaZXP7zeq0Eg2uvna2wLPkHFp7oP\nt1IgX2E3x0MMxocJ/YiEJwh1qpRmUvh/OE2PX+vN8tEe3y7hqBLFjbSfDPnI+oQq\nb5wLBEeWHHEpUfmQr1GoXLUsj42WVu3LN0fpRDgrijDUoGlEgpcaunv8OFU6AzuW\nZ1AfNzyAr3XcEjzqUeP/sA2p5DYH7hFBjGbEeKeXC5L7UkVS3PbzoemLibKmfmky\nqTHwfrz7/t/zx0rycPZxqtqBaa0/6dL9gxCrZwjLnGMIE8P3dJbgffjciDLvbqkf\nu1fDQ9s7AgMBAAECggEASWBurjoTvx1Fkoxf20PRVm3/AvJprC6Sa+gp53nOFM70\nk8bCDEP772Yzg/9poz8WM5puszXP7SIRljb2MFSXWalFUGKOPFXKJ43d7fD+ptb+\nlFKA+26vbCaUtLOF+2DOLafFemgrR8Z1PL8RMe8p5y850tAw/S9EJk8bl0LLR8+M\nOhTNUqq3jPI2sAbNtNCH0cGXiSMZ7C67eq0sr7qqPhiBThF4MXl/iPguixhISv2y\nE9gYRR25PZhmAj09EnuLMRvmXFYvPQ0V7aDnTxwRJnLiceULQgoAtfmcjCw+s/Uz\njBknRyYve3FGmc3rrj0Br2fKJc/T1yMjrqywSR47wQKBgQDo48j/YqIeoVXHZwl8\nwcUjNqOon/Yj8dUITLMgsTdy7VTPUeeeHgIfR+VUOElhyC3hzK42nTQHNpC4dIUn\nSVTmlRo+WWVs3e8Nu27QAVkgplFuJ8uwySD/U1G26Pv8Xh+Xt0BlEYFlp6TWI3lE\nEyKr4ylOgAhAwFRHy+yQx7044QKBgQDoCgqxT0nTyBppmu1U3aXytqPuSc+PCz5l\ntKeHILFiVwjNxj6NdZiE/DVlRbO89kTus0o5ODm1/n5Xd+uLeHMFFz0XgsaAP8kY\ncAm5pGcLGKWI2OZ/H4hp66FJ6uE/M6q/85Qo84tH/JI+kTGDllMQpD8J1swMwswA\nSHFIQpjLmwKBgH0tgmoTAATqvwqRDX5rQKUux0TpxgmIAPOXFmkqGB3EB2PwKEjK\n5GUf5dog7wCJ8m997t4YHVELOTqMFs4JEoNl/VcqAeREXivJZUSUlO2BuB83cLqz\nQPM8O53PGTKK/Pw1WX15rU2QkH8xTgsTJf2x+g/hrY3wUtzMdXlUgxbBAoGAeoaC\n6unBRDFPsR/73mpD7IwAuB0FmrUHN9FS/QmIYTMwFOhvs2a7KM28rENIC6nG8Hx/\n3wMPhkhiEnHiUP1DTxbcTYPiqWoFGABhQkPLnZJgJojR/aJ69+NSgaOjWSpBKabH\nP3CKxXJbDurASImiRxFTsDBaAwsBicy29L8ly60CgYAibClVoSyv8Q5FV9xjfCYc\nuOwmrzsjnSHWjslzxOsxZg0ldLSrQ4GkHgXfv5qqP6gaBErp3wY3q/bBsAU0vyia\nYGRRs5hjeM9rreG5UHOyNvpkXiRx8EAObFEYCdKlFQLTe4M94pJOAtmSPDPLWL+c\n0QuhXl9DDkycyOcd8rpvzQ==\n-----END PRIVATE KEY-----\n",
    client_email: "admin-access@nightingale-456a9.iam.gserviceaccount.com",
  },
};

const pusher = new Pusher({
  appId: "707203",
  key: "42ea50bcb339ed764a4e",
  secret: "5770dab1663742e094b1",
  cluster: "eu",
  encrypted: true,
});

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = (message) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then((responses) => {
      const result = responses[0].queryResult;
      const messageArr = result.fulfillmentMessages;
      // check if fulfillmentMessages Array includes more than 1 message
      if (messageArr.length > 1) {
        // loop over it and send all individual responses
        messageArr.forEach(message => pusher.trigger("bot", "bot-response", {
          message: message.text.text,
        }));
      } else {
        return pusher.trigger("bot", "bot-response", {
          message: result.fulfillmentText,
        });
      }
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
};
module.exports = processMessage;
