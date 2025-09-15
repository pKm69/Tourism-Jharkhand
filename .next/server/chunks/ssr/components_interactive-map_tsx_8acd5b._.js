module.exports = {

"[project]/components/interactive-map.tsx [app-ssr] (ecmascript, async loader)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {

__turbopack_export_value__((__turbopack_import__) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_4ef1ae._.js",
  "server/chunks/ssr/components_interactive-map_tsx_e17285._.js",
  {
    "path": "server/chunks/ssr/node_modules_leaflet_dist_leaflet_02f82d.css",
    "included": [
      "[project]/node_modules/leaflet/dist/leaflet.css [app-ssr] (css)"
    ],
    "moduleChunks": [
      "server/chunks/ssr/node_modules_leaflet_dist_leaflet_31ffea.css"
    ]
  }
].map((chunk) => __turbopack_load__(chunk))).then(() => {
        return __turbopack_import__("[project]/components/interactive-map.tsx [app-ssr] (ecmascript)");
    });
});

})()),

};