# Comment developper avec un serveur de developpement local ?

On utilise le serveur de developpement de `webpack` : `webpack-dev-server`

**ouvrir une console :**

    npm run sample (par defaut, ol)
    ou npm run sample:ol:serve
    ou npm run sample:leaflet:serve
    ou npm run sample:itowns:serve

Le navigateur s'ouvre sur la page des exemples sur l'URL suivante :
https://localhost:9001/

La modification des sources (`src`) ou des exemples (`samples-src`) declenche la
compilation et le deploiement des exemples, la jsdoc et le bundle.

Les sources sont compilées en mode `development`, donc en ouvrant la console de
developpement de Chrome, il est possible d'obtenir les informations webpack des
sources (`sourcemap`).

**NOTE**
> Idem pour la documentation, excepté le rafraichissement de la page à faire manuellement...
