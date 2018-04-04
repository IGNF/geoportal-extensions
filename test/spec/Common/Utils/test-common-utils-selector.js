/* global describe, it */
import Logger from "../../../../src/Common/Utils/LoggerByDefault";
import ID from "../../../../src/Common/Utils/SelectorID";

var logger = Logger.getLogger("test-common-selectorid");

import { assert, expect, should } from "chai";
should();

describe("-- Test SelectorIDUtils --", function () {

    describe('#tag name with index', function () {

        it("get name", function () {

            var uuid = ID.generate();
            var tag  = "NAME_25-" + uuid;
            logger.trace(ID.name(tag), uuid);
            expect(ID.name(tag)).to.be.equal("NAME_25");

        });

        it("get index", function () {

            var uuid = ID.generate();
            var tag  = "NAME_25-" + uuid;
            logger.trace(ID.index(tag), uuid);
            expect(ID.index(tag)).to.be.equal("25");
        });

        it("get uuid", function () {

            var uuid = ID.generate();
            var tag  = "NAME_25-" + uuid;
            logger.trace(ID.uuid(tag));
            expect(ID.uuid(tag)).to.be.equal(uuid);
        });
    });

    describe('#tag name without index', function () {

        it("get name", function () {

            var uuid = ID.generate();
            var tag  = "NAME-" + uuid;
            logger.trace(ID.name(tag), uuid);
            expect(ID.name(tag)).to.be.equal("NAME");

        });

        it("get index", function () {

            var uuid = ID.generate();
            var tag  = "NAME-" + uuid;
            logger.trace(ID.index(tag), uuid);
            expect(ID.index(tag)).to.be.null;
        });

        it("get uuid", function () {

            var uuid = ID.generate();
            var tag  = "NAME-" + uuid;
            logger.trace(ID.uuid(tag));
            expect(ID.uuid(tag)).to.be.equal(uuid);
        });
    });

    describe('#bad tag name', function () {

        it("get name", function () {

            var uuid = ID.generate();
            var tag  = "_NAME25-" + uuid;
            logger.trace(ID.name(tag), uuid);
            expect(ID.name(tag)).to.be.equal("_NAME25");

        });

        it("get index", function () {

            var uuid = ID.generate();
            var tag  = "NAME25-" + uuid;
            logger.trace(ID.index(tag), uuid);
            expect(ID.index(tag)).to.be.null;
        });

        it("get uuid", function () {

            var uuid = ID.generate();
            var tag  = "NAME_" + uuid;
            logger.trace(ID.uuid(tag));
            expect(ID.uuid(tag)).to.be.null;
        });
    });
});
