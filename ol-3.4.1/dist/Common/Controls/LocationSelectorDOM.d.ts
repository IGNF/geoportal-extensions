export default LocationSelectorDOM;
declare namespace LocationSelectorDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createLocationPointElement(id: number, display: number): DOMElement;
    function _createLocationPointLabelElement(id: number, text: string): DOMElement;
    function _createLocationAutoCompleteteInputElement(id: number): DOMElement;
    function _createLocationCoordinateInputElement(id: number): DOMElement;
    function _createLocationPointerShowInputElement(id: number): DOMElement;
    function _createLocationPointerInputElement(id: number): DOMElement;
    function _createLocationRemovePointElement(id: number): DOMElement;
    function _createLocationAddPointElement(): DOMElement;
    function _createLocationAutoCompleteResultElement(id: number): DOMElement;
    function _createLocationAutoCompletedLocationElement(id: number, location: Object, n: number): void;
    function GPdisplayCoordinate(value: string): void;
}
//# sourceMappingURL=LocationSelectorDOM.d.ts.map