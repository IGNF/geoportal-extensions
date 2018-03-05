# Migration ES6

**Warning**
> utilisation de la version de dev. non publiée : 2.0.0 de l'API des services !

## Howto

1. migration AMD -> ES6

ex. commande de migration :
> amdtoes6 -d src/Ol3 -o src-es6/OpenLayers -b

2. modifier les chemins des imports

3. corrections diverses dans le code

4. modifier le webpack de base pour générer un bundle

5. builder le projet *geoportal-access-lib* de la branche *migrate-es6* :
> npm install

> cd ./node_modules/geoportal-access-lib/

> nm run setup && npm run build && npm run build -- --env.production

6. valider avec des exemples (cf. exemples de bases)

## Openlayers...

**Warning**
> On en profite pour supprimer les réf. ol3 -> openlayers !

**TODO**
- CSS et images..
- Licences *multiples* !
-

## Leaflet

## Itowns

## Mix Openlayers/Itowns
