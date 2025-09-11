"use strict";(()=>{var e={};e.id=280,e.ids=[280],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61168:(e,t,i)=>{i.r(t),i.d(t,{originalPathname:()=>h,patchFetch:()=>w,requestAsyncStorage:()=>g,routeModule:()=>m,serverHooks:()=>y,staticGenerationAsyncStorage:()=>A});var a={};i.r(a),i.d(a,{GET:()=>u});var s=i(49303),n=i(88716),o=i(60670),r=i(87070);let l=e=>({overview:{totalVisitors:15420,totalRevenue:284e4,averageSatisfaction:4.2,totalBookings:3240,activeVendors:156,totalFeedbacks:892},visitors:[{month:"Jan",visitors:1200,revenue:24e4,satisfaction:4.1},{month:"Feb",visitors:1350,revenue:27e4,satisfaction:4.3},{month:"Mar",visitors:1500,revenue:3e5,satisfaction:4.2},{month:"Apr",visitors:1800,revenue:36e4,satisfaction:4.4},{month:"May",visitors:2100,revenue:42e4,satisfaction:4.5},{month:"Jun",visitors:1900,revenue:38e4,satisfaction:4.3}],destinations:[{name:"Netarhat",visitors:4200,rating:4.5,revenue:84e4},{name:"Betla National Park",visitors:3800,rating:4.3,revenue:76e4},{name:"Hundru Falls",visitors:3200,rating:4.2,revenue:64e4},{name:"Deoghar",visitors:2900,rating:4.4,revenue:58e4},{name:"Hazaribagh",visitors:1320,rating:4.1,revenue:264e3}],aiAnalysis:{sentimentBreakdown:{positive:65,neutral:25,negative:10},voiceAnalysis:{totalProcessed:342,averageConfidence:87.8,languageBreakdown:{english:45,hindi:35,tribal:20}},imageAnalysis:{totalProcessed:156,averageQuality:91.5,objectsDetected:["temple","waterfall","forest","wildlife","accommodation"]},predictiveInsights:{nextMonthVisitors:2300,peakSeason:"October-December",emergingDestinations:["Palamau Fort","Rajrappa Temple"],riskAreas:["Transport connectivity","Accommodation quality"]}}}),v=e=>[["Metric","Value","Category"],["Total Visitors",e.overview.totalVisitors,"Overview"],["Total Revenue",e.overview.totalRevenue,"Overview"],["Average Satisfaction",e.overview.averageSatisfaction,"Overview"],["Total Bookings",e.overview.totalBookings,"Overview"],["Active Vendors",e.overview.activeVendors,"Overview"],["Total Feedbacks",e.overview.totalFeedbacks,"Overview"],...e.destinations.map(e=>[e.name,e.visitors,"Destinations"]),["Positive Sentiment %",e.aiAnalysis.sentimentBreakdown.positive,"AI Analysis"],["Neutral Sentiment %",e.aiAnalysis.sentimentBreakdown.neutral,"AI Analysis"],["Negative Sentiment %",e.aiAnalysis.sentimentBreakdown.negative,"AI Analysis"],["Voice Files Processed",e.aiAnalysis.voiceAnalysis.totalProcessed,"AI Analysis"],["Images Processed",e.aiAnalysis.imageAnalysis.totalProcessed,"AI Analysis"]].map(e=>e.join(",")).join("\n"),c=e=>JSON.stringify(e,null,2),p=e=>v(e),d=e=>`
JHARKHAND TOURISM ANALYTICS REPORT
Generated: ${new Date().toLocaleDateString()}

OVERVIEW METRICS
================
Total Visitors: ${e.overview.totalVisitors.toLocaleString()}
Total Revenue: ₹${e.overview.totalRevenue.toLocaleString()}
Average Satisfaction: ${e.overview.averageSatisfaction}/5
Total Bookings: ${e.overview.totalBookings.toLocaleString()}
Active Vendors: ${e.overview.activeVendors}
Total Feedbacks: ${e.overview.totalFeedbacks}

TOP DESTINATIONS
================
${e.destinations.map(e=>`${e.name}: ${e.visitors.toLocaleString()} visitors, Rating: ${e.rating}/5`).join("\n")}

AI ANALYSIS SUMMARY
===================
Sentiment Analysis:
- Positive: ${e.aiAnalysis.sentimentBreakdown.positive}%
- Neutral: ${e.aiAnalysis.sentimentBreakdown.neutral}%
- Negative: ${e.aiAnalysis.sentimentBreakdown.negative}%

Voice Analysis: ${e.aiAnalysis.voiceAnalysis.totalProcessed} files processed
Image Analysis: ${e.aiAnalysis.imageAnalysis.totalProcessed} images processed

PREDICTIONS
===========
Next Month Visitors: ${e.aiAnalysis.predictiveInsights.nextMonthVisitors.toLocaleString()}
Peak Season: ${e.aiAnalysis.predictiveInsights.peakSeason}
Emerging Destinations: ${e.aiAnalysis.predictiveInsights.emergingDestinations.join(", ")}
Risk Areas: ${e.aiAnalysis.predictiveInsights.riskAreas.join(", ")}
`;async function u(e){try{let t,i,a;let{searchParams:s}=new URL(e.url),n=s.get("format")||"csv",o=s.get("timeRange")||"7d",u=l(o);switch(n.toLowerCase()){case"csv":t=v(u),i="text/csv",a=`tourism-analytics-${o}.csv`;break;case"xlsx":t=p(u),i="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",a=`tourism-analytics-${o}.xlsx`;break;case"pdf":t=d(u),i="application/pdf",a=`tourism-analytics-${o}.pdf`;break;case"json":t=c(u),i="application/json",a=`tourism-analytics-${o}.json`;break;default:return r.NextResponse.json({error:"Unsupported format"},{status:400})}let m=new r.NextResponse(t);return m.headers.set("Content-Type",i),m.headers.set("Content-Disposition",`attachment; filename="${a}"`),m}catch(e){return console.error("Export error:",e),r.NextResponse.json({error:"Failed to generate export"},{status:500})}}let m=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/analytics/export/route",pathname:"/api/analytics/export",filename:"route",bundlePath:"app/api/analytics/export/route"},resolvedPagePath:"C:\\Users\\priya\\OneDrive\\Desktop\\Tourism-Jharkhand\\app\\api\\analytics\\export\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:g,staticGenerationAsyncStorage:A,serverHooks:y}=m,h="/api/analytics/export/route";function w(){return(0,o.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:A})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),a=t.X(0,[276,972],()=>i(61168));module.exports=a})();