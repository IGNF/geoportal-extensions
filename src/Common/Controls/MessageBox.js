import Logger from "../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("message");

/**
* Utilisation de la fonction "MessageBox.show()"
*
* @example
*
* import MessageBox from "MessageBox";
*
* MessageBox.show({
*   duration : 1,
*   message : "Mon message...",
*   severity : 0,
*   close : false,
*   target : document.getElementById("panel"),
* });
*
* // Exemple avec l'option "target" :
* // <div id="container">
* //     <div/>
* //     <label/>
* //     <input/>
* // </div>
* // Avec target = document.getElementById("container"),
* // la DIV de la popup est ajoutée à la fin du container :
* //     <div id="container">
* //         <div/>
* //         <label/>
* //         <input/>
* //         <div class="GpMessageBox GpBoxSeverityWarning">
* //             <div class="GpBoxText">Attention !!!</div>
* //             <div class="GpBoxClose" title="Fermer le panneau"></div>
* //         </div>
* //     </div>
* //
* // Le DOM de la popup de message :
* //    <div class="GpMessageBox GpBoxSeverity [GpBoxCenter GpBoxDuration]">
* //        <div class="GpBoxText">{message}</div>
* //        [<div class="GpBoxClose"</div>]
* //    </div>
* // EVOL : Cette DIV n'est pas unique afin d'avoir une pile de message...
* //
* // La gestion des styles :
* //    .GpMessageBox
* //    .GpBoxSeverity(Info | Warning | Error)
* //    .GpBoxClose
* //    .GpBoxText
* //    .GpBoxDuration
* //    .GpBoxCenter
*/
var MessageBox = {
    /**
    * Options par defaut
    * @example
    * // - duration : 4 seconde avant fermeture du messages,
    * //       si 0, la fermeture se fait via un clic sur la croix ou sur la popup.
    * // - message : message à afficher
    * // - severity : 0 pour informatif, 1 pour warning et 2 pour erreur,
    * //       le couleur du message est en fonction de la gravité.
    * // - close : icone de fermeture de la popup (croix),
    * // - target : container pour emplacement du DOM de la popup,
    * //       si non renseigné (null), la popup s'affiche au centre de la page.
    */
    _options : {
        duration : 4,
        message : "",
        severity : 0,
        close : false,
        target : null
    },

    /**
    * Affichage de la popup de message
    * @param {Object} options - options
    * @returns {HTMLElement} dom
    */
    show : function (options) {
        logger.trace("MessageBox:show()", options);

        // Gestion des options
        var opts = this._setOptions(options);
        logger.trace("MessageBox:Options", opts);

        // Creation du DOM
        var dom = this._setDOM(opts);
        logger.trace("MessageBox:DOM", dom);

        return dom;
    },

    /**
    * (alias) Affichage de la popup d'information.
    * Centrage de la popup sur la page.
    * @param {String} message - message
    * @returns {HTMLElement} dom
    */
    info : function (message) {
        logger.trace("MessageBox:info()", message);
        return this.show({
            message : message,
            severity : 0
        });
    },

    /**
    * (alias) Affichage de la popup d'avertissement.
    * Centrage de la popup sur la page.
    * @param {String} message - message
    * @returns {HTMLElement} dom
    */
    warning : function (message) {
        logger.trace("MessageBox:warning()", message);
        return this.show({
            message : message,
            severity : 1
        });
    },

    /**
    * (alias) Affichage de la popup d'erreur.
    * Centrage de la popup sur la page.
    * @param {String} message - message
    * @returns {HTMLElement} dom
    */
    error : function (message) {
        logger.trace("MessageBox:error()", message);
        return this.show({
            message : message,
            severity : 2
        });
    },

    /**
    * validation des options
    * @param {Object} options - options
    * @returns {Object} options
    */
    _setOptions : function (options) {
        logger.trace("MessageBox:_setOptions()", options);
        this.options = {}; // reinit des options car c'est un objet partagé !
        var _opts = Object.assign(this.options, this._options, options);
        return _opts;
    },

    /**
    * creation du DOM
    * @param {Object} options - options
    * @returns {HTMLElement} dom
    */
    _setDOM : function (options) {
        logger.trace("MessageBox:_setDOM()", options);
        var opts = options || {};

        // creation de la DIV :
        var container = document.createElement("div");
        container.className = "GpMessageBox";
        // evenement clic sur la DIV
        container.addEventListener("click", function (e) {
            // suppression de la DIV
            logger.trace("Event on GpMessageBox");
            var parent = opts.target;
            if (parent) {
                var elements = parent.getElementsByClassName("GpMessageBox");
                while (elements.length > 0) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            }
        });
        // classe severity
        container.className += (opts.severity === 1) ? " GpBoxSeverityWarning" : (opts.severity === 2) ? " GpBoxSeverityError" : " GpBoxSeverityInfo";
        // classe duration
        if (typeof opts.duration === "undefined" || opts.duration) {
            container.className += " GpBoxDuration"; // TODO CSS...
        }
        // classe target
        if (typeof opts.target === "undefined" || opts.target === null) {
            opts.target = document.body;
            container.className += " GpBoxCenter";
        }
        // fermeture differée
        if (opts.duration) {
            var ms = opts.duration * 1000;
            setTimeout(function () {
                container.click();
            }, ms);
        }
        // message
        var divText = document.createElement("div");
        divText.className = "GpBoxText";
        divText.innerHTML = opts.message || "";
        container.appendChild(divText);
        // icone de fermeture
        if (opts.close) {
            var divClose = document.createElement("div");
            divClose.className = "GpBoxClose"; // FIXME CSS l'icone est coupé !?
            divClose.title = "Fermer le panneau";
            divClose.addEventListener("click", function (e) {
                // suppression de la DIV
                logger.trace("Event on GpBoxClose");
                container.click();
            });
            container.appendChild(divClose);
        }
        // retourne le container
        var dom = opts.target.appendChild(container);
        return dom;
    }
};

export default MessageBox;
