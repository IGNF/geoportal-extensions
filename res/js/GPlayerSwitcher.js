/**
 * Function called when visibility button is clicked
 *   - changes layer visibility (TODO)
 */
function GPchangeLayerVisibility(elt) {
    var layerId = elt.id.substring(elt.id.indexOf('_')+1);
    // TODO changer la visibilité du layer de la map JS
}

/**
 * Function called when opacity slider is moving :
 *   - changes the written value of layer opacity
 *   - changes layer opacity (TODO)
 */
function GPchangeLayerOpacity(elt) {
    var layerId = elt.id.substring(elt.id.indexOf('_')+1);
    document.getElementById('GPopacityValue_'+layerId).innerHTML = elt.value;
    // TODO changer l'opacité du layer de la map JS
}

/**
 * Function called when drop button is clicked
 *   - removes layer from layer switcher
 *   - removes layer from map (TODO)
 */
function GPdropLayer(elt) {
    var layerId = elt.id.substring(elt.id.indexOf('_')+1);
    document.getElementById('GPlayersList').removeChild(document.getElementById('GPlayerSwitcher_'+layerId));
    // TODO supprimer le layer de la map JS
}

/**
 * Function when layer info button is clicked :
 *   - opens/closes the panel depending on the current state
 *   - update content from layer (TODO)
 */
function GPopenLayerInfo(elt) {
    
    var layerId = elt.id.substring(elt.id.indexOf('_')+1);
    
    // Close layer info panel
    if (elt.className=='GPlayerInfoOpened') {
        elt.className = 'GPlayerInfo';
        document.getElementById('GPlayerInfoPanel').className = 'GPpanel GPlayerInfoPanelClosed';
        return;
    }
    
    // Open layer info panel
    var layers = document.getElementsByClassName('GPlayerInfoOpened');
    for (var i=0;i<layers.length;i++) {
        layers[i].className = 'GPlayerInfo';
    }
    elt.className = 'GPlayerInfoOpened';
    document.getElementById('GPlayerInfoPanel').className = 'GPpanel GPlayerInfoPanelOpened';
    // TODO récupérer les infos associées au layer pour mettre à jour dynamiquement le contenu du panel d'infos
    
}

/*
 * Test for layer switcher plugin existence
 */
if (document.getElementById('GPlayerSwitcher')) {
	
	/*
     * Close layerInfo panel
     */
	document.getElementById('GPlayerInfoClose').addEventListener('click', function() {
	    document.getElementById('GPlayerInfoPanel').className = 'GPlayerInfoPanelClosed';
	    var layers = document.getElementsByClassName('GPlayerInfoOpened');
	    for (var i=0;i<layers.length;i++) {
	        layers[i].className = 'GPlayerInfo';
	    }
	});
	
	/*
     * Reset layers info when minimizing the layerSwitcher
     */
	document.getElementById('GPshowLayersListPicto').addEventListener('click', function() {
	   if (document.getElementById('GPshowLayersList').checked) {
	        var layers = document.getElementsByClassName('GPlayerInfoOpened');
	        for (var i=0;i<layers.length;i++) {
	            layers[i].className = 'GPlayerInfo';
	        }
	        document.getElementById('GPlayerInfoPanel').className = 'GPlayerInfoPanelClosed';
	   }
	});
	
	/*
     * Layers drag and drop
     * TODO répercuter l'évènement sur la map JS
     */
	var layersList = document.getElementById('GPlayersList');
	Sortable.create(layersList,{
	    handle: '.GPlayerName',
	    ghostClass: 'GPghostLayer',
	    animation: 200,
	    onEnd: function() {
	        // TODO réordonner les layers de la map JS en fonction du nouvel ordre HTML du layerSwitcher
	    }
	});

}