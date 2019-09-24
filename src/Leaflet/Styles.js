// en module ES6, on n'a pas besoin de ces CSS..., on utile le CSS géneré avec WebPack,
// l'utilisation de ces imports est utile lors de la compilation du bundle
import "./CSS/GPgeneralWidgetLeaflet.css";

import "./CSS/Controls/ElevationPath/GPelevationPathLeaflet.css";
import "./CSS/Controls/Isochrone/GPisochronLeaflet.css";
import "./CSS/Controls/LayerSwitcher/GPlayerSwitcherLeaflet.css";
import "./CSS/Controls/LocationSelector/GPlocationLeaflet.css";
import "./CSS/Controls/MousePosition/GPmousePositionLeaflet.css";
import "./CSS/Controls/ReverseGeocoding/GPreverseGeocodingLeaflet.css";
import "./CSS/Controls/Route/GProuteLeaflet.css";
import "./CSS/Controls/SearchEngine/GPsearchEngineLeaflet.css";

// plugin leaflet-draw !
if ("__COMPILATION__".match(/true/)) {
    require("../../node_modules/leaflet-draw/dist/leaflet.draw-src.css");
}
