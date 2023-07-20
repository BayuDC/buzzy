# Buzzy

![Banner](https://media.discordapp.net/attachments/946013429200723989/1131613785426231417/banner_3.png)

![Version](https://img.shields.io/github/package-json/v/BayuDC/buzzy?style=for-the-badge)
![Web Status](https://img.shields.io/website.svg?url=https://buzzy.bayudc.fun&style=for-the-badge)

Buzzy is a web application that allows you to easily download high quality Soundcloud tracks.

Try it now: https://buzzy.bayudc.fun

## 🖥️ Tech Stacks

-   Express
-   Sass
-   EJS

## Screenshots

![Screenshot1](https://media.discordapp.net/attachments/946013429200723989/959761737748455514/unknown.png)

## 🔧 Development

Just like regular express projects.

```
$ pnpm i --shamefully-hoist
$ pnpm run
```

### 🐋 With Docker

```
$ docker build -t bayudc/buzzy .
$ docker run -p 8080:80 -d bayudc/buzzy
```
