export default ProxyUtils;
declare namespace ProxyUtils {
    function proxifyUrl(url: string, proxyOptions?: {
        proxyUrl: string;
        noProxyDomains?: string[] | undefined;
    } | undefined): string;
}
//# sourceMappingURL=ProxyUtils.d.ts.map