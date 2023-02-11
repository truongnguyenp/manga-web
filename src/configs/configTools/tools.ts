type GetPopupContainer = (node: HTMLElement | undefined, queries?: string[]) => HTMLElement;
export var getPopupContainer: GetPopupContainer = function (node: any, queries: any) {
    if (queries === void 0) { queries = [".ant-modal", ".ant-drawer"]; }
    var parent = document.querySelector(queries === null || queries === void 0 ? void 0 : queries.find(function (e: any) { return document.querySelector(e); }));
    if (node && (parent === null || parent === void 0 ? void 0 : parent.contains(node)))
        return node === null || node === void 0 ? void 0 : node.parentNode;
    return document.body;
};