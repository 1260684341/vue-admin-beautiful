/*!
 *  build: vue-admin-beautiful 
 *  copyright: chuzhixin 1204505056@qq.com 
 *  time: 2020-8-25 18:28:16
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c0662082"],{"11de":function(t,a,e){"use strict";var n=e("d31e"),r=e.n(n);r.a},"577a":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"map-container"},[e("div",{staticClass:"container",attrs:{id:"map"}})])}],i=(e("513c"),e("e35a"),e("0d7a"),e("5976")),s=e.n(i),o=e("00f9"),c={name:"Map",components:{},data:function(){return{}},created:function(){},mounted:function(){var t=this;this.$nextTick((function(){var a=t.$baseMap();s.a.get("https://cdn.jsdelivr.net/npm/mapv@2.0.12/examples/data/od-xierqi.txt").then((function(t){var e=[],n=[];t=t.data.split("\n");for(var r=0,i=0;i<t.length;i++){var s=t[i].split(","),c=[];s.length>r&&(r=s.length);for(var l=0;l<s.length;l+=2){var d=Number(s[l])/20037508.34*180,p=Number(s[l+1])/20037508.34*180;p=180/Math.PI*(2*Math.atan(Math.exp(p*Math.PI/180))-Math.PI/2),0!=d&&NaN!=p&&(c.push([d,p]),n.push({geometry:{type:"Point",coordinates:[d,p]},count:1,time:l}))}e.push({geometry:{type:"LineString",coordinates:c}})}var u=new o["DataSet"](e),h={strokeStyle:"rgba(53,57,255,0.5)",shadowColor:"rgba(53,57,255,0.2)",shadowBlur:3,lineWidth:3,draw:"simple"},m=(new o["MaptalksLayer"]("mapv1",u,h).addTo(a),new o["DataSet"](n)),v={fillStyle:"rgba(255, 250, 250, 0.2)",globalCompositeOperation:"lighter",size:1.5,animation:{stepsRange:{start:0,end:100},trails:3,duration:5},draw:"simple"};new o["MaptalksLayer"]("mapv2",m,v).addTo(a)}))}))},methods:{}},l=c,d=(e("11de"),e("9ca4")),p=Object(d["a"])(l,n,r,!1,null,"3a30c086",null);a["default"]=p.exports},d31e:function(t,a,e){}}]);