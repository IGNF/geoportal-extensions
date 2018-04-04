var ElevationPathDOM = {

    /**
    * Add uuid to the tag ID
    * @param {String} id - id selector
    * @returns {String} uid - id selector with an unique id
    */
    _addUID : function (id) {
        var uid = (this._uid) ? id + "-" + this._uid : id;
        return uid;
    },

    /**
     * Main container (DOM)
     *
     * @returns {DOMElement} DOM element
     */
    _createMainContainerElement : function () {
        var container = document.createElement("div");
        container.id = this._addUID("GPelevationPath");
        container.className = "GPwidget";
        return container;
    },

    // ################################################################### //
    // ################# Methods to display Main Panel ################### //
    // ################################################################### //

    /**
     * Hidden checkbox for minimizing/maximizing panel
     *
     * @returns {DOMElement} DOM element
     */
    _createShowElevationPathElement : function () {
        var input = document.createElement("input");
        input.id = this._addUID("GPshowElevationPath");
        input.type = "checkbox";
        return input;
    },

    /**
     * Show control
     * see event !
     *
     * @returns {DOMElement} DOM element
     */
    _createShowElevationPathPictoElement : function () {
        // contexte d'execution
        var context = this;

        var label = document.createElement("label");
        label.id = this._addUID("GPshowElevationPathPicto");
        label.className = "GPshowAdvancedToolPicto";
        label.htmlFor = this._addUID("GPshowElevationPath");
        label.title = "Calculer un profil";

        // gestionnaire d'evenement :
        // on ouvre le menu de saisie de saisie
        // L'ouverture/Fermeture permet de faire le menage
        // (reinitialisation)
        if (label.addEventListener) {
            label.addEventListener("click", function (e) {
                context.onShowElevationPathClick(e);
            });
        } else if (label.attachEvent) {
            label.attachEvent("onclick", function (e) {
                context.onShowElevationPathClick(e);
            });
        }

        var spanOpen = document.createElement("span");
        spanOpen.id = this._addUID("GPshowElevationPathOpen");
        spanOpen.className = "GPshowAdvancedToolOpen";
        label.appendChild(spanOpen);

        return label;
    },

    // ################################################################### //
    // ######################### Methods to Panel ######################## //
    // ################################################################### //

    /**
     * Create Container Panel
     *
     * FIXME
     * don't call this._createElevationPathPanelHeaderElement
     * don't call this._createElevationPathPanelProfilElement
     *
     * @returns {DOMElement} DOM element
     */
    _createElevationPathPanelElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPelevationPathPanel");
        div.className = "GPpanel";

        // div.appendChild(this._createElevationPathPanelHeaderElement());
        // div.appendChild(this._createElevationPathPanelProfilElement());

        return div;
    },

    /**
     * Create Header Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createElevationPathPanelHeaderElement : function () {
        var self = this;

        var container = document.createElement("div");
        container.className = "GPpanelHeader";

        var divInfo = document.createElement("div");
        divInfo.id = this._addUID("GPelevationPathPanelInfo");
        divInfo.className = "GPpanelInfo";
        divInfo.title = "Informations";
        // add event on click
        if (divInfo.addEventListener) {
            divInfo.addEventListener(
                "click",
                function () {
                    self.onOpenElevationPathInfoClick();
                }
            );
        } else if (divInfo.attachEvent) {
            // internet explorer
            divInfo.attachEvent(
                "onclick",
                function () {
                    self.onOpenElevationPathInfoClick();
                }
            );
        }
        container.appendChild(divInfo);

        var divTitle = document.createElement("div");
        divTitle.className = "GPpanelTitle";
        divTitle.innerHTML = "Profil Altimétrique";
        container.appendChild(divTitle);

        var divReduce = document.createElement("div");
        divReduce.id = this._addUID("GPelevationPathPanelReduce");
        divReduce.className = "GPpanelReduce";
        divReduce.title = "Masquer le panneau";

        if (divReduce.addEventListener) {
            divReduce.addEventListener("click", function () {
                if (typeof self.onReduceElevationPathPanelClick === "function") {
                    document.getElementById(self._addUID("GPshowElevationPath")).checked = false;
                    self.onReduceElevationPathPanelClick();
                }
            }, false);
        } else if (divReduce.attachEvent) {
            divReduce.attachEvent("onclick", function () {
                if (typeof self.onReduceElevationPathPanelClick === "function") {
                    document.getElementById(self._addUID("GPshowElevationPath")).checked = false;
                    self.onReduceElevationPathPanelClick();
                }
            });
        }
        container.appendChild(divReduce);

        var divClose = document.createElement("div");
        divClose.id = this._addUID("GPelevationPathPanelClose");
        divClose.className = "GPpanelClose";
        divClose.title = "Fermer le panneau";

        // Link panel close / visibility checkbox
        if (divClose.addEventListener) {
            divClose.addEventListener("click", function () {
                document.getElementById(self._addUID("GPshowElevationPathPicto")).click();
            }, false);
        } else if (divClose.attachEvent) {
            divClose.attachEvent("onclick", function () {
                document.getElementById(self._addUID("GPshowElevationPathPicto")).click();
            });
        }
        container.appendChild(divClose);

        return container;
    },

    /**
     * Create Form
     * see evenement !
     *
     * @returns {DOMElement} DOM element
     */
    _createElevationPathPanelProfilElement : function () {
        var div = document.createElement("div");
        div.id = "GPelevationPathProfil";

        return div;
    },

    /**
     * Create Waiting Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createElevationPathWaitingElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPelevationPathCalcWaitingContainer");
        div.className = "GPelevationPathCalcWaitingContainerHidden";

        var p = document.createElement("p");
        p.className = "GPelevationPathCalcWaiting";
        p.innerHTML = "Calcul en cours...";

        div.appendChild(p);

        return div;
    },

    /**
     * Create information Panel
     *
     * @returns {DOMElement} DOM element
     */
    _createElevationPathInformationsElement : function () {
        var div = document.createElement("div");
        div.id = this._addUID("GPelevationPathInformationsContainer");
        div.className = "GPelevationPathInformationsContainerHidden";

        var p = document.createElement("p");
        p.className = "GPelevationPathInformations";
        p.innerHTML = "Aucune information...";
        div.appendChild(p);

        return div;
    },

    /**
     * Add a information into Panel
     *
     * @param {String} value - value of item
     * @returns {DOMElement} DOM element
     */
    _addElevationPathInformationsItem : function (value) {
        var div = document.getElementById(this._addUID("GPelevationPathInformationsContainer"));

        if (div) {
            var p = document.createElement("p");
            p.className = "GPelevationPathInformations";
            p.innerHTML = value;
            div.appendChild(p);
        }

        return div;
    }
};

export default ElevationPathDOM;
