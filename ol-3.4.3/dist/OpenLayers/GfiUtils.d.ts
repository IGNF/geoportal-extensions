export default GfiUtils;
declare namespace GfiUtils {
    function getLayerFormat(l: ol.layer.Layer): string;
    function displayInfo(map: ol.Map, coords: ol.Coordinate, content: string, contentType?: string | undefined, autoPanOptions: {
        autoPan?: boolean | Object | undefined;
        autoPanAnimation?: Object | undefined;
        autoPanMargin?: number | undefined;
    }): boolean;
    function features2html(map: ol.Map, features: ol.Features[]): HTMLElement;
    function layerGetFeatureAtCoordinates(map: ol.Map, olLayer: ol.layer.Layer, olCoordinate: ol.Coordinate): boolean;
    function displayVectorFeatureInfo(map: ol.Map, olCoordinate: ol.Coordinate, olLayers: ol.layer.Layer[], autoPanOptions: Object): boolean;
    function displayFeatureInfo(map: ol.Map, olCoordinate: ol.Coordinate, gfiLayers: Object[], proxyOptions?: {
        proxyUrl?: string | undefined;
        noProxyDomains?: string[] | undefined;
    } | undefined, autoPanOptions?: {
        autoPan?: boolean | undefined;
        autoPanAnimation?: Object | undefined;
        autoPanMargin?: number | undefined;
    } | undefined): void;
    function getPosition(e: any, map: any): any;
    function onDisplayFeatureInfo(e: any, gfiObj: any): void;
}
//# sourceMappingURL=GfiUtils.d.ts.map