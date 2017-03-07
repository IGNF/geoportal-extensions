define([
    "itowns",
    "gp",
    "Common/Utils/LayerUtils",
    "Itowns/Controls/Widget",
    "Itowns/Controls/MousePosition"
    // "Itowns/Controls/LayerSwitcher",
], function (
    itowns, // FIXME Global for browser only !
    Gp,
    LayerUtils,
    Widget,
    MousePosition
    //LayerSwitcher,
) {

    "use strict";

    // Rajout des propriétés de l'extension dans le namespace Gp
    // Gp.ol3extVersion = "__GPOL3EXTVERSION__" ;
    // Gp.ol3extDate = "__GPDATE__";
    Gp.LayerUtils = LayerUtils ;

    // creation du namespace pour les extensions virtualGeo
    itowns.Widget = Widget;
    itowns.Widget.MousePosition = MousePosition;

    // FIXME : parce qu'il faut bien retourner quelque chose
    return Gp;
});
