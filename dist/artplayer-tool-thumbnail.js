/*!
 * artplayer-tool-thumbnail.js v1.0.5
 * Github: https://github.com/zhw2590582/ArtPlayer#readme
 * (c) 2017-2018 Harvey Zack
 * Released under the MIT License.
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e["artplayer-tool-thumbnail"]={})}(this,function(e){"use strict";var o=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e};function n(e,t){return e(t={exports:{}},t.exports),t.exports}var r=n(function(t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=o=function(e){return n(e)}:t.exports=o=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":n(e)},o(e)}t.exports=o});var a=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e};var s=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?a(e):t},u=n(function(t){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(e)}t.exports=n}),l=n(function(n){function o(e,t){return n.exports=o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}n.exports=o});var c=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)};function h(){}h.prototype={on:function(e,t,n){var o=this.e||(this.e={});return(o[e]||(o[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var o=this;function i(){o.off(e,i),t.apply(n,arguments)}return i._=t,this.on(e,i,n)},emit:function(e){for(var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),o=0,i=n.length;o<i;o++)n[o].fn.apply(n[o].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),o=n[e],i=[];if(o&&t)for(var r=0,a=o.length;r<a;r++)o[r].fn!==t&&o[r].fn._!==t&&i.push(o[r]);return i.length?n[e]=i:delete n[e],this}};var f=h;function p(t){return new Promise(function(e){return setTimeout(e,t)})}function d(e,t,n){return Math.max(Math.min(e,Math.max(t,n)),Math.min(t,n))}var m=function(e){function n(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return o(this,n),(e=s(this,u(n).call(this))).processing=!1,e.option={},e.setup(Object.assign({},n.DEFAULTS,t)),e.video=n.creatVideo(),e.inputChange=e.inputChange.bind(a(a(e))),e.ondrop=e.ondrop.bind(a(a(e))),e.option.fileInput.addEventListener("change",e.inputChange),e.option.fileInput.addEventListener("dragover",n.ondragover),e.option.fileInput.addEventListener("drop",n.ondrop),e}return c(n,f),t(n,[{key:"ondrop",value:function(e){e.preventDefault();var t=e.dataTransfer.files[0];this.loadVideo(t)}},{key:"setup",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.option=Object.assign({},this.option,e);var n=this.option,o=n.fileInput,i=n.delay,r=n.number,a=n.width,s=n.height,u=n.column;return this.errorHandle("INPUT"===o.tagName&&"file"===o.type,"The 'fileInput' is not a usable file input like: <input type=\"file\">"),["delay","number","width","height","column"].forEach(function(e){t.errorHandle("number"==typeof t.option[e],"The '".concat(e,"' is not a number"))}),this.option.delay=d(i,10,1e3),this.option.number=d(r,10,1e3),this.option.width=d(a,10,1e3),this.option.height=d(s,10,1e3),this.option.column=d(u,1,1e3),this}},{key:"inputChange",value:function(){var e=this.option.fileInput.files[0];this.loadVideo(e)}},{key:"loadVideo",value:function(e){var t=this,n=this.option.delay;if(e){var o=this.video.canPlayType(e.type);this.errorHandle("maybe"===o||"probably"===o,"Playback of this file format is not supported: ".concat(e.type));var i=URL.createObjectURL(e);this.videoUrl=i,this.file=e,this.emit("file",this.file),this.video.src=i,p(n).then(function(){t.emit("video",t.video)}).catch(function(e){t.emit("error",e.message),console.error(e)})}}},{key:"start",value:function(){var o=this,e=this.option,i=e.width,r=e.height,a=e.number,s=e.delay;this.density=a/this.video.duration,this.errorHandle(this.file&&this.video,"Please select the video file first"),this.errorHandle(!this.processing,"There is currently a task in progress, please wait a moment..."),this.errorHandle(this.density<=1,"The preview density cannot be greater than 1, but got ".concat(this.density));var t=this.creatScreenshotDate(),u=this.creatCanvas(),l=u.getContext("2d");this.emit("canvas",u);var n,c=t.map(function(e,n){return function(){return o.video.currentTime=e.time,new Promise(function(t){p(s).then(function(){l.drawImage(o.video,e.x,e.y,i,r),u.toBlob(function(e){o.thumbnailUrl&&URL.revokeObjectURL(o.thumbnailUrl),o.thumbnailUrl=URL.createObjectURL(e),o.emit("update",o.thumbnailUrl,(n+1)/a),t()})}).catch(function(e){console.error(e)})})}});return this.processing=!0,(n=c,n.reduce(function(e,t){return e.then(t)},Promise.resolve())).then(function(){return p(2*s).then(function(){o.processing=!1,o.emit("done")}).catch(function(e){o.processing=!1,o.emit("error",e.message),console.error(e)})}).catch(function(e){o.processing=!1,o.emit("error",e.message),console.error(e)})}},{key:"creatScreenshotDate",value:function(){for(var e=this.option,t=e.number,n=e.width,o=e.height,i=e.column,r=this.video.duration/t,a=[r];a.length<t;){var s=a[a.length-1];a.push(s+r)}return a.map(function(e,t){return{time:e-r/2,x:t%i*n,y:Math.floor(t/i)*o}})}},{key:"creatCanvas",value:function(){var e=this.option,t=e.number,n=e.width,o=e.height,i=e.column,r=document.createElement("canvas"),a=r.getContext("2d");return r.width=n*i,r.height=Math.ceil(t/i)*o+30,a.fillStyle="black",a.fillRect(0,0,r.width,r.height),a.font="14px Georgia",a.fillStyle="#fff",a.fillText("From: https://artplayer.org/thumbnail, Number: ".concat(t,", Width: ").concat(n,", Height: ").concat(o,", Column: ").concat(i),10,r.height-11),r}},{key:"download",value:function(){this.errorHandle(this.file&&this.thumbnailUrl,"Download does not seem to be ready, please create preview first"),this.errorHandle(!this.processing,"There is currently a task in progress, please wait a moment...");var e,t,n=document.createElement("a"),o="".concat((e=this.file.name,(t=e.split(".")).pop(),t.join(".")),".png");return n.download=o,n.href=this.thumbnailUrl,document.body.appendChild(n),n.click(),document.body.removeChild(n),this.emit("download",o),this}},{key:"errorHandle",value:function(e,t){if(!e)throw this.emit("error",t),new Error(t)}},{key:"destroy",value:function(){this.option.fileInput.removeEventListener("change",this.inputChange),this.option.fileInput.removeEventListener("dragover",n.ondragover),this.option.fileInput.removeEventListener("drop",n.ondrop),document.body.removeChild(this.video),this.videoUrl&&URL.revokeObjectURL(this.videoUrl),this.thumbnailUrl&&URL.revokeObjectURL(this.thumbnailUrl),this.emit("destroy")}}],[{key:"ondragover",value:function(e){e.preventDefault()}},{key:"creatVideo",value:function(){var e=document.createElement("video");return e.style.position="absolute",e.style.top="-9999px",e.style.left="-9999px",e.muted=!0,e.controls=!0,document.body.appendChild(e),e}},{key:"DEFAULTS",get:function(){return{delay:300,number:60,width:160,height:90,column:10}}}]),n}();window.ArtplayerToolThumbnail=m,e.default=m,Object.defineProperty(e,"__esModule",{value:!0})});
