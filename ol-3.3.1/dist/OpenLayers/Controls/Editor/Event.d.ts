export default EventEditor;
declare namespace EventEditor {
    const onloaded: string;
    namespace layer {
        const onclickvisibility: string;
        const onclickclone: string;
        const onclickremove: string;
    }
    namespace legend {
        const onclickedition: string;
        const onchangevalue: string;
    }
    namespace group {
        const oncollapse: string;
    }
    namespace style {
        const oneditjson: string;
        namespace scale {
            const onchangemin: string;
            const onchangemax: string;
        }
    }
    namespace filter {
        const oneditjson_1: string;
        export { oneditjson_1 as oneditjson };
    }
    namespace themes {
        const onclickimage: string;
        const onclicktitle: string;
    }
    namespace search {
        const onsubmit: string;
        const onautocomplete: string;
    }
}
//# sourceMappingURL=Event.d.ts.map