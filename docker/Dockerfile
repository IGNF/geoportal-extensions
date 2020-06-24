FROM node:12.16.1-slim

# MAJ
RUN apt update && apt -y upgrade 

# Paquets utiles 
RUN apt install -y git inotify-tools 

# Installation de access-lib 
WORKDIR /home/docker/
RUN git clone https://github.com/IGNF/geoportal-extensions.git
WORKDIR /home/docker/geoportal-extensions
# TO DELETE
RUN git checkout docker

# Modification du package.json pour la suite 
# RUN sed -i -e ///g package.json

# Copie des scripts 
COPY ./docker/scripts/* /home/docker/

# Volume pour partager les samples 
VOLUME ["/home/docker/html"]

CMD bash /home/docker/start.sh
