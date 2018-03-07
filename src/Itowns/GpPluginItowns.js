define([
    "itowns",
    "Gp",
    "Common/Utils",
    "Common/Utils/LayerUtils",
    "Itowns/Controls/MousePosition",
    "Itowns/Controls/LayerSwitcher",
    "Itowns/Controls/Attributions",
    "Itowns/Controls/Scale",
    "Itowns/Controls/MiniGlobe",
    "Itowns/GlobeViewExtended"
], function (
    Itowns,
    Gp,
    Utils,
    LayerUtils,
    MousePosition,
    LayerSwitcher,
    Attributions,
    Scale,
    MiniGlobe,
    GlobeViewExtended
) {

    "use strict";

    // Adds the extensions properties in the Gp namespace
    Gp.LayerUtils = LayerUtils ;

    // determines the execution environment l'environnement : browser or not ?
    var scope = typeof window !== "undefined" ? window : {};

    // checks if the var already exists : if not, we create it
    var _itowns = Itowns || {};

    // creation of the namespace for the itowns extensions
    _itowns.control = {};
    _itowns.control.MousePosition = MousePosition;
    _itowns.control.LayerSwitcher = LayerSwitcher;
    _itowns.control.Attributions = Attributions;
    _itowns.control.Scale = Scale;
    _itowns.control.MiniGlobe = MiniGlobe;
    _itowns.GlobeViewExtended = GlobeViewExtended;

    // saves in the global variable !
    scope.itowns = scope.itowns || {};
    Utils.assign(scope.itowns, _itowns);

    return Gp;
});
