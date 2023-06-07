export default GetFeatureInfo;
/**
 * @classdesc
 * OpenLayers Control to manage getFeatureInfo capability. All queryable layers can be requested.
 * For the vector objects the information displayed are the objects properties. For the wms and wmts layers
 * this is the response of the getFeatureInfo request which is shown to the user.
 *
 * @constructor
 * @alias ol.control.GetFeatureInfo
 * @extends {ol.control.Control}
 * @type {ol.control.GetFeatureInfo}
 * @param {Object} options - control options
 * @param {Array.<Object>} [options.layers] - list of layers which can be requested through the control. Each array element is an object, with following properties :
 * @param {ol.layer.Layer} options.layers.obj - {@link http://openlayers.org/en/latest/apidoc/ol.layer.Layer.html ol.layer.Layer} layer handled by the control (that has been added to map).
 * @param {String} [options.layers.event] - name of the mouse event triggering getFeatureInfo on this layer (that has been added to map). allowed values are : 'singleclick', 'dblclick' and 'contextmenu'. If not specified the triggering event is the current default event (see options.options.defaultEvent).
 * @param {String} [options.layers.infoFormat] - indicates the format mime-type of the response of GetFeatureInfo requests.
 * @param {Object} [options.options] - custom options object to configure the control, with following properties :
 * @param {Boolean} [options.options.hidden=false] - specifies if the widget should be hidden.
 * @param {Boolean} [options.options.auto=false] - specifies if the control run in automatic mode. In automatic mode all vector layers added on run time or added at map initialization can be requested through the control. The triggering event of those layers is the default event.
 * @param {Boolean} [options.options.active=true] - specifies if the control is active or inactive. In inactive mode requests are not fired and no information are displayed.
 * @param {String} [options.options.defaultEvent="singleclick"] - default triggering event chosen in the list ('singleclick', 'dblclick', 'contextmenu'). This is the triggering event of all layers added to the control without configured triggering event.
 * @param {String} [options.options.defaultInfoFormat="text/html"] - indicates the default format mime-type of the response of GetFeatureInfo requests.
 * @param {String} [options.options.cursorStyle="pointer"] - specifies the type of cursor to be displayed when pointing on vector feature of a layer previously added to the control. The value must be choosen in the possible values of the css cursor property.
 * @param {String} [options.options.proxyUrl] - Proxy URL to avoid cross-domain problems.
 * @param {Array.<String>} [options.options.noProxyDomains] - Proxy will not be used for this list of domain names. Only use if you know what you're doing.
 * @param {Boolean} [options.options.autoPan = true] - Specifies whether the map should auto-pan if the pop-up is rendered outside of the canvas. Defaults to true.
 * @param {Object} [options.options.autoPanAnimation] - Used to customize the auto-pan animation. See {@link https://openlayers.org/en/latest/apidoc/module-ol_Overlay.html#~PanOptions PanOptions}.
 * @param {Number} [options.options.autoPanMargin] - Margin (in pixels) between the pop-up and the border of the map when autopanning. Default is 20.
 */
declare var GetFeatureInfo: ol.control.GetFeatureInfo;
//# sourceMappingURL=GetFeatureInfo.d.ts.map