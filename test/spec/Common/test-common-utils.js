/* global describe, it */
import Utils from "../../../src/Common/Utils";

import { assert, expect, should } from "chai";
should();

describe("-- Test Utils --", function () {

    describe("#mergeParams", function () {
        it('merge to null value returns value', function () {
            var settings_default = {
                a : null
            };
            var settings_user = {
                a : 1
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                a : 1
            }));
        });

        it('merge from null value returns value', function () {
            var settings_default = {
                a : 1
            };
            var settings_user = {
                a : null
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                a : 1
            }));
        });

        it('merge to undefined value returns value', function () {
            var settings_default = {
                b : undefined
            };
            var settings_user = {
                b : 2
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                b : 2
            }));
        });

        it('merge from undefined value returns undefined', function () {
            var settings_default = {
                b : 2
            };
            var settings_user = {
                b : undefined
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                b : undefined
            }));
        });

        it('merge to {undefined} value returns {value}', function () {
            var settings_default = {
                c : {}
            };
            var settings_user = {
                c : { a:1 }
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                c : { a:1 }
            }));
        });

        it('merge from {undefined} value returns {value}', function () {
            var settings_default = {
                c : { a:1 }
            };
            var settings_user = {
                c : {}
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                c : { a:1 }
            }));
        });

        it('merge to {} value concats object', function () {
            var settings_default = {
                c : { a:1, b:0, d:4 }
            };
            var settings_user = {
                c : { a:1, b:2, c:3 }
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                c : { a:1, b:2, d:4, c:3 }
            }));
        });

        it('merge to [undefined] value returns [value]', function () {
            var settings_default = {
                d : []
            };
            var settings_user = {
                d : [1,2,3]
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                d : [1,2,3]
            }));
        });

        it('merge from [undefined] value returns [value]', function () {
            var settings_default = {
                d : [1,2,3]
            };
            var settings_user = {
                d : []
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                d : [1,2,3]
            }));
        });

        it('merge to [] value does not concat array ', function () {
            var settings_default = {
                d : [1,2,3]
            };
            var settings_user = {
                d : [4,5,6]
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                d : [4,5,6]
            }));
        });

        it('merge from [] with null value concats array ', function () {
            var settings_default = {
                d : [1,2,3]
            };
            var settings_user = {
                d : [null,5,null,7]
            };
            Utils.mergeParams(settings_default, settings_user);
            expect(JSON.stringify(settings_default)).to.be.equal(JSON.stringify({
                d : [1,5,3,7]
            }));
        });
    });

});
