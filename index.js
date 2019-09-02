'use strict';

const BootBot = require('bootbot');
const config = require('config');

const bot = new BootBot({
  accessToken: config.get('accessToken'),
  verifyToken: config.get('verifyToken'),
  appSecret: config.get('appSecret'),
});

/**
 * Demo handler to echo back whatever the user says.
 * Feel free to delete this handler and start hacking!
 */
// bot.on('message', (payload, chat) => {
//   const text = payload.message.text;
//   chat.say(`Echo: ${text}`);
// });

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
  console.log('The user said "hello", "hi", "hey", or "hey there"');
});

bot.hear('Teach me', (payload, chat) => {
  const askMotivation = convo => {
    convo.ask(
      {
        text: `Hello! Do you want to build a homepage? 😀`,
        quickReplies: ['yeah!', 'sure!', 'no'],
      },
      (payload, convo) => {
        const text = payload.message.text;
        convo.set('motivation', text);
        convo
          .say(
            `I take that as a yes! 😅 Let's start! 🚀 What are you really passionate about? 👊
            A hobby or a favorite animal? Give me a word please! 😊`
          )
          .then(() => next01(convo));
      },
      [
        {
          event: 'quick_reply',
          callback: data => {
            console.log('quick reply', data);

            const text = data.message.text;

            if (text === 'no') {
              convo
                .say(
                  `Why.. 😭 Please!! 🙏 It will be a lot of fun! Let's try it!`
                )
                .then(() => next01(convo));
            } else {
              convo.say(`Ok, let's start! 🚀`).then(() => next01(convo));
            }
          },
        },
      ],
      { typing: true }
    );
  };

  const next01 = convo => {
    convo.ask(
      `What are you really passionate about? 👊 A hobby or a favorite animal? Give me a word please! 😊`,
      (payload, convo) => {
        const text = payload.message.text;
        convo.set('interest', text);
        convo.say(`Great! I love ${text}`).then(() => showHomepage(convo));
      }
    );
  };

  const showHomepage = convo => {
    convo
      .say(
        `Look, this here is a homepage 🖥 I made about ${convo.get('interest')}.`
      )
      .then(() => next03(convo));
    //     convo.say(`Ok, here's what you told me about you:
    //     - Name: ${convo.get('name')}
    //     - Favorite Food: ${convo.get('food')}`);
    // convo.end();
  };

  const next03 = convo => {
    convo
      .say({
        attachment: 'image',
        url:
          'https://raw.githubusercontent.com/f8-icode/f8-I-Code/master/examples/q003.png',
      })
      .then(() => next04(convo));
  };

  const next04 = convo => {
    convo.ask(
      {
        text: `Does it look good? 💅 Do you like it? 🤓`,
        quickReplies: ['yes', 'no'],
      },
      (payload, convo) => {
        const text = payload.message.text;
        convo.set('look', text);
        convo
          .say(`Nice! 😃 I want to tell you about it's inner workings! 😏`)
          .then(() => next05(convo));
      },
      [
        {
          event: 'quick_reply',
          callback: data => {
            const text = data.message.text;

            if (text === 'no') {
              convo
                .say(
                  `Well, everyone's taste is different. 😝 I like it 😇 and I want to tell you about it's inner workings! 😏`
                )
                .then(() => next05(convo));
            } else {
              convo
                .say(
                  `Nice! 😃 I want to tell you about it's inner workings! 😏`
                )
                .then(() => next05(convo));
            }
          },
        },
      ],
      { typing: true }
    );
  };

  const next05 = convo => {
    convo
      .say(
        `A homepage is made out of programming code (or just 'code' in short) which is written by programmers 👩🏽‍💻👨‍💻. You will also be a programmer soon! 👍 That's how the code looks like:`
      )
      .then(() => next06(convo));
  };

  const next06 = convo => {
    convo
      .say({
        attachment: 'image',
        url:
          'https://github.com/f8-icode/codeCanary/blob/master/images/carbon%20(1).png?raw=true',
      })
      .then(() => next07(convo));
  };

  const next07 = convo => {
    convo
      .say(
        `That might look a bit scary 😱, but it's very easy, you will see! 😊`
      )
      .then(() => next233(convo));
  };

  const next233 = convo => {
    convo.ask(`Everything alright? 😇`, (payload, convo) => {
      convo
        .say(`Let us change the code a bit and see how it affects the page 😉`)
        .then(() => next09(convo));
    });
  };

  const next09 = convo => {
    convo.ask(
      `So, please tell me your favorite color 🎨:`,
      (payload, convo) => {
        const green = payload.message.text;
        convo.set('color1', green);
        convo.say(`Great! I love ${green}`).then(() => next10(convo));
      }
    );
  };

  const next10 = convo => {
    convo.ask(
      {
        text: `Let us change the background color 🖍! How should we change the first line? 1️⃣ How should it look like? 💁🏼‍`,
        quickReplies: ['background: green;', 'background: pink;'],
      },
      (payload, convo) => {
        const text = payload.message.text;
        convo.set('otherText', text);
        convo
          .say(`You should've typed picked an answer`)
          .then(() => next11(convo));
      },
      [
        {
          event: 'quick_reply',
          callback: data => {
            console.log('quick reply', data);

            const text = data.message.text;

            if (text === 'background: green;') {
              convo
                .say(
                  `You're AWESOME! 😎🤩 You just changed the styling of an HTML element! 🎉`
                )
                .then(() => next11(convo));
            } else {
              convo
                .say(`No, that's not right. It's 'green'! 🙂 Never mind!`)
                .then(() => next11(convo));
            }
          },
        },
      ],
      { typing: true }
    );
  };

  const next11 = convo => {
    convo
      .say(`Here's how the code looks like after our change:`)
      .then(() => next12(convo));
  };

  const next12 = convo => {
    convo
      .sendAttachment('image', 'https://i.imgur.com/Sk82qSg.png')
      .then(() => next13(convo));
  };

  const next13 = convo => {
    convo.say(`And this is the homepage for you:`).then(() => next14(convo));
  };

  const next14 = convo => {
    convo
      .say({
        attachment: 'image',
        url:
          'https://raw.githubusercontent.com/f8-icode/f8-I-Code/master/examples/q400.png',
      })
      .then(() => next15(convo));
  };

  const next15 = convo => {
    convo
      .say(
        `You see, we don't have to understand every thing here 🤫, but can already make changes! 🛠 That's so cool! 😻`
      )
      .then(() => next16(convo));
  };

  const next16 = convo => {
    convo
      .say(
        `'HTML' is the language in which websites are written and 'style' is a so-called 'Attribute'. It styles 'HTML' elements, like a 'div'.`
      )
      .then(() => next200(convo));
  };

  const next200 = convo => {
    convo.ask(`Cool? 😇`, (payload, convo) => {
      convo
        .say(
          `People like to style themselves 💄💅😍, so do HTML elements 😻! We just changed the background-color 🖍 style of a 'div' element. 👩🏻‍🎨`
        )
        .then(() => next18(convo));
    });
  };

  const next18 = convo => {
    convo
      .say(`Now it's your turn! ✅ You'll create your own website. 😜`)
      .then(() => next19(convo));
  };

  const next19 = convo => {
    convo.ask(`What should your site be about? 😇`, (payload, convo) => {
      const text1 = payload.message.text;
      convo.set('newThing', text1);
      convo
        .say(`Great idea! ${text1}! 💡So cool! 😎 `)
        .then(() => next20(convo));
    });
  };

  const next20 = convo => {
    convo.ask(
      `So how do we start? 🏃‍ What is the name of the component of the outer layer? Do you remember? 🤔`,
      (payload, convo) => {
        const start = payload.message.text;
        convo.set('start', start);
        if (start === 'div' || start === 'DIV' || start === 'Div') {
          convo
            .say(
              `Excellent! 💪 A 'div' acts like an outer box. The code is as follows:`
            )
            .then(() => next21(convo));
        } else {
          convo
            .say(
              `Almost! It's actually a 'div' which acts like an outer box. The code is as follows:`
            )
            .then(() => next21(convo));
        }
      }
    );
  };

  const next21 = convo => {
    convo
      .say({
        attachment: 'image',
        url:
          'https://github.com/f8-icode/f8-I-Code/blob/master/examples/q023.png?raw=true',
      })
      .then(() => next22(convo));
  };

  const next22 = convo => {
    convo
      .say(`Isn't it beautiful? 🧚‍Empty nothingness! 💁🏼‍What do you think? 🤔`)
      .then(() => next23(convo));
  };

  const next23 = convo => {
    convo
      .say(
        `Well, perhaps some color helps?! 🖍 Let's add some! Which color do you want?`
      )
      .then(() => next24(convo));
  };

  const next24 = convo => {};

  // convo.sendAttachment('image', 'https://raw.githubusercontent.com/f8-icode/f8-I-Code/master/examples/q003.png');

  chat.conversation(convo => {
    askMotivation(convo);
  });
});

bot.start(config.get('botPort'));
