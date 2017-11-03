define([
    "itowns",
    "gp",
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

    // Rajout des propriétés de l'extension dans le namespace Gp
    Gp.LayerUtils = LayerUtils ;

    // on determine l'environnement d'execution : browser ou non ?
    var scope = typeof window !== "undefined" ? window : {};

    // on voit s'il existe déjà cette variable, sinon on la met en place
    var _itowns = Itowns || {};

    // creation du namespace pour les extensions itowns
    _itowns.control = {};
    _itowns.control.MousePosition = MousePosition;
    _itowns.control.LayerSwitcher = LayerSwitcher;
    _itowns.control.Attributions = Attributions;
    _itowns.control.Scale = Scale;
    _itowns.control.MiniGlobe = MiniGlobe;
    _itowns.GlobeViewExtended = GlobeViewExtended;

    // on sauvegarde dans la variable globale !
    scope.itowns = scope.itowns || {};
    Utils.assign(scope.itowns, _itowns);

    return Gp;
});
