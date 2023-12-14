export default PositionFormater;
declare namespace PositionFormater {
    const NORTH: string;
    const SOUTH: string;
    const EAST: string;
    const WEST: string;
    const digitSecond: number;
    const digitDecimal: number;
    const digitRadian: number;
    function roundToDecimal(inputNum: number, numPoints: Integer): number;
    function decimalToRadian(location: number): number;
    function decimalToGrade(location: number): number;
    function decimalToDMS(location: number, hemisphere: string, obj: boolean): string | Object;
    function decimalLatToDMS(location: number, obj: boolean): string | Object;
    function decimalLonToDMS(location: number, obj: boolean): string | Object;
    function DMSToDecimal(degrees: number, minutes: number, seconds: number, hemisphere: string): number;
}
//# sourceMappingURL=PositionFormater.d.ts.map