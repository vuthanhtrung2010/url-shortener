# Support Server

<a href="https://discord.gg/5q6zxM5vnT"><img src="https://discord.com/api/guilds/1142287130526224404/widget.png"></a>

# Important notes and thank ❤️

First of all, thanks for using this Source Code, it was and is a ton of work to create and maintain it!
That's why I'm asking everyone to [**donate a little bit of money**](https://ko-fi.com/devtrung) (via Paypal through ko-fi) or if that's not possible, then join my [Discord Server](https://discord.gg/5q6zxM5vnT)!

# Installation Guide 🔥

## ✅ Hosting Requirements

<details>
  <summary>Click to expand</summary>

- [nodejs](https://nodejs.org) version 20 or higher, I recommend the latest STABLE version
- A VPS would be advised, so you don't need to keep your PC/Laptop/RasPi 24/7 online!
- At least 256MB of RAM & 0.5vCPU with at least 2GB storage.

</details>

## 🤖 Website Requirements

<details>
  <summary>Click to expand</summary>
 
  1. Download the [Source Code](https://github.com/vuthanhtrung2010/url-shortener)
     * Either by: `git clone https://github.com/vuthanhtrung2010/url-shortener`
     * Or by downloading it as a zip from a branch
  
</details>

## 🤖 Configuration and Starting

<details>
  <summary>Click to expand</summary>

**NOTE:** _You can do the exact same configuration inside of the `.env.example` file, just make sure to rename it to `.env` or use environment variables!_

1.  Ensure that you have installed all node modules by running `bun i`
2.  Ensure that you have renamed `.env.example` to `.env` and added environment variables
3.  Now run `bun run build` then run `bun start` or `bun start` or `pm2 start bun --name URL-Shortener -- start` if you using a VPS to run the website as production mode. You can also run the website as developer mode by `bun run dev` or `pm2 start "bun run dev" --name URL-Shortener`. Might add `bunx`/`npx` to the prefix of `pm2` if you are not using the runtime version!
4.  Now go to the `/login` route and login to your Spotify Account!
5.  Enjoy!

</details>

## ❓ Where to get which Api-Key(s)

<details>
  <summary>Click to expand</summary>

**NOTE:** _You can do the exact same configuration inside of the `.env.example` file, just make sure to rename it to `.env` or use environment variables!_

1. `./.env`

   - `DATABASE_URL` get from your self hosted PostgreSQL database.
   - `PASSWORD_HASH` your hased desired password for `/dashboard` to create/update/delete URLs, do `bun run hash` and type your password, fill in the variable to the variable named `ADMIN_PASSWORD_HASH` in `.env` file.
   - `PORT` is your port number the website listening to. Default listening port will be 3000.

2. `./src/config.tsx`
   - `name` fill your name. Make sure it is sort.
   - `profilePicture` the link to your profile picture, default profile picture is in `./public/assets/pfp.webp`. If you have different file name/extension after uploading, replace it.
   - `links` is all your links with the image, image located at `./public/assets/links`. Put your files there and replace the sub variable.
   - `baseURL` your base URL. Must be filled in to prevent error. You could use ShareX to shorten your URL too! Put it as your main route. Eg: `https://links.trunghsgs.edu.vn`, `https://links.trunghsgs.edu.vn/` **NOT** `https://yourdomain.com/sth`.

</details>

## Want to use ShareX to Shorten URLs?

<details>
  <summary>Click to expand</summary>

1. Get ShareX from https://getsharex.com/
2. Change the line have variable `RequestURL` your real URL. Eg: `https://links.trunghsgs.edu.vn/api/create`.
3. Open the file and choose yes when it asks you to use default URL Shortener is your URL Shortener.

</details>

# Contributing

> If you want to help improve the code, fix spelling or design Errors or if possible even code errors, you may create PULL REQUESTS.
> Please create pull request compare to beta branch, else you will get instant close!
> Please consider, that [**Vũ Thành Trung**](https://github.com/vuthanhtrung2010) is the main Developer of this project!
