define([
    "itowns",
    "gp",
    "Common/Utils/LayerUtils",
    "Itowns/Controls/MousePosition",
    "Itowns/ApiGlobe"
    // "Itowns/Controls/LayerSwitcher",
], function (
    itowns, // FIXME Global for browser only !
    Gp,
    LayerUtils,
    MousePosition,
    ApiGlobe
    //LayerSwitcher,
) {

    "use strict";

    // Rajout des propriétés de l'extension dans le namespace Gp
    Gp.LayerUtils = LayerUtils ;
    // creation du namespace pour les extensions itowns
    itowns.control = {};
    itowns.control.MousePosition = MousePosition;
    itowns.viewer = new ApiGlobe();

    // FIXME : parce qu'il faut bien retourner quelque chose
    return Gp;
});
