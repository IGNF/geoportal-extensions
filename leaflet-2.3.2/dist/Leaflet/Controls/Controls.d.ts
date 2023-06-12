export default Controls;
declare namespace Controls {
    function LayerSwitcher(options: {
        position?: string | undefined;
        collapsed?: boolean | undefined;
        layers?: any[] | undefined;
    }): L.geoportalControl.LayerSwitcher;
    function Isocurve(options: {
        apiKey?: string | undefined;
        position?: string | undefined;
        collapsed?: boolean | undefined;
        ssl?: boolean | undefined;
        exclusions?: Object | undefined;
        graphs?: any[] | undefined;
        methods?: any[] | undefined;
        directions?: any[] | undefined;
        disableReverse?: boolean | undefined;
        isocurveOptions?: Object | undefined;
        autocompleteOptions?: Object | undefined;
    }): L.geoportalControl.Isocurve;
    function MousePosition(options: {
        apiKey?: string | undefined;
        position?: string | undefined;
        collapsed?: boolean | undefined;
        ssl?: boolean | undefined;
        systems?: any[] | undefined;
    }): L.geoportalControl.MousePosition;
    function ReverseGeocode(options: {
        apiKey?: string | undefined;
        position?: string | undefined;
        collapsed?: boolean | undefined;
        ssl?: boolean | undefined;
        resources?: any[] | undefined;
        delimitations?: any[] | undefined;
        ReverseGeocodeOptions?: Object | undefined;
    }): L.geoportalControl.ReverseGeocode;
    function Route(options: {
        apiKey?: string | undefined;
        position?: string | undefined;
        collapsed?: boolean | undefined;
        ssl?: boolean | undefined;
        disableReverse?: boolean | undefined;
        exclusions?: Object | undefined;
        graphs?: any[] | undefined;
        autocompleteOptions?: Object | undefined;
        routeOptions?: Object | undefined;
    }): L.geoportalControl.Route;
    function SearchEngine(options: {
        apiKey?: string | undefined;
        collapsed?: boolean | undefined;
        ssl?: boolean | undefined;
        position?: string | undefined;
        placeholder?: string | undefined;
        displayMarker?: boolean | undefined;
        markerStyle?: string | Object | undefined;
        displayInfo?: boolean | undefined;
        zoomTo?: any;
        resources?: Object | undefined;
        displayAdvancedSearch?: boolean | undefined;
        advancedSearch?: Object | undefined;
        geocodeOptions?: Object | undefined;
        autocompleteOptions?: {
            serviceOptions?: Object | undefined;
            triggerGeocode?: boolean | undefined;
            triggerDelay?: number | undefined;
        } | undefined;
    }): L.geoportalControl.SearchEngine;
    function ElevationPath(options: {
        apiKey?: string | undefined;
        position?: string | undefined;
        ssl?: boolean | undefined;
        active?: boolean | undefined;
        stylesOptions?: Object | undefined;
        elevationPathOptions?: Object | undefined;
        displayProfileOptions?: {
            apply?: Function | undefined;
            target?: Object | undefined;
            greaterSlope?: boolean | undefined;
            meanSlope?: boolean | undefined;
            ascendingElevation?: boolean | undefined;
            descendingElevation?: boolean | undefined;
            currentSlope?: boolean | undefined;
        } | undefined;
    }): L.geoportalControl.ElevationPath;
    function Logo(options: {
        position: string;
        url: string;
        text: string;
        picto: string;
        size: string | Object;
    }): any;
}
//# sourceMappingURL=Controls.d.ts.map