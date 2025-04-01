"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PatientProfileComponent = void 0;
var core_1 = require("@angular/core");
var card_1 = require("primeng/card");
var common_1 = require("@angular/common");
var PatientProfileComponent = /** @class */ (function () {
    function PatientProfileComponent(dataService) {
        this.dataService = dataService;
    }
    PatientProfileComponent.prototype.ngOnInit = function () {
        this.user = this.dataService.getUser();
    };
    PatientProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-patient-profile',
            standalone: true,
            imports: [common_1.CommonModule, card_1.CardModule],
            template: "\n    <p-card header=\"Profile\">\n      <p>Name: {{ user.name }}</p>\n      <p>Email: {{ user.email }}</p>\n    </p-card>\n  ",
            styleUrls: ['./patient-profile.component.scss']
        })
    ], PatientProfileComponent);
    return PatientProfileComponent;
}());
exports.PatientProfileComponent = PatientProfileComponent;
