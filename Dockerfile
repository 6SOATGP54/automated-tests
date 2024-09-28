FROM cypress/included
LABEL maintainer="https://github.com/6SOATGP54"

WORKDIR /root

# updates source list
RUN apt-get update

# install required tools

# Project's setup
COPY . /root
RUN npm install & cypress install

CMD ["npx", "cypress", "run","&"]