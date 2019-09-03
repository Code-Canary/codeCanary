# codeCanary

Made with [BootBot CLI](https://github.com/Charca/bootbot-cli)

## Install

1. Add information to `config/default.json`

    1. Create a file `config/default.json` by copying `default.example.json`
    2. Go to [https://developers.facebook.com/](), login and copy the messenger credentials.

2. Install dependencies

    ```bash
    yarn
    ```

## Run

1. Start server

    ```
    yarn start
    ```

    The server is then running on `localhost:8007/webhook`

2. Search for `CodeCanary` in the **Messenger** app on your Smartphone or click on this messenger link: [m.me/2254629508184743]().
3. If you used `CodeCanary` before, delete the chat by swiping to the left and then tapping on the red trash icon. Then search for `CodeCanary` again.

## TODO

- [ ] Chance to stop conversation in between. Probably have to split up the large conversation into several ones.
- [ ] Customize "Get Started" string at the beginning.
- [ ] Customize `setGetStartedButton`
- [ ] Investigate why `setPersistentMenu` doesn't show persistent menu.
- [ ] Check why `authentication` and `referral` don't work yet.