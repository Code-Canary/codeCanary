'use strict';

// Global imports
const BootBot = require('bootbot');
const config = require('config');

// Local imports
const intro = require('./src');
const helpModule = require('./src/modules/help');

// Initialize bot
const bot = new BootBot({
  accessToken: config.get('accessToken'),
  verifyToken: config.get('verifyToken'),
  appSecret: config.get('appSecret'),
});

bot.module(helpModule);

// --- List to certain words/phrases ---

// Array example
bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
  console.log('The user said "hello", "hi", "hey", or "hey there"');
  chat.getUserProfile().then(user => {
    console.log('User Profile:', user);
    chat.say(`Hello, ${user.first_name}!`);
  });
});

// Regex example
bot.hear([/(good)?bye/i, /see (ya|you)/i, 'adios'], (payload, chat) => {
  // Matches: goodbye, bye, see ya, see you, adios
  chat.say('Bye, human!');
});

// Help me button
bot.on('postback:HELP_ME', (payload, chat) => {
  console.log('The Help Me button was clicked!');
});

// Authentication
bot.on('authentication', (payload, chat) => {
  console.log('AUTHENTICATION! - User arrived');
});
// User returns
bot.on('referral', (payload, chat) => {
  console.log('REFERRAL! - User returns');
});

// Start CodeCanary lesson
// bot.hear([/yes/i, /yeah\!?/i, /sure/i], (payload, chat) => {
//   chat.conversation(convo => {
//     intro(convo);
//   });
// });
bot.on('postback:BOOTBOT_GET_STARTED', (payload, chat) => {
  chat.conversation(convo => {
    intro(convo);
  });
});

/**
 * Show a persistent menu
 */
bot.setPersistentMenu([
  {
    type: 'postback',
    title: 'Pause course (keep progress)',
    payload: 'PAUSE_COURSE',
  },
  {
    type: 'postback',
    title: 'I need some help',
    payload: 'HELP',
  },
  {
    type: 'web_url',
    title: 'Project website',
    url: 'https://codecanary.now.sh/',
    webview_height_ratio: 'full',
  },
]);

/**
 * Customize greetings text
 */
bot.setGreetingText(
  'Welcome to CodeCanary! 😃 Do you want to learn how to program your own website 💻 without a computer?'
);

// bot.setGetStartedButton((user, other) => {
//   console.log({ user, other });
// });

bot.start(config.get('botPort'));
