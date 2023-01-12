/*global QUnit*/

sap.ui.define([
	"comudep29InfoAlum/portal/controller/InfoGralAlum.controller"
], function (Controller) {
	"use strict";

	QUnit.module("InfoGralAlum Controller");

	QUnit.test("I should test the InfoGralAlum controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
