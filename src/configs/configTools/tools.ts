import { PickerLocale } from "antd/es/date-picker/generatePicker";
import { Locale } from "antd/es/locale";
import enUS from 'antd/es/locale/en_US';

type GetPopupContainer = (node: HTMLElement | undefined, queries?: string[]) => HTMLElement;
export var getPopupContainer: GetPopupContainer = function (node: any, queries: any) {
    if (queries === void 0) { queries = [".ant-modal", ".ant-drawer"]; }
    var parent = document.querySelector(queries === null || queries === void 0 ? void 0 : queries.find(function (e: any) { return document.querySelector(e); }));
    if (node && (parent === null || parent === void 0 ? void 0 : parent.contains(node)))
        return node === null || node === void 0 ? void 0 : node.parentNode;
    return document.body;
};
type GetConfigLocale = (language: string) => Locale;
export const getConfigLocale: GetConfigLocale = (language: string) => {
    switch (language) {
        case 'en': {
            return enUS;
        }
        default:
            return enUS;
    }
};