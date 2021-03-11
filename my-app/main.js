(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\MyProjects\flamingo-test-tool\src\main.ts */"zUnb");


/***/ }),

/***/ "9o+j":
/*!**************************************************************!*\
  !*** ./src/app/factory-manager/factory-manager.component.ts ***!
  \**************************************************************/
/*! exports provided: FactoryManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactoryManagerComponent", function() { return FactoryManagerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _contracts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contracts */ "zJFF");
/* harmony import */ var _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cityofzion/neon-js */ "1c5F");
/* harmony import */ var _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _rpcUrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rpcUrl */ "yGUO");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");



// import Neon from "@cityofzion/neon-js";





function FactoryManagerComponent_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rpc_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", rpc_r1.Url);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](rpc_r1.Name);
} }
class FactoryManagerComponent {
    constructor() {
        this.rpcUrls = _rpcUrl__WEBPACK_IMPORTED_MODULE_4__["RpcUrls"];
        this.nodeUrl = "http://localhost:60002";
        this.model = {
            factoryContract: "0x" + _contracts__WEBPACK_IMPORTED_MODULE_2__["Contracts"].factoryContract,
            tokenA: "0x" + _contracts__WEBPACK_IMPORTED_MODULE_2__["Contracts"].tokenA.value,
            tokenB: "0x" + _contracts__WEBPACK_IMPORTED_MODULE_2__["Contracts"].tokenB.value,
            pairContract: "",
            pairContractAddress: ""
        };
        this.tokens = _contracts__WEBPACK_IMPORTED_MODULE_2__["Contracts"].tokens;
        this.txId = "";
        this.errorMessage = "";
        //私链neoscan地址,付gas时要用，不付不需要改
        // apiProvider = new api.neoscan.instance("http://128.1.61.238:34000/api/main_net");
        this.apiProvider = new _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["api"].neoscan.instance("https://api.neoscan.io/api/main_net");
        // const apiProvider = new api.neoscan.instance("http://128.1.61.238:34444/api/main_net");
        //From
        // normalPrivateKey = "L2oYxEYhM2rXhnz74mVEzVRfFieu79RN77po2VPRKfVuyPEjotUH"; //debug wallet：ARpSm3ExT2ZRhR3faqZKEAfFQwyceAib9L
        this.normalPrivateKey = "L4EKpKPVcwq26xR6T4ierUj9pA8rLMiZAhhzru2qYiFNiCzgNgGU"; //wallet1: AZaCs7GwthGy9fku2nFXtbrdKBRmrUQoFP
        // normalPrivateKey = "L3KMJNhui75G3NuZXYrgmoD5CSo1JkoW95d1xVK5rPJKJwPryoWk"; //wallet1: AJ5kbv2QJ1eZG3ESYynrETcUyomsG2iJZp
        this.adminAccount = new _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["wallet"].Account(this.normalPrivateKey);
    }
    ngOnInit() {
    }
    resetError() {
        this.errorMessage = "";
    }
    /**
     * 查询交易对合约
     * @param tokenA
     * @param tokenB
     */
    onShow(tokenA, tokenB) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.resetError();
            this.model.pairContract = "";
            console.log(tokenA, tokenB);
            let token0 = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["sc"].ContractParam.hash160(tokenA.replace("0x", ""));
            let token1 = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["sc"].ContractParam.hash160(tokenB.replace("0x", ""));
            const sb = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3___default.a.create.scriptBuilder();
            sb.emitAppCall(_contracts__WEBPACK_IMPORTED_MODULE_2__["Contracts"].factoryContract, "getExchangePair", [token0, token1]);
            // Returns a hexstring
            const script = sb.str;
            console.log(script);
            var response = yield _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["rpc"].Query.invokeScript(script).execute(this.nodeUrl);
            console.log(response);
            if (response.result.state == "HALT" && response.result.stack[0].value) {
                let p = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3___default.a.u.reverseHex(response.result.stack[0].value);
                let pairContract = "0x" + p;
                this.model.pairContract = pairContract;
                // var address=new wallet.Account(pairContract);
                this.model.pairContractAddress = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["wallet"].getAddressFromScriptHash(p);
            }
            else {
                this.errorMessage = JSON.stringify(response);
            }
        });
    }
    /**
     * 重置交易对绑定合约
     */
    onReset() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.resetError();
                let addGas = 0; //附加gas
                let token0 = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["sc"].ContractParam.hash160(this.model.tokenA.replace("0x", ""));
                let token1 = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["sc"].ContractParam.hash160(this.model.tokenB.replace("0x", ""));
                let pairContract = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3__["sc"].ContractParam.hash160(this.model.pairContract.replace("0x", ""));
                const sb = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3___default.a.create.scriptBuilder();
                sb.emitAppCall(_contracts__WEBPACK_IMPORTED_MODULE_2__["Contracts"].factoryContract, "removeExchangePair", [token0, token1]);
                sb.emitAppCall(_contracts__WEBPACK_IMPORTED_MODULE_2__["Contracts"].factoryContract, "createExchangePair", [token0, token1, pairContract]);
                // Returns a hexstring
                const script = sb.str;
                console.log(script);
                const config = {
                    api: this.apiProvider,
                    url: this.nodeUrl,
                    account: this.adminAccount,
                    script: script,
                    gas: addGas,
                    fees: 0 //Additional gas paying for network fee(prioritizing, oversize transaction).
                };
                _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_3___default.a.doInvoke(config)
                    .then(config => {
                    console.log("\n\n--- Response ---");
                    console.log(config.response);
                    if (config.response.result) {
                        this.txId = config.response.txid;
                    }
                })
                    .catch(config => {
                    console.log(config);
                    this.errorMessage = config;
                });
            }
            catch (error) {
                this.errorMessage = error;
            }
        });
    }
}
FactoryManagerComponent.ɵfac = function FactoryManagerComponent_Factory(t) { return new (t || FactoryManagerComponent)(); };
FactoryManagerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FactoryManagerComponent, selectors: [["app-factory-manager"]], decls: 37, vars: 14, consts: [[1, "dashboard"], [1, "left"], [2, "color", "blueviolet"], [3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [2, "color", "green", "font-weight", "bold"], [2, "color", "red", "font-weight", "bold"], [2, "color", "chocolate"], ["placeholder", "token0", 3, "ngModel", "ngModelChange"], ["placeholder", "token1", 3, "ngModel", "ngModelChange"], ["placeholder", "\u4EA4\u6613\u5BF9\u5408\u7EA6", 3, "ngModel", "ngModelChange"], [3, "click"], ["placeholder", "\u4EA4\u6613Id", "readonly", "", 2, "width", "450px", 3, "ngModel", "ngModelChange"], [1, "error-box"], ["rows", "10", "readonly", "", 2, "width", "100%", "color", "red"], [3, "value"]], template: function FactoryManagerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h4", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function FactoryManagerComponent_Template_select_ngModelChange_4_listener($event) { return ctx.nodeUrl = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, FactoryManagerComponent_option_5_Template, 2, 2, "option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " || ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "h4", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "TokenA: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function FactoryManagerComponent_Template_input_ngModelChange_20_listener($event) { return ctx.model.tokenA = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "TokenB: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function FactoryManagerComponent_Template_input_ngModelChange_23_listener($event) { return ctx.model.tokenB = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "PairAB: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function FactoryManagerComponent_Template_input_ngModelChange_26_listener($event) { return ctx.model.pairContract = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FactoryManagerComponent_Template_button_click_27_listener() { return ctx.onShow(ctx.model.tokenA, ctx.model.tokenB); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "\u67E5\u627E");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FactoryManagerComponent_Template_button_click_29_listener() { return ctx.onReset(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "\u91CD\u65B0\u7ED1\u5B9A");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "TxId: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function FactoryManagerComponent_Template_input_ngModelChange_33_listener($event) { return ctx.txId = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "textarea", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Current Rpc: ", ctx.nodeUrl, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.nodeUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.rpcUrls);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Factory: ", ctx.model.factoryContract, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Admin: ", ctx.adminAccount.address, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("TokenA: ", ctx.model.tokenA, " || TokenB: ", ctx.model.tokenB, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("PairAB: ", ctx.model.pairContract, " | Address: ", ctx.model.pairContractAddress, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.model.tokenA);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.model.tokenB);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.model.pairContract);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.txId);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("    ", ctx.errorMessage, "\n\n  ");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_forms_forms_x"]], styles: ["input[_ngcontent-%COMP%] {\r\n  width: 350px;\r\n  padding: 5px;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n  padding-left: 10px;\r\n}\r\n\r\n\r\n\r\n.factory[_ngcontent-%COMP%] {\r\n  margin: 0 0 2em 0;\r\n  list-style-type: none;\r\n  padding: 0;\r\n  width: 22em;\r\n}\r\n\r\n.factory[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n  position: relative;\r\n  left: 0;\r\n  background-color: #EEE;\r\n  margin: .5em;\r\n  padding: .3em 0;\r\n  height: 1.6em;\r\n  border-radius: 4px;\r\n}\r\n\r\n.factory[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\r\n  color: #607D8B;\r\n  background-color: #DDD;\r\n  left: .1em;\r\n}\r\n\r\n.factory[_ngcontent-%COMP%]   li.selected[_ngcontent-%COMP%] {\r\n  background-color: #CFD8DC;\r\n  color: white;\r\n}\r\n\r\n.factory[_ngcontent-%COMP%]   li.selected[_ngcontent-%COMP%]:hover {\r\n  background-color: #BBD8DC;\r\n  color: white;\r\n}\r\n\r\n.factory[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  font-size: small;\r\n  color: white;\r\n  padding: 0.8em 0.7em 0 0.7em;\r\n  background-color: #405061;\r\n  line-height: 1em;\r\n  position: relative;\r\n  left: -1px;\r\n  top: -4px;\r\n  height: 1.8em;\r\n  margin-right: .8em;\r\n  border-radius: 4px 0 0 4px;\r\n}\r\n\r\n.error-box[_ngcontent-%COMP%] {\r\n  color: red;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%] {\r\n  margin: 10px;\r\n}\r\n\r\nlabel[_ngcontent-%COMP%] {\r\n  margin: 10px;\r\n}\r\n\r\n.dashboard[_ngcontent-%COMP%] {\r\n  display: flex;\r\n\r\n}\r\n\r\n.left[_ngcontent-%COMP%] {\r\n  \r\n}\r\n\r\n.right[_ngcontent-%COMP%] {}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmFjdG9yeS1tYW5hZ2VyL2ZhY3RvcnktbWFuYWdlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQSwwQ0FBMEM7O0FBQzFDO0VBQ0UsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixVQUFVO0VBQ1YsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1Asc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsVUFBVTtBQUNaOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWiw0QkFBNEI7RUFDNUIseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLDBCQUEwQjtBQUM1Qjs7QUFHQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7O0FBRWY7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUEsUUFBUSIsImZpbGUiOiJzcmMvYXBwL2ZhY3RvcnktbWFuYWdlci9mYWN0b3J5LW1hbmFnZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImlucHV0IHtcclxuICB3aWR0aDogMzUwcHg7XHJcbiAgcGFkZGluZzogNXB4O1xyXG59XHJcblxyXG5kaXYge1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxufVxyXG5cclxuLyogZmFjdG9yeUNvbXBvbmVudCdzIHByaXZhdGUgQ1NTIHN0eWxlcyAqL1xyXG4uZmFjdG9yeSB7XHJcbiAgbWFyZ2luOiAwIDAgMmVtIDA7XHJcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgd2lkdGg6IDIyZW07XHJcbn1cclxuXHJcbi5mYWN0b3J5IGxpIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI0VFRTtcclxuICBtYXJnaW46IC41ZW07XHJcbiAgcGFkZGluZzogLjNlbSAwO1xyXG4gIGhlaWdodDogMS42ZW07XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcblxyXG4uZmFjdG9yeSBsaTpob3ZlciB7XHJcbiAgY29sb3I6ICM2MDdEOEI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RERDtcclxuICBsZWZ0OiAuMWVtO1xyXG59XHJcblxyXG4uZmFjdG9yeSBsaS5zZWxlY3RlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI0NGRDhEQztcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5mYWN0b3J5IGxpLnNlbGVjdGVkOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjQkJEOERDO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmZhY3RvcnkgLmJhZGdlIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgZm9udC1zaXplOiBzbWFsbDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMC44ZW0gMC43ZW0gMCAwLjdlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDA1MDYxO1xyXG4gIGxpbmUtaGVpZ2h0OiAxZW07XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IC0xcHg7XHJcbiAgdG9wOiAtNHB4O1xyXG4gIGhlaWdodDogMS44ZW07XHJcbiAgbWFyZ2luLXJpZ2h0OiAuOGVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweCAwIDAgNHB4O1xyXG59XHJcblxyXG5cclxuLmVycm9yLWJveCB7XHJcbiAgY29sb3I6IHJlZDtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5kYXNoYm9hcmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcblxyXG59XHJcblxyXG4ubGVmdCB7XHJcbiAgLyogd2lkdGg6IDUwJTsgKi9cclxufVxyXG5cclxuLnJpZ2h0IHt9XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FactoryManagerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-factory-manager',
                templateUrl: './factory-manager.component.html',
                styleUrls: ['./factory-manager.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AppComponent {
    constructor() {
        this.title = 'test-tool';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 6, vars: 1, consts: [["routerLink", "/factory"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "FactoryManager");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "router-outlet");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.title);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _factory_manager_factory_manager_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factory-manager/factory-manager.component */ "9o+j");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ "d3UM");


 // <-- NgModel lives here







class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelectModule"],
            // MatSliderModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _factory_manager_factory_manager_component__WEBPACK_IMPORTED_MODULE_4__["FactoryManagerComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelectModule"],
        // MatSliderModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _factory_manager_factory_manager_component__WEBPACK_IMPORTED_MODULE_4__["FactoryManagerComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_8__["MatSelectModule"],
                    // MatSliderModule,
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _factory_manager_factory_manager_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory-manager/factory-manager.component */ "9o+j");





const routes = [
    { path: 'factory', component: _factory_manager_factory_manager_component__WEBPACK_IMPORTED_MODULE_2__["FactoryManagerComponent"] }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [],
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "yGUO":
/*!***************************!*\
  !*** ./src/app/rpcUrl.ts ***!
  \***************************/
/*! exports provided: RpcUrls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RpcUrls", function() { return RpcUrls; });
class RpcUrl {
}
const RpcUrls = [
    { Url: "http://localhost:60002", Name: "Local" },
    { Url: "http://seed2t.neo.org:11332", Name: "flamtest" },
    { Url: "http://seed3.ngd.network:20332", Name: "testnet" },
    { Url: "http://seed1.ngd.network:10332/", Name: "Mainnet" },
];


/***/ }),

/***/ "zJFF":
/*!******************************!*\
  !*** ./src/app/contracts.ts ***!
  \******************************/
/*! exports provided: Contracts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contracts", function() { return Contracts; });
/* harmony import */ var _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cityofzion/neon-js */ "1c5F");
/* harmony import */ var _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__);

var Contracts;
(function (Contracts) {
    Contracts.factoryContract = 'f8613c1ad870e6e05ec0caffdb276e37389f091b';
    Contracts.routerContract = "d40d3133f30fc9f8c76c10cff40370be3320f0bb";
    Contracts.exchangePairAB = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__["sc"].ContractParam.hash160("d81993c8b8935bde7e15af96792c606edb6d4e48");
    Contracts.exchangePairBC = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__["sc"].ContractParam.hash160('59899af67bab7dea68cebe31eb22ab13bd8ba508');
    Contracts.tokenA = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__["sc"].ContractParam.hash160("ffd7c6a529591ef234999336f371cb82601eadcb");
    Contracts.tokenB = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__["sc"].ContractParam.hash160("d40f5992028cd7834e908b06478a9ac70f49767c");
    Contracts.tokenC = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__["sc"].ContractParam.hash160("b9ea5db6b1340743dfea384ae3c8ae2c41e04bf8");
    Contracts.tokenD = _cityofzion_neon_js__WEBPACK_IMPORTED_MODULE_0__["sc"].ContractParam.hash160("9efe829a19355ef4edfa805f731ed431af804118");
    Contracts.tokens = [
        { name: "tokenA", value: "0x" + Contracts.tokenA.value },
        { name: "tokenB", value: "0x" + Contracts.tokenB.value },
        { name: "tokenC", value: "0x" + Contracts.tokenC.value },
        { name: "tokenD", value: "0x" + Contracts.tokenD.value },
    ];
})(Contracts || (Contracts = {}));


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map