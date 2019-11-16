// En attente d'une release sur les projections geocentriques...
// https://github.com/proj4js/proj4js/issues/195
// https://github.com/proj4js/proj4js/pull/327
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
            if (def.projName === "geocent") {
                logger.trace("proj. geocent :", code);
                continue;
            }
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
        const def1 = proj4.defs(code1);
        if (def1.projName === "geocent") {
            logger.trace("proj. geocent (source):", code1);
            continue;
        }
        for (j = 0; j < len; ++j) {
            const code2 = projCodes[j];
            const proj2 = get(code2);
            const def2 = proj4.defs(code2);
            if (def2.projName === "geocent") {
                logger.trace("proj. geocent (target):", code2);
                continue;
            }
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
