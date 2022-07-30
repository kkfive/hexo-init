$(document).ready(function () {
  // window.t = [
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/9a5c988213ca9d8c151505b8ff1589d6.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/e8ebd9895a0669697b37b494edf257a9.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/44277deeb80a9a2e0c03cf66162fafd2.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/fdfd802cd4c1bc145ccaeed5e6646d1a.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/65f8f25626db5145382809a759ed1bf7.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/3f4980382968169c4c48c95523152811.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/fa770c6bfb309de98476fa7ccf406097.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/bb71da4d1b0c47f71a130ff93270e910.png",
  //   "https://cdn.jsdelivr.net/gh/blogimg/HexoStaticFile2@latest/2020/07/07/21a777cbd5905b2787ad6b82c86791ca.png",
  // ];
  var t2 = [];
  // https://cdn.jsdelivr.net/gh/blogimg/wallpaper/1.jpg
  for (var i = 1; i < 28; i++) {
    var url = "https://cdn.jsdelivr.net/gh/blogimg/wallpaper/" + i + ".jpg";
    t2.push(url);
  }
  window.t2 = t2;
  if (window.backstretch_start === undefined) {
    window.backstretch_start = Math.ceil(Math.random() * t2.length);
  }
  $("#web_bg").backstretch(window.t2, {
    duration: 1e4,
    alignY: 0,
    transition: "fade",
    transitionDuration: 1e3,
    start: window.backstretch_start,
    fade: 1500,
  });
  $(window).on("backstretch.after", function (e, instance, index) {
    window.backstretch_start = index;
  });
});
