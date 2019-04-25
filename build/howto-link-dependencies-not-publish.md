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
        ```
        user@pc:> cd ~/geoportal-extensions-openlayers/
        user@pc:> npm run build:ol
        user@pc:> ll dist/openlayers/
        ```

* le package NPM local :

    Ex. avec le package *geoportal-extensions-openlayers* du projet `geoportal-extensions` :
        ```
        user@pc:> cd build/scripts/release/
        user@pc:> ./build-pack.sh ---openlayers
        user@pc:> ll
        geoportal-extensions-openlayers-3.0.0.tgz
        geoportal-extensions-openlayers/
        ```
    Ex. avec le package pour le projet *geoportal-access-lib* :
        ```
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
    ```
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

On déploie manuellement le package *geoportal-extensions-openlayers*..., en le copiant
vers le répertoire `node_modules` du projet SDK :

    ```
    user@pc:> cp -r ~/geoportal-extensions-openlayers/build/scripts/release/geoportal-extensions-openlayers/ ~/geoportal-sdk/node_modules/
    user@pc:> cd ~/geoportal-sdk/node_modules/geoportal-extensions-openlayers/
    user@pc:> npm install (--production)
    ```

### Méthode n°3 ("npm link")

**WARNING : depreciate**

Ex. on souhaite mettre le package local *geoportal-extensions-openlayers* en dependance
du projet principal *geoportal-sdk* en utilisant **npm link**.

**WARNING :**
> https://webpack.js.org/configuration/module/#rule

> Ceci cause des problemes avec les loaders webpack :
```
The resource is the resolved path of the file, which means
symlinked resources are the real path not the symlink location.
This is good to remember when using tools that symlink packages
(like npm link), common conditions like /node_modules/ may
inadvertently miss symlinked file
```

#### initialiser les liaisons

Les étapes suivantes permettent d'initialiser la liaison entre le package local et le projet principal :  

- construction du package *geoportal-extensions-openlayers*
    ```
    user@pc:> cd ~/geoportal-extensions-openlayers/build/scripts/release/
    user@pc:> ./build-pack.sh --openlayers
    user@pc:> ll
    geoportal-extensions-openlayers-3.0.0.tgz
    geoportal-extensions-openlayers/
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

- création du lien sur l'espace globale de NPM (*/usr/lib/node_modules/*)
    ```
    user@pc:> cd ~/geoportal-extensions-openlayers/build/scripts/release/geoportal-extensions-openlayers/
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

#### Revenir à la dépendance publiée

Si on souhaite revenir sur la version publiée spécifiée dans le fichier *package.json*,
on supprime le lien local, et on installe la version publiée :

    ```
    user@pc:> cd ~/geoportal-sdk/
    user@pc:> npm unlink geoportal-extensions-openlayers
    user@pc:> npm install
    ```

#### Suppression des liens

Si on souhaite supprimer les liens locaux, on procède ainsi :
    ```
    user@pc:> cd ~/geoportal-sdk/
    user@pc:> npm unlink geoportal-extensions-openlayers
    user@pc:> sudo npm rm --global geoportal-extensions-openlayers
    ```

### Méthode n°3 (package.json & file:)

**WARNING : depreciate**

**WARNING :**
> même souci que la méthode n°1 !
Car ceci construit aussi des liens symboliques...

Utilisation du tag *file* dans le fichier *package.json* :
    ```
    {
      "name": geoportal-sdk"",
      "dependencies": {
        "geoportal-extensions-openlayers": "file:~/geoportal-extensions-openlayers/build/scripts/release/openlayers/",
        "geoportal-access-lib": "file:~/geoportal-access-lib/package"
      }
    }    
    ```
