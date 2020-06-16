FROM node:12.16.1-slim

# MAJ
RUN apt update && apt -y upgrade 

# Paquets utiles 
RUN apt install -y git inotify-tools 

# Installation de access-lib 
WORKDIR /home/docker/
RUN git clone https://github.com/IGNF/geoportal-extensions.git
WORKDIR /home/docker/geoportal-extensions
RUN git checkout develop && rm -rf node_modules package-lock.json && npm install

# Copie des scripts 
COPY ./scripts/* /home/docker/

# Volume pour partager les samples 
VOLUME ["/home/docker/html"]
CMD sleep 6000
# CMD bash /home/docker/start.sh
