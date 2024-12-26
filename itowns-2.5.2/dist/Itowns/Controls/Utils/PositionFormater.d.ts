export default PositionFormater;
declare namespace PositionFormater {
    const NORTH: string;
    const SOUTH: string;
    const EAST: string;
    const WEST: string;
    const digitSecond: number;
    const digitDecimal: number;
    const digitRadian: number;
    function roundToDecimal(inputNum: any, numPoints: any): number;
    function decimalToRadian(location: any): number;
    function decimalToGrade(location: any): number;
    function decimalToDMS(location: any, hemisphere: any): string;
    function decimalLatToDMS(location: any): string;
    function decimalLongToDMS(location: any): string;
    function DMSToDecimal(degrees: any, minutes: any, seconds: any, hemisphere: any): number;
}
//# sourceMappingURL=PositionFormater.d.ts.map