define([
    // "vg",
    "gp",
    "Common/Utils/LayerUtils",
    "Vg/Controls/LayerSwitcher",
    "Vg/Controls/MousePosition"
], function (
    // VirtualGeo, // FIXME Global for browser only !
    Gp,
    LayerUtils,
    LayerSwitcher,
    MousePosition
) {

    "use strict";

    // Rajout des propriétés de l'extension dans le namespace Gp
    // Gp.olExtVersion = "__GPOLEXTVERSION__" ;
    // Gp.olExtDate = "__GPDATE__";
    Gp.LayerUtils = LayerUtils ;

    // creation du namespace pour les extensions virtualGeo
    VirtualGeo.LayerSwitcher = LayerSwitcher;
    VirtualGeo.MousePosition = MousePosition;

    // FIXME : parce qu'il faut bien retourner quelque chose
    return Gp;
});
