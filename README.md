<p align="center">
  <img width="600" src="upimg.svg">
</p>

<p align="center">🧀 Upload image to public CDN in terminal</p>

<p align="center">
<a href="https://i-meto.com"><img alt="Author" src="https://img.shields.io/badge/Author-METO-blue.svg?style=for-the-badge"/></a>
<a href="https://www.npmjs.com/package/@upimg/cli"><img alt="Version" src="https://img.shields.io/npm/v/@upimg/cli.svg?style=for-the-badge"/></a>
<img alt="License" src="https://img.shields.io/npm/l/@upimg/cli.svg?style=for-the-badge"/>
</p>

***


### Installation

```bash
yarn global add @upimg/cli
# npm install @upimg/cli -g
```

### Usage

Upload a single image

```bash
$ upimg dog.png
$ upimg -s jd dog.png
```

Upload multiple images ([globbing](https://www.npmjs.com/package/glob) supported)

```bash
$ upimg "*.jpeg" dog.png
$ upimg ~/*.(jpg|png|gif)
```

Setting default CDN server

```bash
$ upimg --config
```

### Interface

```bash
λ upimg --help
Usage: upimg [options]

Options:
  -V, --version          output the version number
  -c, --config           Setting default CDN server & cookie
  -s, --server [server]  Upload throuth a given CDN server
  -r, --raw              Raw output
  -h, --help             output usage information

Examples:
  upimg example.png
  upimg --server jd example.png
  upimg example.png --raw | clipcopy

```

### Related

 - [metowolf/upimg](https://github.com/metowolf/UpImg) - Upload image to public CDN
 - [sindresorhus/ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner
 - [join freebuf](https://job.freebuf.com/) - We want you!
