export default CRS;
declare namespace CRS {
    const projectionsExtent: {
        "EPSG:2154": {
            left: number;
            bottom: number;
            right: number;
            top: number;
        };
        "EPSG:27572": {
            left: number;
            bottom: number;
            right: number;
            top: number;
        };
    };
    function load(): void;
    function loadByDefault(): void;
    function loadByName(name: string): void;
    function overload(): void;
}
//# sourceMappingURL=CRS.d.ts.map