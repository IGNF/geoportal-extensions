# Mise à jour du fichier de statistiques des bundles

Ceci permet de visualiser le contenu de toutes les dependances et sources d'un bundle.

<!-- toc -->

## Liens utiles

https://github.com/webpack-contrib/webpack-bundle-analyzer

## Creation des statistiques

**ouvrir une console :**

    npm run build:ol:prod -- --profile --json > map-ol.json

Ouvrir le fichier de statistiques, et supprimer les sorties de consoles (en rouge).
Puis déplacer le fichier dans le répertoire : `build/map/`

## Visualisation des statistiques

**ouvrir une console :**

    sudo npm install -g webpack-bundle-analyzer
    webpack-bundle-analyzer map-ol.json

Le navigateur s'ouvre  sur l'URL suivante :
http://localhost:8888/

ou

On peut passer via l'outil Officiel d'Analyse en ligne :

Aller sur l'URL suivante :
http://webpack.github.io/analyse/

puis, utiliser le fichier *map-[ol|it|mix|ll].json*
