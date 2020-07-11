var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = "debug";
// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true,
});
bot.on("ready", function (evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});
bot.on("message", function (user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`

  if (message.substring(0, 1) == "!") {
    var args = message.substring(1).split(" ");
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      case "ping":
        bot.sendMessage({
          to: channelID,
          message: "don't worry NTF is here!",
        });
        break;
      // Just add any case commands if you want to..
    }
  }

  if (message.substring(0, 1) == "?") {
    let args = message.substring(1).split(" ");
    let searchTerm = args[1];
    logger.info(args);
    if (!searchTerm) {
      bot.sendMessage({
        to: channelID,
        message: "Ta Ara chi smya bla 9walb !!",
      });
    } else {
      let searchTermId = searchTerm.substring(3, searchTerm.length - 1);

      let user = bot.users[searchTermId];

      const botWasMentioned = searchTermId === bot.id;

      // check it the bot was who mentioned
      if (botWasMentioned) {
        bot.sendMessage({
          to: channelID,
          message: "Sir awa b3d mni ana hhhhh",
        });
      } else {
        //user.roles = [];
        user.mute = false;
        user.joined_at = 2335346534;
        user.color = "Null";
        user.status = "Offline";
        Object.keys(bot.servers).forEach(function (key) {
          var server = bot.servers[key];
          Object.keys(server.members).every(function (key) {
            var memeber = server.members[key];
            console.log(memeber.id, user.id);
            if (memeber.id == user.id) {
              //roles = memeber.roles;
              user.mute = memeber.mute;
              user.joined_at = memeber.joined_at;
              user.color = memeber.color;
              user.status = memeber.status;
              return false;
            } else {
              return true;
            }
          });
        });

        console.log(user);

        bot.sendMessage({
          to: channelID,
          embed: {
            description: "Here is " + user.username + "'s info",
            fields: [
              {
                name: "Status",
                value: `${user.status}`,
              },
              {
                name: "Joined_at",
                value: new Date(user.joined_at).toDateString(),
              },
              {
                name: "Color",
                value: `${user.color}`,
              },
              {
                name: "Mute State",
                value: user.mute ? "Mute" : "Not Mute",
              },
              //   {
              //     name: "Roles",
              //     value: roles.map(role=>(role)),
              //   },
            ],
          },
        });
      }
    }
  }
});
