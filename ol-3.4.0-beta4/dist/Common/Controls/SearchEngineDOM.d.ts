export default SearchEngineDOM;
declare namespace SearchEngineDOM {
    function _addUID(id: string): string;
    function _createMainContainerElement(): DOMElement;
    function _createShowSearchEngineElement(): DOMElement;
    function _createShowSearchEnginePictoElement(): DOMElement;
    function _createSearchInputElement(placeholder: string): DOMElement;
    function _createShowAdvancedSearchElement(): DOMElement;
    function _createAdvancedSearchPanelElement(): DOMElement;
    function _createGeocodeResultsElement(): DOMElement;
    function _createAutoCompleteElement(): DOMElement;
    function _createAutoCompleteListElement(): DOMElement;
    function _createAutoCompletedLocationElement(location: Object, id: number): void;
    function _createAdvancedSearchPanelHeaderElement(): DOMElement;
    function _createAdvancedSearchPanelFormElement(advancedSearchCodes: Object[]): DOMElement;
    function _createAdvancedSearchFormCodeElement(codes: Object[]): DOMElement;
    function _createAdvancedSearchFormInputElement(): DOMElement;
    function _createAdvancedSearchFormFiltersElement(): DOMElement;
    function _createAdvancedSearchFiltersTableElement(code: string, display: boolean): DOMElement;
    function _createAdvancedSearchFiltersAttributElement(filterAttributes: {
        code: string;
        name: string;
        title: string;
        description: string;
        value: string;
    }): DOMElement;
    function _createGeocodeResultsHeaderElement(): DOMElement;
    function _createGeocodeResultsListElement(): DOMElement;
    function _createGeocodedLocationElement(location: Object, id: number): void;
}
//# sourceMappingURL=SearchEngineDOM.d.ts.map