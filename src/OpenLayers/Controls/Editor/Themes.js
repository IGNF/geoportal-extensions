import EventBus from "eventbus";
import EventEditor from "./Event";
import Logger from "../../../Common/Utils/LoggerByDefault";

var logger = Logger.getLogger("editor-themes");

/**
 * @classdesc
 *
 * Mapbox Themes management
 *
 * @constructor
 * @param {Object} options - options for function call.
 * @example
 *   var theme = new Themes ({
 *        target: ...,
 *        obj: {
 *          description: "",
 *          themes: [{
 *             image: "data/images/layer0.png",
 *             label: "standard0",
 *             style: "data/styles/layer0.json",
 *          },{
 *             image: "data/images/layer1.png",
 *             label: "standard1",
 *             style: "data/styles/layer1.json",
 *          }]
 *        }
 *   });
 */
function Themes (options) {
    logger.trace("[constructor] Themes", options);

    // options
    this.options = options || {
        // TODO default...
    };

    if (!(this instanceof Themes)) {
        throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    this._initialize();

    this._initContainer();
};

/**
 * Constructor (alias)
 *
 * @private
 */
Themes.prototype.constructor = Themes;

/**
 * Initialize component
 * (called by constructor)
 *
 * @private
 */
Themes.prototype._initialize = function () {
    if (!this.options.target) {
        // cf. add()
    }

    if (!this.options.obj) {
        // FIXME vide ?
        this.options.obj = {
            description : "", // TODO une description au survol de l'image ou titre...
            themes : []
        };
    }

    this.container = null;

    // DOM : className or id
    this.name = {
        target : "GPEditorMapBoxThemeTarget",
        container : "GPEditorMapBoxThemesContainer",
        containertheme : "GPEditorMapBoxThemeContainer",
        label : "GPEditorMapBoxThemeTitle",
        image : "GPEditorMapBoxThemeImage",
        message : "GPEditorMapBoxThemeMessage"
    };
};

/**
 * Graphical rendering of the component
 * (called by constructor)
 *
 * @private
 * @example
 *  <div class="GPEditorMapBoxThemesContainer">
 *      <div id="GPEditorMapBoxThemeContainer-1" class="GPEditorMapBoxThemeContainer">
 *          <img class="GPEditorMapBoxThemeImage" src="http://image1.png" alt="Description1"></img>
 *          <label class="GPEditorMapBoxThemeTitle">Titre1</label>
 *      </div>
 *      <div id="GPEditorMapBoxThemeContainer-2" class="GPEditorMapBoxThemeContainer">
 *          <img class="GPEditorMapBoxThemeImage" src="http://image2.png" alt="Description2"></img>
 *          <label class="GPEditorMapBoxThemeTitle">Titre2</label>
 *      </div>
 * </div>
 */
Themes.prototype._initContainer = function () {
    // contexte
    var self = this;

    var obj = this.options.obj;

    var div = document.createElement("div");
    div.className = this.name.container;

    for (var i = 0; i < obj.themes.length; i++) {
        var _theme = obj.themes[i];

        var divTheme = document.createElement("div");
        divTheme.id = this.name.containertheme + "-" + i;
        divTheme.className = this.name.containertheme;

        var _url = _theme.style;
        if (_url && _url !== "") {
            if (_theme.image) {
                var _img = document.createElement("img");
                _img.className = this.name.image;
                _img.src = _theme.image;
                _img.alt = _theme.image;
                _img.data = _url;
                if (_img.addEventListener) {
                    _img.addEventListener("click", function (e) {
                        self.onClickImageMapBox(e);
                    });
                } else if (_img.attachEvent) {
                    _img.attachEvent("onclick", function (e) {
                        self.onClickImageMapBox(e);
                    });
                }
                divTheme.appendChild(_img);
            }

            if (_theme.label) {
                var _label = document.createElement("label");
                _label.className = this.name.label;
                _label.innerHTML = _theme.label;
                _label.data = _url;
                if (_label.addEventListener) {
                    _label.addEventListener("click", function (e) {
                        self.onClickTitleMapBox(e);
                    });
                } else if (_label.attachEvent) {
                    _label.attachEvent("onclick", function (e) {
                        self.onClickTitleMapBox(e);
                    });
                }
                divTheme.appendChild(_label);
            }
        } else {
            var _msg = document.createElement("label");
            _msg.className = this.name.message;
            _msg.innerHTML = "Thème non disponible...";
            divTheme.appendChild(_msg);
        }

        div.appendChild(divTheme);
    }

    this.container = div;
};

// ################################################################### //
// ##################### public methods ############################## //
// ################################################################### //

/**
 * Add element into target DOM
 */
Themes.prototype.add = function () {
    if (!this.options.target) {
        if (!document.getElementById(this.name.target)) {
            var div = document.createElement("div");
            div.id = this.name.target;
            var node = document.documentElement ||
            document.getElementsByTagName("body")[0] ||
            document.getElementsByTagName("head")[0];
            node.appendChild(div);
        }
        this.options.target = document.getElementById(this.name.target);
    }
    if (this.container) {
        this.options.target.appendChild(this.container);
    }
};

/**
 * Set display container (DOM)
 *
 * @param {Boolean} display - show/hidden container
 */
Themes.prototype.display = function (display) {
    this.container.style.display = (display) ? "flex" : "none";
};

// ################################################################### //
// ####################### handlers events to dom #################### //
// ################################################################### //

/**
 * this method is called by event '' on '' tag form
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Themes#editor:themes:image
 */
Themes.prototype.onClickImageMapBox = function (e) {
    logger.warn("onClickImageMapBox, it's not yet implemented !", e);
    EventBus.dispatch(EventEditor.themes.image, e);
};

/**
 * this method is called by event '' on '' tag form
 *
 * @param {Object} e - HTMLElement
 * @private
 * @fires Themes#editor:themes:title
 */
Themes.prototype.onClickTitleMapBox = function (e) {
    logger.warn("onClickTitleMapBox, it's not yet implemented !", e);
    EventBus.dispatch(EventEditor.themes.title, e);
};

export default Themes;
