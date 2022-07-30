(function (window, undefiend) {
  var Speak = function (obj) {
    // 传入一个对象
    return new Speak.prototype.init(obj);
  };
  Speak.prototype = {
    constructor: Speak,
    // 版本
    version: "2020-08-17 v2",
    // 当前页数
    page: 1,
    // 总页数
    total_page: 1,
    // 每次显示的页数
    per_page: 3,
    // 账户ID
    owner: "antmoe",
    // 仓库
    repo: "speak",
    // issue总数
    total_count: 0,
    // 临时存放issue
    text: [],
    // 无标签时的name
    defaultLabelName: "Default",
    // 无标签时的颜色
    defaultLabelColor: "#ffc107",
    // 昵称
    nickname: "XiaoKang🦄",
    // highlight样式
    highlightcss:
      "https://cdn.bootcdn.net/ajax/libs/highlight.js/10.1.1/styles/monokai-sublime.min.css",
    emojiLabel: {},
    init: function (obj) {
      for (let i in obj) {
        this[i] = obj[i];
      }
      console.log(
        "\n %c XiaoKang's Speak" +
          this.version +
          " %c https://docs.tzki.cn/Speak \n",
        "color: #fff; background: #4285f4; padding:5px 0;",
        "background: #66CCFF; padding:5px 0;"
      );
      Speak.setHead(this, Speak.getPageSpeak(this));
      Speak.bindBtn(this);
      return this;
    },
  };
  Speak.extend = Speak.prototype.extend = function (obj) {
    for (var key in obj) {
      this[key] = obj[key];
    }
  };
  // 插入元素方法
  Speak.extend({
    setHead: function (_this) {
      Speak.noRefer();
      Speak.loadingCss();
      $.getScript(
        "https://cdn.bootcss.com/highlight.js/9.18.1/highlight.min.js"
      );
      $.getScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
    },
    /**
     * 在头部添加no-referrer标签，解决gitee图片防盗链问题
     * @date 2020-08-10
     * @returns {any}
     */
    noRefer: function () {
      $("head").append('<meta name="referrer" content="no-referrer" />');
    },
    /*
    highLight: function (_this) {
      $("head").append(
        '<script src="https://cdn.bootcss.com/highlight.js/9.18.1/highlight.min.js"></script>'
      );
      $("head").append(`<link href="${_this.highlightcss}" rel="stylesheet">`);
    },
    marked: function () {
      $("head").append(
        '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>'
      );
    },
    */
    loadingCss: function () {
      $("head").append(
        "<style>.loader{width:150px;height:150px;margin:0 auto}svg{width:90%;fill:none}.load{transform-origin:50% 50%;stroke-dasharray:570;stroke-width:20px}.load.one{stroke:#554d73;animation:load 1.5s infinite}.load.two{stroke:#a496a4;animation:load 1.5s infinite;animation-delay:.1s}.load.three{stroke:#a5a7bb;animation:load 1.5s infinite;animation-delay:.2s}.point{animation:bounce 1s infinite ease-in-out}.point.one{fill:#a5a7bb;animation-delay:0s}.point.two{fill:#a496a4;animation-delay:.1s}.point.three{fill:#554d73;animation-delay:.2s}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes load{0%{stroke-dashoffset:570}50%{stroke-dashoffset:530}100%{stroke-dashoffset:570;transform:rotate(360deg)}}</style>"
      );
    },
    loading: function () {
      $(".is-container").html(
        `<div class="loader"><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle class="load one" cx="60" cy="60" r="40"></circle><circle class="load two" cx="60" cy="60" r="40"></circle><circle class="load three" cx="60" cy="60" r="40"></circle><g><circle class="point one" cx="45" cy="70" r="5"></circle><circle class="point two" cx="60" cy="70" r="5"></circle><circle class="point three" cx="75" cy="70" r="5"></circle></g></svg></div>`
      );
    },
  });
  // 类方法
  Speak.extend({
    /**
     * 获取issue
     * @date 2020-08-10
     * @returns {Promise}
     */
    getSpeak: function (_this) {
      return $.ajax({
        url:
          "https://gitee.com/api/v5/repos/" +
          _this.owner +
          "/" +
          _this.repo +
          "/issues?state=open&sort=created&direction=desc&page=" +
          _this.page +
          "&per_page=" +
          _this.per_page +
          "&creator=" +
          _this.owner,
        type: "get",
        success: function (date, textStatus, request) {
          _this.text = [];
          _this.total_count = request.getResponseHeader("total_count");
          _this.total_page = Math.ceil(_this.total_count / _this.per_page);
          if (date) {
            for (let i in date) {
              var temp = {};
              temp.comments = date[i]["comments"];
              temp.body = Speak.getBody(date[i]["body"]);
              temp.labels = Speak.getLabels(_this, date[i]["labels"]);
              temp.created_at = Speak.getTime(date[i]["created_at"]);
              temp.html_url = date[i]["html_url"];
              _this.text.push(temp);
            }
          } else {
            return;
          }
        },
      });
    },
    /**
     * 为上一页下一页绑定事件
     * @date 2020-08-10
     * @returns {any}
     */
    bindBtn: function (_this) {
      $(".prev").click(function (e) {
        e.preventDefault();
        _this.page -= 1;
        Speak.getPageSpeak(_this);
      });
      $(".next").click(function (e) {
        e.preventDefault();
        _this.page += 1;
        Speak.getPageSpeak(_this);
      });
    },
    //
    /**
     * 获取issue并创建
     * @date 2020-08-10
     * @param {any} _this
     * @returns {any}
     */
    getPageSpeak: function (_this) {
      Speak.loading();
      Speak.getSpeak(_this).then(() => Speak.createSpeak(_this));
    },
  });
  // 类方法 创建元素相关
  Speak.extend({
    createSpeak: function (_this) {
      let content = "";
      var text = _this.text;
      for (let i in text) {
        content += `<div class="is-issue" style="transform-origin: center top;"><div class="is-issue-content">
                <div class="is-issue-header"><span class="is-issue-username">${_this.nickname}</span><span
                        class="is-verified-badge"><svg class="is-badge" viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"
                                fill="#1da1f2"></path>
                        </svg></span><span class="is-issue-text">·</span><span class="is-issue-date">${text[i].created_at}</span>
                        <div>
                      ${text[i].labels}
                        </div>
                        </div>
                <div class="is-issue-body markdown-body">
                    ${text[i].body}
                </div>
                <div class="is-issue-footer"><a href="${text[i].html_url}" target="_blank" class="is-issue-icon is-issue-comment">
                        <div class="is-icon-comment-wrap"><svg class="is-icon" aria-hidden="true">
                                <svg id="icon-comment" viewBox="0 0 1024 1024">
                                    <path
                                        d="M722.26133333 387.45429333c0-47.15861333-36.864-85.71562667-81.92-85.71562666H75.09333333v367.57504C75.09333333 716.44501333 111.95733333 755.02933333 157.01333333 755.02933333h81.92v165.25994667a27.77088 27.77088 0 0 0 32.08533334 28.23509333L307.2 910.67733333h3.74101333L391.85066667 826.02666667h3.14026666L462.848 755.02933333h259.41333333z"
                                        fill="#a6c4e1"></path>
                                    <path
                                        d="M861.52533333 162.47466667v505.17333333H425.49248l-25.8048 27.00629333L326.31466667 771.41333333v-103.76533333H162.47466667V162.47466667h699.05066666m5.46133334-87.38133334H157.01333333c-45.056 0-81.92 38.55701333-81.92 85.71562667v508.50474667C75.09333333 716.44501333 111.95733333 755.02933333 157.01333333 755.02933333h81.92v165.25994667A27.93472 27.93472 0 0 0 266.45845333 948.90666667a26.13248 26.13248 0 0 0 19.11466667-8.43776L462.848 755.02933333h404.13866667c45.056 0 81.92-38.55701333 81.92-85.68832V160.80896C948.90666667 113.65034667 912.04266667 75.09333333 866.98666667 75.09333333z"
                                        fill="#333333"></path>
                                    <path
                                        d="M315.392 375.46666667a43.69066667 43.69066667 0 1 0 43.69066667 43.69066666 43.69066667 43.69066667 0 0 0-43.69066667-43.69066666zM708.608 375.46666667a43.69066667 43.69066667 0 1 0 43.69066667 43.69066666 43.69066667 43.69066667 0 0 0-43.69066667-43.69066666zM512 375.46666667a43.69066667 43.69066667 0 1 0 43.69066667 43.69066666 43.69066667 43.69066667 0 0 0-43.69066667-43.69066666z"
                                        fill="#333333"></path>
                                </svg>
                            </svg></div><span class="is-comment-count">${text[i].comments}</span>
                    </a></div>
            </div></div>`;
      }
      $(".is-container").html(content);
      Speak.createPage(_this);
    },
    createPage: function (_this) {
      $(".page").text(_this.page + " / " + _this.total_page);
      // 下一页
      if (_this.total_page != 1 && _this.page == 1) {
        $(".next").show();
      } else if (_this.page == _this.total_page && _this.page != 1) {
        $(".next").hide();
      } else if (_this.page < _this.total_page) {
        $(".next").show();
      }
      // 上一页
      if (_this.page > 1) {
        $(".prev").show();
      } else {
        $(".prev").hide();
      }
    },
  });
  // 类方法 数据处理
  Speak.extend({
    getFontColor: function (color) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      String.prototype.colorRgb = function () {
        var sColor = this.toLowerCase();
        if (sColor && reg.test(sColor)) {
          if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
              sColorNew += sColor
                .slice(i, i + 1)
                .concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
          }
          //处理六位的颜色值
          var sColorChange = [];
          for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
          }
          return "RGB(" + sColorChange.join(",") + ")";
        } else {
          return sColor;
        }
      };
      var flag = "white";
      var rgbColor = color.colorRgb();
      rgbColor = rgbColor.replace("RGB(", "");
      rgbColor = rgbColor.replace(")", "");
      // console.log(rgbColor);
      var temp = rgbColor.split(",");

      if (parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]) > 450) {
        // console.log(parseInt(temp[0]) + parseInt(temp[1]) + parseInt(temp[2]));
        flag = "black";
      }
      return flag;
    },
    getLabels: function (_this, labels) {
      var defaultLabel = "";
      if (labels.length) {
        for (var i in labels) {
          if (_this.emojiLabel[labels[i]["name"]]) {
            labels[i]["name"] =
              _this.emojiLabel[labels[i]["name"]] + labels[i]["name"];
          }
          defaultLabel += `<span class="is-issue-label"
                        style="background-color: #${
                          labels[i]["color"]
                        }; color: ${Speak.getFontColor(labels[i].color)};">${
            labels[i]["name"]
          }
                        </span>`;
        }
      } else {
        defaultLabel = `<span class="is-issue-label"
                        style="background-color: ${
                          _this.defaultLabelColor
                        }; color: ${Speak.getFontColor(
          _this.defaultLabelColor
        )};">${_this.defaultLabelName}</span>`;
      }

      return defaultLabel;
    },
    getBody: function (body) {
      var rendererMD = new marked.Renderer();
      marked.setOptions({
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
      });
      rendererMD.image = function (url, title, text) {
        return `<a style="cursor: zoom-in" data-caption="${text}" data-fancybox="gallery" href=${url}><img class="lazyload" src="${url}" data-src=${url} alt="${text}"></a>`;
      };
      return marked(body, { renderer: rendererMD });
    },
    getTime: function (time) {
      Date.prototype.format = function (format) {
        /*
         * eg:format="YYYY-MM-dd hh:mm:ss";
         */
        var o = {
          "M+": this.getMonth() + 1, // month
          "d+": this.getDate(), // day
          "h+": this.getHours(), // hour
          "m+": this.getMinutes(), // minute
          "s+": this.getSeconds(), // second
          "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
          S: this.getMilliseconds(),
          // millisecond
        };
        if (/(y+)/.test(format)) {
          format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return format;
      };
      var tempTime = new Date(time);
      return tempTime.format("yyyy-MM-dd hh:mm:ss");
    },
  });
  // 对象方法
  Speak.prototype.extend({
    s: 1,
  });

  Speak.prototype.init.prototype = Speak.prototype;

  window.Speak = Speak;
})(window);
