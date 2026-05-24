import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_HEADER, m as decodeKey } from './chunks/astro/server_DuFxAeMQ.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/jose/personalProjects/camees/","adapterName":"@astrojs/netlify","routes":[{"file":"novedades/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/novedades","isIndex":true,"type":"page","pattern":"^\\/novedades\\/?$","segments":[[{"content":"novedades","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/novedades/index.astro","pathname":"/novedades","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://camees.org.ar","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/jose/personalProjects/camees/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/jose/personalProjects/camees/src/pages/novedades/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/home/jose/personalProjects/camees/src/pages/novedades/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/jose/personalProjects/camees/src/components/Novedades.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/novedades/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/novedades/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/novedades/[slug]@_@astro":"pages/novedades/_slug_.astro.mjs","\u0000@astro-page:src/pages/novedades/index@_@astro":"pages/novedades.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Bc-SWHsK.mjs","/home/jose/personalProjects/camees/src/content/novedades/feria-de-primavera-en-la-peatonal.md?astroContentCollectionEntry=true":"chunks/feria-de-primavera-en-la-peatonal_C27OGR0-.mjs","/home/jose/personalProjects/camees/src/content/novedades/nueva-linea-de-microcreditos.md?astroContentCollectionEntry=true":"chunks/nueva-linea-de-microcreditos_ClKjxN-e.mjs","/home/jose/personalProjects/camees/src/content/novedades/taller-de-marketing-digital.md?astroContentCollectionEntry=true":"chunks/taller-de-marketing-digital_CHDcTfA9.mjs","/home/jose/personalProjects/camees/src/content/novedades/feria-de-primavera-en-la-peatonal.md?astroPropagatedAssets":"chunks/feria-de-primavera-en-la-peatonal_BIZ2-9_1.mjs","/home/jose/personalProjects/camees/src/content/novedades/nueva-linea-de-microcreditos.md?astroPropagatedAssets":"chunks/nueva-linea-de-microcreditos_EmGYaqAv.mjs","/home/jose/personalProjects/camees/src/content/novedades/taller-de-marketing-digital.md?astroPropagatedAssets":"chunks/taller-de-marketing-digital_DL_Oymdx.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","/home/jose/personalProjects/camees/src/content/novedades/feria-de-primavera-en-la-peatonal.md":"chunks/feria-de-primavera-en-la-peatonal_DyboLOp0.mjs","/home/jose/personalProjects/camees/src/content/novedades/nueva-linea-de-microcreditos.md":"chunks/nueva-linea-de-microcreditos_Beff3Tp6.mjs","/home/jose/personalProjects/camees/src/content/novedades/taller-de-marketing-digital.md":"chunks/taller-de-marketing-digital_DXwstR3m.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.D9nDjB5l.js","@astrojs/react/client.js":"_astro/client.BRuBIyTO.js","/astro/hoisted.js?q=1":"_astro/hoisted.Dv6GP8A2.js","/home/jose/personalProjects/camees/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.v1vbkPj9.js","/astro/hoisted.js?q=2":"_astro/hoisted.DaPG5a8O.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.Hl1ioLIa.css","/_astro/_slug_.CiWZWSo6.css","/_astro/index.Bp6EDUQM.css","/favicon.svg","/_astro/client.BRuBIyTO.js","/_astro/hoisted.D9nDjB5l.js","/_astro/hoisted.DaPG5a8O.js","/_astro/hoisted.Dv6GP8A2.js","/_astro/index.DcSQ35Ic.js","/_astro/keystatic-page.v1vbkPj9.js","/images/capacitaciones.jpg","/images/exposiciones.jpg","/images/hero-bg.jpg","/images/logo.png","/images/mision.png","/images/quienes-somos.jpg","/images/recursos.jpg","/images/servicios-emprendedoras.jpg","/images/servicios-instituciones.jpg","/images/valores.png","/images/vinculaciones.jpg","/images/vision.png","/images/novedades/feria-primavera.jpg","/novedades/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"BjrlcmKzExtAwmu2uK/ixoF/JKY5GcHOcsG8AhAqn84=","experimentalEnvGetSecretEnabled":false});

export { manifest };
