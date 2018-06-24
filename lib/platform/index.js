"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
window.singleSpaAngularCli = window.singleSpaAngularCli || {};
var Platform = /** @class */ (function () {
    function Platform() {
    }
    Platform.prototype.mount = function (name, microRouter) {
        var _this = this;
        this.name = name;
        this.microRouter = microRouter;
        return Observable_1.Observable.create(function (observer) {
            if (_this.isSingleSpaApp()) {
                window.singleSpaAngularCli[_this.name] = window.singleSpaAngularCli[_this.name] || {};
                window.singleSpaAngularCli[_this.name].mount = function (props) {
                    observer.next({ props: props, attachUnmount: _this.unmount.bind(_this) });
                    observer.complete();
                };
            }
            else {
                observer.next({ props: {}, attachUnmount: _this.unmount.bind(_this) });
                observer.complete();
            }
        });
    };
    Platform.prototype.unmount = function (module) {
        var _this = this;
        if (this.isSingleSpaApp()) {
            if (this.microRouter) {
                window.singleSpaAngularCli[this.name].router = module.injector.get(this.microRouter);
            }
            window.singleSpaAngularCli[this.name].unmount = function () {
                if (module) {
                    var microRouter = window.singleSpaAngularCli[_this.name].router;
                    if (microRouter && microRouter.router) {
                        microRouter.router.dispose();
                    }
                    module.destroy();
                }
            };
        }
    };
    Platform.prototype.isSingleSpaApp = function () {
        return window.singleSpaAngularCli.isSingleSpa;
    };
    return Platform;
}());
exports.Platform = Platform;
//# sourceMappingURL=index.js.map