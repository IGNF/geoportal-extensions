# Création d'une config yaml d'action de publication du projet

## Liens utiles

https://docs.github.com/en/actions/language-and-framework-guides/using-nodejs-with-github-actions
https://docs.github.com/en/actions/language-and-framework-guides/publishing-nodejs-packages
https://docs.github.com/en/actions/language-and-framework-guides/publishing-nodejs-packages#publishing-packages-to-npm-and-github-packages
https://github.com/actions/starter-workflows/tree/master/.github/workflows
https://github.com/marketplace/actions/create-a-release
https://github.com/actions/upload-release-asset
https://github.com/actions/checkout
https://jasonet.co/posts/new-features-of-github-actions/#passing-data-to-future-steps

Plein d'idées d'actions :
https://github.com/sdras/awesome-actions

## Étapes du fichier de config

* création du template :
`.github/workflows/release.yaml`

* exécution : *push on branch master with tag*
https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#on

```
name: Create release on project Geoportal Access Library

on:
  push:
    tags:
      - '*'

```

* liste des jobs :
https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idsteps

```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      ...

  publish_jsdoc:
    needs: build
    runs-on: ubuntu-latest
    steps:
      ...

  publish_dist:
    needs: build
    runs-on: ubuntu-latest
    steps:
      ...

  create_release:
    needs: build
    runs-on: ubuntu-latest
    steps:
      ...

  publish_npm:
    needs: create_release
    runs-on: ubuntu-latest
    steps:
      ...

```
**INFO** : passage de data entre jobs !
> https://docs.github.com/en/actions/configuring-and-managing-workflows/persisting-workflow-data-using-artifacts

* liste des actions de build :

```
    - name: Checkout
      uses: actions/checkout@v2

    - name: Use nodejs
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run build

    - name: Build production
      run: npm run build:prod

    - name: Build development
      run: npm run build:dev

    - name: Build package
      run: npm package      

```

* création d'une release :
https://github.com/marketplace/actions/create-a-release
https://developer.github.com/v3/repos/releases/#create-a-release

```
    - name: Create Release
      id: create_release
      uses: actions/create-release@v1.1.2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Release ${{ github.ref }}
        body: |
          Changes in this Release
          - First Change
          - Second Change
        draft: false
        prerelease: false

```
**INFO** :
> Utilisation de la version actions/create-release@v1.1.2 pour le tag body_path pour taper sur le DRAFT_CHANGLOG.md


* ajout des assets :
https://github.com/actions/upload-release-asset
https://developer.github.com/v3/repos/releases/#upload-a-release-asset

```
      - name: Upload Release Asset
        id: upload-release-asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./my-artifact.zip
          asset_name: my-artifact.zip
          asset_content_type: application/zip
```

**INFO**:
> creation des assets via une step pour zipper les bundles :
cf. https://docs.github.com/en/actions/configuring-and-managing-workflows/persisting-workflow-data-using-artifacts


* publication de la documentation (jsdoc) :
https://github.com/actions/checkout#Checkout-a-different-branch

```
   - name: Checkout
     uses: actions/checkout@v2
     with:
       repository: my-org/my-tools
       ref: my-tools

    - name: Build doc
      run: |
          date > generated.txt
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add .
          git commit -m "generated"
          git push
```

Structure de la gh-pages :

```
current > jsdoc
current > dist
v2.1.1 > jsdoc
v2.1.1 > dist
v2.1 -> v2.1.1
latest -> v2.1.1
```

* liste des publications :
https://docs.github.com/en/actions/language-and-framework-guides/publishing-nodejs-packages

https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token

**INFO** :
> La gestion des secrets pour NPM :
cf. https://sergiodxa.com/articles/github-actions-npm-publish/

```
	# GET https://npm.pkg.github.com/IGNF/geoportal-access-lib
	# GET https://npm.pkg.github.com/IGNF/@ignf-geoportal/sdk-2d (scope)

	- name: Use registry github
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'
        registry-url: 'https://npm.pkg.github.com'
        scope: '@IGNF'

    - name: Publish on github
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}        
```

ou

```
	# GET https://registry.npmjs.org/@ignf-geoportal/sdk-2d (scope)
	# GET https://registry.npmjs.org/geoportal-access-lib

    - name: Use registry npm
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'
        registry-url: 'https://registry.npmjs.org'
        scope: '@ignf-geoportal'

    - name: Publish on npm
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Quelques astuces sur les actions

https://docs.github.com/en/actions/reference

* obtenir le tag (API GET /repos/:owner/:repo/git/ref/tags/<tag name>)
`${{ github.ref }} # refs/tags/<tag name>`

ou

```
    - name: Get the version
      id: get_version
      run: echo ::set-output name=VERSION::$(echo v${GITHUB_REF##*/})

    - name: Print version
      run: echo ${{ steps.get_version.outputs.VERSION }}
```


* condition de recherche avec les fonctions :
cf. https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#functions
`contains(github.ref, 'ol-3.0.13') # return true/false`


* condition d’exécution d'un job :
```
jobs:
  build_ol:
    if: contains(github.ref, 'refs/tags/ol')
    steps:
    - run: echo "Build OpenLayers"
```
