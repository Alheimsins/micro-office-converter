[![Build Status](https://travis-ci.com/Alheimsins/micro-office-converter.svg?branch=main)](https://travis-ci.com/Alheimsins/micro-office-converter)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-office-converter

Microservice for converting office documents using LibreOffice

```bash
$ curl --form file=@myfile.docx http://localhost/convert/pdf > myfile.pdf
```

If you convert files that generates multiple files, like docx with images til html, it will return a zip with all files. 

```bash
$ curl --form file=@myfile-with-image.docx http://localhost/convert/html > myfile.zip
```

## Docker

Use the prebuild image 

```
$ docker run -d -p 80:3000 --name micro-office-converter alheimsins/micro-office-converter
```

Build it yourself

```
$ docker build -t micro-office-converter .
```

Run image

```
$ docker run -d -p 80:3000 --name micro-office-converter micro-office-converter
```


## License

[MIT](LICENSE)

## About

Created with ❤ for [Alheimsins](https://alheimsins.net)

<img src="https://image.ibb.co/dPH08G/logo_black.png" alt="Alheimsins logo" height="150px" width="150px" />