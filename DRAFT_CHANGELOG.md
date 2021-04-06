
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

    - mise à jour de la jsDoc (95cff8206ef2e0fcfb7fee5989d2d74d236b9f9f)

* [Deprecated]

* [Removed]

* [Fixed]

    - Possibilité de activer / desactiver les loggers des API lors de l'utilisation des API en module ES6 :

    ```js
    import { Logger } from "geoportal-extensions-openlayers";
    Logger.disableAll();
    ```

    - corrections des erreurs à partir de DeepScan (#288)
    - corrections syntaxiques eslint (da275a284a07ddd8e32753eda57ad4ef283d34fb et 306506a2255b2f05558ddcb05210dce39135c804)

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

* [Deprecated]

* [Removed]

* [Fixed]

    - Possibilité de activer / desactiver les loggers des API lors de l'utilisation des API en module ES6 :

    ```js
    import { Logger } from "geoportal-extensions-leaflet";
    Logger.disableAll();
    ```
    
    - corrections des erreurs à partir de DeepScan (#288)
    - corrections syntaxiques eslint (da275a284a07ddd8e32753eda57ad4ef283d34fb et 306506a2255b2f05558ddcb05210dce39135c804)

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
