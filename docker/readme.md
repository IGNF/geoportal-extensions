# Utilisation de docker pour extensions

Il est possible d'utiliser docker lors des développements et des tests de l'API. 

# Prérequis

Il est nécessaire d'avoir installé `docker` et `docker-compose` pour utiliser les images. 
Les tests ont été effectués avec `docker 18.09.0` et `docker-compose 1.25.4`. 

# Buid de l'image extensions

On prendra le temps de renseigner les variables du fichier `./docker/.env` en se basant sur l'exemple `./docker/.env.example`: 
- la variable `EXTENSIONS` permettra d'indiquer l'emplacement du projet `geoportal-extensions`.
- la variable `ACCESSLIB` permettra d'indiquer l'emplacement du projet `geoportal-access-lib`.

Il suffit de lancer la commande dans le répertoire `./docker`: 
`docker-compose build`

## Problèmes possibles 

Lors du lancement du build, il peut y avoir des erreurs dont voici celles déjà rencontrées:

- ```ERROR: Version in "./docker-compose.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version. Either specify a supported version (e.g "2.2" or "3.3") and place your service definitions under the `services` key, or omit the `version` key and place your service definitions at the root of the file to use version 1.```
Cette erreur est généralement lié à un problème de versions entre le `docker` de la machine utilisée et celui indiqué dans les prérequis. On pourra se référer à la page suivante pour voir la matrice des compatibilités: https://docs.docker.com/compose/compose-file/compose-versioning/. 

- ```WARNING: The ACCESSLIB variable is not set. Defaulting to a blank string.```
Cette erreur indique que le fichier `/docker/.env` est mal rempli. Dans ce cas, c'est la variable `ACCESSLIB` qui est absente. On pourra voir la même erreur avec différentes variables du fichier. 

- ```ERROR: Cannot locate specified Dockerfile: ./docker/Dockerfile```
Cette erreur indique que le fichier `/docker/.env` est mal rempli. Dans ce cas, le chemin indiquant le `geoportal-access-lib` est incorrect et donc le `Dockerfile` n'est pas trouvé pour le build. 

- ```ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?
``` 
Cette erreur peut avoir plusieurs origines. Il peut être intéressant de regarder les étapes proposées sur cette page: https://docs.docker.com/engine/install/linux-postinstall/. 


# Lancer un container 

Une fois les images construites, on pourra utiliser les containers de plusieurs manières, principalement pour tester l'API et effectuer des développements.  

## Usage 1: Tester

Pour voir le résultats des tests unitaires et des tests de bout en bout, ainsi que pour utiliser les exemples ou encore voir la documentation, il suffira de lancer le container puis de se rendre sur les urls suivantes:
- http://localhost:8081/geoportal-extensions/test/
- http://localhost:8081/geoportal-extensions/rendering/
- http://localhost:8081/geoportal-extensions/samples/
- http://localhost:8081/geoportal-extensions/jsdoc/

### Avec docker-compose 

Il suffira de lancer la commande `docker-compose up` (ou `docker-compose up -d` pour récupérer la main dans le terminal).

## Usage 2: Effectuer des développements 

L'idée est de développer du code sur la machine mais qui est exécuté dans docker. 

Ainsi, lorsqu'une modification est effectuée dans `./src`,`./test`, `./test_rendering` ou `./sample-src`, il y a plusieurs conséquences, si elles sont nécessaires : 
- les tests sont mis à jour, 
- la documentation est mise à jour, 
- le package `.tgz` est de nouveau généré dans le dossier `./build/scripts/release/`. 

### Avec docker-compose 

On prendra le temps de renseigner les variables du fichier `./docker/.env` en se basant sur l'exemple `./docker/.env.example`: 
- la variable `EXTENSIONS` permettra d'indiquer l'emplacement du projet `geoportal-extensions`.

Puis, il suffira de lancer la commande `docker-compose up` ou `docker-compose up -d` pour récupérer la main dans le terminal.

## Problèmes possibles

- Lors du lancement d'un container, on pourra avoir l'erreur suivante:
`Error starting userland proxy: listen tcp 0.0.0.0:8081: bind: address already in use.`
Cela signifie que le port est déjà utilisé par une autre application. 

- Lors d'un changement du `package.json`, il sera nécessaire de commiter le changement et relancer un build de l'image sans cache: `docker-compose build --no-cache`. 

- De manière plus générale, si un problème du type 'absence de changement' est observé, il sera intéressant de tenter un rebuild de l'image sans cache en ayant d'abord supprimé le volume docker associé: `docker volume rm extensions-data-ext-volume extensions-data-acc-volume`.

# Arrêter un container 

## Avec docker-compose 

La commande `docker-compose down` si le container était détaché. Et sinon `ctrl+c` dans le terminal actif puis `docker-compose down`. 