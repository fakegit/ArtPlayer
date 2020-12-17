/*!
 * artplayer-plugin-ass.js v3.5.27
 * Github: https://github.com/zhw2590582/ArtPlayer#readme
 * (c) 2017-2020 Harvey Zack
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).artplayerPluginAss=e()}(this,(function(){"use strict";function t(t){var e=t.toLowerCase().trim().split(/\s*;\s*/);return"banner"===e[0]?{name:e[0],delay:1*e[1]||0,leftToRight:1*e[2]||0,fadeAwayWidth:1*e[3]||0}:/^scroll\s/.test(e[0])?{name:e[0],y1:Math.min(1*e[1],1*e[2]),y2:Math.max(1*e[1],1*e[2]),delay:1*e[3]||0,fadeAwayHeight:1*e[4]||0}:null}function e(t){return t.toLowerCase().replace(/([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)/g," $1 ").replace(/([mnlbspc])/g," $1 ").trim().replace(/\s+/g," ").split(/\s(?=[mnlbspc])/).map((function(t){return t.split(" ").filter((function(t,e){return!(e&&Number.isNaN(1*t))}))}))}var i=["b","i","u","s","fsp","k","K","kf","ko","kt","fe","q","p","pbo","a","an","fscx","fscy","fax","fay","frx","fry","frz","fr","be","blur","bord","xbord","ybord","shad","xshad","yshad"].map((function(t){return{name:t,regex:new RegExp("^"+t+"-?\\d")}}));function a(t){for(var n,r={},s=0;s<i.length;s++){var o=i[s],l=o.name;if(o.regex.test(t))return r[l]=1*t.slice(l.length),r}if(/^fn/.test(t))r.fn=t.slice(2);else if(/^r/.test(t))r.r=t.slice(1);else if(/^fs[\d+-]/.test(t))r.fs=t.slice(2);else if(/^\d?c&?H?[0-9a-f]+|^\d?c$/i.test(t)){var h=t.match(/^(\d?)c&?H?(\w*)/),c=h[1],d=h[2];r["c"+(c||1)]=d&&("000000"+d).slice(-6)}else if(/^\da&?H?[0-9a-f]+/i.test(t)){var f=t.match(/^(\d)a&?H?(\w\w)/),p=f[1],u=f[2];r["a"+p]=u}else if(/^alpha&?H?[0-9a-f]+/i.test(t))n=t.match(/^alpha&?H?([0-9a-f]+)/i),r.alpha=n[1],r.alpha=("00"+r.alpha).slice(-2);else if(/^(?:pos|org|move|fad|fade)\(/.test(t)){var g=t.match(/^(\w+)\((.*?)\)?$/),m=g[1],v=g[2];r[m]=v.trim().split(/\s*,\s*/).map(Number)}else if(/^i?clip/.test(t)){var y=t.match(/^i?clip\((.*?)\)?$/)[1].trim().split(/\s*,\s*/);r.clip={inverse:/iclip/.test(t),scale:1,drawing:null,dots:null},1===y.length&&(r.clip.drawing=e(y[0])),2===y.length&&(r.clip.scale=1*y[0],r.clip.drawing=e(y[1])),4===y.length&&(r.clip.dots=y.map(Number))}else if(/^t\(/.test(t)){var x=t.match(/^t\((.*?)\)?$/)[1].trim().replace(/\\.*/,(function(t){return t.replace(/,/g,"\n")})).split(/\s*,\s*/);if(!x[0])return r;r.t={t1:0,t2:0,accel:1,tags:x[x.length-1].replace(/\n/g,",").split("\\").slice(1).map(a)},2===x.length&&(r.t.accel=1*x[0]),3===x.length&&(r.t.t1=1*x[0],r.t.t2=1*x[1]),4===x.length&&(r.t.t1=1*x[0],r.t.t2=1*x[1],r.t.accel=1*x[2])}return r}function n(t){for(var e=[],i=0,n="",r=0;r<t.length;r++){var s=t[r];"("===s&&i++,")"===s&&i--,i<0&&(i=0),i||"\\"!==s?n+=s:(n&&e.push(n),n="")}return e.push(n),e.map(a)}function r(t){var i=t.split(/{([^{}]*?)}/),a=[];i[0].length&&a.push({tags:[],text:i[0],drawing:[]});for(var r=1;r<i.length;r+=2){var s=n(i[r]),o=s.reduce((function(t,e){return void 0===e.p?t:!!e.p}),!1);a.push({tags:s,text:o?"":i[r+1],drawing:o?e(i[r+1]):[]})}return{raw:t,combined:a.map((function(t){return t.text})).join(""),parsed:a}}function s(e,i){var a=e.split(",");if(a.length>i.length){var n=a.slice(i.length-1).join();(a=a.slice(0,i.length-1)).push(n)}for(var s,o={},l=0;l<a.length;l++){var h=i[l],c=a[l].trim();switch(h){case"Layer":case"MarginL":case"MarginR":case"MarginV":o[h]=1*c;break;case"Start":case"End":o[h]=(s=void 0,3600*(s=c.split(":"))[0]+60*s[1]+1*s[2]);break;case"Effect":o[h]=t(c);break;case"Text":o[h]=r(c);break;default:o[h]=c}}return o}function o(t){return t.match(/Format\s*:\s*(.*)/i)[1].split(/\s*,\s*/)}function l(t){return t.match(/Style\s*:\s*(.*)/i)[1].split(/\s*,\s*/)}var h=Object.assign||function(t){for(var e=[],i=arguments.length-1;i-- >0;)e[i]=arguments[i+1];for(var a=0;a<e.length;a++)if(e[a])for(var n=Object.keys(e[a]),r=0;r<n.length;r++)t[n[r]]=e[a][n[r]];return t};function c(t){var e={type:null,prev:null,next:null,points:[]};/[mnlbs]/.test(t[0])&&(e.type=t[0].toUpperCase().replace("N","L").replace("B","C"));for(var i=t.length-!(1&t.length),a=1;a<i;a+=2)e.points.push({x:1*t[a],y:1*t[a+1]});return e}function d(t){return!(!t.points.length||!t.type)&&!(/C|S/.test(t.type)&&t.points.length<3)}function f(t){return t.map((function(t){return t.type+t.points.map((function(t){return t.x+","+t.y})).join(",")})).join("")}function p(t){for(var e,i=[],a=0;a<t.length;){var n=t[a],r=c(n);if(d(r)){if("S"===r.type){var s=(i[a-1]||{points:[{x:0,y:0}]}).points.slice(-1)[0],o=s.x,l=s.y;r.points.unshift({x:o,y:l})}a&&(r.prev=i[a-1].type,i[a-1].next=r.type),i.push(r),a++}else{if(a&&"S"===i[a-1].type){var p={p:r.points,c:i[a-1].points.slice(0,3)};i[a-1].points=i[a-1].points.concat((p[n[0]]||[]).map((function(t){return{x:t.x,y:t.y}})))}t.splice(a,1)}}var u=(e=[]).concat.apply(e,i.map((function(t){var e=t.type,i=t.points,a=t.prev,n=t.next;return"S"===e?function(t,e,i){var a=[],n=[0,2/3,1/3,0],r=[0,1/3,2/3,0],s=[0,1/6,2/3,1/6],o=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]},l=[t[t.length-1].x,t[0].x,t[1].x,t[2].x],h=[t[t.length-1].y,t[0].y,t[1].y,t[2].y];a.push({type:"M"===e?"M":"L",points:[{x:o(s,l),y:o(s,h)}]});for(var c=3;c<t.length;c++)l=[t[c-3].x,t[c-2].x,t[c-1].x,t[c].x],h=[t[c-3].y,t[c-2].y,t[c-1].y,t[c].y],a.push({type:"C",points:[{x:o(n,l),y:o(n,h)},{x:o(r,l),y:o(r,h)},{x:o(s,l),y:o(s,h)}]});if("L"===i||"C"===i){var d=t[t.length-1];a.push({type:"L",points:[{x:d.x,y:d.y}]})}return a}(i,a,n):{type:e,points:i}})));return h({instructions:u,d:f(u)},function(t){var e,i=1/0,a=1/0,n=-1/0,r=-1/0;return(e=[]).concat.apply(e,t.map((function(t){return t.points}))).forEach((function(t){var e=t.x,s=t.y;i=Math.min(i,e),a=Math.min(a,s),n=Math.max(n,e),r=Math.max(r,s)})),{minX:i,minY:a,width:n-i,height:r-a}}(i))}var u=["fs","clip","c1","c2","c3","c4","a1","a2","a3","a4","alpha","fscx","fscy","fax","fay","frx","fry","frz","fr","be","blur","bord","xbord","ybord","shad","xshad","yshad"];function g(t,e,i){var a,n,r;void 0===i&&(i={});var s=t[e];if(void 0===s)return null;if("pos"===e||"org"===e)return 2===s.length?((a={})[e]={x:s[0],y:s[1]},a):null;if("move"===e){var o=s[0],l=s[1],c=s[2],d=s[3],f=s[4];void 0===f&&(f=0);var m=s[5];return void 0===m&&(m=0),4===s.length||6===s.length?{move:{x1:o,y1:l,x2:c,y2:d,t1:f,t2:m}}:null}if("fad"===e||"fade"===e)return 2===s.length?{fade:{type:"fad",t1:s[0],t2:s[1]}}:7===s.length?{fade:{type:"fade",a1:s[0],a2:s[1],a3:s[2],t1:s[3],t2:s[4],t3:s[5],t4:s[6]}}:null;if("clip"===e){var v=s.inverse,y=s.scale,x=s.drawing,b=s.dots;return x?{clip:{inverse:v,scale:y,drawing:p(x),dots:b}}:b?{clip:{inverse:v,scale:y,drawing:x,dots:{x1:b[0],y1:b[1],x2:b[2],y2:b[3]}}}:null}if(/^[xy]?(bord|shad)$/.test(e)&&(s=Math.max(s,0)),"bord"===e)return{xbord:s,ybord:s};if("shad"===e)return{xshad:s,yshad:s};if(/^c\d$/.test(e))return(n={})[e]=s||i[e],n;if("alpha"===e)return{a1:s,a2:s,a3:s,a4:s};if("fr"===e)return{frz:s};if("fs"===e)return{fs:/^\+|-/.test(s)?(1*s>-10?1+s/10:1)*i.fs:1*s};if("t"===e){var w=s.t1,S=s.accel,_=s.tags,C=s.t2||1e3*(i.end-i.start),$={};return _.forEach((function(t){var e=Object.keys(t)[0];~u.indexOf(e)&&("clip"!==e||t[e].dots)&&h($,g(t,e,i))})),{t:{t1:w,t2:C,accel:S,tag:$}}}return(r={})[e]=s,r}var m=[null,1,2,3,null,7,8,9,null,4,5,6],v=["r","a","an","pos","org","move","fade","fad","clip"];function y(t,e){return{name:t,borderStyle:e[t].style.BorderStyle,tag:e[t].tag,fragments:[]}}function x(t){for(var e,i,a,n,r,s,o=t.styles,l=t.name,c=t.parsed,d=t.start,f=t.end,u=[],x=y(l,o),b={},w=0;w<c.length;w++){for(var S=c[w],_=S.tags,C=S.text,$=S.drawing,A=void 0,M=0;M<_.length;M++){var N=_[M];A=void 0===N.r?A:N.r}for(var k={tag:void 0===A?JSON.parse(JSON.stringify(b)):{},text:C,drawing:$.length?p($):null},T=0;T<_.length;T++){var E=_[T];e=e||m[E.a||0]||E.an,i=i||g(E,"pos"),a=a||g(E,"org"),n=n||g(E,"move"),r=r||g(E,"fade")||g(E,"fad"),s=g(E,"clip")||s;var F=Object.keys(E)[0];if(F&&!~v.indexOf(F)){var j=x.tag,L=g(E,F,{start:d,end:f,c1:j.c1,c2:j.c2,c3:j.c3,c4:j.c4,fs:b.fs||x.tag.fs});"t"===F?(k.tag.t=k.tag.t||[],k.tag.t.push(L.t)):h(k.tag,L)}}if(b=k.tag,void 0!==A&&(u.push(x),x=y(o[A]?A:l,o)),k.text||k.drawing){var B=x.fragments[x.fragments.length-1]||{};B.text&&k.text&&!Object.keys(k.tag).length?B.text+=k.text:x.fragments.push(k)}}return u.push(x),h({alignment:e,slices:u},i,a,n,r,s)}function b(t){for(var e=t.styles,i=t.dialogues,a=1/0,n=[],r=0;r<i.length;r++){var s=i[r];if(!(s.Start>=s.End)){e[s.Style]||(s.Style="Default");var o=e[s.Style].style,l=x({styles:e,name:s.Style,parsed:s.Text.parsed,start:s.Start,end:s.End}),c=l.alignment||o.Alignment;a=Math.min(a,s.Layer),n.push(h({layer:s.Layer,start:s.Start,end:s.End,margin:{left:s.MarginL||o.MarginL,right:s.MarginR||o.MarginR,vertical:s.MarginV||o.MarginV},effect:s.Effect},l,{alignment:c}))}}for(var d=0;d<n.length;d++)n[d].layer-=a;return n.sort((function(t,e){return t.start-e.start||t.end-e.end}))}var w={Name:"Default",Fontname:"Arial",Fontsize:"20",PrimaryColour:"&H00FFFFFF&",SecondaryColour:"&H000000FF&",OutlineColour:"&H00000000&",BackColour:"&H00000000&",Bold:"0",Italic:"0",Underline:"0",StrikeOut:"0",ScaleX:"100",ScaleY:"100",Spacing:"0",Angle:"0",BorderStyle:"1",Outline:"2",Shadow:"2",Alignment:"2",MarginL:"10",MarginR:"10",MarginV:"10",Encoding:"1"};function S(t){if(/^(&|H|&H)[0-9a-f]{6,}/i.test(t)){var e=t.match(/&?H?([0-9a-f]{2})?([0-9a-f]{6})/i);return[e[1]||"00",e[2]]}var i=parseInt(t,10);if(!Number.isNaN(i)){var a=-2147483648;if(i<a)return["00","000000"];var n=a<=i&&i<=2147483647?("00000000"+(i<0?i+4294967296:i).toString(16)).slice(-8):String(i).slice(0,8);return[n.slice(0,2),n.slice(2)]}return["00","000000"]}function _(t,e){void 0===e&&(e={});var i=function(t){for(var e={info:{},styles:{format:[],style:[]},events:{format:[],comment:[],dialogue:[]}},i=t.split(/\r?\n/),a=0,n=0;n<i.length;n++){var r=i[n].trim();if(!/^;/.test(r)&&(/^\[Script Info\]/i.test(r)?a=1:/^\[V4\+? Styles\]/i.test(r)?a=2:/^\[Events\]/i.test(r)?a=3:/^\[.*\]/.test(r)&&(a=0),0!==a)){if(1===a&&/:/.test(r)){var h=r.match(/(.*?)\s*:\s*(.*)/),c=h[1],d=h[2];e.info[c]=d}if(2===a&&(/^Format\s*:/i.test(r)&&(e.styles.format=o(r)),/^Style\s*:/i.test(r)&&e.styles.style.push(l(r))),3===a&&(/^Format\s*:/i.test(r)&&(e.events.format=o(r)),/^(?:Comment|Dialogue)\s*:/i.test(r))){var f=r.match(/^(\w+?)\s*:\s*(.*)/i),p=f[1],u=f[2];e.events[p.toLowerCase()].push(s(u,e.events.format))}}}return e}(t),a=function(t){for(var e=t.info,i=t.style,a=t.format,n=t.defaultStyle,r={},s=[h({},w,n,{Name:"Default"})].concat(i.map((function(t){for(var e={},i=0;i<a.length;i++)e[a[i]]=t[i];return e}))),o=function(t){var i=s[t];/^(\*+)Default$/.test(i.Name)&&(i.Name="Default"),Object.keys(i).forEach((function(t){"Name"===t||"Fontname"===t||/Colour/.test(t)||(i[t]*=1)}));var a=S(i.PrimaryColour),n=a[0],o=a[1],l=S(i.SecondaryColour),h=l[0],c=l[1],d=S(i.OutlineColour),f=d[0],p=d[1],u=S(i.BackColour),g=u[0],m=u[1],v={fn:i.Fontname,fs:i.Fontsize,c1:o,a1:n,c2:c,a2:h,c3:p,a3:f,c4:m,a4:g,b:Math.abs(i.Bold),i:Math.abs(i.Italic),u:Math.abs(i.Underline),s:Math.abs(i.StrikeOut),fscx:i.ScaleX,fscy:i.ScaleY,fsp:i.Spacing,frz:i.Angle,xbord:i.Outline,ybord:i.Outline,xshad:i.Shadow,yshad:i.Shadow,q:/^[0-3]$/.test(e.WrapStyle)?1*e.WrapStyle:2};r[i.Name]={style:i,tag:v}},l=0;l<s.length;l++)o(l);return r}({info:i.info,style:i.styles.style,format:i.styles.format,defaultStyle:e.defaultStyle||{}});return{info:i.info,width:1*i.info.PlayResX||null,height:1*i.info.PlayResY||null,collisions:i.info.Collisions||"Normal",styles:a,dialogues:b({styles:a,dialogues:i.events.dialogue})}}var C=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return setTimeout(t,50/3)},$=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||clearTimeout;function A(t){var e=t.match(/(\w\w)(\w\w)(\w\w)(\w\w)/),i=1-("0x"+e[1])/255,a=+("0x"+e[2]),n=+("0x"+e[3]);return"rgba("+ +("0x"+e[4])+","+n+","+a+","+i+")"}function M(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))}function N(t,e){void 0===e&&(e=[]);for(var i=document.createElementNS("http://www.w3.org/2000/svg",t),a=0;a<e.length;a++){var n=e[a];i.setAttributeNS("xlink:href"===n[0]?"http://www.w3.org/1999/xlink":null,n[0],n[1])}return i}function k(t){var e=document.body.style,i=t.replace(/^\w/,(function(t){return t.toUpperCase()}));return t in e?"":"webkit"+i in e?"-webkit-":"moz"+i in e?"-moz-":""}var T={transform:k("transform"),animation:k("animation"),clipPath:k("clipPath")};function E(t){var e=t.getRootNode?t.getRootNode():document;return e===document?e.head:e}var F=["c3","a3","c4","a4","xbord","ybord","xshad","yshad","blur","be"],j=["fscx","fscy","frx","fry","frz","fax","fay"];function L(t){var e=this._.scriptRes.width,i=this._.scriptRes.height,a="";if(null!==t.dots){var n=t.dots,r=n.x1,s=n.y1,o=n.x2,l=n.y2;a="M"+(r/=e)+","+(s/=i)+"L"+r+","+(l/=i)+","+(o/=e)+","+l+","+o+","+s+"Z"}null!==t.drawing&&(a=t.drawing.instructions.map((function(t){return t.type+t.points.map((function(t){var a=t.x,n=t.y;return a/e+","+n/i})).join(",")})).join(""));var h=1/(1<<t.scale-1);t.inverse&&(a+="M0,0L0,"+h+","+h+","+h+","+h+",0,0,0Z");var c="ASS-"+M(),d=N("clipPath",[["id",c],["clipPathUnits","objectBoundingBox"]]);return d.appendChild(N("path",[["d",a],["transform","scale("+h+")"],["clip-rule","evenodd"]])),this._.$defs.appendChild(d),{$clipPath:d,cssText:T.clipPath+"clip-path:url(#"+c+");"}}function B(t){if(t.clip){var e=document.createElement("div");this._.$stage.insertBefore(e,t.$div),e.appendChild(t.$div),e.className="ASS-fix-objectBoundingBox";var i=L.call(this,t.clip),a=i.cssText,n=i.$clipPath;this._.$defs.appendChild(n),e.style.cssText=a,h(t,{$div:e,$clipPath:n})}}var O=document.createElement("div");O.className="ASS-fix-font-size",O.textContent="M";var z=Object.create(null);function R(t,e){var i=t+"-"+e;return z[i]||(O.style.cssText="line-height:normal;font-size:"+e+'px;font-family:"'+t+'",Arial;',z[i]=e*e/O.clientHeight),z[i]}function H(t,e){var i=[],a=A(t.a3+t.c3),n=t.xbord*e,r=t.ybord*e,s=A(t.a4+t.c4),o=t.xshad*e,l=t.yshad*e,h=t.blur||t.be||0;if(!(n+r+o+l))return"none";if(n||r)for(var c=-1;c<=1;c++)for(var d=-1;d<=1;d++){for(var f=1;f<n;f++)for(var p=1;p<r;p++)(c||d)&&i.push(a+" "+c*f+"px "+d*p+"px "+h+"px");i.push(a+" "+c*n+"px "+d*r+"px "+h+"px")}if(o||l){var u=o>0?1:-1,g=l>0?1:-1;o=Math.abs(o),l=Math.abs(l);for(var m=Math.max(n,o-n);m<o+n;m++)for(var v=Math.max(r,l-r);v<l+r;v++)i.push(s+" "+m*u+"px "+v*g+"px "+h+"px");i.push(s+" "+(o+n)*u+"px "+(l+r)*g+"px "+h+"px")}return i.join()}function P(t){return["perspective(314px)","rotateY("+(t.fry||0)+"deg)","rotateX("+(t.frx||0)+"deg)","rotateZ("+(-t.frz||0)+"deg)","scale("+(t.p?1:(t.fscx||100)/100)+","+(t.p?1:(t.fscy||100)/100)+")","skew("+(t.fax||0)+"rad,"+(t.fay||0)+"rad)"].join(" ")}function q(t,e){return"@"+T.animation+"keyframes "+t+" {"+e+"}\n"}var I=function(){this.obj={}};function U(){var t=this,e="";return this.dialogues.forEach((function(i){var a=i.start,n=i.end,r=i.effect,s=i.move,o=i.fade,l=i.slices,c=1e3*(n-a),d=new I;if(r&&!s){var f=r.name,p=r.delay,u=r.lefttoright,g=r.y1,m=r.y2||t._.resampledRes.height;if("banner"===f){var v=t.scale*(c/p)*(u?1:-1);d.set("0.000%","transform","translateX(0)"),d.set("100.000%","transform","translateX("+v+"px)")}if(/^scroll/.test(f)){var y=/up/.test(f)?-1:1,x="translateY("+t.scale*g*y+"px)",b="translateY("+t.scale*m*y+"px)",w=(m-g)/(c/p)*100;d.set("0.000%","transform",x),w<100&&d.set(w.toFixed(3)+"%","transform",b),d.set("100.000%","transform",b)}}if(s){var S=s.x1,_=s.y1,C=s.x2,$=s.y2,N=s.t1,k=s.t2||c,T=i.pos||{x:0,y:0},E=[{x:S,y:_},{x:C,y:$}].map((function(e){var i=e.x,a=e.y;return"translate("+t.scale*(i-T.x)+"px, "+t.scale*(a-T.y)+"px)"}));d.setT({t1:N,t2:k,duration:c,prop:"transform",from:E[0],to:E[1]})}if(o)if("fad"===o.type){var L=o.t1,B=o.t2;d.set("0.000%","opacity",0),L<c?(d.set((L/c*100).toFixed(3)+"%","opacity",1),L+B<c&&d.set(((c-B)/c*100).toFixed(3)+"%","opacity",1),d.set("100.000%","opacity",0)):d.set("100.000%","opacity",c/L)}else{var O=o.a1,z=o.a2,U=o.a3,Y=o.t1,D=o.t2,G=o.t3,X=o.t4,W=[Y,D,G,X].map((function(t){return(t/c*100).toFixed(3)+"%"})),V=[O,z,U].map((function(t){return 1-t/255}));d.set("0.000%","opacity",V[0]),Y<c&&d.set(W[0],"opacity",V[0]),D<c&&d.set(W[1],"opacity",V[1]),G<c&&d.set(W[2],"opacity",V[1]),X<c&&d.set(W[3],"opacity",V[2]),d.set("100.000%","opacity",V[2])}var J=d.toString();J&&(h(i,{animationName:"ASS-"+M()}),e+=q(i.animationName,J)),l.forEach((function(i){i.fragments.forEach((function(a){if(a.tag.t&&a.tag.t.length){var n,r=new I,s=h({},i.tag,a.tag);(n=a.tag.t,n.reduceRight((function(t,e){var i=!1;return t.map((function(t){return i=e.t1===t.t1&&e.t2===t.t2&&e.accel===t.accel,h({},t,i?{tag:h({},t.tag,e.tag)}:{})})).concat(i?[]:e)}),[])).forEach((function(e){var n=e.t1,o=e.t2,l=e.tag;if(l.fs){var d=t.scale*R(s.fn,s.fs)+"px",f=t.scale*R(l.fn,s.fs)+"px";r.setT({t1:n,t2:o,duration:c,prop:"font-size",from:d,to:f})}if(l.fsp){var p=t.scale*s.fsp+"px",u=t.scale*l.fsp+"px";r.setT({t1:n,t2:o,duration:c,prop:"letter-spacing",from:p,to:u})}var g=void 0!==l.a1&&l.a1===l.a2&&l.a2===l.a3&&l.a3===l.a4;if(l.c1||l.a1&&!g){var m=A(s.a1+s.c1),v=A((l.a1||s.a1)+(l.c1||s.c1));r.setT({t1:n,t2:o,duration:c,prop:"color",from:m,to:v})}if(g){var y=1-parseInt(s.a1,16)/255,x=1-parseInt(l.a1,16)/255;r.setT({t1:n,t2:o,duration:c,prop:"opacity",from:y,to:x})}if(F.some((function(t){return void 0!==l[t]&&l[t]!==(a.tag[t]||i.tag[t])}))){var b=/Yes/i.test(t.info.ScaledBorderAndShadow)?t.scale:1,w=H(s,b),S=H(h({},s,l),b);r.setT({t1:n,t2:o,duration:c,prop:"text-shadow",from:w,to:S})}if(j.some((function(t){return void 0!==l[t]&&l[t]!==(a.tag[t]||i.tag[t])}))){var _=h({},s,l);a.drawing&&(h(_,{p:0,fscx:(l.fscx||s.fscx)/s.fscx*100,fscy:(l.fscy||s.fscy)/s.fscy*100}),h(s,{fscx:100,fscy:100}));var C=P(s),$=P(_);r.setT({t1:n,t2:o,duration:c,prop:"transform",from:C,to:$})}}));var o=r.toString();h(a,{animationName:"ASS-"+M()}),e+=q(a.animationName,o)}}))}))})),e}function Y(t,e,i){var a=T.animation;return a+"animation-name:"+t+";"+a+"animation-duration:"+e+"s;"+a+"animation-delay:"+i+"s;"+a+"animation-timing-function:linear;"+a+"animation-iteration-count:1;"+a+"animation-fill-mode:forwards;"}function D(t,e){var i=h({},e,t.tag),a=t.drawing,n=a.minX,r=a.minY,s=a.width,o=a.height,l=this.scale/(1<<i.p-1),c=(i.fscx?i.fscx/100:1)*l,d=(i.fscy?i.fscy/100:1)*l,f=i.blur||i.be||0,p=i.xbord+(i.xshad<0?-i.xshad:0)+f,u=i.ybord+(i.yshad<0?-i.yshad:0)+f,g=s*c+2*i.xbord+Math.abs(i.xshad)+2*f,m=o*d+2*i.ybord+Math.abs(i.yshad)+2*f,v=N("svg",[["width",g],["height",m],["viewBox",-p+" "+-u+" "+g+" "+m]]),y=/Yes/i.test(this.info.ScaledBorderAndShadow)?this.scale:1,x="ASS-"+M(),b=N("defs");b.appendChild(function(t,e,i){var a=t.xbord||t.ybord,n=t.xshad||t.yshad,r="FF"!==t.a1,s=t.blur||t.be||0,o=N("filter",[["id",e]]);o.appendChild(N("feGaussianBlur",[["stdDeviation",a?0:s],["in","SourceGraphic"],["result","sg_b"]])),o.appendChild(N("feFlood",[["flood-color",A(t.a1+t.c1)],["result","c1"]])),o.appendChild(N("feComposite",[["operator","in"],["in","c1"],["in2","sg_b"],["result","main"]])),a&&(o.appendChild(N("feMorphology",[["radius",t.xbord*i+" "+t.ybord*i],["operator","dilate"],["in","SourceGraphic"],["result","dil"]])),o.appendChild(N("feGaussianBlur",[["stdDeviation",s],["in","dil"],["result","dil_b"]])),o.appendChild(N("feComposite",[["operator","out"],["in","dil_b"],["in2","SourceGraphic"],["result","dil_b_o"]])),o.appendChild(N("feFlood",[["flood-color",A(t.a3+t.c3)],["result","c3"]])),o.appendChild(N("feComposite",[["operator","in"],["in","c3"],["in2","dil_b_o"],["result","border"]]))),n&&(a||r)&&(o.appendChild(N("feOffset",[["dx",t.xshad*i],["dy",t.yshad*i],["in",a?"dil":"SourceGraphic"],["result","off"]])),o.appendChild(N("feGaussianBlur",[["stdDeviation",s],["in","off"],["result","off_b"]])),r||(o.appendChild(N("feOffset",[["dx",t.xshad*i],["dy",t.yshad*i],["in","SourceGraphic"],["result","sg_off"]])),o.appendChild(N("feComposite",[["operator","out"],["in","off_b"],["in2","sg_off"],["result","off_b_o"]]))),o.appendChild(N("feFlood",[["flood-color",A(t.a4+t.c4)],["result","c4"]])),o.appendChild(N("feComposite",[["operator","in"],["in","c4"],["in2",r?"off_b":"off_b_o"],["result","shadow"]])));var l=N("feMerge",[]);return n&&(a||r)&&l.appendChild(N("feMergeNode",[["in","shadow"]])),a&&l.appendChild(N("feMergeNode",[["in","border"]])),l.appendChild(N("feMergeNode",[["in","main"]])),o.appendChild(l),o}(i,x,y)),v.appendChild(b);var w="ASS-"+M(),S=N("symbol",[["id",w],["viewBox",n+" "+r+" "+s+" "+o]]);return S.appendChild(N("path",[["d",t.drawing.d]])),v.appendChild(S),v.appendChild(N("use",[["width",s*c],["height",o*d],["xlink:href","#"+w],["filter","url(#"+x+")"]])),v.style.cssText="position:absolute;left:"+(n*c-p)+"px;top:"+(r*d-u)+"px;",{$svg:v,cssText:"position:relative;width:"+s*c+"px;height:"+o*d+"px;"}}function G(t){var e=this,i=document.createElement("div");i.className="ASS-dialogue";var a=document.createDocumentFragment(),n=t.slices,r=t.start,s=t.end;return n.forEach((function(t){var i=t.borderStyle;t.fragments.forEach((function(n){var o=n.text,l=n.drawing,c=n.animationName,d=h({},t.tag,n.tag),f="display:inline-block;",p=e.video.currentTime;if(!l){f+='font-family:"'+d.fn+'",Arial;',f+="font-size:"+e.scale*R(d.fn,d.fs)+"px;",f+="color:"+A(d.a1+d.c1)+";";var u=/Yes/i.test(e.info.ScaledBorderAndShadow)?e.scale:1;1===i&&(f+="text-shadow:"+H(d,u)+";"),3===i&&(f+="background-color:"+A(d.a3+d.c3)+";box-shadow:"+H(d,u)+";"),f+=d.b?"font-weight:"+(1===d.b?"bold":d.b)+";":"",f+=d.i?"font-style:italic;":"",f+=d.u||d.s?"text-decoration:"+(d.u?"underline":"")+" "+(d.s?"line-through":"")+";":"",f+=d.fsp?"letter-spacing:"+d.fsp+"px;":"",1!==d.q&&0!==d.q&&3!==d.q||(f+="word-break:break-all;white-space:normal;"),2===d.q&&(f+="word-break:normal;white-space:nowrap;")}if(j.some((function(t){return/^fsc[xy]$/.test(t)?100!==d[t]:!!d[t]}))&&(f+=T.transform+"transform:"+P(d)+";",l||(f+="transform-style:preserve-3d;word-break:normal;white-space:nowrap;")),c&&(f+=Y(c,s-r,Math.min(0,r-p))),l&&d.pbo){var g=e.scale*-d.pbo*(d.fscy||100)/100;f+="vertical-align:"+g+"px;"}var m=/"fr[xyz]":[^0]/.test(JSON.stringify(d));(function(t,e){return t.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\s/g,"&nbsp;").replace(/\\h/g,"&nbsp;").replace(/\\N/g,"<br>").replace(/\\n/g,2===e?"<br>":"&nbsp;")})(o,d.q).split("<br>").forEach((function(i,r){var s=document.createElement("span");if(s.dataset.hasRotate=m,l){var o=D.call(e,n,t.tag);s.style.cssText=o.cssText,s.appendChild(o.$svg)}else{if(r&&a.appendChild(document.createElement("br")),!i)return;s.innerHTML=i}s.style.cssText+=f,a.appendChild(s)}))}))})),i.appendChild(a),i}function X(t){var e=t.layer,i=t.margin,a=t.width,n=t.height,r=t.alignment,s=t.end,o=this.width-(this.scale*(i.left+i.right)|0),l=this.height,h=this.scale*i.vertical|0,c=100*this.video.currentTime;this._.space[e]=this._.space[e]||{left:{width:new Uint16Array(l+1),end:new Uint16Array(l+1)},center:{width:new Uint16Array(l+1),end:new Uint16Array(l+1)},right:{width:new Uint16Array(l+1),end:new Uint16Array(l+1)}};var d=this._.space[e],f=["right","left","center"][r%3],p=0,u=0,g=function(t){return(p=function(t){var e=d.left.width[t],i=d.center.width[t],n=d.right.width[t],r=d.left.end[t],s=d.center.end[t],l=d.right.end[t];return"left"===f&&(r>c&&e||s>c&&i&&2*a+i>o||l>c&&n&&a+n>o)||"center"===f&&(r>c&&e&&2*e+a>o||s>c&&i||l>c&&n&&2*n+a>o)||"right"===f&&(r>c&&e&&e+a>o||s>c&&i&&2*a+i>o||l>c&&n)}(t)?0:p+1)>=n&&(u=t,!0)};if(r<=3)for(var m=l-h-1;m>h&&!g(m);m--);else if(r>=7)for(var v=h+1;v<l-h&&!g(v);v++);else for(var y=l-n>>1;y<l-h&&!g(y);y++);r>3&&(u-=n-1);for(var x=u;x<u+n;x++)d[f].width[x]=a,d[f].end[x]=100*s;return u}function W(t){var e=t.effect,i=t.move,a=t.alignment,n=t.width,r=t.height,s=t.margin,o=t.slices,l=0,h=0;if(e)"banner"===e.name&&(a<=3&&(h=this.height-r-s.vertical),a>=4&&a<=6&&(h=(this.height-r)/2),a>=7&&(h=s.vertical),l=e.lefttoright?-n:this.width);else if(t.pos||i){var c=t.pos||{x:0,y:0};a%3==1&&(l=this.scale*c.x),a%3==2&&(l=this.scale*c.x-n/2),a%3==0&&(l=this.scale*c.x-n),a<=3&&(h=this.scale*c.y-r),a>=4&&a<=6&&(h=this.scale*c.y-r/2),a>=7&&(h=this.scale*c.y)}else{a%3==1&&(l=0),a%3==2&&(l=(this.width-n)/2),a%3==0&&(l=this.width-n-this.scale*s.right),o.some((function(t){return t.fragments.some((function(t){return t.animationName}))}))?(a<=3&&(h=this.height-r-s.vertical),a>=4&&a<=6&&(h=(this.height-r)/2),a>=7&&(h=s.vertical)):h=X.call(this,t)}return{x:l,y:h}}function V(t){var e=t.layer,i=t.start,a=t.end,n=t.alignment,r=t.effect,s=t.pos,o=t.margin,l=t.animationName,h=t.width,c=t.height,d=t.x,f=t.y,p=this.video.currentTime,u="";(e&&(u+="z-index:"+e+";"),l&&(u+=Y(l,a-i,Math.min(0,i-p))),u+="text-align:"+["right","left","center"][n%3]+";",r)||(u+="max-width:"+(this.width-this.scale*(o.left+o.right))+"px;",s||(n%3==1&&(u+="margin-left:"+this.scale*o.left+"px;"),n%3==0&&(u+="margin-right:"+this.scale*o.right+"px;"),h>this.width-this.scale*(o.left+o.right)&&(u+="margin-left:"+this.scale*o.left+"px;",u+="margin-right:"+this.scale*o.right+"px;")));return u+="width:"+h+"px;height:"+c+"px;left:"+d+"px;top:"+f+"px;"}function J(t){var e=G.call(this,t);h(t,{$div:e}),this._.$stage.appendChild(e);var i=e.getBoundingClientRect(),a=i.width,n=i.height;return h(t,{width:a,height:n}),h(t,W.call(this,t)),e.style.cssText=V.call(this,t),function(t){var e=t.alignment,i=t.width,a=t.height,n=t.x,r=t.y,s=t.$div,o=t.org;o||(o={x:0,y:0},e%3==1&&(o.x=n),e%3==2&&(o.x=n+i/2),e%3==0&&(o.x=n+i),e<=3&&(o.y=r+a),e>=4&&e<=6&&(o.y=r+a/2),e>=7&&(o.y=r));for(var l=s.childNodes.length-1;l>=0;l--){var h=s.childNodes[l];if("true"===h.dataset.hasRotate){var c=o.x-n-h.offsetLeft,d=o.y-r-h.offsetTop;h.style.cssText+=T.transform+"transform-origin:"+c+"px "+d+"px;"}}}(t),B.call(this,t),t}function Z(){for(var t=this.video.currentTime,e=this._.stagings.length-1;e>=0;e--){var i=this._.stagings[e],a=i.end;if(i.effect&&/scroll/.test(i.effect.name)){var n=i.effect,r=n.y1,s=n.y2,o=n.delay,l=((s||this._.resampledRes.height)-r)/(1e3/o);a=Math.min(a,i.start+l)}a<t&&(this._.$stage.removeChild(i.$div),i.$clipPath&&this._.$defs.removeChild(i.$clipPath),this._.stagings.splice(e,1))}for(var h=this.dialogues;this._.index<h.length&&t>=h[this._.index].start;){if(t<h[this._.index].end){var c=J.call(this,h[this._.index]);this._.stagings.push(c)}++this._.index}}function K(){var t=this,e=function(){Z.call(t),t._.requestId=C(e)};return $(this._.requestId),this._.requestId=C(e),this._.$stage.classList.remove("ASS-animation-paused"),this}function Q(){return $(this._.requestId),this._.requestId=0,this._.$stage.classList.add("ASS-animation-paused"),this}function tt(){for(;this._.$stage.lastChild;)this._.$stage.removeChild(this._.$stage.lastChild);for(;this._.$defs.lastChild;)this._.$defs.removeChild(this._.$defs.lastChild);this._.stagings=[],this._.space=[]}function et(){var t=this.video.currentTime,e=this.dialogues;tt.call(this),this._.index=function(){for(var i=0,a=e.length-1;i+1<a&&t>e[a+i>>1].end;)i=a+i>>1;if(!i)return 0;for(var n=i;n<a;n++)if(e[n].end>t&&t>=e[n].start||n&&e[n-1].end<t&&t<e[n].start)return n;return a}(),Z.call(this)}function it(){var t=this._.listener;t.play=K.bind(this),t.pause=Q.bind(this),t.seeking=et.bind(this),this.video.addEventListener("play",t.play),this.video.addEventListener("pause",t.pause),this.video.addEventListener("seeking",t.seeking)}function at(){var t=this._.listener;this.video.removeEventListener("play",t.play),this.video.removeEventListener("pause",t.pause),this.video.removeEventListener("seeking",t.seeking),t.play=null,t.pause=null,t.seeking=null}function nt(){var t=this.video.clientWidth,e=this.video.clientHeight,i=this.video.videoWidth||t,a=this.video.videoHeight||e,n=this._.scriptRes.width,r=this._.scriptRes.height,s=n,o=r,l=Math.min(t/i,e/a);"video_width"===this.resampling&&(o=n/i*a),"video_height"===this.resampling&&(s=r/a*i),this.scale=Math.min(t/s,e/o),"script_width"===this.resampling&&(this.scale=l*(i/s)),"script_height"===this.resampling&&(this.scale=l*(a/o)),this.width=this.scale*s,this.height=this.scale*o,this._.resampledRes={width:s,height:o},this.container.style.cssText="width:"+t+"px;height:"+e+"px;";var h="width:"+this.width+"px;height:"+this.height+"px;top:"+(e-this.height)/2+"px;left:"+(t-this.width)/2+"px;";return this._.$stage.style.cssText=h,this._.$svg.style.cssText=h,this._.$svg.setAttributeNS(null,"viewBox","0 0 "+n+" "+r),this._.$animation.innerHTML=U.call(this),et.call(this),this}I.prototype.set=function(t,e,i){this.obj[t]||(this.obj[t]={}),this.obj[t][e]=i},I.prototype.setT=function(t){var e=t.t1,i=t.t2,a=t.duration,n=t.prop,r=t.from,s=t.to;this.set("0.000%",n,r),e<a&&this.set((e/a*100).toFixed(3)+"%",n,r),i<a&&this.set((i/a*100).toFixed(3)+"%",n,s),this.set("100.000%",n,s)},I.prototype.toString=function(){var t=this;return Object.keys(this.obj).map((function(e){return e+"{"+Object.keys(t.obj[e]).map((function(i){return""+(T[i]||"")+i+":"+t.obj[e][i]+";"})).join("")+"}"})).join("")};function rt(t,e,i){if(void 0===i&&(i={}),this.scale=1,this._={index:0,stagings:[],space:[],listener:{},$svg:N("svg"),$defs:N("defs"),$stage:document.createElement("div"),$animation:document.createElement("style")},this._.$svg.appendChild(this._.$defs),this._.$stage.className="ASS-stage ASS-animation-paused",this._.resampling=i.resampling||"video_height",this.container=i.container||document.createElement("div"),this.container.classList.add("ASS-container"),this.container.appendChild(O),this.container.appendChild(this._.$svg),this._.hasInitContainer=!!i.container,this.video=e,it.call(this),!this._.hasInitContainer){var a=!e.paused;e.parentNode.insertBefore(this.container,e),this.container.appendChild(e),a&&e.paused&&e.play()}this.container.appendChild(this._.$stage);var n=_(t),r=n.info,s=n.width,o=n.height,l=n.dialogues;this.info=r,this._.scriptRes={width:s||e.videoWidth,height:o||e.videoHeight},this.dialogues=l;var h=E(this.container),c=h.querySelector("#ASS-global-style");return c||((c=document.createElement("style")).type="text/css",c.id="ASS-global-style",c.appendChild(document.createTextNode(".ASS-container,.ASS-stage{position:relative;overflow:hidden}.ASS-container video{position:absolute;top:0;left:0}.ASS-stage{pointer-events:none;position:absolute}.ASS-dialogue{font-size:0;position:absolute}.ASS-fix-font-size{position:absolute;visibility:hidden}.ASS-fix-objectBoundingBox{width:100%;height:100%;position:absolute;top:0;left:0}.ASS-animation-paused *{-webkit-animation-play-state:paused!important;animation-play-state:paused!important}")),h.appendChild(c)),this._.$animation.type="text/css",this._.$animation.className="ASS-animation",h.appendChild(this._.$animation),nt.call(this),this.video.paused||(et.call(this),K.call(this)),this}function st(){return this._.$stage.style.visibility="visible",this}function ot(){return this._.$stage.style.visibility="hidden",this}function lt(){Q.call(this),tt.call(this),at.call(this,this._.listener);var t=E(this.container);if(!this._.hasInitContainer){var e=!this.video.paused;this.container.parentNode.insertBefore(this.video,this.container),this.container.parentNode.removeChild(this.container),e&&this.video.paused&&this.video.play()}for(var i in t.removeChild(this._.$animation),this)Object.prototype.hasOwnProperty.call(this,i)&&(this[i]=null);return this}var ht=/^(video|script)_(width|height)$/;function ct(){return ht.test(this._.resampling)?this._.resampling:"video_height"}function dt(t){return t===this._.resampling?t:(ht.test(t)&&(this._.resampling=t,this.resize()),this._.resampling)}var ft=function(t,e,i){return"string"!=typeof t?this:rt.call(this,t,e,i)},pt={resampling:{configurable:!0}};ft.prototype.resize=function(){return nt.call(this)},ft.prototype.show=function(){return st.call(this)},ft.prototype.hide=function(){return ot.call(this)},ft.prototype.destroy=function(){return lt.call(this)},pt.resampling.get=function(){return ct.call(this)},pt.resampling.set=function(t){return dt.call(this,t)},Object.defineProperties(ft.prototype,pt);return function(t,e){void 0===e&&(e={});var i=e.insertAt;if(t&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===i&&a.firstChild?a.insertBefore(n,a.firstChild):a.appendChild(n),n.styleSheet?n.styleSheet.cssText=t:n.appendChild(document.createTextNode(t))}}(".artplayer-plugin-ass{bottom:0!important}"),function(t){return function(e){var i=null;return fetch(t).then((function(t){return t.text()})).then((function(t){var a=e.template,n=a.$video,r=a.$subtitle;r.classList.add("artplayer-plugin-ass"),e.once("ready",(function(){(i=new ft(t,n,{container:r,resampling:"video_width"})).resize(),e.emit("artplayerPluginAss",i),e.on("resize",(function(){return i.resize()})),e.on("destroy",(function(){return i.destroy()}))}))})),{name:"artplayerPluginAss",ass:i}}}}));
