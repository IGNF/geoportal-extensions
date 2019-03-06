**TODO**

# Utilisation d'un proxy local

Pour les exemples, on peut utiliser le serveur de developpement de `webpack` :
`webpack-dev-server`.

Certains exemples utilisent un proxy PHP, mais le PHP n'est pas reconnu par le
serveur de developpement.

Pour palier à ce problème, on redirige les urls du proxy vers un vrai proxy en
local :

```
devServer: {
    proxy: {
        "/samples/resources/proxy/" : {
            secure: false,
            target: "http://localhost/proxy/proxy.php"
        }
    }
},
```
