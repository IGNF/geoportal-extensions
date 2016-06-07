/*
 * Latency for altitude request
 */
var altitudeTimeout;
var altitudeTimeoutDelay = 500;

/*
 * Detection  test for desktop or tactile
 */
var isDesktop = true;
var userAgent = window.navigator.userAgent.toLowerCase();
if (userAgent.indexOf('iphone')!==-1 || userAgent.indexOf('ipod')!==-1 || userAgent.indexOf('ipad')!==-1 || userAgent.indexOf('android')!==-1 || userAgent.indexOf('mobile')!==-1 || userAgent.indexOf('blackberry')!==-1 || userAgent.indexOf('tablet')!==-1 || userAgent.indexOf('phone')!==-1 || userAgent.indexOf('touch')!==-1 ) {
	isDesktop = false;
}
if (userAgent.indexOf('msie')!== -1 || userAgent.indexOf('trident')!==-1) {
	isDesktop = true;
}

/**
 * Function displaying coordinates and altitude from cursor position (desktop) or map center (tactile)
 * TODO adapter à une vraie map JS
 */
function GPdisplayCoords(mousePos) {
    
    if (!document.getElementById('GPshowMousePosition').checked) {
        return;
    }
    
    clearTimeout(altitudeTimeout);
    document.getElementById('GPmousePositionAlt').innerHTML = '...';
    
    // Compute coords in case of cursor position (desktop)
    if (mousePos && mousePos != null) {
        
        // TODO : brancher la conversion coords souris / coords map JS
        document.getElementById('GPmousePositionLat').innerHTML = mousePos.x+'.00';
        document.getElementById('GPmousePositionLon').innerHTML = mousePos.y+'.00';
        
        // If no altitude panel, don't call altitude request
        if (document.getElementById('GPmousePositionAltitude')) {
            altitudeTimeout = setTimeout(function(){
                document.getElementById('GPmousePositionAlt').innerHTML = (Math.round(Math.random()*1000000)/100)+' m';
            }, altitudeTimeoutDelay);
        }
        
    }
    
    // Compute coords in case of map center (tactile)
    else {
        
        // TODO : brancher la récupération des coordonnées du centre de la map JS
        
    }
}

/*
 * Test for mouse position plugin existence 
 */
if (document.getElementById('GPmousePositionPanel')) {
	
	/*
     * Link panel close / visibility checkbox
     */
	document.getElementById('GPmousePositionPanelClose').addEventListener('click', function() {
	   document.getElementById('GPshowMousePositionPicto').click();
	});
	
	/*
     * Show map center localisation if panel opened and tactile support
     */
	document.getElementById('GPshowMousePositionPicto').addEventListener('click', function() {
	    var mapCenterClass = '';
	    if (!document.getElementById('GPshowMousePosition').checked && !isDesktop) {
	        mapCenterClass = 'GPmapCenterVisible'
	    }
	    document.getElementById('GPmapCenter').className = mapCenterClass;
	});
	
	/*
	 * Calling coords update when moving cursor
	 */
	if (isDesktop) {
	    // Desktop : detect mouse move
	    document.getElementById('viewerDiv').addEventListener('mousemove', function(evt) {
	        var mousePos = {
	            x: evt.clientX,
	            y: evt.clientY
	        }
	        GPdisplayCoords(mousePos);
	    });
	} else {
	    // Tactile : detect map move
	    // TODO brancher le déclenchement de GPdisplayCoords(null) par l'évènement move de la map JS
	}
	
	/*
     * Updating display when changing coords system
     * TODO à remplir
     */
	document.getElementById('GPmousePositionProjectionSystem').addEventListener('change', function() {
	   // TODO modifier les labels des coordonnées
       // + changer leur mode de calcul en fonction du système choisi
       // + modifier les options du select d'unités
	});
	
	/*
     * Updating display when changing coords units
     * TODO à remplir
     */
	document.getElementById('GPmousePositionProjectionUnits').addEventListener('change', function() {
	   // TODO changer le mode de calcul des coordonnées en fonction de l'unité choisie
	});

}