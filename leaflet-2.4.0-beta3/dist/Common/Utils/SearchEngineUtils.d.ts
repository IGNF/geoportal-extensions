export default SearchEngineUtils;
declare namespace SearchEngineUtils {
    namespace advancedSearchFiltersByDefault {
        const PositionOfInterest: ({
            name: string;
            title: string;
            value: string[];
        } | {
            name: string;
            title: string;
            value?: undefined;
        })[];
        const StreetAddress: {
            name: string;
            title: string;
        }[];
        const CadastralParcel: {
            name: string;
            title: string;
            description: string;
        }[];
    }
    function zoomToResultsByDefault(info: Object): Integer;
}
//# sourceMappingURL=SearchEngineUtils.d.ts.map