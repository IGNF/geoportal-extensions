# Comment spécifier des modules locaux en tant que dépendances de paquets npm ?

**Cas d'utilisation :**

> Le projet *geoportal-extensions-openlayers* n'est pas publié car les developpements
sont en cours. Et ce projet est une dependance du projet *geoportal-sdk*, et on
souhaite tester nos developpements dans ce projet...

> Le projet *geoportal-access-lib* n'est pas publié car les developpements
sont en cours. Et ce projet est une dependance du projet *geoportal-extensions*, et on
souhaite tester nos developpements dans ce projet..

## Liens utiles

https://docs.npmjs.com/cli/link.html
https://docs.npmjs.com/cli/pack.html

## Procédure

Ex. on souhaite mettre le package local *geoportal-extensions-openlayers* en dependance
du projet principal *geoportal-sdk*.

### initialiser les liaisons

Les étapes suivantes permettent d'initialiser la liaison entre le package local
et le projet principal :

- construction des binaires *geoportal-extensions-openlayers*
    ```
    user@pc:> cd ~/geoportal-extensions-openlayers/
    user@pc:> npm run build:ol
    user@pc:> ll dist/openlayers/
    ```    

- construction du package *geoportal-extensions-openlayers*
    ```
    user@pc:> cd ~/geoportal-extensions-openlayers/build/scripts/release/
    user@pc:> ./build-pack.sh --openlayers
    user@pc:> ll
    geoportal-extensions-openlayers-3.0.0.tgz
    openlayers/
    ```
    **Info**
    Pour construire le package pour le projet *geoportal-access-lib* :
    ```
    user@pc:> cd ~/geoportal-access-lib/
    user@pc:> npm pack
    user@pc:> tar -xvzf geoportal-access-lib.2.1.1.tgz
    user@pc:> ll
    package/
    ```

- creation du lien sur l'espace globale de NPM (*/usr/lib/node_modules/*)
    ```
    user@pc:> cd ~/geoportal-extensions-openlayers/build/scripts/release/openlayers/
    user@pc:> sudo npm link
    user@pc:> ll
    user@pc:> openlayers/ -> /usr/lib/node_modules/geoportal-extensions-openlayers
    ```

- liaison dans le projet principal *geoportal-sdk*
    ```
    user@pc:> cd ~/geoportal-sdk/node_modules/
    user@pc:> npm link geoportal-extensions-openlayers
    user@pc:> ll
    user@pc:> geoportal-extensions-openlayers/ -> /usr/lib/node_modules/geoportal-extensions-openlayers
    ```

### Revenir à la dependance publiée

Si on souhaite revenir sur la version publiée spécifiée dans le fichier *package.json*,
on supprime le lien local, et on installe la version publiée :

    ```
    user@pc:> cd ~/geoportal-sdk/
    user@pc:> npm unlink geoportal-extensions-openlayers
    user@pc:> npm install
    ```

### Suppression des liens

Si on souhaite supprimer les liens locaux, on procède ainsi :
    ```
    user@pc:> cd ~/geoportal-sdk/
    user@pc:> npm unlink geoportal-extensions-openlayers
    user@pc:> sudo npm rm --global geoportal-extensions-openlayers
    ```
