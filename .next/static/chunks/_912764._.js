(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_912764._.js", {

"[project]/hooks/use-auth.ts [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "useAuth": ()=>useAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
var _s = __turbopack_refresh__.signature();
'use client';
;
;
function useAuth() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [authState, setAuthState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for stored auth data on mount
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                setAuthState({
                    user,
                    token,
                    isLoading: false,
                    isAuthenticated: true
                });
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                logout();
            }
        } else {
            setAuthState((prev)=>({
                    ...prev,
                    isLoading: false
                }));
        }
    }, []);
    const login = (user, token)=>{
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
            user,
            token,
            isLoading: false,
            isAuthenticated: true
        });
    };
    const logout = async ()=>{
        try {
            // Call backend logout endpoint if token exists
            if (authState.token) {
                await fetch('http://localhost:5000/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authState.token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally{
            // Clear local storage and state regardless of API call result
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setAuthState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false
            });
            router.push('/');
        }
    };
    const updateUser = (updatedUser)=>{
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAuthState((prev)=>({
                ...prev,
                user: updatedUser
            }));
    };
    return {
        ...authState,
        login,
        logout,
        updateUser
    };
}
_s(useAuth, "avZL2qnAExxZn0GWw8e+eZcW0UE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});

})()),
"[project]/components/navigation.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>Navigation
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mountain$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/mountain.js [app-client] (ecmascript) <export default as Mountain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/hooks/use-auth.ts [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
function Navigation() {
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, isAuthenticated, logout, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "navbar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "navbar-logo",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mountain$3e$__["Mountain"], {
                        className: "h-6 w-6"
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    "Jharkhand Tourism"
                ]
            }, void 0, true, {
                fileName: "[project]/components/navigation.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "navbar-links",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/destinations",
                            children: "Destinations"
                        }, void 0, false, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/ai-features",
                            children: "Smart Features"
                        }, void 0, false, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/marketplace",
                            children: "Marketplace"
                        }, void 0, false, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/feedback",
                            children: "Feedback"
                        }, void 0, false, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/about",
                            children: "About"
                        }, void 0, false, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/navigation.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsUserMenuOpen(!isUserMenuOpen),
                            className: "flex items-center space-x-2 navbar-button",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/navigation.tsx",
                                    lineNumber: 48,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: user?.name || 'User'
                                }, void 0, false, {
                                    fileName: "[project]/components/navigation.tsx",
                                    lineNumber: 49,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 44,
                            columnNumber: 15
                        }, this),
                        isUserMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50",
                            style: {
                                background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)',
                                border: '1px solid rgba(244, 208, 63, 0.3)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/profile",
                                        className: "flex items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors",
                                        onClick: ()=>setIsUserMenuOpen(false),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "h-4 w-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/components/navigation.tsx",
                                                lineNumber: 63,
                                                columnNumber: 23
                                            }, this),
                                            "Profile"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/navigation.tsx",
                                        lineNumber: 58,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            logout();
                                            setIsUserMenuOpen(false);
                                        },
                                        className: "flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "h-4 w-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/components/navigation.tsx",
                                                lineNumber: 73,
                                                columnNumber: 23
                                            }, this),
                                            "Logout"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/navigation.tsx",
                                        lineNumber: 66,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/navigation.tsx",
                                lineNumber: 57,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 53,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/navigation.tsx",
                    lineNumber: 43,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/auth",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "navbar-button",
                        children: "Get Started"
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 82,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/navigation.tsx",
                    lineNumber: 81,
                    columnNumber: 13
                }, this)
            }, void 0, false),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "mobile-menu-button md:hidden",
                onClick: ()=>setIsMenuOpen(!isMenuOpen),
                children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "h-6 w-6"
                }, void 0, false, {
                    fileName: "[project]/components/navigation.tsx",
                    lineNumber: 90,
                    columnNumber: 23
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    className: "h-6 w-6"
                }, void 0, false, {
                    fileName: "[project]/components/navigation.tsx",
                    lineNumber: 90,
                    columnNumber: 51
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/navigation.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-menu",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/destinations",
                        onClick: ()=>setIsMenuOpen(false),
                        children: "Destinations"
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/ai-features",
                        onClick: ()=>setIsMenuOpen(false),
                        children: "Smart Features"
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/marketplace",
                        onClick: ()=>setIsMenuOpen(false),
                        children: "Marketplace"
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/feedback",
                        onClick: ()=>setIsMenuOpen(false),
                        children: "Feedback"
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/about",
                        onClick: ()=>setIsMenuOpen(false),
                        children: "About"
                    }, void 0, false, {
                        fileName: "[project]/components/navigation.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/profile",
                                    onClick: ()=>setIsMenuOpen(false),
                                    className: "flex items-center text-white hover:text-yellow-300 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "h-4 w-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/navigation.tsx",
                                            lineNumber: 118,
                                            columnNumber: 21
                                        }, this),
                                        "Profile (",
                                        user?.name,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/navigation.tsx",
                                    lineNumber: 117,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        logout();
                                        setIsMenuOpen(false);
                                    },
                                    className: "flex items-center text-white hover:text-yellow-300 transition-colors w-full text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            className: "h-4 w-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/navigation.tsx",
                                            lineNumber: 128,
                                            columnNumber: 21
                                        }, this),
                                        "Logout"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/navigation.tsx",
                                    lineNumber: 121,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/auth",
                            onClick: ()=>setIsMenuOpen(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "navbar-button w-full",
                                children: "Get Started"
                            }, void 0, false, {
                                fileName: "[project]/components/navigation.tsx",
                                lineNumber: 134,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/navigation.tsx",
                            lineNumber: 133,
                            columnNumber: 17
                        }, this)
                    }, void 0, false)
                ]
            }, void 0, true, {
                fileName: "[project]/components/navigation.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/navigation.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(Navigation, "o8IVoxGwi2G6571x3Tx6vFu/xE0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Navigation;
var _c;
__turbopack_refresh__.register(_c, "Navigation");

})()),
"[project]/components/footer.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>Footer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "footer-section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "footer-top",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "footer-brand",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Jharkhand Tourism"
                            }, void 0, false, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 9,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Discover the authentic beauty of Jharkhand through our smart digital platform."
                            }, void 0, false, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 10,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/footer.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "footer-links-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Destinations"
                            }, void 0, false, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/destinations#netarhat",
                                            children: "Netarhat"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 16,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 15,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/destinations#betla",
                                            children: "Betla National Park"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 21,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 20,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/destinations#hundru",
                                            children: "Hundru Falls"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 26,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/destinations#deoghar",
                                            children: "Deoghar"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 14,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/footer.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "footer-links-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Features"
                            }, void 0, false, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/ai-features#itinerary",
                                            children: "AI Features"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/marketplace",
                                            children: "Marketplace"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 45,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/marketplace",
                                            children: "Local Marketplace"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/community",
                                            children: "Community Support"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 56,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/footer.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "footer-links-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Support"
                            }, void 0, false, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/about#help",
                                            children: "Help Center"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/contact",
                                            children: "Contact Us"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/about#privacy",
                                            children: "Privacy Policy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/about#terms",
                                            children: "Terms of Service"
                                        }, void 0, false, {
                                            fileName: "[project]/components/footer.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/footer.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/footer.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/footer.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/footer.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "footer-bottom",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "© 2024 Jharkhand Tourism Platform. All rights reserved."
                }, void 0, false, {
                    fileName: "[project]/components/footer.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/footer.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/footer.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_refresh__.register(_c, "Footer");

})()),
"[project]/app/marketplace/page.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>MarketplacePage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/aos/dist/aos.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/navigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/hooks/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/utensils.js [app-client] (ecmascript) <export default as Utensils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
;
;
function MarketplacePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [selectedLocation, setSelectedLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    // Initialize AOS - Match home page settings
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aos$2f$dist$2f$aos$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }, []);
    const categories = [
        "All",
        "Handicrafts",
        "Homestays",
        "Experiences",
        "Food",
        "Transport",
        "Guides"
    ];
    const locations = [
        "All",
        "Ranchi",
        "Deoghar",
        "Netarhat",
        "Jamshedpur",
        "Hazaribagh"
    ];
    const products = [
        {
            id: 1,
            name: "Traditional Sohrai Art Painting",
            image: "/jharkhand-tribal-handicrafts-marketplace-artisans.jpg",
            price: "₹2,500",
            originalPrice: "₹3,000",
            rating: 4.8,
            reviews: 24,
            seller: "Kumari Devi",
            location: "Hazaribagh",
            category: "Handicrafts",
            description: "Authentic tribal wall art featuring traditional Sohrai patterns",
            isVerified: true,
            isFavorite: false,
            tags: [
                "Handmade",
                "Traditional",
                "Eco-friendly"
            ]
        },
        {
            id: 2,
            name: "Tribal Homestay Experience",
            image: "/netarhat-hill-station-sunrise-jharkhand.jpg",
            price: "₹1,200",
            originalPrice: null,
            rating: 4.9,
            reviews: 18,
            seller: "Birsa Munda Family",
            location: "Netarhat",
            category: "Homestays",
            description: "Stay with a local tribal family and experience authentic culture",
            isVerified: true,
            isFavorite: true,
            tags: [
                "Cultural",
                "Authentic",
                "Family-friendly"
            ]
        },
        {
            id: 3,
            name: "Dokra Metal Craft Workshop",
            image: "/jharkhand-landscape-forest-mountains-tribal-cultur.jpg",
            price: "₹800",
            originalPrice: null,
            rating: 4.7,
            reviews: 32,
            seller: "Raman Kumar",
            location: "Ranchi",
            category: "Experiences",
            description: "Learn the ancient art of Dokra metal casting from master artisans",
            isVerified: true,
            isFavorite: false,
            tags: [
                "Workshop",
                "Traditional",
                "Hands-on"
            ]
        },
        {
            id: 4,
            name: "Organic Tribal Honey",
            image: "/deoghar-temple-spiritual-jharkhand.jpg",
            price: "₹450",
            originalPrice: "₹500",
            rating: 4.6,
            reviews: 45,
            seller: "Jharkhand Tribal Cooperative",
            location: "Deoghar",
            category: "Food",
            description: "Pure honey collected from forest beehives by tribal communities",
            isVerified: true,
            isFavorite: false,
            tags: [
                "Organic",
                "Pure",
                "Forest"
            ]
        },
        {
            id: 5,
            name: "Local Guide - Wildlife Safari",
            image: "/betla-national-park-wildlife-tigers-jharkhand.jpg",
            price: "₹1,500",
            originalPrice: null,
            rating: 5.0,
            reviews: 28,
            seller: "Suresh Oraon",
            location: "Betla",
            category: "Guides",
            description: "Expert wildlife guide with 15 years experience in Betla National Park",
            isVerified: true,
            isFavorite: true,
            tags: [
                "Expert",
                "Wildlife",
                "Experienced"
            ]
        },
        {
            id: 6,
            name: "Bamboo Handicraft Set",
            image: "/hazaribagh-national-park-jharkhand-wildlife-forest.jpg",
            price: "₹1,800",
            originalPrice: "₹2,200",
            rating: 4.5,
            reviews: 19,
            seller: "Santhal Craft Collective",
            location: "Jamshedpur",
            category: "Handicrafts",
            description: "Beautiful bamboo baskets and decorative items made by Santhal artisans",
            isVerified: true,
            isFavorite: false,
            tags: [
                "Sustainable",
                "Handwoven",
                "Traditional"
            ]
        },
        {
            id: 7,
            name: "Traditional Jharkhand Thali",
            image: "/jamshedpur-jharkhand-steel-city-jubilee-park.jpg",
            price: "₹300",
            originalPrice: null,
            rating: 4.8,
            reviews: 67,
            seller: "Maa Durga Restaurant",
            location: "Ranchi",
            category: "Food",
            description: "Authentic tribal cuisine featuring local ingredients and recipes",
            isVerified: true,
            isFavorite: false,
            tags: [
                "Authentic",
                "Local",
                "Traditional"
            ]
        },
        {
            id: 8,
            name: "Eco-friendly Transport Service",
            image: "/parasnath-hills-jharkhand-jain-temple-mountain.jpg",
            price: "₹12/km",
            originalPrice: null,
            rating: 4.4,
            reviews: 156,
            seller: "Green Wheels Jharkhand",
            location: "Ranchi",
            category: "Transport",
            description: "Electric vehicle transport service for eco-conscious travelers",
            isVerified: true,
            isFavorite: false,
            tags: [
                "Eco-friendly",
                "Electric",
                "Sustainable"
            ]
        }
    ];
    const filteredProducts = products.filter((product)=>{
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesLocation = selectedLocation === "All" || product.location === selectedLocation;
        return matchesSearch && matchesCategory && matchesLocation;
    });
    const handleBuyClick = (product)=>{
        // Add console log for debugging
        console.log('Buy button clicked for product:', product.id);
        // Direct navigation to product page - no authentication check
        router.push(`/marketplace/product/${product.id}`);
    };
    const getCategoryIcon = (category)=>{
        switch(category){
            case "Handicrafts":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 205,
                    columnNumber: 16
                }, this);
            case "Homestays":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 207,
                    columnNumber: 16
                }, this);
            case "Experiences":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 209,
                    columnNumber: 16
                }, this);
            case "Food":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 211,
                    columnNumber: 16
                }, this);
            case "Transport":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 213,
                    columnNumber: 16
                }, this);
            case "Guides":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 215,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 217,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/marketplace/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "hero-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            "data-aos": "fade-up",
                            "data-aos-delay": "200",
                            children: [
                                "Local Marketplace",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gold block",
                                    children: "Supporting Communities"
                                }, void 0, false, {
                                    fileName: "[project]/app/marketplace/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/marketplace/page.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            "data-aos": "fade-up",
                            "data-aos-delay": "400",
                            children: "Discover authentic tribal handicrafts, stay with local families, and support sustainable tourism initiatives"
                        }, void 0, false, {
                            fileName: "[project]/app/marketplace/page.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-bar",
                            "data-aos": "fade-up",
                            "data-aos-delay": "600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    style: {
                                        width: '100%',
                                        maxWidth: '500px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search products, experiences, or services...",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value),
                                        style: {
                                            width: '100%',
                                            padding: '15px 20px',
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            backdropFilter: 'blur(10px)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/marketplace/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/marketplace/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filter-buttons",
                                    children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedCategory(category),
                                            className: `btn ${selectedCategory === category ? 'primary' : 'secondary'}`,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            },
                                            children: [
                                                getCategoryIcon(category),
                                                category
                                            ]
                                        }, category, true, {
                                            fileName: "[project]/app/marketplace/page.tsx",
                                            lineNumber: 259,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/marketplace/page.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "filter-buttons",
                                    children: locations.map((location)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedLocation(location),
                                            className: `btn ${selectedLocation === location ? 'primary' : 'secondary'}`,
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 19
                                                }, this),
                                                location
                                            ]
                                        }, location, true, {
                                            fileName: "[project]/app/marketplace/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/marketplace/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/marketplace/page.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/marketplace/page.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            style: {
                                background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.2) 0%, rgba(30, 58, 138, 0.2) 100%)',
                                backdropFilter: 'blur(15px)',
                                border: '1px solid rgba(244, 208, 63, 0.3)',
                                borderRadius: '16px',
                                padding: '20px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                            },
                            "data-aos": "fade-up",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold",
                                        style: {
                                            color: '#f4d03f'
                                        },
                                        children: [
                                            filteredProducts.length,
                                            " Products Found"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/marketplace/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm",
                                                style: {
                                                    color: '#f4d03f'
                                                },
                                                children: "Sort by:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "px-3 py-1 border rounded-md text-sm",
                                                style: {
                                                    background: '#f4d03f',
                                                    color: '#800020',
                                                    border: '2px solid #f4d03f',
                                                    borderRadius: '25px',
                                                    fontWeight: '600'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Most Popular"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Price: Low to High"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Price: High to Low"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: "Highest Rated"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/marketplace/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/marketplace/page.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/marketplace/page.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "destination-grid",
                            children: filteredProducts.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "destination-card clickable",
                                    "data-aos": "fade-up",
                                    "data-aos-delay": 300 + index * 100,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "destination-image-container",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: product.image || "/placeholder.svg",
                                                    alt: product.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "destination-badge",
                                                    children: [
                                                        getCategoryIcon(product.category),
                                                        product.category
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "destination-rating",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: "h-4 w-4 fill-current"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: product.rating
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 338,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 19
                                                }, this),
                                                product.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-3 left-3 bg-maroon text-white px-2 py-1 rounded-lg text-xs font-semibold",
                                                    children: [
                                                        "Save ₹",
                                                        Number.parseInt(product.originalPrice.replace("₹", "").replace(",", "")) - Number.parseInt(product.price.replace("₹", "").replace(",", ""))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/marketplace/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "card-info",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "destination-header",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: product.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 350,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                            className: `h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : "text-gold"}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "destination-description",
                                                    children: product.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "destination-details",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "detail-item",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                                    lineNumber: 359,
                                                                    columnNumber: 23
                                                                }, this),
                                                                product.location
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "detail-item",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                                    lineNumber: 363,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "by ",
                                                                product.seller
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "detail-item",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "(",
                                                                    product.reviews,
                                                                    " reviews)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/marketplace/page.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "destination-highlights",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "highlights-label",
                                                            children: "Tags:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "highlights-tags",
                                                            children: product.tags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "highlight-tag",
                                                                    children: tag
                                                                }, index, false, {
                                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                                    lineNumber: 375,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "destination-footer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-lg font-bold text-gold",
                                                                    children: product.price
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                                    lineNumber: 384,
                                                                    columnNumber: 23
                                                                }, this),
                                                                product.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm line-through opacity-60",
                                                                    style: {
                                                                        textDecoration: 'line-through',
                                                                        textDecorationColor: '#000',
                                                                        textDecorationThickness: '2px',
                                                                        color: 'white'
                                                                    },
                                                                    children: product.originalPrice
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 383,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "btn primary",
                                                            onClick: ()=>handleBuyClick(product),
                                                            children: [
                                                                product.category === "Guides" || product.category === "Transport" ? "Book" : "Buy",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                    className: "ml-1 h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                                    lineNumber: 399,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/marketplace/page.tsx",
                                                            lineNumber: 394,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/marketplace/page.tsx",
                                            lineNumber: 348,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, product.id, true, {
                                    fileName: "[project]/app/marketplace/page.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/marketplace/page.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this),
                        filteredProducts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl mb-4",
                                    style: {
                                        color: '#800020'
                                    },
                                    children: "No products found matching your criteria."
                                }, void 0, false, {
                                    fileName: "[project]/app/marketplace/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>{
                                        setSearchTerm("");
                                        setSelectedCategory("All");
                                        setSelectedLocation("All");
                                    },
                                    style: {
                                        background: 'transparent',
                                        border: '2px solid #800020',
                                        color: '#800020',
                                        borderRadius: '25px',
                                        fontWeight: '600'
                                    },
                                    children: "Clear All Filters"
                                }, void 0, false, {
                                    fileName: "[project]/app/marketplace/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/marketplace/page.tsx",
                            lineNumber: 408,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 290,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/marketplace/page.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "smart-tourism-section",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-center mb-4",
                                "data-aos": "fade-up",
                                children: "Join Our Marketplace"
                            }, void 0, false, {
                                fileName: "[project]/app/marketplace/page.tsx",
                                lineNumber: 430,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "subtitle text-center mb-8",
                                "data-aos": "fade-up",
                                "data-aos-delay": "200",
                                children: "Become a verified seller and reach thousands of travelers looking for authentic experiences"
                            }, void 0, false, {
                                fileName: "[project]/app/marketplace/page.tsx",
                                lineNumber: 431,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 rounded-lg",
                                style: {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(244, 208, 63, 0.2)',
                                    color: 'white'
                                },
                                "data-aos": "fade-up",
                                "data-aos-delay": "400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "feature-icon",
                                                style: {
                                                    padding: '12px',
                                                    borderRadius: '12px'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                    className: "h-12 w-12"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/marketplace/page.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 95
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 440,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-gold mb-2 text-left",
                                                        children: "Trust & Safety Guaranteed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-white text-left",
                                                        children: "Shop with confidence knowing that every transaction is secured by blockchain technology and every seller is verified"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 441,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/marketplace/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                "data-aos": "fade-up",
                                                "data-aos-delay": "500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "h-5 w-5 mt-0.5 flex-shrink-0 text-gold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white",
                                                        children: "Blockchain-secured transactions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                "data-aos": "fade-up",
                                                "data-aos-delay": "600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "h-5 w-5 mt-0.5 flex-shrink-0 text-gold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white",
                                                        children: "Verified seller certifications"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 454,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 452,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                "data-aos": "fade-up",
                                                "data-aos-delay": "700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "h-5 w-5 mt-0.5 flex-shrink-0 text-gold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white",
                                                        children: "24/7 customer support"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 456,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3",
                                                "data-aos": "fade-up",
                                                "data-aos-delay": "800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "h-5 w-5 mt-0.5 flex-shrink-0 text-gold"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-white",
                                                        children: "Money-back guarantee"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/marketplace/page.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/marketplace/page.tsx",
                                        lineNumber: 447,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn primary",
                                        "data-aos": "fade-up",
                                        "data-aos-delay": "900",
                                        children: [
                                            "Become a Seller",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "ml-2 h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/marketplace/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/marketplace/page.tsx",
                                        lineNumber: 466,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/marketplace/page.tsx",
                                lineNumber: 434,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/marketplace/page.tsx",
                        lineNumber: 429,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/marketplace/page.tsx",
                    lineNumber: 428,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/marketplace/page.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/marketplace/page.tsx",
                lineNumber: 476,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/marketplace/page.tsx",
        lineNumber: 222,
        columnNumber: 5
    }, this);
}
_s(MarketplacePage, "3dAno6cte2HIMBCBT+YMAiZ+pj4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = MarketplacePage;
var _c;
__turbopack_refresh__.register(_c, "MarketplacePage");

})()),
"[project]/app/marketplace/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname }) => (() => {


})()),
}]);

//# sourceMappingURL=_912764._.js.map