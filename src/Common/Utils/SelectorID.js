/**
 * formalisme d'un tag ID :
 * -> NAME(_ORDER)-1460636385836
 *
 * Ex.
 *   GProutePoints-1460636385836
 *   GProutePoint_10-1460636385836
 */
var SelectorID = {

    /**
     * Construction d'un identifiant statique basé sur le timestamp,
     * et qui s'incremente de +1 à chaque appel
     */
    generate : (function () {
        var timestamp = Math.floor(Date.now());
        return function () {
            return timestamp++;
        };
    })(),

    /**
     * nom du tag
     * @param {String} id - the id
     *
     * @returns {String} index
     */
    name : function (id) {
        var name = null;

        var i = id.lastIndexOf("-");
        if (i === -1) {
            name = id;
        } else {
            name = id.substring(0, i);
        }

        return name;
    },

    /**
     * numero d'identifiant du tag
     * @param {String} id - the id
     *
     * @returns {String} index
     */
    index : function (id) {
        var index = null;

        var name = this.name(id);
        // if (name !== id) {
        var i = name.lastIndexOf("_");
        if (i !== -1) {
            index = name.substring(i + 1);
        }
        // }

        return index;
    },

    /**
     * uuid du tag
     * @param {String} id - the id
     *
     * @returns {String} uuid
     */
    uuid : function (id) {
        var uuid = null;

        var i = id.lastIndexOf("-");
        if (i !== -1) {
            uuid = parseInt(id.substring(i + 1), 10);
        }

        return uuid;
    }

};

export default SelectorID;
