(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['artplayer-plugin-danmu'] = factory());
}(this, function () { 'use strict';

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  function bilibiliDanmuParseFromXml(xmlString) {
    if (typeof xmlString !== 'string') return [];
    var regSrt = '<d p="(.+)">(.+)</d>';
    var listReg = new RegExp(regSrt, 'gi');
    var itemReg = new RegExp(regSrt, 'i');
    var srtList = xmlString.match(listReg);
    return srtList.length ? srtList.map(function (item) {
      var _item$match = item.match(itemReg),
          _item$match2 = slicedToArray(_item$match, 3),
          attrStr = _item$match2[1],
          text = _item$match2[2];

      var attr = attrStr.split(',').map(Number);
      return attr.length === 8 && text.trim() ? {
        text: text,
        time: attr[0],
        mode: attr[1],
        size: attr[2],
        color: "#".concat(attr[3].toString(16)),
        timestamp: attr[4],
        pool: attr[5],
        userID: attr[6],
        rowID: attr[7]
      } : null;
    }) : [];
  }
  function bilibiliDanmuParseFromAv(av) {
    var corsUrl = 'https://cors-anywhere.herokuapp.com/';
    return fetch("".concat(corsUrl, "https://api.bilibili.com/x/web-interface/view?aid=").concat(av)).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (res.code === 0 && res.data && res.data.cid) {
        return fetch("".concat(corsUrl, "https://api.bilibili.com/x/v1/dm/list.so?oid=").concat(res.data.cid)).then(function (res) {
          return res.text();
        }).then(function (xmlString) {
          return bilibiliDanmuParseFromXml(xmlString);
        });
      }

      throw new Error("Unable to get data: ".concat(JSON.stringify(res)));
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var Danmuku =
  /*#__PURE__*/
  function () {
    function Danmuku(art) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      classCallCheck(this, Danmuku);

      this.art = art;
      this.queue = {};
      this.option = Object.assign({}, Danmuku.option, option);
      art.constructor.validator(this.option, Danmuku.scheme);
      this.option.danmus.forEach(this.emit);
      this.current = [];
      this.layer = {};
      this.isStop = false;
      this.timer = null;
      this.init();
    }

    createClass(Danmuku, [{
      key: "init",
      value: function init() {
        var layers = this.art.layers;
        this.layer = layers.add({
          name: 'danmu',
          style: {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }
        });
        this.update();
        this.art.on('video:play', this.start.bind(this));
        this.art.on('video:pause', this.stop.bind(this));
        this.art.on('video:ended', this.stop.bind(this));
        this.art.on('destroy', this.stop.bind(this));
      }
    }, {
      key: "emit",
      value: function emit() {
        var danmu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var errorHandle = this.art.constructor.utils.errorHandle;
        errorHandle(danmu.text, 'Danmu text cannot be empty');
        errorHandle(danmu.time, 'Danmu time cannot be empty');

        if (this.queue[danmu.time]) {
          this.queue[danmu.time].push(danmu);
        } else {
          this.queue[danmu.time] = [danmu];
        } // this.art.emit('artplayerPluginDanmu:emit', danmu);
        // if (!this.isStop) {
        //     const { clientWidth: playerWidth, clientHeight: playerHeight } = this.art.template.$player;
        //     const danmuItem = this.getDanmuItem();
        //     danmuItem.$ref.innerText = danmu.text;
        //     danmuItem.$ref.style.fontSize = danmu.size || this.option.size;
        //     const { clientWidth: danmuWidth, clientHeight: danmuHeight } = danmuItem.$ref;
        //     danmuItem.$ref.style.opacity = danmu.opacity || this.option.opacity;
        //     danmuItem.$ref.style.color = danmu.color || this.option.color;
        //     danmuItem.$ref.style.top = this.getDanmuTop(playerHeight, danmuHeight);
        //     danmuItem.$ref.style.left = `${playerWidth}px`;
        //     danmuItem.$ref.style.transform = `translateX(${-playerWidth -
        //         danmuWidth}px) translateY(0px) translateZ(0px)`;
        //     danmuItem.$ref.style.transition = `-webkit-transform ${danmu.speed || this.option.speed}s linear 0s`;
        //     this.art.emit('artplayerPluginDanmu:emit', danmu);
        // }

      }
    }, {
      key: "getDanmuItem",
      value: function getDanmuItem() {
        var _this$art$constructor = this.art.constructor.utils,
            setStyles = _this$art$constructor.setStyles,
            append = _this$art$constructor.append;
        var inactiveItem = this.current.find(function (item) {
          return item.state === 'inactive';
        });

        if (inactiveItem) {
          inactiveItem.time = Date.now();
          inactiveItem.$ref.style.transform = 'translateX(0px) translateY(0px) translateZ(0px)';
          inactiveItem.$ref.style.transition = '-webkit-transform 0s linear 0s';
          return inactiveItem;
        }

        var $ref = document.createElement('div');
        setStyles($ref, {
          userSelect: 'none',
          position: 'absolute',
          whiteSpace: 'pre',
          pointerEvents: 'none',
          perspective: '500px',
          display: 'inline-block',
          willChange: 'transform',
          fontFamily: 'SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif',
          fontWeight: 'normal',
          lineHeight: '1.125',
          textShadow: 'rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px'
        });
        return this.current.push({
          state: 'active',
          time: Date.now(),
          $ref: append(this.layer.$ref, $ref)
        });
      }
    }, {
      key: "getDanmuTop",
      value: function getDanmuTop(playerHeight, danmuHeight) {
        return 0;
      }
    }, {
      key: "update",
      value: function update() {
        var _this = this;

        var _this$art = this.art,
            $player = _this$art.template.$player,
            player = _this$art.player;
        this.timer = window.requestAnimationFrame(function () {
          _this.current.forEach(function (item) {
            if (Date.now() - item.time >= _this.option.speed) {
              item.state = 'inactive';
            }
          });

          Object.keys(_this.queue).filter(function (time) {
            return player.currentTime + 0.5 >= time && time >= player.currentTime - 0.5;
          }).reduce(function (result, key) {
            return result.concat(_this.queue[key]);
          }, []).forEach(function (item) {
            console.log(item);
          });

          if (!_this.isStop && player.playing) {
            _this.update();
          }
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        this.isStop = true;
        window.cancelAnimationFrame(this.timer);
        this.art.emit('artplayerPluginDanmu:stop');
      }
    }, {
      key: "start",
      value: function start() {
        this.isStop = false;
        this.art.emit('artplayerPluginDanmu:start');
      }
    }, {
      key: "show",
      value: function show() {
        this.layer.$ref.style = 'none';
        this.art.emit('artplayerPluginDanmu:show');
      }
    }, {
      key: "hide",
      value: function hide() {
        this.layer.$ref.style = 'block';
        this.art.emit('artplayerPluginDanmu:hide');
      }
    }], [{
      key: "option",
      get: function get() {
        return {
          danmus: [],
          speed: 5,
          opacity: 1,
          color: '#fff',
          size: 14
        };
      }
    }, {
      key: "scheme",
      get: function get() {
        return {
          danmus: {
            type: 'array',
            child: {
              text: 'string',
              size: 'number',
              time: 'number',
              color: 'string',
              mode: 'number'
            }
          },
          speed: 'number',
          opacity: 'number',
          color: 'string',
          size: 'number'
        };
      }
    }]);

    return Danmuku;
  }();

  function artplayerPluginDanmu(option) {
    return function (art) {
      var danmuku = new Danmuku(art, option);
      return {
        name: 'artplayerPluginDanmu',
        emit: danmuku.emit.bind(danmuku),
        start: danmuku.start.bind(danmuku),
        stop: danmuku.stop.bind(danmuku),
        hide: danmuku.hide.bind(danmuku),
        show: danmuku.show.bind(danmuku)
      };
    };
  }

  artplayerPluginDanmu.bilibiliDanmuParseFromXml = bilibiliDanmuParseFromXml;
  artplayerPluginDanmu.bilibiliDanmuParseFromAv = bilibiliDanmuParseFromAv;
  window.artplayerPluginDanmu = artplayerPluginDanmu;

  return artplayerPluginDanmu;

}));
//# sourceMappingURL=artplayer-plugin-danmu.js.map
