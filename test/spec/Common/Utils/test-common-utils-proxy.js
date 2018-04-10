/* global describe, it */
import ProxyUtils from "../../../../src/Common/Utils/ProxyUtils";

import { assert, expect, should } from "chai";
should();

describe("-- Test ProxyUtils --", function () {

    describe('#proxifyUrl', function () {
        it("without parameter, return Undefined", function () {
            expect(ProxyUtils.proxifyUrl()).to.be.undefined;
        });

        it("without parameter options, return Url", function () {
            expect(ProxyUtils.proxifyUrl("http://localhost")).to.be.equal("http://localhost");
        });

        it("with parameter options.proxyUrl, return proxify Url", function () {
            expect(ProxyUtils.proxifyUrl("http://localhost", {
                proxyUrl : "http://proxy?url="
            })).to.be.equal("http://proxy?url=http%3A%2F%2Flocalhost");
        });

        it("with parameter options.proxyUrl empty, return Url", function () {
            expect(ProxyUtils.proxifyUrl("http://localhost", {
                proxyUrl : ""
            })).to.be.equal("http://localhost");
        });

        it("with parameter options.proxyUrl null, return Url", function () {
            expect(ProxyUtils.proxifyUrl("http://localhost", {
                proxyUrl : null
            })).to.be.equal("http://localhost");
        });

        it("with parameter options.noProxyDomains=[Url], return Url", function () {
            expect(ProxyUtils.proxifyUrl("http://localhost", {
                proxyUrl : "http://proxy?url=",
                noProxyDomains : ["http://localhost"]
            })).to.be.equal("http://localhost");
        });

        it("with parameter options.noProxyDomains=[AnotherUrl], return proxify Url", function () {
            expect(ProxyUtils.proxifyUrl("http://localhost", {
                proxyUrl : "http://proxy?url=",
                noProxyDomains : ["http://127.0.0.1"]
            })).to.be.equal("http://proxy?url=http%3A%2F%2Flocalhost");
        });

        it("with parameter options.noProxyDomains=[], return proxify Url", function () {
            expect(ProxyUtils.proxifyUrl("http://localhost", {
                proxyUrl : "http://proxy?url=",
                noProxyDomains : []
            })).to.be.equal("http://proxy?url=http%3A%2F%2Flocalhost");
        });
    });
});
