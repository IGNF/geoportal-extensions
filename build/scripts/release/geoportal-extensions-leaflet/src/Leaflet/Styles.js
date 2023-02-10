/* global false */

// En module ES6, on n'a pas besoin de ces CSS, car on utile le CSS géneré avec WebPack.
// L'utilisation de ces imports est utile lors de la creation du bundle...
import "./CSS/GPgeneralWidgetLeaflet.css";

import "./CSS/Controls/ElevationPath/GPelevationPathLeaflet.css";
import "./CSS/Controls/Isochrone/GPisochronLeaflet.css";
import "./CSS/Controls/LayerSwitcher/GPlayerSwitcherLeaflet.css";
import "./CSS/Controls/LocationSelector/GPlocationLeaflet.css";
import "./CSS/Controls/MousePosition/GPmousePositionLeaflet.css";
import "./CSS/Controls/ReverseGeocoding/GPreverseGeocodingLeaflet.css";
import "./CSS/Controls/Route/GProuteLeaflet.css";
import "./CSS/Controls/SearchEngine/GPsearchEngineLeaflet.css";

// ce flag est substitué via le script de publication des sources du package...
if (false) {
    // plugin leaflet-draw !
    require("../../node_modules/leaflet-draw/dist/leaflet.draw-src.css");
}
