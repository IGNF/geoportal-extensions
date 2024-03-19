export default ColorUtils;
declare namespace ColorUtils {
    function hex(number: number): string;
    function num(hexa: any): number;
    function arrayToRgba(values: any[]): string;
    function arrayToHex(values: any[]): Object;
    function rgbaToHex(rgba: string): Object;
    function hexToRgba(hex: string, opacity: number): string;
    function isHex(value: any): boolean;
    function isRGB(value: any): boolean;
}
//# sourceMappingURL=ColorUtils.d.ts.map