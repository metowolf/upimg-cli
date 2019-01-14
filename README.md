<p align="center">
<a href="https://github.com/metowolf/upimg-cli">
<img src="https://user-images.githubusercontent.com/2666735/51110140-6eed7d00-1832-11e9-9162-3511162054a4.png" />
</a>
</p>

<h1 align="center">upimg</h1>

<p align="center">🧀 Upload image to public CDN in terminal</p>

<p align="center">
<a href="https://i-meto.com"><img alt="Author" src="https://img.shields.io/badge/Author-METO-blue.svg?style=for-the-badge"/></a>
<a href="https://www.npmjs.com/package/@upimg/cli"><img alt="Version" src="https://img.shields.io/npm/v/@upimg/cli.svg?style=for-the-badge"/></a>
<img alt="License" src="https://img.shields.io/npm/l/@upimg/cli.svg?style=for-the-badge"/>
</p>

***


## Usage

### Installation

```bash
npm install @upimg/cli -g
```
or
```bash
yarn global add @upimg/cli
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
