/*
 * Test for search engine plugin existence 
 */
if (document.getElementById('GPsearchEngine')) {
	
	/*
     * Close all results and panels when minimizing the widget
     */
	document.getElementById('GPshowSearchEnginePicto').addEventListener('click', function() {
	    document.getElementById('GPautoCompleteList').style.display = 'none';
	    document.getElementById('GPgeocodeResultsList').style.display = 'none';
	    document.getElementById('GPshowAdvancedSearch').style.display = null;
	    document.getElementById('GPadvancedSearchPanel').style.display = 'none';
	    document.querySelector('#GPsearchInput input').disabled = false;
	});
	
	/*
     * Manage autocomplete list appearance when filling the address input
     * TODO probablement géré nativement par le moteur d'autocomplétion qui sera ajouté
     */
	document.querySelector('#GPsearchInput input').addEventListener('keyup', function(e) {
	    var charCode = e.which || e.keyCode;
	    if (charCode === 13 || charCode === 10) {
	        return;
	    }
	    document.getElementById('GPgeocodeResultsList').style.display = 'none';
	    if (document.querySelector('#GPsearchInput input').value.length>2) {
	        document.getElementById('GPautoCompleteList').style.display = 'block';
	    } else {
	        document.getElementById('GPautoCompleteList').style.display = 'none';
	    }
	});
	document.querySelector('#GPsearchInput input').addEventListener('blur', function(e) {
	    document.getElementById('GPautoCompleteList').style.display = 'none';
	});
	
	/*
     * Reset input
     */
	document.getElementById('GPsearchInputReset').addEventListener('click', function() {
	    document.querySelector('#GPsearchInput input').value = '';
	    document.getElementById('GPautoCompleteList').style.display = 'none';
	    document.getElementById('GPgeocodeResultsList').style.display = 'none';
	});
	
	/*
     * Open geocode results panel when submitting the input
     */
	document.forms['GPsearchInput'].addEventListener('submit', function(e) {
	    e.preventDefault();
	    document.getElementById('GPgeocodeResultsList').style.display = 'block';
	    document.querySelector('#GPsearchInput input').blur();
	    return false;
	});
	
	/*
     * Close geocode results panel
     */
	document.getElementById('GPgeocodeResultsClose').addEventListener('click', function() {
	    document.getElementById('GPgeocodeResultsList').style.display = 'none'; 
	});
	
	/*
     * Open advanced search
     */
	document.getElementById('GPshowAdvancedSearch').addEventListener('click', function() {
	    document.querySelector('#GPsearchInput input').disabled = true;
	    document.getElementById('GPautoCompleteList').style.display = 'none';
	    document.getElementById('GPgeocodeResultsList').style.display = 'none';
	    document.getElementById('GPshowAdvancedSearch').style.display = 'none';
	    document.getElementById('GPadvancedSearchPanel').style.display = 'inline-block';
	});
	
	/*
     * Close advanced search
     */
	document.getElementById('GPadvancedSearchClose').addEventListener('click', function() {
	    document.querySelector('#GPsearchInput input').disabled = false;
	    document.getElementById('GPgeocodeResultsList').style.display = 'none';
	    document.getElementById('GPshowAdvancedSearch').style.display = 'inline-block';
	    document.getElementById('GPadvancedSearchPanel').style.display = 'none';
	});
	
	/*
     * Open geocode results panel when submitting the advanced search
     * TODO à compléter par l'appel au service
     */
	document.forms['GPadvancedSearchForm'].addEventListener('submit', function(e) {
        
	    e.preventDefault();
        
        // TODO lancer l'appel au service => callback : afficher les résultats dans la fenêtre dédiée
        
        // Affichage de la fenêtre de résultats => TODO à passer en callback de l'appel au service
	    document.getElementById('GPgeocodeResultsList').style.display = 'block';
        
	    return false;
        
	});
    
    /*
     * TODO brancher les moteurs d'autocomplétion et de géocodage sur l'input de recherche avec tous leurs comportements par défauts :
     *  - remplir l'input au choix d'une proposition
     *  - centrer la carte
     *  - placer un pointeur sur la carte
     */

}