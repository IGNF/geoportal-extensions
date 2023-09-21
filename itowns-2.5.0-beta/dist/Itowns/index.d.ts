export { default as LayerUtils } from "../Common/Utils/LayerUtils";
export { default as ProxyUtils } from "../Common/Utils/ProxyUtils";
export { default as ColorUtils } from "../Common/Utils/ColorUtils";
export { default as MathUtils } from "../Common/Utils/MathUtils";
export { default as Logger } from "../Common/Utils/LoggerByDefault";
/** Version */
export const itownsExtVersion: any;
/** Publication date */
export const itownsExtDate: any;
export var Services: any;
export var Error: any;
export var Helper: any;
export var Protocols: any;
export var servicesDate: any;
export var servicesVersion: any;
declare namespace Itowns {
    export namespace control {
        export { MousePosition };
        export { LayerSwitcher };
        export { BoostRelief };
        export { Buildings };
        export { Attributions };
        export { Scale };
        export { MiniGlobe };
    }
    export namespace layer {
        export { GeoportalWMTS };
        export { GeoportalWMS };
        export { GeoportalElevation };
        export { VectorTileLayer };
    }
    export { CRS };
    export { GlobeViewExtended };
}
import MousePosition from "./Controls/MousePosition";
import LayerSwitcher from "./Controls/LayerSwitcher";
import BoostRelief from "./Controls/BoostRelief";
import Buildings from "./Controls/Buildings";
import Attributions from "./Controls/Attributions";
import Scale from "./Controls/Scale";
import MiniGlobe from "./Controls/MiniGlobe";
import GeoportalWMTS from "./Layer/LayerWMTS";
import GeoportalWMS from "./Layer/LayerWMS";
import GeoportalElevation from "./Layer/LayerElevation";
import VectorTileLayer from "./Layer/VectorTileLayer";
import CRS from "./CRS/CRS";
import GlobeViewExtended from "./GlobeViewExtended";
export { Itowns as itownsExtended };
//# sourceMappingURL=index.d.ts.map