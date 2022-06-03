# Buzzy

This web can download music from soundcloud.
Demo: https://buzzyapp.herokuapp.com

![Screenshot](https://media.discordapp.net/attachments/946013429200723989/959761737748455514/unknown.png?width=1193&height=671)

![Version](https://img.shields.io/github/package-json/v/BayuDC/buzzy?style=for-the-badge)
![Web Status](https://img.shields.io/website.svg?url=https://buzzyapp.herokuapp.com/&style=for-the-badge)

## 🔧 Development

### 💪 Manual

```
# Clone the project
$ git clone https://github.com/BayuDC/buzzy.git

# Install Dependecies
$ npm install

# Install Lame (Important)
# https://lame.sourceforge.io/download.php
$ apt install lame

# Run
$ npm install
```

### 🐋 With Docker

```
# Clone the project
$ git clone https://github.com/BayuDC/buzzy.git

# Build the image
$ docker build -t bayudc/buzzy:1.0 .

# Run
$ docker run -p 8080:80 -d bayudc/buzzy:1.0
```

## 📝 Todo
- Implement seo
