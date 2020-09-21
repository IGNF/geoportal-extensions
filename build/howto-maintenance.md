*En cours...*

# Informations utiles sur la maintenance du projet

c'est de la veille techno !

## Mise à jour des outils de développement

Vérifier les versions des outils : nodejs, npm & git.

Ex.

    $ npm doctor
    npm WARN verifyCachedFiles Content garbage-collected: 796 (271878606 bytes)
    npm WARN verifyCachedFiles Cache issues have been fixed
    Check                               Value                        Recommendation
    npm ping                            OK
    npm -v                              v6.4.1                       Use npm v6.9.0
    node -v                             v10.15.3
    npm config get registry             https://registry.npmjs.org/
    which git                           /usr/bin/git
    Perms check on cached files         ok
    Perms check on global node_modules  ok
    Perms check on local node_modules   ok                        
    Verify cache contents               verified 10435 tarballs

## Mise à jour des dependances NPM

Il existe 2 types de mise à jour des dépendances
- de développement
- du projets

### Vérifier les versions des dépendances

Ex.

    $ npm outdated
    Package              Current        Wanted   Latest  Location
    itowns                 2.3.0         2.3.0    2.9.0  geoportal-extensions
    jsdom                 9.12.0        9.12.0   15.0.0  geoportal-extensions
    leaflet                1.3.1         1.3.1    1.4.0  geoportal-extensions
    leaflet-draw           1.0.2         1.0.2    1.0.4  geoportal-extensions
    mocha                  5.2.0         5.2.0    6.1.4  geoportal-extensions
    mocha-webpack   2.0.0-beta.0  2.0.0-beta.0    1.1.0  geoportal-extensions
    nyc                   12.0.2        12.0.2   14.0.0  geoportal-extensions
    sortablejs             1.8.4         1.8.4    1.9.0  geoportal-extensions
    three                 0.93.0        0.93.0  0.104.0  geoportal-extensions
    uglify-es             3.3.10           git      git  geoportal-extensions

*Notes*
> Au 01/05/2019, les versions de mocha & mocha-webpack sont fixées sur la version de
webpack 4 !

### Mettre à jour une dépendance

    $ npm install -save-dev jsdom@latest

ou

    $ npm install -save-dev jsdom@next

ou

    $ npm install -save-dev jsdom@14.0.0

## Audit des dependances

    $ npm audit

                           === npm audit security report ===                        

    # Run  npm update handlebars --depth 3  to resolve 1 vulnerability
    ┌───────────────┬──────────────────────────────────────────────────────────────┐
    │ High          │ Prototype Pollution                                          │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ Package       │ handlebars                                                   │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ Dependency of │ nyc [dev]                                                    │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ Path          │ nyc > istanbul-reports > handlebars                          │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ More info     │ https://nodesecurity.io/advisories/755                       │
    └───────────────┴──────────────────────────────────────────────────────────────┘


    ┌──────────────────────────────────────────────────────────────────────────────┐
    │                                Manual Review                                 │
    │            Some vulnerabilities require your attention to resolve            │
    │                                                                              │
    │         Visit https://go.npm.me/audit-guide for additional guidance          │
    └──────────────────────────────────────────────────────────────────────────────┘
    ┌───────────────┬──────────────────────────────────────────────────────────────┐
    │ Moderate      │ Regular Expression Denial of Service                         │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ Package       │ marked                                                       │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ Patched in    │ >=0.6.2                                                      │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ Dependency of │ jsdoc-webpack-plugin [dev]                                   │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ Path          │ jsdoc-webpack-plugin > jsdoc > marked                        │
    ├───────────────┼──────────────────────────────────────────────────────────────┤
    │ More info     │ https://nodesecurity.io/advisories/812                       │
    └───────────────┴──────────────────────────────────────────────────────────────┘
    found 2 vulnerabilities (1 moderate, 1 high) in 17298 scanned packages
      run `npm audit fix` to fix 1 of them.
      1 vulnerability requires manual review. See the full report for details.
