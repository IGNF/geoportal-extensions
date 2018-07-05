/* global describe, it */
import MessageBox from "../../../../src/Common/Controls/MessageBox";

import { assert, expect, should } from "chai";
should();

describe("-- Test MessageBox --", function () {

    describe('test private method', function () {

        before(function () {});

        after(function () {
            // popup
            var elements = document.getElementsByClassName("GpMessageBox");
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
            // container
            var element = document.getElementById("container");
            if (element) {
                element.parentElement.removeChild(element);
            }
        });

        it("_setOptions() without param could return options by default", function () {
            var result = MessageBox._setOptions();
            expect(result).to.eql({
                duration : 4,
                message : "",
                severity : 0,
                close : false,
                target : null
            });
        });

        it("_setOptions() with param could merge it with options by default", function () {
            var result = MessageBox._setOptions({
                close : true,
                duration : 2
            });
            expect(result).to.eql({
                duration : 2,
                message : "",
                severity : 0,
                close : true,
                target : null
            });
        });

        it("_setDOM() without param could return a DOM object by default", function () {
            var result = MessageBox._setDOM({});
            var dom = '<div class="GpMessageBox GpBoxSeverityInfo GpBoxDuration GpBoxCenter"><div class="GpBoxText"></div></div>';
            expect(result.outerHTML).to.be.equal(dom);
        });

        it("_setDOM() with param but undefined could return a DOM object by default", function () {
            var result = MessageBox._setDOM();
            var dom = '<div class="GpMessageBox GpBoxSeverityInfo GpBoxDuration GpBoxCenter"><div class="GpBoxText"></div></div>';
            expect(result.outerHTML).to.be.equal(dom);
        });

        it("_setDOM() with param could return a DOM object", function () {
            var result = MessageBox._setDOM({
                duration : 4,
                message : "Message...",
                severity : 2,
                close : true,
                target : null
            });
            var dom = '<div class="GpMessageBox GpBoxSeverityError GpBoxDuration GpBoxCenter"><div class="GpBoxText">Message...</div><div class="GpBoxClose" title="Fermer le panneau"></div></div>';
            expect(result.outerHTML).to.be.equal(dom);
        });

        it("_setDOM() with param target could return a DOM object into container", function () {
            var div = document.createElement("div");
            div.id = "container";
            document.body.appendChild(div);

            var result = MessageBox._setDOM({
                duration : 4,
                message : "Message...",
                severity : 2,
                close : true,
                target : div
            });
            var dom = '<div id="container"><div class="GpMessageBox GpBoxSeverityError GpBoxDuration"><div class="GpBoxText">Message...</div><div class="GpBoxClose" title="Fermer le panneau"></div></div></div>';
            expect(result.parentNode.outerHTML).to.be.equal(dom);
        });
    });

    describe('test public method', function () {

        before(function () {

        });

        after(function () {
            // popup
            var elements = document.getElementsByClassName("GpMessageBox");
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        });

        it("show() with param could return a DOM object", function () {
            var result = MessageBox.show({
                duration : 4,
                message : "Message...",
                severity : 2,
                close : true,
                target : null
            });
            var dom = '<div class="GpMessageBox GpBoxSeverityError GpBoxDuration GpBoxCenter"><div class="GpBoxText">Message...</div><div class="GpBoxClose" title="Fermer le panneau"></div></div>';
            expect(result.outerHTML).to.be.equal(dom);
        });

        it("info() with param could return a DOM object", function () {
            var result = MessageBox.info("Message...");
            var dom = '<div class="GpMessageBox GpBoxSeverityInfo GpBoxDuration GpBoxCenter"><div class="GpBoxText">Message...</div></div>';
            expect(result.outerHTML).to.be.equal(dom);
        });

        it("warning() with param could return a DOM object", function () {
            var result = MessageBox.warning("Message...");
            var dom = '<div class="GpMessageBox GpBoxSeverityWarning GpBoxDuration GpBoxCenter"><div class="GpBoxText">Message...</div></div>';
            expect(result.outerHTML).to.be.equal(dom);
        });

        it("error() with param could return a DOM object", function () {
            var result = MessageBox.error("Message...");
            var dom = '<div class="GpMessageBox GpBoxSeverityError GpBoxDuration GpBoxCenter"><div class="GpBoxText">Message...</div></div>';
            expect(result.outerHTML).to.be.equal(dom);
        });
    });

});
