(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/components_interactive-map_tsx_aec261._.js", {

"[project]/components/interactive-map.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>InteractiveMap
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$GeoJSON$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-leaflet/lib/GeoJSON.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
// Fix for default marker icon
delete __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"].Default.prototype._getIconUrl;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"].Default.mergeOptions({
    iconRetinaUrl: __turbopack_require__("[project]/node_modules/leaflet/dist/images/marker-icon-2x.png [app-client] (static)"),
    iconUrl: __turbopack_require__("[project]/node_modules/leaflet/dist/images/marker-icon.png [app-client] (static)"),
    shadowUrl: __turbopack_require__("[project]/node_modules/leaflet/dist/images/marker-shadow.png [app-client] (static)")
});
function InteractiveMap() {
    _s();
    const [geoData, setGeoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [districtColors, setDistrictColors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [markers, setMarkers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [places, setPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const layerGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const hoveredLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [streetViewUrl, setStreetViewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedDistrict, setSelectedDistrict] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPlace, setSelectedPlace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const colors = [
        "#FF6B6B",
        "#FFBE0B",
        "#FF9F1C",
        "#FFE066",
        "#F72585",
        "#FF89A0",
        "#EF476F",
        "#FF6363",
        "#4ECDC4",
        "#2EC4B6",
        "#06D6A0",
        "#4CC9F0",
        "#3A86FF",
        "#4361EE",
        "#8338EC",
        "#7209B7",
        "#FFD166",
        "#F4D35E",
        "#F9C74F",
        "#90BE6D",
        "#43AA8B",
        "#F9844A",
        "#F8961E",
        "#F94144"
    ];
    const shuffleArray = (array)=>{
        const newArray = [
            ...array
        ];
        for(let i = newArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [
                newArray[j],
                newArray[i]
            ];
        }
        return newArray;
    };
    const assignDistrictColors = (features)=>{
        if (!features) return {};
        const shuffledColors = shuffleArray(colors);
        const colorMap = {};
        features.forEach((feature, index)=>{
            const districtName = feature.properties?.dtname || `district_${index}`;
            colorMap[districtName] = shuffledColors[index % shuffledColors.length];
        });
        return colorMap;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Fetch GeoJSON data
        fetch("/JHARKHAND_DISTRICTS.geojson").then((r)=>r.json()).then((data)=>{
            setGeoData(data);
            if (data && data.features) {
                setDistrictColors(assignDistrictColors(data.features));
                if (mapRef.current && data.features.length > 0) {
                    const geoJsonLayer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].geoJSON(data);
                    const bounds = geoJsonLayer.getBounds();
                    mapRef.current.fitBounds(bounds, {
                        padding: [
                            20,
                            20
                        ]
                    });
                    setTimeout(()=>{
                        mapRef.current?.invalidateSize();
                    }, 100);
                }
            }
        }).catch((err)=>console.error("Failed to load geojson:", err));
        // Fetch places data from backend API
        fetch("http://localhost:5000/api/places").then((r)=>r.json()).then((response)=>{
            if (response.success && response.data) {
                setPlaces(response.data);
            }
        }).catch((err)=>console.error("Failed to load places:", err));
    }, []);
    const getLayerElement = (layer)=>{
        return layer._path || null;
    };
    const resetAll = ()=>{
        layerGroupRef.current.forEach((l)=>{
            const element = getLayerElement(l);
            if (element) {
                element.classList.remove("hovered", "selected", "dimmed");
            }
        });
        selectedLayerRef.current = null;
        setMarkers([]);
        setSelectedDistrict(null);
        setSelectedPlace(null);
    };
    const reapplySelection = ()=>{
        if (!selectedDistrict) return;
        layerGroupRef.current.forEach((l)=>{
            const districtName = l.feature?.properties?.dtname;
            const element = getLayerElement(l);
            if (districtName === selectedDistrict && element) {
                element.classList.add("selected");
                selectedLayerRef.current = l;
            } else if (element) {
                element.classList.add("dimmed");
            }
        });
    };
    const onEachFeature = (feature, layer)=>{
        const districtName = feature.properties?.dtname || "Unknown";
        const districtColor = districtColors[districtName] || "#FF6B6B";
        layer.setStyle({
            fillColor: districtColor,
            weight: 1,
            opacity: 1,
            color: "#333333",
            fillOpacity: 0.85,
            className: "district-shape"
        });
        if (selectedDistrict === districtName) {
            const element = getLayerElement(layer);
            if (element) {
                element.classList.add("selected");
            }
            selectedLayerRef.current = layer;
            layerGroupRef.current.forEach((l)=>{
                if (l !== layer) {
                    const otherElement = getLayerElement(l);
                    if (otherElement) {
                        otherElement.classList.add("dimmed");
                    }
                }
            });
        }
        layer.bindTooltip(districtName, {
            permanent: true,
            direction: "center",
            className: "district-label"
        });
        layerGroupRef.current.push(layer);
        layer.on({
            mouseover: ()=>{
                if (selectedLayerRef.current) return;
                hoveredLayerRef.current = layer;
                const element = getLayerElement(layer);
                if (element) element.classList.add("hovered");
                layerGroupRef.current.forEach((l)=>{
                    if (l !== layer) {
                        const otherElement = getLayerElement(l);
                        if (otherElement) {
                            otherElement.classList.add("dimmed");
                        }
                    }
                });
                layer.bringToFront();
            },
            mouseout: ()=>{
                if (selectedLayerRef.current) return;
                const element = getLayerElement(layer);
                if (element) element.classList.remove("hovered");
                layerGroupRef.current.forEach((l)=>{
                    const otherElement = getLayerElement(l);
                    if (otherElement) {
                        otherElement.classList.remove("dimmed");
                    }
                });
            },
            click: ()=>{
                if (selectedLayerRef.current) {
                    const prevElement = getLayerElement(selectedLayerRef.current);
                    if (prevElement) prevElement.classList.remove("selected");
                    selectedLayerRef.current = null;
                }
                const element = getLayerElement(layer);
                const isAlreadySelected = element && element.classList.contains("selected");
                resetAll();
                if (!isAlreadySelected) {
                    if (element) element.classList.add("selected");
                    selectedLayerRef.current = layer;
                    setSelectedDistrict(districtName);
                    layerGroupRef.current.forEach((l)=>{
                        if (l !== layer) {
                            const otherElement = getLayerElement(l);
                            if (otherElement) otherElement.classList.add("dimmed");
                        }
                    });
                    const districtPlaces = places.filter((place)=>place.district === districtName && place.streetView).slice(0, 2);
                    setMarkers(districtPlaces);
                } else {
                    setMarkers([]);
                }
            }
        });
    };
    const handleDeselect = ()=>{
        resetAll();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: "70vh",
            width: "70%",
            position: "relative",
            margin: "20px auto"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                position: "relative",
                height: "100%",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden"
            },
            children: [
                streetViewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "street-view-container",
                    style: {
                        height: "100%",
                        width: "100%",
                        position: "relative"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                        src: streetViewUrl,
                        style: {
                            border: 0,
                            width: "100%",
                            height: "100%"
                        },
                        allowFullScreen: true,
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/components/interactive-map.tsx",
                        lineNumber: 240,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/interactive-map.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
                    center: [
                        23.6,
                        85.3
                    ],
                    zoom: 7.5,
                    zoomSnap: 0.1,
                    style: {
                        height: "100%",
                        width: "100%"
                    },
                    ref: mapRef,
                    dragging: false,
                    touchZoom: false,
                    doubleClickZoom: false,
                    scrollWheelZoom: false,
                    boxZoom: false,
                    keyboard: false,
                    zoomControl: false,
                    attributionControl: false,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                            attribution: '© <a href="https://carto.com/">Carto</a>',
                            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
                            subdomains: [
                                "a",
                                "b",
                                "c",
                                "d"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/interactive-map.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, this),
                        geoData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$GeoJSON$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoJSON"], {
                            data: geoData,
                            onEachFeature: onEachFeature
                        }, void 0, false, {
                            fileName: "[project]/components/interactive-map.tsx",
                            lineNumber: 268,
                            columnNumber: 25
                        }, this),
                        markers.map((place, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                                position: [
                                    place.lat,
                                    place.lon
                                ],
                                eventHandlers: {
                                    click: ()=>setSelectedPlace(place)
                                }
                            }, idx, false, {
                                fileName: "[project]/components/interactive-map.tsx",
                                lineNumber: 271,
                                columnNumber: 15
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/interactive-map.tsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this),
                selectedPlace && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "info-box",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "info-box-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "info-box-title",
                                    children: selectedPlace.name
                                }, void 0, false, {
                                    fileName: "[project]/components/interactive-map.tsx",
                                    lineNumber: 285,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "info-box-close",
                                    onClick: ()=>setSelectedPlace(null),
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/components/interactive-map.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/interactive-map.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "info-box-content",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "info-box-image",
                                    children: selectedPlace.imageId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: `http://localhost:5000/api/images/${selectedPlace.imageId}`,
                                        alt: selectedPlace.name,
                                        onLoad: ()=>console.log(`Image loaded: ${selectedPlace.name}`),
                                        onError: (e)=>{
                                            console.error(`Failed to load image for ${selectedPlace.name}:`, e);
                                            const img = e.target;
                                            img.src = `/arvrPics/${selectedPlace.name}.jpg`;
                                        },
                                        style: {
                                            maxWidth: '100%',
                                            height: 'auto'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/interactive-map.tsx",
                                        lineNumber: 296,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: `/arvrPics/${selectedPlace.name}.jpg`,
                                        alt: selectedPlace.name,
                                        onError: (e)=>{
                                            const img = e.target;
                                            if (img.src.endsWith('.jpg')) {
                                                img.src = `/arvrPics/${selectedPlace.name}.jpeg`;
                                            } else if (img.src.endsWith('.jpeg')) {
                                                img.src = `/arvrPics/${selectedPlace.name}.png`;
                                            } else {
                                                img.style.display = 'none';
                                            }
                                        },
                                        style: {
                                            maxWidth: '100%',
                                            height: 'auto'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/interactive-map.tsx",
                                        lineNumber: 308,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/interactive-map.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this),
                                selectedPlace.streetView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "explore-button",
                                    onClick: ()=>{
                                        setStreetViewUrl(selectedPlace.streetView);
                                        setSelectedPlace(null);
                                    },
                                    children: "Explore Now!"
                                }, void 0, false, {
                                    fileName: "[project]/components/interactive-map.tsx",
                                    lineNumber: 326,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/interactive-map.tsx",
                            lineNumber: 293,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/interactive-map.tsx",
                    lineNumber: 283,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "deselect-button",
                    onClick: ()=>{
                        if (streetViewUrl) {
                            setStreetViewUrl(null);
                            setTimeout(()=>reapplySelection(), 50);
                        } else {
                            handleDeselect();
                        }
                    },
                    title: streetViewUrl ? "Back to Map" : "Deselect district",
                    style: {
                        display: selectedLayerRef.current || streetViewUrl ? "flex" : "none",
                        position: "absolute",
                        top: "15px",
                        right: "15px"
                    },
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/components/interactive-map.tsx",
                    lineNumber: 340,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/interactive-map.tsx",
            lineNumber: 237,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/interactive-map.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_s(InteractiveMap, "eeamzsrmzeIAlOGcIUCTwEHMyJ0=");
_c = InteractiveMap;
var _c;
__turbopack_refresh__.register(_c, "InteractiveMap");

})()),
}]);

//# sourceMappingURL=components_interactive-map_tsx_aec261._.js.map