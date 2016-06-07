define([
    'require',
    "Common/Utils/Config"
], function (
    woodman, Config
) {

    "use strict";

    return {
        /**
        * Contrôle des droits sur les ressources.
        *
        * @param {Object} options - liste des options
        * @param {String} options.key - clef API
        * @param {Array} options.resources - liste des ressources
        * @param {Array} options.services - liste des services
        * @returns {Object} rightManagement - undefined ou {
        *       key : "",
        *       service-1 : [resource-1, resource-2],
        *       service-2 : [resource-1, resource-2]
        * }
        */
        check : function (options) {

            // logger
            
            

            // si aucune option n'est renseignée...
            if (! options) {
                // message orienté pour le developpeur !
                
                return;
            }

            // les options
            var _key       = options.key;
            var _resources = options.resources || [];
            var _services  = options.services || [];

            // si aucune information sur les ressources,
            // il est impossible de controler quelquechose !!!
            if (! _resources || _resources.length === 0) {
                // message orienté pour le developpeur !
                
                return;
            }

            // si aucune information sur les services,
            // il est impossible de controler quelquechose !!!
            if (! _services  || _services.length  === 0) {
                // message orienté pour le developpeur !
                
                return;
            }

            // les ressources controlées :
            // Ex.
            // {
            //   "Itineraire"     : ["Pieton", "Voiture"],
            //   "Geocode"        : ["PositionOfInterest", "StreetAddress", "CadastralParcel", "Administratif"],
            //   "AutoCompletion" : ["PositionOfInterest", "StreetAddress", "CadastralParcel", "Administratif"],
            //   "Elevation"      : ["SERVICE_CALCUL_ALTIMETRIQUE_RSC"]
            // }
            var _rightManagement = {};

            // la clef API n'est pas renseignée
            if (!_key) {

                // on verifie si l'autoconfiguration est disponible

                if (!Config.isConfigLoaded()) {
                    // si l'autoconfiguration n'est pas chargée,
                    // aucune vérification des droits est possible...

                    console.log("WARNING : " +
                        "parameter 'apiKey' has not been parametered, " +
                        "and the contract key configuration has not been loaded, " +
                        "so impossible to check yours rights !");

                    return;

                } else {
                    // si l'autoconfiguration est chargée,
                    // on recupere la clef API, et on en profitera ensuite pour controler
                    // les droits sur les ressources.

                    // FIXME par defaut, on recupere toujours la première...
                    _key = Object.keys(Config.configuration.generalOptions.apiKeys)[0];
                    
                }
            }

            // la clef API est renseignée ou recuperée de l'autoconfiguration
            if (_key) {

                // on verifie si l'autoconfiguration est disponible

                if (!Config.isConfigLoaded()) {
                    // si l'autoconfiguration n'est pas chargée,
                    // il est toujours possible de requeter le service avec une clef API,
                    // mais les droits sur les ressources ne sont pas garantis, on risque
                    // d'obtenir des erreurs 403 forbidden...
                    // la responsabilité revient à l'utilisateur (message d'information)...

                    console.log("WARNING : " +
                        "the contract key configuration has not been loaded, " +
                        "so be carefull !");

                    // les ressouces non controlées
                    var _noRightManagement = {};

                    for (var i = 0; i < _services.length; i++) {
                        var service = _services[i];
                        _noRightManagement[service] = [];

                        for (var j = 0; j < _resources.length; j++) {
                            var resource = _resources[j];
                            _noRightManagement[service].push(resource);
                        }
                    }

                    // on ajoute la clef
                    _noRightManagement.key = _key;

                    

                    return _noRightManagement;

                } else {
                    // si l'autoconf est chargée,
                    // on verifie la correspondance entre la clef et l'autoconfiguration,
                    // on previent l'utilisateur (message d'information) s'il n'a
                    // pas de droits sur certaines ressources ...

                    // doit on ecarter les ressources sans droit ?
                    // oui, si possible avec un message d'information pour l'utilisateur...

                    for (var k = 0; k < _resources.length; k++) {
                        var _resource = _resources[k];

                        for (var l = 0; l < _services.length; l++) {
                            var _service = _services[l];

                            var params = Config.getServiceParams(_resource, _service, _key);
                            if (!params || Object.keys(params).length === 0) {
                                console.log("WARNING : " +
                                    "contract key configuration has no rights to load this geoportal " +
                                    "resource (" + _resource + ") " +
                                    "for this service (" + _service + ") ");
                                continue;
                            }

                            if (! _rightManagement[_service]) {
                                _rightManagement[_service] = [];
                            }

                            _rightManagement[_service].push(_resource);
                        }
                    }

                    if (! _rightManagement || Object.keys(_rightManagement).length === 0) {
                        console.log("WARNING : " +
                            "the contract key configuration has been loaded, " +
                            "and the parameter 'apiKey' has been parametered, " +
                            "but, there is a problem on the mapping between the contract and the key !");
                        return;
                    }

                    // on ajoute la clef
                    _rightManagement.key = _key;

                    

                    return _rightManagement;

                }
            }
        }
    };
});
