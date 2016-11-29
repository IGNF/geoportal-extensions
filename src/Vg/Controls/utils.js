/**
* Retourne les coordonnées des 4 coins de la vue courante
*/
getMapExtent = function ( map ) {
    var mapDiv = map.mapDiv;
    var topLeft = {};
    var bottomRight = {};
    // on teste le pick sur l'axe des y au cas où la vue est inclinée
    for (var x = 0; x <= mapDiv.offsetHeight; x = x + mapDiv.offsetHeight / 10) {
        // on pick en haut à gauche de la fenêtre puis on descend d'un dixième de la hauteur de la fenêtre
        // à chaque itération jusqu'à ne plus picker dans le ciel
        topLeft = map.pickPosition(0, x);
        // Si l'un des deux coordonnées n'est plus différent de 0, on ne pick plus dans le ciel
        if (topLeft.lon !== 0 || topLeft.lat !== 0) {
        break;
        }
    }
    // On pick en bas à droite
    bottomRight = map.pickPosition(mapDiv.offsetWidth, mapDiv.offsetHeight);
    // Si l'un des deux picks est toujours dans le ciel malgré les précédents tests,
    // c'est que la vue est si éloignée qu'on voit le globe complet :
    // On renvoie donc comme extent [90, -180, -90, 180]
    if ((topLeft.lon === 0 && topLeft.lat === 0) || (bottomRight.lon === 0 && bottomRight.lat === 0)) {
        topLeft.lat = 90;
        topLeft.lon = -180;
        bottomRight.lat = -90;
        bottomRight.lon = 180;
    }
    var extent = [topLeft.lat, topLeft.lon, bottomRight.lat, bottomRight.lon];
    return extent;
};
