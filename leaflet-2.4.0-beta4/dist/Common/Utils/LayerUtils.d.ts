export default LayerUtils;
declare namespace LayerUtils {
    function getZoomLevelFromScaleDenominator(scaleDenominator: number, crs: string): Integer;
    function getAttributions(params: {
        extent: Float[];
        zoom: number;
        crs: string;
        visibility: boolean;
        originators: Gp.Services.Config.Originator;
    }): Object;
    function intersects(extent1: Float[], extent2: Float[]): boolean;
}
//# sourceMappingURL=LayerUtils.d.ts.map