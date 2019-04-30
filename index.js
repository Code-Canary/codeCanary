'use strict';
const BootBot = require('bootbot');
const config = require('config');

const bot = new BootBot({
  accessToken: config.get('accessToken'),
  verifyToken: config.get('verifyToken'),
  appSecret: config.get('appSecret')
});

/**
 * Demo handler to echo back whatever the user says.
 * Feel free to delete this handler and start hacking!
 */
// bot.on('message', (payload, chat) => {
//   const text = payload.message.text;
//   chat.say(`Echo: ${text}`);
// });


bot.hear('Teach me', (payload, chat) => {

  const askMotivation = (convo) => {
      convo.ask({
          text: `Hi! Do you want to build a homepage? 😀`,
          quickReplies: ['yeah!', 'sure!', 'no']
      }, (payload, convo) => {
          const text = payload.message.text;
          convo.set('motivation', text);
          // convo.say({
          //     text: 'What do you want to eat today?',
          //     quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
          // });
            convo.say(`I take that as a yes! 😅 Let's start! 🚀 What are you really passionate about? 👊 A hobby or a favorite animal? Give me a word please! 😊`)
            .then(() => askFavoriteFood(convo));
          },
      [
          {
              event: 'quick_reply',
              callback: data => {
                  console.log('quick reply', data);

                  const text = data.message.text;

                  if (text === 'no') {
                    convo.say(`Why.. 😭 Please!! 🙏 It will be a lot of fun! Let's try it!`)
                    .then(() => next01(convo));
                  } else {
                    convo.say(`Ok, let's start! 🚀`)
                    .then(() => next01(convo));
                  }
               }
          }
      ]
      , { typing: true });
  };

  const next01 = convo => {
    convo.ask(`What are you really passionate about? 👊 A hobby or a favorite animal? Give me a word please! 😊`, (payload, convo) => {
      const text = payload.message.text;
      convo.set('interest', text);
      convo.say(`Great! I love ${text}`).then(() => showHomepage(convo));
    });
  }

  const showHomepage = (convo) => {
    convo.say(`Look, this here is a homepage 🖥 I made about ${convo.get('interest')}.`).then(
      () => next03(convo)
    );


  //     convo.say(`Ok, here's what you told me about you:
  //     - Name: ${convo.get('name')}
  //     - Favorite Food: ${convo.get('food')}`);
  // convo.end();

  }

  const next03 = convo => {
    convo.say({
      attachment: 'image',
      url: 'https://raw.githubusercontent.com/f8-icode/f8-I-Code/master/examples/q003.png'
    }).then(() => next04(convo));
    // convo.say('Does it look good? 💅 Do you like it? 🤓');
  }

  const next04 = convo => {

    // convo.sendAttachment('image', 'https://raw.githubusercontent.com/f8-icode/f8-I-Code/master/examples/q003.png');
  }

  chat.conversation((convo) => {
      askMotivation(convo);
  });
});



bot.start(config.get('botPort'));
