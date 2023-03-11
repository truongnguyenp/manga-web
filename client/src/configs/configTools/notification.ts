import { notification } from "antd";
export var showError = function (error: unknown | string) {
    var message = (function () {
        if (typeof error === "string")
            return error;
        if (error instanceof Error) {
            return error === null || error === void 0 ? void 0 : error.message;
        }
        return "Server Internall Error. Please try later !!!!";
    })();
    return notification.error({
        message: message
    });
};
export var showSuccess = function (message: string) {
    return notification.success({
        message: message
    });
};
