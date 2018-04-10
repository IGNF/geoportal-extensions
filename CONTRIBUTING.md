# Contribuer

Si vous souhaitez contribuer au code des extensions Géoportail, voici quelques conseils pratiques et règles à suivre.


## Ouverture d'un ticket (issue)

Vous pouvez ouvrir un ticket dans les situations suivantes :

* Signaler une erreur que vous ne pouvez pas résoudre vous-même
* Discuter d'un sujet ou d'une idée relatives au projet
* Proposer une nouvelle fonctionnalité ou une évolution de fonctionnalité

Votre ticket est ensuite pris en compte par les membres de l'équipe ou de la communauté. Et une action peut vous être demandée telle qu'**ouvrir une Pull Request** afin de contribuer...


## Ouvrir une pull request (PR)

Une pull request vous permet de soumettre une proposition d'évolution du code source à l'équipe en charge du projet. Voici comment soumettre une **pull request** !


### On «fork» le projet

- Créez un `fork` du projet sur le Github.
- Cloner le en local. Ce `dépôt distant` sur le Github s'appelle `origin`.
- Ajoutez le dépôt d'origine en tant que `dépôt distant` avec le mot cléf : `upstream` (cf. https://help.github.com/articles/configuring-a-remote-for-a-fork/).
- Si vous avez créé votre `fork` il y a quelque temps, assurez-vous de récupérer les modifications dans votre dépôt local (cf. https://help.github.com/articles/syncing-a-fork/).
- Récupérez les modification le plus souvent possible de "upstream" afin d'être le plus à jour possible, de sorte que lorsque vous soumettez votre demande (PR), les conflits de fusion seront plus faciles à résoudre !


### On code...

- Créez une `nouvelle branche` pour travailler. Nommez la par exemple avec le nom de la fonctionnalité à implementer (ex. feature-tests-myfunction) ou celui de l'issue qu'elle vise à résoudre (ex. feature-issue-xx)

- Dans le répertoire local du projet, installez les dépendances du projet :

``` bash
npm install
```

cf. [COMPILE.md](COMPILE.md) pour plus d'infos.


- Ecrivez testez, corrigez votre `code` sur votre copie locale de votre fork.

Les commandes :

``` bash
npm run build:[ol|leaflet|itowns][:prod]
```

Vous permettent de générer les binaires de l'extension cible et de les placer dans le répertoire *dist/*. Des pages html de test d'utilisation sont dans le répertoire *samples-src/*. Elles utilisent les binaires présents dans le répertoire *dist/*.

La commande :

``` bash
npm run test[:serve]
```

Lance un navigateur avec les pages d'exemples servies sur l'adresse http://localhost:9001/


- Suivez les règles de codage du projet. Elles sont définies dans le fichier : .eslintrc (style et convention de codage + syntaxe javascript). Vous pouvez vérifier le bon respect de ces règles en lançant la tache :

``` bash
npm run build:[ol|leaflet|itowns]
```

- Vérifiez, ajoutez ou adaptez les tests si nécessaire.

    * Les tests unitaires sont dans le répertoire *test/*
    * Les pages d'exemples sont dans le répertoire *samples-src/*

- Ajoutez ou modifiez la `documentation` si nécessaire. Si votre PR apporte une modification d'interface à la bibliothèque, mettez à jour la jsDoc en conséquences et vérifiez quelle est bien prise en compte.

La commande

``` bash
npm run doc:serve
```

Vous permet de générer la jsDoc du projet dans le répertoire *jsdoc/*.
Un navigateur se lance avec la jsoc servie sur l'adresse http://localhost:9001/

- Rajoutez vous dans le fichier [CONTRIBUTORS.md](CONTRIBUTORS.md]) si vous n'y êtes pas déjà.

- `Squash` vos commit en un seul avec le `rebase interactif` (cf. https://help.github.com/articles/interactive-rebase) ou via d'autre méthodes (cf. https://gist.github.com/patik/b8a9dc5cd356f9f6f980 par exemple)

- Poussez cette branche sur votre dépôt, sur le dépôt marqué `origin`.


### On soumet une PR...

- De votre `fork`, ouvrez une demande de `pull request` sur cette branche (cf. https://help.github.com/articles/creating-a-pull-request/). Et ciblez sur la branche `master` du dépôt d'origine...
- Référencez tous les problèmes ainsi que la documentation sur votre PR.
- Utilisez dans vos `commit` des fonctionnalités de GitHub (ex. "Fix #37.").
- Si le responsable demande des modifications supplémentaires, il suffit de les pousser vers votre branche locale, la `pull request` se met à jour automatiquement.
- Une fois que la `pull request` est approuvée, les responsables du projet effectueront le merge (cf. https://help.github.com/articles/merging-a-pull-request/).


## Liens utiles

https://help.github.com/categories/collaborating-with-issues-and-pull-requests/

avec les liens les plus utiles :

  https://help.github.com/articles/configuring-a-remote-for-a-fork/
  https://help.github.com/articles/syncing-a-fork/
  https://help.github.com/articles/about-pull-requests/
  https://help.github.com/articles/creating-a-pull-request/
  https://help.github.com/articles/checking-out-pull-requests-locally/
  https://help.github.com/articles/merging-a-pull-request/
  https://help.github.com/articles/about-pull-request-merges/
  https://help.github.com/articles/interactive-rebase

Un exemple de contribution sur un projet (en français) :
https://git-scm.com/book/fr/v2/GitHub-Contribution-%C3%A0-un-projet
