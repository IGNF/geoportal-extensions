# Table des matières (TOC) en Markdown

Inserer ou mettre à jour une table des matières dans les fichiers README.

* Projet
    > https://github.com/jonschlinkert/markdown-toc

* Installation (globale)
    > sudo npm install -g markdown-toc

* Execution (simple)
    > markdown-toc 'input'

    Puis copier la sortie console dans le fichier...

* Execution (tag)
    > markdown-toc -i 'input'

    Le fichier contient le tag suivant :
    ```
    <!-- toc -->
    ```

    La table des matière est copiée ou mise à jour dans ce tag.

    > **NOTE**
    Si le tag est absent, le fichier n'est pas modifié...

    Cas particulier, on ne souhaite que le 1er niveau :
    > markdown-toc -i --maxdepth 1 'input'
