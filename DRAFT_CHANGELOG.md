
# Extension Geoportail OpenLayers, version __VERSION__

**__DATE__**
> Release Extension Geoportail openLayers

## Summary

* gestion des loggers : 
> Exposition de la classe statique *Logger* avec les méthodes suivantes :
`Gp.Logger.disableAll()` et `Gp.Logger.enableAll()`

## Changelog

* [Added]

* [Changed]

    - mise à jour de la jsDoc (95cff82)
    - mise à jour de la lib. geoportal-access-lib : 2.1.8

* [Deprecated]

* [Removed]

    - la dépendance *request* est supprimée, et remplacée par *node-fetch*

* [Fixed]

    - Possibilité de activer / desactiver les loggers des API lors de l'utilisation des API en module ES6 :

    ```js
    import { Logger } from "geoportal-extensions-openlayers";
    Logger.disableAll();
    ```

    - corrections des erreurs à partir de DeepScan (#288)
    - corrections syntaxiques eslint (da275a2 et 306506a)
    - cf. issue : Erreur compilation par webpack [#294](https://github.com/IGNF/geoportal-extensions/issues/294)
    - cf. issue : Erreur dépendances à la compilation [#283](https://github.com/IGNF/geoportal-extensions/issues/283)

* [Security]

---


# Extension Geoportail Leaflet, version __VERSION__

**__DATE__**
> Release Extension Geoportail leaflet

## Summary

* gestion des loggers : 
> Exposition de la classe statique *Logger* avec les méthodes suivantes :
`Gp.Logger.disableAll()` et `Gp.Logger.enableAll()`

## Changelog

* [Added]

* [Changed]

    - mise à jour de la lib. geoportal-access-lib : 2.1.8

* [Deprecated]

* [Removed]

    - la dépendance *request* est supprimée, et remplacée par *node-fetch*

* [Fixed]

    - Possibilité de activer / desactiver les loggers des API lors de l'utilisation des API en module ES6 :

    ```js
    import { Logger } from "geoportal-extensions-leaflet";
    Logger.disableAll();
    ```
    
    - corrections des erreurs à partir de DeepScan (#288)
    - corrections syntaxiques eslint (da275a2 et 306506a)
    - cf. issue : Erreur compilation par webpack [#294](https://github.com/IGNF/geoportal-extensions/issues/294)
    - cf. issue : Erreur dépendances à la compilation [#283](https://github.com/IGNF/geoportal-extensions/issues/283)

* [Security]

---




# Extension Geoportail Itowns, version __VERSION__

**__DATE__**
> Release Extension Geoportail itowns

## Summary

* gestion des loggers : 
> Exposition de la classe statique *Logger* avec les méthodes suivantes :
`Gp.Logger.disableAll()` et `Gp.Logger.enableAll()`

## Changelog

* [Added]

* [Changed]

* [Deprecated]

* [Removed]

* [Fixed]

    - Possibilité de activer / desactiver les loggers des API lors de l'utilisation des API en module ES6 :

    ```js
    import { Logger } from "geoportal-extensions-itowns";
    Logger.disableAll();

* [Security]

---
