import {
    addCoordinateTransforms,
    addProjection,
    addEquivalentProjections,
    get
} from "ol/proj";
import { get as getTransform } from "ol/proj/transforms";
import Projection from "ol/proj/Projection";

import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("CRS");

export function register (proj4) {
    const projCodes = Object.keys(proj4.defs);
    logger.trace("proj. codes :", projCodes);

    const len = projCodes.length;
    let i, j;
    for (i = 0; i < len; ++i) {
        const code = projCodes[i];
        if (!get(code)) {
            const def = proj4.defs(code);
            addProjection(new Projection({
                code : code,
                axisOrientation : def.axis,
                metersPerUnit : def.to_meter,
                units : def.units
            }));
        }
    }
    for (i = 0; i < len; ++i) {
        const code1 = projCodes[i];
        const proj1 = get(code1);

        for (j = 0; j < len; ++j) {
            const code2 = projCodes[j];
            const proj2 = get(code2);

            if (!getTransform(code1, code2)) {
                if (proj4.defs[code1] === proj4.defs[code2]) {
                    addEquivalentProjections([proj1, proj2]);
                } else {
                    const transform = proj4(code1, code2);
                    addCoordinateTransforms(proj1, proj2, transform.forward, transform.inverse);
                }
            }
        }
    }
}
