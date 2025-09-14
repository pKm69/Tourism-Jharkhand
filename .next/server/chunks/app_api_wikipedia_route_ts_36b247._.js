module.exports = {

"[project]/app/api/wikipedia/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    if (!query) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Query parameter is required'
        }, {
            status: 400
        });
    }
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages|info&exintro=true&explaintext=true&titles=${encodeURIComponent(query)}&pithumbsize=500&inprop=url`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId === '-1') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No content found for this query'
            }, {
                status: 404
            });
        }
        const page = pages[pageId];
        const extract = page.extract;
        const thumbnail = page.thumbnail?.source;
        const fullurl = page.fullurl;
        if (extract) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                extract,
                thumbnail,
                fullurl
            });
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No content found for this query'
            }, {
                status: 404
            });
        }
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch data from Wikipedia'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=app_api_wikipedia_route_ts_36b247._.js.map