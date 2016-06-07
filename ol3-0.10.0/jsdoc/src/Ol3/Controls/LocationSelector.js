define([
    "ol",
    "Ol3/Utils",
    'require',
    "gp",
    "Common/Utils/CheckRightManagement",
    "Common/Utils/SelectorID",
    "Common/Controls/LocationSelectorDOM"
], function (
    ol,
    Utils,
    woodman,
    Gp,
    RightManagement,
    SelectorID,
    LocationSelectorDOM
) {

    "use strict";

    
    

    /**
     * @classdesc
     *
     * LocationSelector component. Enables to select a location, using autocompletion or picking location on the map
     * @param {Object} [options] - component options
     * @param {Boolean} [options.displayInfo = true] - whether to display info in a popup or not (not implemented yet) Default is true
     * @param {Object} [options.tag] - tag options
     * @param {Number} [options.tag.id = 1] - order id number in a locations group, in case several LocationSelector are used. For instance in route case : departure tag id should be 0, arrival tag id should be 1, and other ones : 2, 3, ...
     * @param {Number} [options.tag.groupId = null] - locationSelector global component id (in case locationSelector is called by another graphic component, e.g. route control)
     * @param {String} [options.tag.label] - text to display in component (e.g. "Departure"). Default is ">"
     * @param {String} [options.tag.type = "inter"] - marker type : "departure", "arrival" or "inter"; Default is "inter"
     * @param {Boolean} [options.tag.display = true] - whether to display or hide component. Default is true
     * @param {Boolean} [options.tag.addOption = false] - whether to display picto to add another LocationSelector (in case of route control)
     * @param {Boolean} [options.tag.removeOption = false] - whether to display picto to remove a LocationSelector (in case of route control)
     * @param {Object} [options.autocompleteOptions] - autocomplete service options (see http://horus.ign.fr/specs-apiv3/bibacces/dd_services_autocompletion.html to know all autocomplete options)
     */
    function LocationSelector (options) {

        options = options || {};

        if (!(this instanceof LocationSelector)) {
            throw new TypeError("ERROR CLASS_CONSTRUCTOR");
        }

        // initialisation du composant
        this.initialize(options);

        // creation du DOM
        this._container = this._initContainer();

        // on peut éventuellement encapsuler le composant dans une div passée par l'utilisateur
        // (le composant étant positionné en relatif, il doit être positionné dans une div si utilisé seul)
        if ( options.element && options.element.appendChild ) {
            options.element.appendChild(this._container);
            this._container = options.element;
        }

        // call ol.control.Control constructor
        ol.control.Control.call(this,
            {
                element : this._container,
                target : options.target,
                render : options.render
            }
        );
    };
    // Inherits from ol.control.Control
    ol.inherits(LocationSelector, ol.control.Control);

    /**
     * @lends module:LocationSelector
     */
    LocationSelector.prototype = Object.create(ol.control.Control.prototype, {});

    Utils.assign(LocationSelector.prototype, LocationSelectorDOM);

    /**
     * Constructor (alias)
     */
    LocationSelector.prototype.constructor = LocationSelector;

    /**
     * initialize component
     */
    LocationSelector.prototype.initialize = function (options) {

        // set default options
        this.options = {
            tag : {
                id : 1, // numero d'ordre sur un groupe de locations
                groupId : null, // id du composant global contenant le LocationSelector
                label : ">",
                type : "inter",
                display : true,
                addOption : false,
                removeOption : false
            },
            displayInfo : true,
            autocompleteOptions : {}
        };

        // merge with user options
        Utils.mergeParams(this.options, options);

        /** uuid */
        this._uid = this.options.tag.groupId || SelectorID.generate();
        // info : si un uid (groupId) est spécifié
        // (par ex si ce composant est appélé par un autre composant graphique)
        // alors on le récupère, sinon c'est qu'il est indépendant : on génère donc un uuid

        /** container map */
        this._map = null;

        /** container principal des entrées  */
        this._inputsContainer = null;

        /** container du label du point */
        this._inputLabelContainer = null;

        /** container de la saisi de l'autocompletion */
        this._inputAutoCompleteContainer = null;

        /** container du pointer de saisi sur la carte */
        this._inputShowPointerContainer = null;

        /** label du pointer de saisi sur la carte (avec img) */
        this._inputShowPointer = null;

        /** container des coordonnées */
        this._inputCoordinateContainer = null;

        /** elements pour ajouter ou supprimer un nouveau point */
        this._addPointElement = null;
        this._removePointElement = null;

        /** coordonnées du point selectionné, en EPSG:4326 */
        this._coordinate = null;

        /** container des reponses de l'autocompletion */
        this._suggestedContainer = null;

        /** listes des reponses de l'autocompletion */
        this._suggestedLocations = [];

        /** localisant */
        this._currentLocation = null;

        /** marker */
        this._marker = null;
        if ( this.options.tag.type === "inter" ) {
            // point intermédiaire (le plus clair)
            this._markerUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARDSURBVFiF3ZndaxxVGMZ/Z/YjX00Nadpo1qrFBgu56D9QbAtiLoRC7ywSNK1NURRREBKRFlSwFBW0gnSrJXY1CmISgyjFiyYSFC9ajE3MmpjdjWlMUtNos9lN9mteLzbRuCbZmTMTBB+Yi51znvd5n3nPnjnnjBIR/i/wuh4xpCpI0ojiENAA1AE1wCzwKzCE0EM5l2iShJvSyrXKnFVb8dOK4hmg3AIjifAmaU7ztMy7kYI7Zs6rQwjvka+AXcyiOMZx6XGahuE0AEHVitCFnhGAGoQugqrVaSrOKpNP4FWnSaxCGy1yWpesbyY/tLpwo7p/w0RxWHfI6Zk5q7ZSwhj6Q2sjzJLiXp1JQe+p+mllc4wA1CzHtw37lQmpCha5gbXpVxdJythh9z1kvzJJGrFixPBmOXixl+Z4mONmguZ4mIMXezG8WQsq5cs6tmDfTP7NXiSqN0vTzBD1TQfwbdmDUhX4tuyhvukATTNDlgxZ0SmUtUsgv0TZGPsv9FNSvXfNtpLqvey/0O+KTgF0zNQV7XHP4dsdtVvVKYCOmeqiPbwVOx21W9UpgI6ZWNEe2cSEo3arOgWwb0YYLp5G17Sjdqs6BdCZzYqL9B3dR2puYM221NwAfUf3uaJTAB0zaye5GmbWS6i2gdFQL5mFMCIJMgthRkO9hGobMLPFN4VWdAoptlcAQeUDRoG77YrZwDhQT4tk7JDsV6ZFMggv2+bZwyt2jYDuQnOa94GIFrc4IkzRrkPUM3NKsijatLjF0copsbJ++xec7TTPqw6EI/oB/glT+PC+13Y/aSQNv/Is+tNer09lMn7DMHwAYppp8fvTIpISkVQsFrslqww4M9OuqkgzANzl1MhCyrjZGAycm573pK1yFCyi5FoWvo/FYlPOT2fOqftRXMbB9lkEs+3zbe2f/FD5i3YMj2p3vn8/IV8DZ5yE+Gqkot+JEQCPada5dRhxEriiQ5ya90w+272916F+KpnJDLhjpkUy5HgESNqhZU2Vfr5ne+dSFtOBeso06J6cnEy6d0z0hPwEPGeH8sGVykvfjpfe1NZUci2+mHg7Go2G8z/d/goQVJ9B8S1veMYffujduo/thl+ZwUzDuBqJRGZWt7n/FcDH46lFNVLilar1uiTTxsJTnTssH/QpJVlMNQa5wbGJiWERya3Vz30zzfLb3OveY3dU5j5dp4e80Xdbd3TOu/H/yyAtpjnqgeGS8crRQRks+v5xf5gtY/KM/6NAVebhwvv90bLvHu2o/XId2pJSMmIaxo/RaHRMxN6yZtPM0K5K/7hl/FxVZgZWbs0mPDceeKcuGE95/kpSKUmaImHDNIfHrl+PiIj2zOb+MFvBY7IUOVl2ZG9g6bJH4ckJuRe/2NYZT3myKIkrGM4pNRyLjY+LW09URDb1+uaF0pfm3zJ+7zhRGdq1c9eDuwOBOzdLa/OG2X+APwE8DU64Y/5gfAAAAABJRU5ErkJggg==";
        } else if ( this.options.tag.type === "arrival" ) {
            // point d'arrivée (le plus foncé)
            this._markerUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQxSURBVFiF3ZldaBxVFMd/d2ayTRtjQpo2mlilWBEMshoj+FAERZIHIdA3iw+V1icRREFIQAKNgsUHQfBFwZI2WgWxqYUiVTDBBj9ILC5Nu2tjdjemsR+mSZNNNvsxO8eHTTRuk+zMnQmCf9iHnXvO+Z//nDvn3rmjRIT/C6zAI4ZVFRbtKDpQNCM0AvXANIo/EC4inMbmLBFZDJJaBVaZJ9Sd2HQCrwDbXHikgfewOMKPMh9ECsGIeVx1IHxEsQJeMY3iEMNy2m8aht8AtKpOhH70hADUI/TTqjr9puKvMsUE3vabxCp0MSJHdJ31xRSnVj9BVPcfOCj26U45PTHFh30c/am1EaaxuF+nKejd1WLX2gwhAPXL8T3De2XCqooKbuCu/eoiTZ6dXtch75WxaMeNENOyOXx8kHOpGMPOIudSMQ4fH8S0bBcs25Z5PMF7ZVpVL3BgQxvTsvn6+kVq6sK3jc3NRGhraKZgl9t9HGNEXvCSmvfKKJrL2nQfHVpTCEBNXZjuo0OB8JTAu5jiXmtjPL3vLl/jbnlKoNPN6spaVFbt8jXulqcEOmKSZS0yi5O+xt3ylEBHTLSsxbf913yNu+UpgU4DKE/Sc3AvczORNcfmZiL0HNwbCE8JvItxWDvJ1SjYFm0NzZzpG2RpIYbIIksLMc70Dbpsy+54SqCzzlQAY8B9Xsk8YAJ4gBHJe3HyXpkRyaN407OfN7zlVQjobjTv4BgQ1/ItjzjV9Oo46okZEBuhS8u3PDoZEDf7t9vg903zBLBfP8C/4cAnD87teclIGyFlLoVyllWh8vmQYRgVAOI4OQmFciKSFZFsMpmck1UC/Il5VNViEgHu9StkQYyb7bNNH1wrmDm3PgqWUHLBhl+SyeRV/6czLepJDAbw8fos4HTNb+/9PFv9u3YMU/X6f38/L98B7/gJ8U2uasiPEADTcRqDOozoBn7WcbzqmFOvpnYM+uTPpvP5SDBiimvP8xRPKV3DFpV7fX7HyYyD44M96xicmpqaSgd3TDQsv6J4zYvLx5nqsz/kK29qcyq5kFpafD+RSMSKf4P+CvCY+hJFRzmzmB2KPTvb+JnX8CsdzDGM8/F4/PrqseC/AggvZlGXtyipXc8kLcbCy6mdrg/6lBIbR41DYXR8cjIqIoW17IIXc17+nHnEOnS3VfhiHQt5d7HmVMK2Nn6+DHLiOGMmRLdMVI+NymjZ9Sf4abaMqZbQp01G/rnS60P5rT8duNXw1TpuGaXksmMYlxKJxLiIt23NponhKVV5a874rdZwmlYuTTvmjWdmGj9Mifl3kkpJ2hGJGY4THb9yJS4i2p0t+Gm2ggHJxMNb94eNzIAJZgEKbyxsP5kS00ZJSkG0oFQ0mZyYkKDuqIhs6u/7hyt75luM2RMPVfft3rW7bU9T0z2bxbV50+w/wF8f81R5OpwBhwAAAABJRU5ErkJggg==";
        } else {
            // point de départ ou default
            this._markerUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAmCAYAAABpuqMCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQ+SURBVFiF3ZlLaFxlGIaf/5zJpJNpaoxpYieoCxULEYK7Lqp0IWQhFLooKNKEtNIULxWlQoJgQQWLFMEg0lQMuXgD0dRSkNJFgoy0IrYNSTpj08xMmoxNYhLUyUwyt/O5mFbjmGTOLS58d3O+y/u95/vnvx0lIvxf4HE9Y7PyU0ETwl6gAQgANcA88AswhuIsKc7TJ0k3qZVrnTmqtpGhHeFloMJERArF+3g5Qaf84UYJ7og5rPai+JhCB6xiHuEQp+Ws0zI0pwloU+0oBrAnBKAGxQBtqt1pKc46UyjgHadFrEIHXXLCbrB9MYWhNYAb3f0bBsI+u0POnpijahtpJrA/tDbCPOU8aGdSsPdWM7SzOUIAam7ntwzrnWlWfnzMYW76tYsUy9RaXYesd6aCJswI0Tw5WvuG6EyEOWUk6UyEae0bQvPkTLEUeCzBupjCyl4iqyfHydkxdh3YQ/nWnSjlp3zrTnYd2MPJ2TFTgszwFNNaDaCwRdkYLd1B/NWNa9r81Y20dAdd4SmCHTGBkh6P7bvXkd0sTxHsiKku6eH13+fIbpanCHbExEp6ZJJTjuxmeYpgXYwiVNLnysCMI7tZniLYmc1Kk/Qe3E1ycXhNW3JxmN6Du13hKYIdMWsXuRpGzsOxugYu9Q+RXgojkiS9FOZS/xDH6howcqUPhWZ4imB9B9CmyoBx4AGrZBYwCTxMl2StBFnvTJdkUbxlOc4a3rYqBOxuNHfQC0RsxZZGhAA9dgLtiTkuOYQOW7Gl0c5xMbN/+xecnTQPq89QPGM/wT9hCJ8+MvjQ81pK8yp92ZvxeMpUNuvVNK0MQAwjI15vRkTSIpKOxWK/yyoBzsS0qiq8DAP3OxWylNMWmoL1XTMresZsjIJllIzk4GosFrvl/HbmiHoCYRAHx2cBo2Pknp4v45U3befQVY/z8/sp+Q5410mKC7P+oBMhALphBNy6jHgDxU92Am+t6PFXhrcPOeRPp7LZYXfEdEkWjWeBlJWwnKEyr41s/3rFwHDAnjY0zsTj8ZR710Qfys/Aq1ZCPrlZef7iwpYF25xKRhLLyQ+i0Wi48NPtrwBt6hsofeQNJ7zhp74PfGE1/Z0ZzNC0y5FIZHa1zf2vAFmeS2vqerkuVeu5pPLa0otXa01f9CklOQw1AfnRiampkIjk1/JzX0y3/LrY7Dm0w5f/ah0Pee/GXWeiSc/G/y+NjBjGuA6h8snK8VEZLbn+uD/MbiPe7P283pd9uvh5cMH3Q8uPdd+uE7ailFw3NO1aNBqdELG2rdk0MbSqLb8p7UZVmVF/59F8Wp97Mhg4ncjqfxWplKQMkbBmGKGJ6emIiNie2TZPDHB5v+/xxrtXBnWFnhfyL1yp/ejCXMUMShIKQnmlQrFYbFJcKmJTxQBc3O9789FtmZfOzfjPvT5S068bmWvj09PTm8G16WL+S/wJLybNu1V6htkAAAAASUVORK5CYII=";
        }

        /** ressources du services d'autocompletion (ayant droit!) */
        this._resources = {};

        /** a t on des droits sur les ressources du service ? */
        this._noRightManagement = false;

        // gestion des droits sur les ressources/services
        this._checkRightsManagement();

    };

    // ################################################################### //
    // ########################## publics methods ######################## //
    // ################################################################### //

    /**
     * get coordinate
     *
     * @returns {Array} this._coordinate - point coordinate (EPSG:4326) : [lon, lat]
     */
    LocationSelector.prototype.getCoordinate = function () {
        return this._coordinate;
    };

    /**
     * clean input
     */
    LocationSelector.prototype.clear = function () {
        this._clearResults();
        this._inputLabelContainer.click();
    };

    // ################################################################### //
    // ##################### init component (private) #################### //
    // ################################################################### //

    /**
     * check
     */
    LocationSelector.prototype._checkRightsManagement = function () {
        // les ressources du service d'autocompletion
        var _opts = this.options.autocompleteOptions.filterOptions;
        var _res  = (_opts) ? _opts.type : [];
        if (! _res || _res.length === 0) {
            _res = [
                "PositionOfInterest",
                "StreetAddress"
            ];
        }

        var rightManagement = RightManagement.check({
            key : this.options.apiKey,
            resources : _res,
            services : ["AutoCompletion"]
        });

        if (! rightManagement) {
            this._noRightManagement = true;
        }

        // on recupère les informations utiles
        // sur ce controle, on ne s'occupe pas de la ressource car elle est unique...
        // Ex. la clef API issue de l'autoconfiguration si elle n'a pas
        // été renseignée.
        if (! this.options.apiKey) {
            this.options.apiKey = rightManagement.key;
        }

        Utils.assign(this._resources, rightManagement);

    };

    /**
     * initialize component container
     */
    LocationSelector.prototype._initContainer = function () {

        var id = this.options.tag.id;

        // create main container
        var container = this._createMainContainerElement();

        var inputs = this._inputsContainer = this._createLocationPointElement(id, this.options.tag.display);
        container.appendChild(inputs);

        var _inputLabel = this._inputLabelContainer = this._createLocationPointLabelElement(id, this.options.tag.label);
        inputs.appendChild(_inputLabel);
        var _inputAutoComplete = this._inputAutoCompleteContainer = this._createLocationAutoCompleteteInputElement(id);
        var context = this;
        if ( _inputAutoComplete.addEventListener ) {
            _inputAutoComplete.addEventListener("click", function () {
                context.onAutoCompleteInputClick();
            });
        } else if (_inputAutoComplete.attachEvent) {
            _inputAutoComplete.attachEvent("onclick", function () {
                context.onAutoCompleteInputClick();
            });
        }
        inputs.appendChild(_inputAutoComplete);
        var _inputCoordinate = this._inputCoordinateContainer = this._createLocationCoordinateInputElement(id);
        inputs.appendChild(_inputCoordinate);
        var _inputShowPointer = this._inputShowPointerContainer = this._createLocationPointerShowInputElement(id);
        inputs.appendChild(_inputShowPointer);
        var _inputPointer = this._inputShowPointer = this._createLocationPointerInputElement(id);
        inputs.appendChild(_inputPointer);

        if (this.options.tag.addOption) {
            var _inputAddStage = this._addPointElement = this._createLocationAddPointElement();
            inputs.appendChild(_inputAddStage);
        }

        if (this.options.tag.removeOption) {
            var _inputRemoveStage = this._removePointElement = this._createLocationRemovePointElement(id);
            inputs.appendChild(_inputRemoveStage);
        }

        var results  = this._suggestedContainer = this._createLocationAutoCompleteResultElement(id);
        container.appendChild(results);

        return container;
    };

    // ################################################################### //
    // ###################### handlers events (dom) ###################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on 'GPlocationOrigin' input
     *
     * @private
     */
    LocationSelector.prototype.onAutoCompleteInputClick = function () {
        if ( this._inputAutoCompleteContainer && this._inputAutoCompleteContainer.value.length > 2) {
            this._displaySuggestedLocation();
        }
    };

    /**
     * this method is called by event 'keyup' on 'GProuteOrigin' tag input
     * (cf. this._createRouteAutoCompleteteInputElement), and it gets the value of input.
     * this value is passed as a parameter for the service autocomplete (text).
     * the results of the request are displayed into a drop down menu.
     * FIXME
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    LocationSelector.prototype.onAutoCompleteSearchText = function (e) {

        var value = e.target.value;
        if (!value) {
            return;
        }

        // aucun droits !
        // on evite une requête...
        if (this._noRightManagement) {
            console.log("no rights for this service !?");
            return;
        }

        // on sauvegarde le localisant
        this._currentLocation = value;

        // on limite les requêtes à partir de 3 car. saisie !
        if (value.length < 3) {
            this._clearSuggestedLocation();
            return;
        }

        // INFORMATION
        // on effectue la requête au service d'autocompletion.
        // on met en place des callbacks afin de recuperer les resultats ou
        // les messages d'erreurs du service.
        // les resultats sont affichés dans une liste deroulante.
        // les messages d'erreurs sont affichés sur la console (?)
        var context = this;
        this._requestAutoComplete({
            text : value,
            maximumResponses : 5, // FIXME je limite le nombre de reponse car le container DOM est limité dans l'affichage !!!
            /** callback onSuccess */
            onSuccess : function (results) {
                if (results) {
                    var locations = results.suggestedLocations;
                    context._fillAutoCompletedLocationListContainer(locations);
                }
            },
            /** callback onFailure */
            onFailure : function (error) {
                // FIXME
                // où affiche t on les messages : ex. 'No suggestion matching the search' ?
                // doit on nettoyer la liste des suggestions dernierement enregistrée :
                context._clearSuggestedLocation();
                
            }
        });

        var map = this.getMap();
        map.on(
            "click",
            this._hideSuggestedLocation,
            this
        );
        map.on(
            "pointerdrag",
            this._hideSuggestedLocation,
            this
        );
    };

    /**
     * this method is called by event 'click' on 'GPautoCompleteResultsList' tag div
     * (cf. this._createAutoCompleteListElement), and it selects the location.
     * this location displays a marker on the map.
     * FIXME
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    LocationSelector.prototype.onAutoCompletedResultsItemClick = function (e) {

        var idx = SelectorID.index(e.target.id);

        if (!idx) {
            return;
        }

        // FIXME
        // les coordonnées sont inversées entre les 2 services !?
        // AutoCompletion : lon/lat ("EPSG:4326")
        // Geocoding : lat/lon
        var position = [
            this._suggestedLocations[idx].position.x,
            this._suggestedLocations[idx].position.y
        ];
        // on sauvegarde le point courant (en EPSG:4326, [lon, lat])
        this._coordinate = position;

        var info = {
            type : this._suggestedLocations[idx].type,
            fields : this._suggestedLocations[idx]
        };

        // on ajoute le texte de l'autocomplétion dans l'input
        var label = this._suggestedLocations[idx].fullText;
        this._setLabel(label);

        // Info : la position est en EPSG:4326, à transformer dans la projection de la carte
        var view = this.getMap().getView();
        var mapProj = view.getProjection().getCode();
        if ( mapProj !== "EPSG:4326" ) {
            // on retransforme les coordonnées de la position dans la projection de la carte
            position = ol.proj.transform(position, "EPSG:4326", mapProj);
        }
        // on centre la vue et positionne le marker, à la position reprojetée dans la projection de la carte
        this._setPosition(position);
        this._setMarker(position, info, this.options.displayInfo);

    };

    /**
    * this method is called by event 'click' on 'GProuteOriginPointerImg' tag input
    * (cf. this._createRoutePointerInputElement), and it create or remove the event of click map.
    *
    * @private
    */
    LocationSelector.prototype.onActivateMapPointClick = function () {
        var map = this.getMap();

        if ( this._inputShowPointerContainer.checked ) {
            // on efface l'ancien resultat
            this._clearResults();
            map.on(
                "click",
                this.onMouseMapClick,
                this
            );
            this._setCursor("crosshair");
        } else {
            map.un(
                "click",
                this.onMouseMapClick,
                this
            );
            this._setCursor();
        }
    };

    /**
     * this method is called by event 'click' on 'GProuteOriginLabel' tag label
     * (cf. this._createRoutePointLabelElement).
     * this point is erased.
     *
     * @private
     */
    LocationSelector.prototype.onLocationClearPointClick = function () {
        this._setCursor();
        this._clearResults();
    };

    /**
     * this method is called by event 'click' on 'GProuteStageRemove' tag input
     * (cf. this._createRouteRemovePointElement).
     * this point is deleted
     *
     * @private
     */
    LocationSelector.prototype.onLocationRemovePointClick = function () {
        this._setCursor();
        this._clearResults();
    };

    /**
    * TODO this method is called by event 'click' on 'GProuteStageAdd' tag input
    * (cf. this._createRouteAddPointElement).
    * this point is added as a parameter for the service route.
    *
    * @param {Object} e - HTMLElement
    */
    LocationSelector.prototype.onLocationAddPointClick = function (e) {
        
    };

    // ################################################################### //
    // #################### handlers events (control) #################### //
    // ################################################################### //

    /**
     * this method is called by event 'click' on map
     * (cf. this.onRouteMapPointClick), and it gets the coordinate of click on map.
     * this point is saved as a parameter for the service route.
     *
     * @param {Object} e - HTMLElement
     * @private
     */
    LocationSelector.prototype.onMouseMapClick = function (e) {

        var coordinate = e.coordinate;
        if ( !e.map || !e.map.getView() ) {
            return;
        }
        var crs = e.map.getView().getProjection();

        this._setCoordinate(coordinate, crs);

        this._setMarker([
            coordinate[0],
            coordinate[1]
        ], null, false);

        // on desactive l'event sur la map !
        this.onActivateMapPointClick(e);
    };

    // ################################################################### //
    // ################# pivates methods use by events ################### //
    // ################################################################### //

    /**
     * this sends the label to the panel.
     *
     * @param {String} label - label suggested location
     * @private
     */
    LocationSelector.prototype._setLabel = function (label) {
        this._inputAutoCompleteContainer.value = label;
    };

    /**
     * this change the cursor of the map when entering a point.
     *
     * @param {String} cursor - cursor style
     * @private
     */
    LocationSelector.prototype._setCursor = function (cursor) {
        var map = this.getMap();
        var div = map.getTargetElement();

        if (cursor) {
            div.style.cursor = cursor;
        } else {
            div.style.cursor = null;
        }
    };

    /**
     * this sends the coordinates to the panel.
     *
     * @method _setCoordinate
     * @param {Array} olCoordinate - ol.Coordinate object [lon, lat] ou [x, y] (proj = map proj system)
     * @param {Object} crs - coordinate CRS (ol.proj.Projection)
     * @private
     */
    LocationSelector.prototype._setCoordinate = function (olCoordinate, crs) {

        // structure
        // ol.Coordinate
        //      [
        //          4   // lon ou x
        //          48  // lat ou y
        //      ]

        // on transforme olCoodinate (dont la projection est celle de la carte) en EPSG:4326
        this._coordinate = ol.proj.transform(olCoordinate, crs, "EPSG:4326");

        // INFO : si on veut des DMS
        // var coords = ol.coordinate.toStringHDMS(this._coordinate, 2).split("N ");
        // // coords est du type : "48° 00′ 00″ N 2° 00′ 00″ E". On veut récupérer les 2 coordonnées séparément.
        // var lat = coords[0] + "N";
        // var lng = coords[1];

        // Pour avoir des degrés décimaux :
        var lat  = this._coordinate[0].toFixed(4);
        var lng  = this._coordinate[1].toFixed(4);

        var value = lat + " / " + lng;
        this.GPdisplayCoordinate(value);

    };

    /**
     * this method is called by this.on*ResultsItemClick()
     * and set center at given position.
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] (en lat/lon : "EPSG:4326")
     * @private
     */
    LocationSelector.prototype._setPosition = function (position) {
        var view = this.getMap().getView();
        view.setCenter(position);
    };

    /**
     * this method is called by this.on*ResultsItemClick()
     * and displays a marker.
     * FIXME : marker IGN et informations ?
     *
     * @param {Array} position - ol.Coordinate object [lon, lat] ou [x, y]
     * @param {Object} information - suggested or geocoded information
     * @param {Boolean} display - display a popup information
     * @private
     */
    LocationSelector.prototype._setMarker = function (position, information, display) {

        var map = this.getMap();
        // remove previous markers
        if (this._marker != null) {
            map.removeOverlay(this._marker);
            this._marker = null;
        }

        if (position) {

            var markerDiv = document.createElement("img");
            markerDiv.src = this._markerUrl;
            this._marker = new ol.Overlay({
                position : position,
                offset : [-25.5, -38],
                element : markerDiv,
                stopEvent : false
            });
            map.addOverlay(this._marker);

            if ( display ) {
                
            }
            // // FIXME
            // // doit on mettre une information
            // // - correctement construite ?
            // // - uniquement informatif ?
            // // - RIEN ?
            // if (display) {
            //     var popupContent = null;
            //
            //     var values = [];
            //
            //     values.push(information.fields.fullText || "");
            //     values.push(information.fields.street || "");
            //     values.push(information.fields.postalCode || "");
            //     values.push(information.fields.commune || "");
            //
            //     if (information.type === "PositionOfInterest") {
            //         values.push(information.fields.poi || "");
            //         values.push(information.fields.kind || "");
            //     }
            //
            //     popupContent = values.join(" | ");
            //
            //     this._marker.bindPopup(popupContent);
            // }
        }
    };

    /**
     * this method is called by this.()
     * and it clears all results and the marker.
     *
     * @private
     */
    LocationSelector.prototype._clearResults = function () {
        var map = this.getMap();
        this._currentLocation = null;
        this._coordinate = null;
        this._hideSuggestedLocation();
        this._clearSuggestedLocation();
        this._setMarker();
        map.un(
            "click",
            this.onMouseMapClick,
            this
        );
    };

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    LocationSelector.prototype._clearSuggestedLocation = function () {
        // suppression du dom
        this._suggestedLocations = [];
        if (this._suggestedContainer) {
            while (this._suggestedContainer.firstChild) {
                this._suggestedContainer.removeChild(this._suggestedContainer.firstChild);
            }
        }
    };

    /**
     * this method is called by event 'click' on map
     * and it hide suggested locations
     *
     * @private
     */
    LocationSelector.prototype._hideSuggestedLocation = function () {
        if (this._suggestedContainer) {
            this._suggestedContainer.style.display = "none";
        }
    };

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and it clears all suggested location.
     *
     * @private
     */
    LocationSelector.prototype._displaySuggestedLocation = function () {
        if ( this._suggestedContainer ) {
            this._suggestedContainer.style.display = "block";
        }
    };

    /**
     * this method is called by this.onAutoCompleteSearch()
     * and executes a request to the service.
     *
     * @param {Object} settings - service settings
     * @param {String}   settings.text - text
     * @param {Function} settings.onSuccess - callback
     * @param {Function} settings.onFailure - callback
     * @private
     */
    LocationSelector.prototype._requestAutoComplete = function (settings) {
        

        // on ne fait pas de requête si on n'a pas renseigné de parametres !
        if (!settings || Object.keys(settings).length === 0) {
            return;
        }

        // on ne fait pas de requête si la parametre 'text' est vide !
        if (!settings.text) {
            return;
        }

        

        var options = {};
        // on recupere les options du service
        Utils.assign(options, this.options.autocompleteOptions);
        // ainsi que la recherche et les callbacks
        Utils.assign(options, settings);

        // les ressources
        var resources = this._resources["AutoCompletion"] || null;
        if (resources && Array.isArray(resources)) {
            if (! options.filterOptions) {
                options.filterOptions = {};
            }
            options.filterOptions.type = resources;
        }

        // cas où la clef API n'est pas renseignée dans les options du service,
        // on utilise celle de l'autoconf ou celle renseignée au niveau du controle
        options.apiKey = options.apiKey || this.options.apiKey;

        

        Gp.Services.autoComplete(options);
    };

    /**
     * this method is called by this.onAutoCompleteSearchText()
     * and fills the container of the location list.
     * it creates a HTML Element per location
     * (cf. this. ...)
     *
     * @private
     */
    LocationSelector.prototype._fillAutoCompletedLocationListContainer = function (locations) {

        if (!locations || locations.length === 0) {
            return;
        }

        // on vide la liste avant de la construire
        var element = this._suggestedContainer;
        if (element.childElementCount) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        for (var i = 0; i < locations.length; i++) {
            // Proposals are dynamically filled in Javascript by autocomplete service
            this._createLocationAutoCompletedLocationElement(this.options.tag.id, locations[i], i);
        }

        // sauvegarde de l'etat des locations
        this._suggestedLocations = locations;
    };

    return LocationSelector;

});
