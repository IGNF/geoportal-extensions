export default MousePositionDOM;
declare namespace MousePositionDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createShowMousePositionElement(): DOMElement;
    function _createShowMousePositionPictoElement(isDesktop: boolean): DOMElement;
    function _createMousePositionPanelElement(): DOMElement;
    function _createMapCenter(): DOMElement;
    function _createMousePositionPanelHeaderElement(): DOMElement;
    function _createMousePositionPanelBasicElement(displayAltitude?: boolean | undefined, displayCoordinates?: boolean | undefined, editCoordinates?: boolean | undefined, currentProjectionUnits?: boolean | undefined): DOMElement;
    function _createCoordinateElement(coordType: string, editCoordinates?: boolean | undefined): any[];
    function _createDMSCoordinateElement(coordType: string, editCoordinates?: boolean | undefined): any[];
    function _createMousePositionPanelBasicCoordinateElement(display?: boolean | undefined, editCoordinates?: boolean | undefined, currentProjectionUnits?: boolean | undefined): DOMElement;
    function _createMousePositionPanelBasicAltitudeElement(display?: boolean | undefined): DOMElement;
    function _createMousePositionPanelEditToolsElement(editCoordinates?: boolean | undefined): DOMElement;
    function _createShowMousePositionSettingsElement(display?: boolean | undefined): DOMElement[];
    function _createMousePositionSettingsElement(display?: boolean | undefined): DOMElement;
    function _createMousePositionSettingsSystemsElement(systems: Object[]): DOMElement;
    function _createMousePositionSettingsUnitsElement(units: Object[]): DOMElement;
    function _resetLabelElements(currentProjectionType?: string | undefined): void;
    function _resetUnitElements(currentProjectionUnits: string): void;
    function _resetCoordinateElements(editCoordinates: boolean, currentProjectionType: string, currentProjectionUnits: string): void;
    function _setEditMode(editing: boolean): void;
    function _checkDMSElement(input: DOMElement, isFloat: boolean): boolean;
    function _checkDMSDegrees(coordType: string, input: DOMElement): boolean;
    function GPdisplayCoords(coordinate: Object): void;
    function GPdisplayElevation(coordinate: Object, altitudeTimeoutDelay: number, noDataValue: number, noDataValueTolerance: number): void;
    function GPresetElevation(): void;
}
//# sourceMappingURL=MousePositionDOM.d.ts.map