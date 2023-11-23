export default Styling;
declare namespace Styling {
    const APPLY_CONVERT_GEOM_GPX: boolean;
    namespace DEFAULT_ICON {
        const src: string;
        const anchor: number[];
        const scale: number;
    }
    namespace DEFAULT_CIRCLE {
        const radius: number;
        namespace fill {
            const opacity: number;
            const color: number[];
        }
        namespace stroke {
            export const width: number;
            const opacity_1: number;
            export { opacity_1 as opacity };
            const color_1: number[];
            export { color_1 as color };
        }
    }
    namespace DEFAULT_STROKE {
        const width_1: number;
        export { width_1 as width };
        const opacity_2: number;
        export { opacity_2 as opacity };
        const color_2: number[];
        export { color_2 as color };
    }
    namespace DEFAULT_FILL {
        const opacity_3: number;
        export { opacity_3 as opacity };
        const color_3: number[];
        export { color_3 as color };
    }
    namespace DEFAULT_TEXT {
        export const font: string;
        export const textAlign: string;
        export namespace stroke_1 {
            const color_4: number[];
            export { color_4 as color };
            const width_2: number;
            export { width_2 as width };
            export const opactity: number;
        }
        export { stroke_1 as stroke };
        export namespace fill_1 {
            const opacity_4: number;
            export { opacity_4 as opacity };
            const color_5: number[];
            export { color_5 as color };
        }
        export { fill_1 as fill };
    }
    function getListTags(): any[];
    function defineStyleFromProperties(feature: any): any;
    function defineStyleFunctionByDefault(defaultStyle: Object): Function;
    function definePropertiesFromStyleByType(feature: any): void;
    function definePropertiesFromStyle(feature: any): void;
    function defineTagFromStyle(style: any, format: string): string;
}
//# sourceMappingURL=Styling.d.ts.map