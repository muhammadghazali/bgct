# Border Guru Coding Test

## Setup

### Install Node

Make sure your environment has Node.js installed https://nodejs.org/en/download/.

### Install dependencies

```
npm install
```

### Setup DB

```
docker run --name borderguru-mongodb --publish 27017:27017 -d mongo
```

## Run

In development mode run the app using this command:

```
npm run script
```

## Test

```
npm run test:unit
```
