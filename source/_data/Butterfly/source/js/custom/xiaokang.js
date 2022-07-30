$(document).ready(function () {
  var xiaokang = new xkTool(
    "https://ae01.alicdn.com/kf/H21b5f6b8496141a1979a33666e1074d9x.jpg",
    true
  );
  // var xiaokang = new xkTool("transparent");
  // var xiaokang = new xkTool();
  // 点击目录输出描点
  xiaokang.consoleAnchor();
  // 点击绿色按钮代码框放大
  xiaokang.codeFull();
  // 手机侧边栏默认不展开
  // xiaokang.mobileSidebar();
  // Cookie背景
  xiaokang.bgPage();
  // 插入svg社交图标
  // xiaokang.appendSocial({
  //   "icon-weizhi": "https://baidu.com",
  //   "icon-gouwu": "https://baidu.com",
  //   "icon-huiyuan": "https://baidu.com",
  //   "icon-youxi": "https://baidu.com",
  // });
  // 欺诈标题
  // xiaokang.cheatTitle();
  // banner小圆圈
  xiaokang.magicCirle();
  // 设置随机背景
  // xiaokang.imgList = [
  //   "https://cdn.jsdelivr.net/gh/yunwanjia-cloud/banner/25-min.jpg",
  //   "https://cdn.jsdelivr.net/gh/yunwanjia-cloud/banner/23-min.jpg",
  //   "https://cdn.jsdelivr.net/gh/yunwanjia-cloud/banner/24-min.jpg",
  //   "https://cdn.jsdelivr.net/gh/yunwanjia-cloud/banner/2-min.jpg",
  //   "https://cdn.jsdelivr.net/gh/yunwanjia-cloud/banner/27-min.jpg",
  // ];
  xiaokang.randomBg(
    "https://cdn.jsdelivr.net/gh/yunwanjia-cloud/banner/", // 前半部分网址
    "-min.jpg", // 后半部分网址
    0, // 随机数开始范围
    10 // 随机数结束范围
    // true // 是否开启滤镜 默认不开启
  );
  xiaokang.aplayer({
    audio: [
      {
        name: "SB",
        artist: "SB",
        url: "http://music.163.com/song/media/outer/url?id=574566207.mp3",
        cover: "SB",
      },
    ],
    fixed: true,
    mini: true,
  });
  // xiaokang.meting("2802022828", "netease", "playlist");

  // 调用养鱼方法
  xiaokang.footFish();
});
