/* global describe, it */
import Color from "../../../../src/Common/Utils/ColorUtils";

import { assert, expect, should } from "chai";
should();

describe("-- Test Color --", function () {

    describe("#rgbaToHex", function () {
        it('rgbaToHex', function () {
            var rgba = "rgba(0,0,0,1)";
            expect(JSON.stringify(Color.rgbaToHex(rgba))).to.be.equal(JSON.stringify({ hex: '#000000', opacity: 1 }));
        });
        it('rgbaToHex : parameter undefined', function () {
            var rgba = undefined;
            try {
                Color.rgbaToHex(rgba);
            } catch (e) {
                expect(e.message).to.have.string("Invalid format");
            }
        });
        it('rgbaToHex : invalid value', function () {
            var rgba = "rgba(0)";
            try {
                Color.rgbaToHex(rgba);
            } catch (e) {
                expect(e.message).to.have.string("Invalid format");
            }
        });
    });

    describe ("#hexToRgba", function () {
        it('hexToRgba', function () {
            var hex = "#000000", opacity = 1;
            expect(Color.hexToRgba(hex, opacity)).to.be.equal('rgba(0, 0, 0, 1)');
        });
        it('hexToRgba : parameter undefined', function () {
            var hex = undefined, opacity = 1;
            try {
                Color.hexToRgba(hex, opacity);
            } catch (e) {
                expect(e.message).to.have.string("Invalid format");
            }

        });
        it('hexToRgba : invalid value', function () {
            var hex = "00", opacity = 1;
            try {
                Color.hexToRgba(hex, opacity);
            } catch (e) {
                expect(e.message).to.have.string("Invalid format");
            }

        });
    });
});
