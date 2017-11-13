FROM node:7.8.0-alpine

WORKDIR /root
RUN mkdir geoportal-extensions
WORKDIR /root/geoportal-extensions

RUN export HTTP_PROXY=http://proxy.ign.fr:3128 && \
	apk update && \
	apk upgrade && \
	apk add openssl && \
	apk add expect && \
	apk add bash && \
	apk add perl  perl-dev perl-json && \
	apk add git

RUN export HTTPS_PROXY=http://proxy.ign.fr:3128 && \
  export HTTP_PROXY=http://proxy.ign.fr:3128 && \
  git clone https://github.com/IGNF/geoportal-extensions.git . && \
	git checkout feature-publish-release && \
	npm config set proxy http://proxy.ign.fr:3128 && \
	npm config set https-proxy http://proxy.ign.fr:3128 && \
	npm install

CMD	 ./scripts/release.sh \
			--verbose \
			--username="" --password="" --token="" \
			--leaflet --build --data --json --commit --tag --publish=false
