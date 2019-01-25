// import OpenLayers
import Control from "ol/control/Control";
import {
    Select as SelectInteraction,
    Modify as ModifyInteraction,
    Draw as DrawInteraction
} from "ol/interaction";
// import local
import Logger from "../../../Common/Utils/LoggerByDefault";
import Utils from "../../../Common/Utils";

var logger = Logger.getLogger("interactions");

/**
 * HOWTO
 * Pourquoi et comment l'utiliser ?
 * Cette classe permet de gérer les interactions entre chaque extension.
 * Une extension qui active une interaction avec la carte, doit desactiver
 * les autres interactions issues d'autre extensions.
 * La désactivation d'une interaction s'accompagne d'actions telles que
 * le nettoyage des dessins, l'état du composant graphique, ...
 *
 * Ex
 * // desactive toutes les interactions avec l'opération par defaut : clean
 * Interactions.unset(map);
 * // desactive les interactions sauf celles de Drawing. On execute des
 * // operations particulieres : status, collapse et message
 * Interactions.unset(map, {
 *    current : "Drawing",
 *    status : false,
 *    collapse : true,
 *    messsage : ["WARNING", "Ceci est un avertissement !"]
 * });
 *
 * Dans le code de l'extension, il faut placer des informations dans l'interaction :
 * interaction.setProperties({
 *     name : "Drawing",
 *     source : this
 * });
 */
var Interactions = {

    /**
     * Liste des extensions qui utilisent le mécanisme des interactions
     */
    _extensions : [
        "Measures",
        "ElevationPath",
        "Drawing"
    ],

    /**
     * Options par defaut
     * - current : ex. "Drawing"
     *       c'est l'extension qui demande la desactivation des autres interactions.
     *       Par defaut, toutes les interactions sont desactivées.
     * - clean :
     *       c'est la suppression des interactions, des dessins de la carte,
     *       ainsi que la reinitialisation de l'état graphique.
     *       Les extensions doivent implementer la méthode 'clean()'.
     *       Par defaut, tous les dessins sont supprimés
     */
    _options : {
        current : null,
        clean : null
    },

    /**
     * Permet de desactive les interactions (Draw) de la carte pour les extensions,
     * sauf l'interaction courrante (si elle est renseignée avec l'option 'current').
     * Il est possible d'ajouter des fonctionnalités via les options.
     * Par defaut, l'option 'clean' est renseignée...
     *
     * @param {Object} map - the map
     * @param {Object} options - options
     */
    unset : function (map, options) {
        logger.trace("unset()");

        var opts = {};
        Utils.mergeParams(opts, this._options);
        Utils.mergeParams(opts, options);

        var interactions = map.getInteractions().getArray();
        for (var i = 0; i < interactions.length; i++) {
            if (interactions[i].getActive() &&
                (interactions[i] instanceof DrawInteraction ||
                    interactions[i] instanceof SelectInteraction ||
                    interactions[i] instanceof ModifyInteraction)) {
                var prop = interactions[i].getProperties();
                var name = prop.name;
                if (typeof name !== "undefined" && this._extensions.indexOf(name) > -1) {
                    // doit on desactiver l'interaction courrante ?
                    if (opts.current && opts.current === name) {
                        continue;
                    }
                    interactions[i].setActive(false);
                    // instance de l'extension
                    var source = prop.source;
                    if (typeof source !== "undefined" && source instanceof Control) {
                        // opérations sur le composant graphique
                        for (var action in opts) {
                            if (opts.hasOwnProperty(action)) {
                                if (action === "current") {
                                    continue;
                                }
                                if (typeof source[action] === "function") {
                                    var args = Array.isArray(opts[action]) ? opts[action] : [opts[action]];
                                    source[action].apply(source, args);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default Interactions;
