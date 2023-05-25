# Ressources

Les icones de l'outil de dessins se composent ainsi :

```sh
.
├── api
│   ├── base64.txt
│   ├── icon_[1-24].png
│   ├── png32/
│   └── script.sh
├── portail
│   ├── base64.txt
│   ├── icon_[1-24].png
│   ├── png32/
│   └── script.sh
```

Le répertoire *api/* contient les icones originaux utilisés par les APIs au format PNG :

```sh
image size : [51, 38]
scale : 32 / Math.min(size[0], size[1]) = 0.8421052631578947
```

On les transforme dans un ratio correct pour le rendu graphique sur *OpenLayers* avec le script : `./script.sh`

Le résultat du traitement est disponible dans le répertoire *api/png32/* et dans le fichier *base64.txt* pour obtenir les URI des PNG :

```sh
image size : [43, 32]
scale : 32 / Math.min(size[0], size[1]) = 1
```

et

```json
[
    {
        src : "data:image/png;base64,...",
        anchor : [0.5, 1]
    }
    (...)
]
```

**NOTE :**
> On procéde aussi pour les icones du Portail !
