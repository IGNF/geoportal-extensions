# Workflow git pour les APIs web

Description du workflow de travail git pour les APIs. ([Workflow pour le composant portail-visu](https://gitlab.ul.geoportail.rie.gouv.fr/ign/pgie/portail-visucarto/wikis/Workflow-:-tests-et-livraisons-de-portail-visucarto))

Ce workflow se base sur git-flow, un "template" de workflow, qui peut notamment fonctionner avec des plugins git à installer.

Dans un premier temps, nous essayerons de nous passer de ces plugins qui impliqueraient que tout le monde les installe, et de nouvelles signatures de commandes git.

Doc/Info sur git-flow :
- https://nvie.com/posts/a-successful-git-branching-model/
- https://danielkummer.github.io/git-flow-cheatsheet/index.fr_FR.html
- https://blog.nathanaelcherrier.com/fr/gitflow-la-methodologie-et-la-pratique/
- https://github.com/nvie/gitflow


# Presentation générale du workflow

La **branche develop** est la pierre angulaire de ce workflow :
- On tirera des **branches features** depuis develop pour developper les features.
- On tirera aussi des **branches releases** depuis develop.

La **branche master** quant à elle est destinée uniquement aux releases : elle est donc stable, et la dernière version de master correspond à la dernière version publiée de l'API.

Des **branches "hotfix"** seront quant à elle tirées depuis master en cas de bug important constaté sur une release.

Nous nous retrouvons donc avec 5 types de branches distinctes.

# Convention de nommage

## Les branches

**Les branches features :**
*feature-myfeature*

**Les branches hotfix :**
*hotfix-myhotfix*

**Les branches release :**
*release-x.y.z*



## Les commits

Voir : https://buzut.net/git-bien-nommer-ses-commits/


Joints à cette page du wiki (retirer le .txt si possible), les templates de commits pour chaque projet :
- .git-commit-template-accesslib
- .git-commit-template-extensions
- .git-commit-template-sdk

Pour les installer, les déposer sur sa machine (exemple : à la racine)


1 - Se placer à la racine du projet voulu (accesslib, extensions, sdk)


2 - Configurer le git projet pour utiliser le template voulu lors des commits
~~~
git config commit.template ~/.git-commit-template-accesslib
~~~
ou
~~~
git config commit.template ~/.git-commit-template-extensions
~~~
ou
~~~
git config commit.template ~/.git-commit-template-sdk
~~~

**Explication du template des commits :**

~~~ text

<TYPE><(SCOPE (facultatif))> : <SUJET>

<DESCRIPTION (facultatif)>

<FOOTER (facultatif)>
~~~




**Les TYPES** :

Ils sont détaillés dans le lien (build, fix, feat, refactor...)


**Le SCOPE :**

*Facultatif* - Il va dépendre du projet, et est facultatif, car n'est pas forcément pertinent :

*Projet access-lib :*
- Exeptions
- Formats
- Protocols
- Services
- Utils
- Samples
- ...

*Projet extensions :*
- common:CSS
- common:DOM
- common:Utils
- ol:Controls
- ol:CRS
- ol:CSS
- ol:Formats
- ol:Layers
- ol:Sources
- ol:Samples
- ll:Controls
- ll:CRS
- ll:CSS
- ll:Layers
- ll:Samples
- it:Controls
- it:CRS
- it:CSS
- it:Layer
- it:Samples
- ...

*Projet SDK :*
- 2D:Interface
- 2D:Base
- 2D:Controls
- 2D:Layers
- 2D:Listeners
- 2D:VectorTiles
- 2D:View
- 2D:Utils
- 2D:CSS
- 2D:Samples
- 3D:Interface
- 3D:Base
- 3D:Controls
- 3D:Layers
- 3D:Listeners
- 3D:VectorTiles
- 3D:View
- 3D:Utils
- 3D:CSS
- 3D:Samples
- ...

**Le SUJET :**

Se limiter à 50 caractères pour donner une idée claire de l'objectif du commit, avec une forme active. Compléter si besoin dans la description.

**La DESCRIPTION :**

*Facultatif* - Sauter une ligne entre le sujet et la description. Dans la description on détaillera eventuellement plus en détails les actions réalisées par le commit. On pourra notamment passer par une liste.

**Le FOOTER :**

*Facultatif* - Sauter une ligne entre le footer et le bloc précédent. Permet de linker un ticket par exemple, pour un commit correctif.


**EXEMPLES**

Un commit qui corrige le ticket 32223 sur l'ajout d'un paramètre facultatif lors de l'ajout d'une couche dans le SDK2D :

~~~ text
fix(2D:Layers): Ajoute le paramètre xxx lors de l'ajout d'une couche WMTS

#32223
~~~

Un commit qui ajoute des systèmes de coordonnées au mousePosition openlayers :

~~~ text
feat(ol:Controls) : Ajoute des systèmes de coordonnées au mousePosition

Les systèmes ajoutés :
- EPSG:XXXX
- EPSG:XXXX
- EPSG:XXXX

~~~

# Commandes du workflow

cf. https://blog.nathanaelcherrier.com/fr/gitflow-la-methodologie-et-la-pratique/


![Worflow scheme](https://nvie.com/img/git-model@2x.png)

## Developpement d'une fonctionnalité

1 - Créer une branche de type **"feature"** à partir de **develop**

~~~
git checkout develop
git checkout -b feature-MYFEATURE
~~~

2 - Je travaille sur ma branche

3 - Je rapatrie develop sur ma branche feature

4 - J'ai fini : J'ouvre une PR depuis develop sur ma branche feature-MYFEATURE

5 - Je fais les eventuelles corrections soulevées par la review de PR sur ma branche

6 - Je tiens à jour le DRAFT_CHANGELOG.md

7 - Tout est OK : je valide la PR et rapatrie donc ma branche feature sur develop

## Bug Fix et Refacto

Les bugs fixs se font directement sur develop s'ils ne sont pas liés au développement d'une feature (sinon sur la branche feature liée).

Les "gros" bug fixes ou refacto sont à considérer comme des features: c'est à dire à réaliser sur des branches tirées depuis develop.

## Release

1 - Tirer une branche de type **"release"** à partir de **develop**

~~~
git checkout develop
git checkout -b release-X.Y.Z
git push origin release-X.Y.Z
~~~

2 - Sur cette branche, modifier le package.json pour incrémenter numéro de version et la date

3 - Réaliser sur cette branche release les tests habituels liés à la publication d'une release (npm run test, npm run sample:serve)

4 - Si on trouve des bugs, on les corrige directement sur cette branche release (plusieurs membres de l'équipe peuvent réaliser les verifications/corrections en parrallèle sur la branche release)

~~~
git commit --> "fix(scope) : corrige le probleme"
~~~

5 - On rapatrie ce fix sur develop

~~~
git checkout develop
git merge release-X.Y.Z
~~~

6 - On recommence autant de fois que necessaire les etapes 4 et 5

7 - Quand on estime que tout est ok, on prépare la future publication npm en construisant les binaires :
* vérifier date et version dans les package.json
* vérifier que le DRAFT_CHANGELOG est à jour
* pousser la branch

8 - Quand on estime que la release est OK, on merge la branche sans fast-forward sur **develop**

~~~
git checkout develop
git merge release-X.Y.Z --no-ff
~~~

9 - Quand on estime que la release est OK, on merge la branche sans fast-forward sur **master** et on tag la version sur master

~~~
git checkout master
git merge release-X.Y.Z --no-ff
~~~

**Renommer le commit "release sdk-X.Y.Z" ou "release ext-ol-X.Y.Z"**

10 - On supprime la branche release ainsi mergée

~~~
git branch -d release-X.Y.Z
~~~

11 - Sur master, on tag  la version. Pousser le tag va déclencher automatiquement les étapes de **publication de la jsdoc et de la release npm/github** via les githubs actions

~~~
git tag ol-X.Y.Z
git push origin ol-X.Y.Z
~~~

12 - Vérification de la publication :
* suivre en direct via les githubs actions
* vérifier page de publication de la release github
* vérifier page de publication de la release npm
* vérifier que la jsdoc (gh-pages) est à jour
* vérifier que le projet exemples a été mis à jour avec la nouvelle release (par ex. https://github.com/IGNF/geoportal-access-lib-samples)
* vérifier que le DRAFT_CHANGELOG a été vidé et que le CHANGELOG a été mis à jour


## Realisation d'un hotfix

Dans quel cas : Je remarque un problème à corriger de toute urgence sur la dernière release publiée en production

1 - Tirer une branche de type **"hotfix"** depuis **master**
~~~

git checkout -b hotfix-MYHOTFIX master
git push origin hotfix-MYHOTFIX
~~~

2 - Sur cette branche hotfix-MYHOTFIX, j'incrémente la version de la release package.json

3 - Je corrige le problème

~~~
git commit --> "hotfix(ol:Controls): reactive la liste deroulante des coordonnées"
~~~

4 - Quand le HOTFIX est validé, je rapatrie ce fix sur develop

~~~
git checkout dev
git merge hotfix-MYHOTFIX --no-ff
~~~

5 - Je le rapatrie aussi sur master : nouvelle release corrective

~~~
git checkout master
git merge hotfix-MYHOTFIX --no-ff
git tag X.Y.Z
git push origin X.Y.Z
~~~

6 - Vérification de la publication lancée par le tag sur master :
* suivre en direct via les githubs actions
* vérifier page de publication de la release github
* vérifier page de publication de la release npm
* vérifier que la jsdoc (gh-pages) est à jour
* vérifier que le projet exemples a été mis à jour avec la nouvelle release (par ex. https://github.com/IGNF/geoportal-access-lib-samples)
* vérifier que le DRAFT_CHANGELOG a été vidé et que le CHANGELOG a été mis à jour

7 - On supprime la branche hotfix mergée

~~~
git branch -d hotfix-MYHOTFIX
~~~
