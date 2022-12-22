/** Version */
export const olExtVersion: any;
/** Publication date */
export const olExtDate: any;
export { default as olUtils } from "../Common/Utils";
export { default as LayerUtils } from "../Common/Utils/LayerUtils";
export { default as ProxyUtils } from "../Common/Utils/ProxyUtils";
export { default as ColorUtils } from "../Common/Utils/ColorUtils";
export { default as MathUtils } from "../Common/Utils/MathUtils";
export { default as Logger } from "../Common/Utils/LoggerByDefault";
export var Services: any;
export var Error: any;
export var Helper: any;
export var Protocols: any;
export var servicesDate: any;
export var servicesVersion: any;
declare namespace Ol {
    namespace gp {
        export { GfiUtils };
    }
    const includeProjections: () => void;
    namespace style {
        export { Editor };
        export namespace editor {
            export { Style };
            export { Filter };
            export { Layer };
            export { Legend };
            export { Group };
            export { Themes };
            export { Search };
        }
    }
    namespace format {
        export { KML as KMLExtended };
        export { GPX as GPXExtended };
        export { GeoJSON as GeoJSONExtended };
    }
    namespace source {
        export { WMTS as WMTSExtended };
        export { SourceWMTS as GeoportalWMTS };
        export { SourceWMS as GeoportalWMS };
    }
    namespace layer {
        export { LayerWMTS as GeoportalWMTS };
        export { LayerWMS as GeoportalWMS };
    }
    namespace control {
        export { LayerSwitcher };
        export { GeoportalAttribution };
        export { GetFeatureInfo };
        export { SearchEngine };
        export { Route };
        export { Isocurve };
        export { MousePosition as GeoportalMousePosition };
        export { Drawing };
        export { ReverseGeocode };
        export { LayerImport };
        export { MeasureLength };
        export { MeasureArea };
        export { MeasureAzimuth };
        export { Markers as DefaultMarkers };
        export { ElevationPath };
        export { LocationSelector };
    }
}
import GfiUtils from "./GfiUtils";
import Editor from "./Controls/Editor";
import Style from "./Controls/Editor/Style";
import Filter from "./Controls/Editor/Filter";
import Layer from "./Controls/Editor/Layer";
import Legend from "./Controls/Editor/Legend";
import Group from "./Controls/Editor/Group";
import Themes from "./Controls/Editor/Themes";
import Search from "./Controls/Editor/Search";
import KML from "./Formats/KML";
import GPX from "./Formats/GPX";
import GeoJSON from "./Formats/GeoJSON";
import WMTS from "./Sources/WMTS";
import SourceWMTS from "./Layers/SourceWMTS";
import SourceWMS from "./Layers/SourceWMS";
import LayerWMTS from "./Layers/LayerWMTS";
import LayerWMS from "./Layers/LayerWMS";
import LayerSwitcher from "./Controls/LayerSwitcher";
import GeoportalAttribution from "./Controls/GeoportalAttribution";
import GetFeatureInfo from "./Controls/GetFeatureInfo";
import SearchEngine from "./Controls/SearchEngine";
import Route from "./Controls/Route";
import Isocurve from "./Controls/Isocurve";
import MousePosition from "./Controls/MousePosition";
import Drawing from "./Controls/Drawing";
import ReverseGeocode from "./Controls/ReverseGeocode";
import LayerImport from "./Controls/LayerImport";
import MeasureLength from "./Controls/Measures/MeasureLength";
import MeasureArea from "./Controls/Measures/MeasureArea";
import MeasureAzimuth from "./Controls/Measures/MeasureAzimuth";
import Markers from "./Controls/Utils/Markers";
import ElevationPath from "./Controls/ElevationPath";
import LocationSelector from "./Controls/LocationSelector";
export { Ol as olExtended };
//# sourceMappingURL=index.d.ts.map