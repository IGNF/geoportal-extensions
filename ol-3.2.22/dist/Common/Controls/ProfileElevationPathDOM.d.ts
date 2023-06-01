export default ProfileElevationPathDOM;
declare namespace ProfileElevationPathDOM {
    function _getCssProperty(element: HTMLElement, property: string): string;
    function _getTextWidth(text: string, container: HTMLElement, font?: string): number;
    function _dataZToSvgY(z: Object, pathHeight: number, minGraphZ: number, pxPerMZ: number): number;
    function _dataDistToSvgX(dist: number, svgWidth: number, pathWidth: number, pxPerMX: number): any[];
    function _svgXToDataDist(svgX: number, svgWidth: number, pathWidth: number, pxPerMX: number): any[];
    function _arrayBisect(array: any[], value: number): number;
    function displayProfileByDefault(data: Object, container: HTMLElement, context: Object, className: Object): DOMElement;
    function displayProfileRaw(data: Object, container: HTMLElement, context: Object, className: Object): DOMElement;
    function displayProfileLibD3(data: Object, container: HTMLElement, context: Object, className: Object): DOMElement;
    function displayProfileLibAmCharts(data: Object, container: HTMLElement, context: Object, className: Object): DOMElement;
}
//# sourceMappingURL=ProfileElevationPathDOM.d.ts.map