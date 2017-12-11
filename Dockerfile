FROM node:7.8.0-alpine

WORKDIR /root
RUN mkdir geoportal-extensions
WORKDIR /root/geoportal-extensions

ENV PROXY=http://proxy.ign.fr:3128 \
    USERNAME=..................... \
    PASSWORD=..................... \
    TOKEN=........................

RUN export HTTPS_PROXY=$PROXY && \
  export HTTP_PROXY=$PROXY && \
	apk update && \
	apk upgrade && \
	apk add openssl && \
	apk add expect && \
	apk add bash && \
	apk add perl perl-dev perl-json && \
	apk add git

ADD CHANGELOG_DRAFT.md CHANGELOG_DRAFT.md
ADD package.json package.json

RUN export HTTPS_PROXY=$PROXY && \
  export HTTP_PROXY=$PROXY && \
  git clone https://github.com/IGNF/geoportal-extensions.git . && \
	git checkout feature-publish-release

RUN export HTTPS_PROXY=$PROXY && \
  export HTTP_PROXY=$PROXY && \
	npm config set proxy $PROXY && \
	npm config set https-proxy $PROXY && \
	npm install

CMD	 export HTTPS_PROXY=$PROXY && \
  export HTTP_PROXY=$PROXY && \
	./scripts/release.sh \
			--verbose \
			--username=$USERNAME --password=$PASSWORD --token=$TOKEN \
			--leaflet --build --data --json --commit --tag --publish
