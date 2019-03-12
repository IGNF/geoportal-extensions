**WARNING**

# Utilisation d'un proxy local

Pour les exemples, on peut utiliser le serveur de developpement de `webpack` :
`webpack-dev-server`.

Certains exemples utilisent un proxy PHP, mais le PHP n'est pas reconnu par le
serveur de developpement.

Pour palier à ce problème, on faudrait :

* soit utiliser dans les exemples un proxy local !
> par défaut, on utilise un proxy PHP déployé sur son poste local à l'url suivante :
    `https://localhost/proxy/proxy.php?url=`

* soit rediriger les urls du proxy vers un proxy sur son poste local !
    > **TODO mais comment faire !?**
    Ex. Redirection via `webpack-dev-server::proxy`
        ```
        devServer: {
            proxy: {
                "/samples/resources/proxy/" : {
                    secure: true,
                    target: "...",
                    bypass: function (req, res) {}
                    (...)
                }
            }
        },
        ```

* soit mettre en place un proxy utilisable directement par `webpack-dev-server`
    > **TODO mais comment faire !?**


**NOTE**

Par défaut, on utilise directement dans nos exemples un proxy PHP déployé sur
notre poste local.

Il est possible de modifier le chemin du proxy via le fichier
suivant : cf. `/samples-src/config.json (tag:proxy)`
```
    "proxy" : "https://localhost/proxy/proxy.php"
```

Les fichiers exemples possèdent un tag pour la substitution :
```
    "proxyUrl" : "{{ proxy }}?url="
```
