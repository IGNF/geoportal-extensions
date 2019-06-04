# Comment spécifier des modules locaux en tant que dépendances de paquets npm ?

**Cas d'utilisation :**

> Le projet *geoportal-extensions* n'est pas publié car les développements
sont en cours. Et ce projet est une dépendance du projet *geoportal-sdk*, et on
souhaite tester nos développements dans ce projet...

> Le projet *geoportal-access-lib* n'est pas publié car les developpements
sont en cours. Et ce projet est une dépendance du projet *geoportal-extensions*, et on
souhaite tester nos développements dans ce projet..

## Liens utiles

https://docs.npmjs.com/cli/link.html
https://docs.npmjs.com/cli/pack.html
https://webpack.js.org/configuration/module/#rule

## Méthodes possibles

Au préalable, il faut construire :

* les binaires :
    `npm run build`

    Ex. construction des binaires openlayers pour *geoportal-extensions*
        ```bash
        user@pc:> cd ~/geoportal-extensions-openlayers/
        user@pc:> npm run build:ol
        user@pc:> ll dist/openlayers/
        ```

* le package NPM local :

    Ex. avec le package *geoportal-extensions-openlayers* du projet `geoportal-extensions` :
        ```bash
        user@pc:> cd build/scripts/release/
        user@pc:> ./build-pack.sh ---openlayers
        user@pc:> ll
        geoportal-extensions-openlayers-3.0.0.tgz
        geoportal-extensions-openlayers/
        ```
    Ex. avec le package pour le projet `geoportal-access-lib` :
        ```bash
        user@pc:> cd ~/geoportal-access-lib/
        user@pc:> npm pack
        user@pc:> tar -xvzf geoportal-access-lib.2.1.1.tgz
        user@pc:> ll
        package/
        ```

### Méthode n°1 (copie du package sur github) : *FORTEMENT CONSEILLÉE*

Puis, on commit le package TGZ sur le dépôt du projet :
    `geoportal-extensions-openlayers-X.X.X.tgz`

Au niveau du projet SDK, on modifie le `package.json` pour qu'il récupère ce package :
    ```json
    devDependencies : {
        ...
        "geoportal-extensions-openlayers": "https://raw.githubusercontent.com/IGNF/geoportal-extensions/update-ol5/build/scripts/release/geoportal-extensions-openlayers-X.X.X.tgz",
        ...
    }
    ```
Lors d'une installation NPM, le package va être déployé dans `node_modules`...

**WARNING**
    Pour forcer la maj de ce package, il est conseillé de supprimer les éléments suivants :
    - `rm -rf node_modules/geoportal-extensions-openlayers/`
    - `rm package-lock.json`
    Puis, executer le commande :
    - `npm install --verbose --force`

### Méthode n°2 (copie direct du package local)

On déploie manuellement le package *geoportal-extensions-openlayers*..., en le copiant vers le répertoire `node_modules` du projet SDK :

    ```bash
    user@pc:> cp -r ~/geoportal-extensions-openlayers/build/scripts/release/geoportal-extensions-openlayers/ ~/geoportal-sdk/node_modules/
    user@pc:> cd ~/geoportal-sdk/node_modules/geoportal-extensions-openlayers/
    user@pc:> npm install (--production)
    ```

### Méthode n°3 ("npm link")

**WARNING : depreciate**

### Méthode n°4 (package.json & file:)

**WARNING : depreciate**

Pour information,
on utilise le tag *file* dans le fichier *package.json* :
    ```json
    {
      "name": geoportal-sdk"",
      "dependencies": {
        "geoportal-extensions-openlayers": "file:~/geoportal-extensions-openlayers/build/scripts/release/openlayers/",
        "geoportal-access-lib": "file:~/geoportal-access-lib/package"
      }
    }
    ```
