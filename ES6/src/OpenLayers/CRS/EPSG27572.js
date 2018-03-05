import ol from "ol";
import Proj4 from "proj4";
import Register from "../../Common/Utils/Register";

/**
 *
 * Projection Lambert 93 (EPSG:27572)
 *
 * @deprecated
 * @private
 * @returns {ol.proj.ProjectionLike}
 */
var EPSG27572 = {

    /**
     * instance
     *
     * @private
     */
    instance: null,

    /**
     * execution
     *
     * @private
     */
    build: function() {
        // singleton
        var code = "EPSG:27572";
        if (!this.instance) {
            Proj4.defs(code, Register.get(code));
            if (!ol.proj.get(code)) {
                if (!ol.proj.proj4_ && ol.proj.setProj4) {
                    ol.proj.setProj4(Proj4);
                } else {
                    console.log("WARNING : OpenLayers library should manage proj4 dependency in order to add custom projections (EPSG:27572 for instance)");
                }
            }
            this.instance = ol.proj.get(code);
        }

        return this.instance;
    }
};

export default EPSG27572;
