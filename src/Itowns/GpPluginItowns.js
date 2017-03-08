define([
    "itowns",
    "gp",
    "Common/Utils/LayerUtils",
<<<<<<< HEAD
    "Itowns/Controls/MousePosition",
    "Itowns/ApiGlobe"
=======
    "Itowns/Controls/Widget",
    "Itowns/Controls/MousePosition"
>>>>>>> bfaea0c... Ajout de la classe Widget d'iTowns et test.html avec mousePosition
    // "Itowns/Controls/LayerSwitcher",
], function (
    itowns, // FIXME Global for browser only !
    Gp,
    LayerUtils,
<<<<<<< HEAD
    MousePosition,
    ApiGlobe
=======
    Widget,
    MousePosition
>>>>>>> bfaea0c... Ajout de la classe Widget d'iTowns et test.html avec mousePosition
    //LayerSwitcher,
) {

    "use strict";

    // Rajout des propriétés de l'extension dans le namespace Gp
    // Gp.ol3extVersion = "__GPOL3EXTVERSION__" ;
    // Gp.ol3extDate = "__GPDATE__";
    Gp.LayerUtils = LayerUtils ;

    // creation du namespace pour les extensions virtualGeo
<<<<<<< HEAD
    // itowns.Widget.LayerSwitcher = LayerSwitcher;
    itowns.control = {};
    itowns.control.MousePosition = MousePosition;
    itowns.viewer = new ApiGlobe();
=======
    itowns.Widget = Widget;
    itowns.Widget.MousePosition = MousePosition;
>>>>>>> bfaea0c... Ajout de la classe Widget d'iTowns et test.html avec mousePosition

    // FIXME : parce qu'il faut bien retourner quelque chose
    return Gp;
});
