module.exports = {

"[project]/app/api/chatbot/message/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET,
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function POST(request) {
    try {
        const body = await request.json();
        // Forward the request to the backend API
        const backendResponse = await fetch('http://localhost:5000/api/chatbot/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await backendResponse.json();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
            status: backendResponse.status
        });
    } catch (error) {
        console.error('API route error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to connect to chatbot service'
        }, {
            status: 500
        });
    }
}
async function GET() {
    try {
        // Health check endpoint
        const backendResponse = await fetch('http://localhost:5000/api/chatbot/health', {
            method: 'GET'
        });
        const data = await backendResponse.json();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
            status: backendResponse.status
        });
    } catch (error) {
        console.error('Health check error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            chatbotService: 'unavailable',
            error: 'Failed to connect to chatbot service'
        }, {
            status: 503
        });
    }
}

})()),

};

//# sourceMappingURL=app_api_chatbot_message_route_ts_65ce3c._.js.map