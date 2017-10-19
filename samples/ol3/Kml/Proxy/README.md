Utilisation d'un proxy reverse local :
     http://localhost:8089/

# Liens utiles

    https://github.com/Rob--W/cors-anywhere/

# Installation

> npm install

# Execution du proxy

> export PORT=8089; node ./node_modules/cors-anywhere/server.js

# Execution de la page exemple

```
var format = new KMLExtended ({
    cors : true,
    corsUrl : "http://localhost:8089/",
});
```

> firefox amd-kml-crossorigin.html

### Tests

- [ ] Choisir sans l'option **cors**
- [ ] Charger le KML et observer la console (exception crossOrigin)
- [ ] Ecrire le KML et observer les URLs (URLs d'origine)

- [ ] Choisir avec l'option **cors**
- [ ] Charger le KML et observer la carte (affichage des icones)
- [ ] Ecrire le KML et observer les URLs (URLs surchargées avec le proxy)
