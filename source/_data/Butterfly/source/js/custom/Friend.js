(function (window, undefiend) {
  var Friend = function (obj) {
    // 传入一个对象
    return new Friend.prototype.init(obj);
  };
  Friend.prototype = {
    constructor: Friend,
    // 版本
    version: "2020-08-17 16:52:00",
    // ID
    owner: "antmoe",
    // 仓库
    repo: "friend",
    // 排序规则 desc or asc
    direction_sort: "desc",
    // 当前页面
    page: 1,
    // 每次加载的用户
    per_page: 100,
    // 容器
    el: "",
    // 根据标签排序
    sort_container: [],
    text: [],
    // 标签描述
    labelDescr: {},
    init: function (obj) {
      for (let i in obj) {
        this[i] = obj[i];
      }
      console.log(
        "\n %c XiaoKang's FriendTools" +
          this.version +
          " %c https://docs.tzki.cn/Friend \n",
        "color: #fff; background: #4285f4; padding:5px 0;",
        "background: #66CCFF; padding:5px 0;"
      );
      Friend.setHead(this);
      Friend.getPageFriend(this);
      return this;
    },
  };
  Friend.extend = Friend.prototype.extend = function (obj) {
    for (var key in obj) {
      this[key] = obj[key];
    }
  };
  // 插入元素方法
  Friend.extend({
    // 设置头部
    setHead: function (_this) {
      Friend.loadingCss();
    },
    // loading的CSS
    loadingCss: function () {
      $("head").append(
        "<style>.loader{width:150px;height:150px;margin:0 auto}svg{width:90%;fill:none}.load{transform-origin:50% 50%;stroke-dasharray:570;stroke-width:20px}.load.one{stroke:#554d73;animation:load 1.5s infinite}.load.two{stroke:#a496a4;animation:load 1.5s infinite;animation-delay:.1s}.load.three{stroke:#a5a7bb;animation:load 1.5s infinite;animation-delay:.2s}.point{animation:bounce 1s infinite ease-in-out}.point.one{fill:#a5a7bb;animation-delay:0s}.point.two{fill:#a496a4;animation-delay:.1s}.point.three{fill:#554d73;animation-delay:.2s}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes load{0%{stroke-dashoffset:570}50%{stroke-dashoffset:530}100%{stroke-dashoffset:570;transform:rotate(360deg)}}</style>"
      );
    },
    // loading的DOM树
    loading: function (_this) {
      $(`${_this.el}`).html(
        `<div class="loader"><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle class="load one" cx="60" cy="60" r="40"></circle><circle class="load two" cx="60" cy="60" r="40"></circle><circle class="load three" cx="60" cy="60" r="40"></circle><g><circle class="point one" cx="45" cy="70" r="5"></circle><circle class="point two" cx="60" cy="70" r="5"></circle><circle class="point three" cx="75" cy="70" r="5"></circle></g></svg></div>`
      );
    },
    // 创建需要置顶的标签容器
    createContainer: function (_this) {
      for (var i in _this.sort_container) {
        $(`${_this.el}`).append(
          `<h2 id=${_this.sort_container[i]}>${_this.sort_container[i]}</h2><div class="flink-desc"><h4>${_this.sort_container[i]}</h4></div><div class="flink-list">` +
            `</div>`
        );
      }
    },
  });
  Friend.extend({
    // 创建朋友
    createFriend: function (_this) {
      let content = "";
      var text = _this.text;
      $(".loader").hide();
      Friend.createContainer(_this);
      for (let i in text) {
        if (text[i].labels) {
          content = text[i].body;
          if ($("#" + text[i].labels).length) {
            $(`#${text[i].labels}`).next().next().append(content);
          } else {
            $(_this.el).append(
              `<h2 id=${text[i].labels}>${
                text[i].labels
              }</h2><div class="flink-desc">${Friend.getLabelDescr(
                _this,
                text[i].labels
              )}</div><div class="flink-list">` +
                content +
                `</div>`
            );
          }
        }
      }
    },
    getPageFriend: function (_this) {
      Friend.loading(_this);
      Friend.getFriends(_this).then(() => Friend.createFriend(_this));
    },
  });
  // 获取数据
  Friend.extend({
    /**
     * 获取issue
     * @date 2020-08-10
     * @returns {Promise}
     */
    getFriends: function (_this) {
      return $.ajax({
        url: `https://gitee.com/api/v5/repos/${_this.owner}/${_this.repo}/issues?state=open&sort=created&direction=${_this.direction_sort}&page=${_this.page}&per_page=${_this.per_page}`,
        type: "get",
        success: function (date, textStatus, request) {
          _this.text = [];
          if (date) {
            for (let i in date) {
              var temp = {};
              temp.body = Friend.getBody(_this, date[i]["body"]);
              temp.labels = Friend.getLabels(date[i]["labels"]);
              _this.text.push(temp);
            }
          } else {
            return;
          }
        },
      });
    },
  });
  // 数据处理
  Friend.extend({
    getBody: function (_this, body) {
      let url = Friend.getInfo(_this, body, "link");
      let name = Friend.getInfo(_this, body, "name");
      let avatar = Friend.getInfo(_this, body, "avatar");
      let description = Friend.getInfo(_this, body, "descr");
      return `<div class="flink-list-item" style="${Friend.getCustom(
        _this,
        body
      )}"><a href="${url}" title="${name}" target="_blank"><img class="rauto" style="animation:${Friend.getImgCustom(
        _this,
        body
      )}" data-lazy-src="${avatar}" onerror="this.onerror=null,this.src=&quot;https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile1/imgbed/2020/03/21/20200321213747.gif&quot;" alt="${name}" src="${avatar}"><span class="flink-item-name">${name}</span><span class="flink-item-desc" title="${description}">${description}</span></a></div>`;
    },
    getLabels: function (labels) {
      if (labels.length) {
        return labels[0].name;
      }
    },
  });
  // 处理获取到的数据
  Friend.extend({
    // getUrl: function (body) {
    //   let url = "URL好像写的不对哦！";
    //   body = body.match(/link:[^\n]*\n/);
    //   if (body && body.length > 0) {
    //     url = body[0].replace(/(link: [\s]*|[\r\n]*)/g, "");
    //   }
    //   return url;
    // },
    // 获得标签的描述
    getLabelDescr: function (_this, label) {
      let desc = "";
      if (_this.labelDescr[label]) {
        desc = _this.labelDescr[label];
      }
      return desc;
    },
    // 正则匹配issue的字段
    getInfo: function (_this, body, regs) {
      const reg = new RegExp(String.raw`${regs}:[^\n]*\n`);
      const repReg = new RegExp(String.raw`(${regs}:[\s]*|[\r\n]*)`, "g");
      let info = "你写的好像不对哦！";
      body = body.match(reg);
      if (body && body.length > 0) {
        info = body[0].replace(repReg, "");
      }
      return info;
    },
    getCustom: function (_this, body) {
      // animation:link_custom 0s infinite alternate;background:0
      // 主颜色（边框及鼠标悬停的背景颜色）、边框大小、边框样式（solid）、动画效果（link_custom、borderFlash）、背景颜色、鼠标悬停头像旋转角度
      const cssStyle = [
        "--primary-color",
        "border-width",
        "border-style",
        "animation",
        "background",
        "--primary-rotate",
      ];
      let style = "";
      for (var i in cssStyle) {
        var temp = Friend.getInfo(_this, body, cssStyle[i]);
        if (temp !== "你写的好像不对哦！") {
          style += `${cssStyle[i]}:${temp};`;
        }
      }
      return style;
    },
    getImgCustom: function (_this, body) {
      const cssStyle = ["img_animation"];
      let style = "";
      for (var i in cssStyle) {
        var temp = Friend.getInfo(_this, body, cssStyle[i]);
        if (temp !== "你写的好像不对哦！") {
          style += `${temp};`;
        }
      }
      return style;
    },
  });

  Friend.prototype.init.prototype = Friend.prototype;

  window.Friend = Friend;
})(window);
