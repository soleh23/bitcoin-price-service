# bitcoin-price-service

# Running locally

To run the service locally you need to have `yarn` installed on your machnine. You also need to create a `.env` file with `PORT`, `UPDATE_INTERVAL_SECONDS` and `SERVICE_COMMISSION_PERCENT` set. Then, run the following commands:

- `yarn install`
- `yarn start`

There will be a single endpoint exposed at `GET localhost:<PORT>/mid-price` which fetches the mid price of bitcoin.

# Running with docker

To run the service inside a docker container you should have docker installed locally. Then you need to build the image by running (from root directory of the app):

- `docker build -t bitcoin-price-service .`

And then you can run the container with the command(update the environment variables accordingly):

- `docker run -d -p 3000:3000 -e PORT=3000 -e UPDATE_INTERVAL_SECONDS=3 -e SERVICE_COMMISSION_PERCENT=0.01 bitcoin-price-service`

# Testing

To run the tests run:

- `yarn test`
