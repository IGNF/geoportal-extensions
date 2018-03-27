
import Logger from "../../Common/Utils/LoggerByDefault";
import LayerUtil from "../../Common/Utils/LayerUtils";

var logger = Logger.getLogger("layer-event");

/**
 * @classdesc
 *
 * Evenement sur les couches Geoportail
 * @private
 */
var LayerEvent = {

    _id: null,
    _attributions: [],
    _visibility: true,
    _originators: [],

    /**
     * activation du controle attribution
     */
    isEnable: function(map) {

        if (!map.attributionControl) {
            return false;
        }
        return true;
    },

    /**
     * visibilité de la couche
     *
     * @param {Boolean} visibility - true|false
     */
    setVisible: function(visibility) {
        logger.log("visibility", visibility);
        this._visibility = visibility;
        this.fire("visibilitychange");
    },

    /**
     * visibilité de la couche
     *
     * @returns {Boolean} visibility
     */
    getVisible: function() {
        return this._visibility;
    },

    /**
     * fonction de suppresion d'un layer du controle des layers
     */
    _onRemoveLayer: function(e) {
        logger.trace("onRemove event", e);
        if (e.layer._geoportal_id != this._geoportal_id) {
            return;
        }
        // attributions non visibles
        this.setVisible(false);
    },

    /**
     * fonction d'ajout d'un layer du controle des layers
     */
    _onAddLayer: function(e) {
        logger.trace("onAdd event", e);
        if (e.layer._geoportal_id != this._geoportal_id) {
            return;
        }
        // attributions visibles
        this.setVisible(true);
    },

    /**
     * fonction de deplacement d'un layer
     */
    _onMoveEndLayer: function(e) {
        logger.trace("moveend event", e);
        // mise à jour des attributions
        this.updateAttributions(this._map, this);
    },

    /** updateAttributions */
    updateAttributions: function(map) {
        // FIXME on peut realiser une mise à jour plus intelligente que cette manière brutale...
        // Ex. mise en place de la notion 'hidden' de l'originators à desactiver

        if (!this.isEnable(map)) {
            return;
        }

        this.removeAttributions(map);
        this.addAttributions(map);

        this.fire("attributionchange");
    },

    /** removeAttributions */
    removeAttributions: function(map) {
        logger.trace("removeAttributions...", this._geoportal_id);
        // suppression des attributions
        // L.Map utilise la methode getAttribution() du layer.
        // La construction concerne le layer courant.
        // Cet evenement declenche la construction des attributions

        if (!this.isEnable(map)) {
            return;
        }

        for (var i = 0; i < this._attributions.length; i++) {
            map.attributionControl.removeAttribution(this._attributions[i]);
        }

        // suppression des attributions de liste
        if (this._attributions) {
            this._attributions = [];
        }
    },

    /** addAttributions */
    addAttributions: function(map) {
        logger.trace("addAttributions...", this._geoportal_id);
        // on interroge les originators en options pour obtenir les infos
        // suivantes :
        // - echelles
        // - contraintes d'emprise
        // - information sur le(s) proprietaire(s) du layer
        // - ...
        // mais on a besoin de qq informations sur la carte tels que :
        // - zoom
        // - bounds
        // - ...

        if (!this.isEnable(map)) {
            return;
        }

        // ajout des attributions
        var topLeft = map.getBounds().getNorthWest();
        var bottomRight = map.getBounds().getSouthEast();
        var arrayBounds = [topLeft.lat, topLeft.lng, bottomRight.lat, bottomRight.lng];
        var params = {
            extent: arrayBounds, // map.getBounds(),
            zoom: map.getZoom(),
            originators: this._originators,
            visibility: this._visibility
        };
        logger.log(params);
        var attributionsOriginators = LayerUtil.getAttributions(params);
        logger.log(attributionsOriginators);
        if (attributionsOriginators && attributionsOriginators.length !== 0) {
            // on les ajoute dans la liste
            // et on ajoute les attributions dans le controle Leaflet "L.Control.Attribution"
            for (var i = 0; i < attributionsOriginators.length; i++) {
                this._attributions.push(attributionsOriginators[i]);
                map.attributionControl.addAttribution(attributionsOriginators[i]);
            }
        }
    }

};

export default LayerEvent;
