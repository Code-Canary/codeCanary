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
            .then(() => next01(convo));
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
  }

  const next04 = convo => {
    convo.ask({
      text: `Does it look good? 💅 Do you like it? 🤓`,
      quickReplies: ['yes', 'no']
  }, (payload, convo) => {
      const text = payload.message.text;
      convo.set('look', text);
        convo.say(`Nice! 😃 I want to tell you about it's inner workings! 😏`)
        .then(() => next05(convo));
      },
  [
      {
          event: 'quick_reply',
          callback: data => {
              const text = data.message.text;

              if (text === 'no') {
                convo.say(`Well, everyone's taste is different. 😝 I like it 😇 and I want to tell you about it's inner workings! 😏`)
                .then(() => next05(convo));
              } else {
                convo.say(`Nice! 😃 I want to tell you about it's inner workings! 😏`)
                .then(() => next05(convo));
              }
           }
      }
  ]
  , { typing: true });
}

const next05 = convo => {
  convo.say(`A homepage is made out of programming code (or just 'code' in short) which is written by programmers 👩🏽‍💻👨‍💻. You will also be a programmer soon! 👍 That's how the code looks like:`).then(
    () => next06(convo));
}

const next06 = convo => {
  convo.say({
    attachment: 'image',
    url: 'https://carbon.now.sh/embed/?bg=rgba(171%252C%2520184%252C%2520195%252C%25201)&t=material&wt=none&l=auto&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fm=Hack&fs=14px&lh=133%2525&si=false&es=2x&wm=false&code=%25253Cdiv%252520style%25253D%252522background-color%25253A%252520beige%25253B%252522%25253E%25250A%252520%252520%252520%25253Ch1%25253EDogs%25253C%25252Fh1%25253E%25250A%252520%252520%252520%25253Cimg%252520src%25253D%252522https%25253A%25252F%25252Ftinyurl.com%25252Fy2shswoe%252522%252520%25252F%25253E%25250A%25253C%25252Fdiv%25253E'
  }).then(() => next07(convo));
}

const next07 = convo => {
  convo.say(`That might look a bit scary 😱, but it's very easy, you will see! 😊`).then(
    () => next08(convo));
}

const next08 = convo => {
  convo.say(`Let us change the code a bit and see how it affects the page 😉`).then(
    () => next09(convo));
}

const next09 = convo => {
  convo.ask(`So, please tell me your favorite color 🎨:`, (payload, convo) => {
    const green = payload.message.text;
    convo.set('color1', green);
    convo.say(`Great! I love ${text}`).then(() => next10(convo));
  });
}

const next10 = convo => {
  convo.ask({
    text: `Let us change the background color 🖍! How should we change the first line? 1️⃣ How should it look like? 💁🏼‍`,
    quickReplies: ["<div style=\"background‐color: green;\">", "<div style=\"background‐color: pink;\">"]
}, (payload, convo) => {
    const text = payload.message.text;
    convo.set('otherText', text);
    // convo.say({
    //     text: 'What do you want to eat today?',
    //     quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
    // });
      convo.say(`You should've typed picked an answer`)
      .then(() => next01(convo));
    },
[
    {
        event: 'quick_reply',
        callback: data => {
            console.log('quick reply', data);

            const text = data.message.text;

            if (text === "<div style=\"background‐color: green;\">") {
              convo.say(`You're AWESOME! 😎🤩 You just changed the styling of an HTML element! 🎉`)
              .then(() => next11(convo));
            } else {
              convo.say(`Ok, let's start! 🚀`)
              .then(() => next11(convo));
            }
         }
    }
]
, { typing: true });
}

const next11 = convo => {
  convo.say(`Here's how the code looks like after our change:`).then(
    () => next02(convo));
}

const next12 = convo => {
  convo.say({
    attachment: 'image',
    url: 'https://carbon.now.sh/embed/?bg=rgba(171%252C%2520184%252C%2520195%252C%25201)&t=material&wt=none&l=auto&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fm=Hack&fs=14px&lh=133%2525&si=false&es=2x&wm=false&code=%25253Cdiv%252520style%25253D%252522background-color%25253A%252520green%25253B%252522%25253E%25250A%252520%252520%252520%25253Ch1%25253EDogs%25253C%25252Fh1%25253E%25250A%252520%252520%252520%25253Cimg%252520src%25253D%252522https%25253A%25252F%25252Ftinyurl.com%25252Fy2shswoe%252522%252520%25252F%25253E%25250A%25253C%25252Fdiv%25253E'
  }).then(() => next13(convo));
}

const next13 = convo => {

}


// convo.sendAttachment('image', 'https://raw.githubusercontent.com/f8-icode/f8-I-Code/master/examples/q003.png');

  chat.conversation((convo) => {
      askMotivation(convo);
  });
});



bot.start(config.get('botPort'));
