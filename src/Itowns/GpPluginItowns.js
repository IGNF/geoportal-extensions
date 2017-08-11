define([
    "itowns",
    "gp",
    "Common/Utils/LayerUtils",
    "Itowns/Controls/MousePosition",
    "Itowns/Controls/LayerSwitcher",
    "Itowns/Controls/Attribution",
    "Itowns/Controls/Scale",
    "Itowns/GlobeViewExtended"
], function (
    itowns, // FIXME Global for browser only !
    Gp,
    LayerUtils,
    MousePosition,
    LayerSwitcher,
    Attribution,
    Scale,
    GlobeViewExtended
) {

    "use strict";

    // Rajout des propriétés de l'extension dans le namespace Gp
    Gp.LayerUtils = LayerUtils ;
    // creation du namespace pour les extensions itowns
    itowns.control = {};
    itowns.control.MousePosition = MousePosition;
    itowns.control.LayerSwitcher = LayerSwitcher;
    itowns.control.Attribution = Attribution;
    itowns.control.Scale = Scale;
    itowns.GlobeViewExtended = GlobeViewExtended;

    // FIXME : parce qu'il faut bien retourner quelque chose
    return Gp;
});
