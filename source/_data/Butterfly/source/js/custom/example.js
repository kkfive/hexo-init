function loadVersion(version) {
  $("div.examples").append('<div class="group ' + version + '"></div>');
  $("div.examples .group." + version).append(
    '<div class="loading"><i class="fa fa-cog fa-2x fa-spin"></i></div></div>'
  );

  $.get(
    "https://api.github.com/repos/volantis-x/examples/issues?sort=updated&state=open&page=1&per_page=100&labels=active," +
      version,
    function (data, status) {
      if (data.length > 0) {
        $("div.examples .group." + version).append(
          '<div class="btns circle grid5"></div>'
        );
        for (i = 0; i < data.length; i++) {
          // find label name
          if ($("div.examples .group." + version + " h2").length == 0) {
            for (j = 0; j < data[i].labels.length; j++) {
              if (data[i].labels[j].name == version) {
                $("div.examples .group." + version + " .btns").before(
                  "<h2>" + data[i].labels[j].description + "</h2>"
                );
                break;
              }
            }
          }

          // get name
          let name = data[i].body.match(/name:[^\n]*\n/);
          if (name && name.length > 0) {
            name = name[0].replace(/(name:[\s]*|[\r\n]*)/g, "");
          }

          // get avatar
          let avatar = data[i].body.match(/avatar:[^\n]*\n/);
          if (avatar && avatar.length > 0) {
            avatar = avatar[0].replace(/(avatar:[\s]*|[\r\n]*)/g, "");
          }

          // get tags
          let tags = data[i].body.match(/tags:[^\n]*\n/);
          if (tags && tags.length > 0) {
            tags = tags[0].replace(/(tags:[\s]*|[\r\n]*)/g, "");
            tags = tags.replace(/(\[|\])*/g, "").replace(/,\ */g, ",");
            tags = tags.split(",");
            tags = "#" + tags.join(" #");
          }

          // get desc
          let desc = data[i].body.match(/desc:[^\n]*\n/);
          if (desc && desc.length > 0) {
            desc = desc[0].replace(/(desc:[\s]*|[\r\n]*)/g, "");
            desc = 'title = "' + desc + '"';
          } else {
            desc = "";
          }

          let imgTag = "";
          if (avatar.length > 0) {
            imgTag = '<img no-lazy src="' + avatar + '">';
          } else {
            imgTag =
              '<img src="https://cdn.jsdelivr.net/gh/volantis-x/cdn-org/placeholder/c617bfd2497fcea598e621413e315c368f8d8e.svg" data-original="https://cdn.jsdelivr.net/gh/xaoxuu/cdn-assets/placeholder/c617bfd2497fcea598e621413e315c368f8d8e.svg">';
          }
          let tagsTag = "<p>" + tags + "</p>";
          let aTag =
            '<a class="button" target="_blank"' +
            desc +
            'href="' +
            data[i].title +
            '">' +
            imgTag +
            name +
            tagsTag +
            "</a>";
          $("div.examples .group." + version + " .btns").append(aTag);
        }
      }
      $("div.examples .group." + version + " .loading").remove();
    }
  );
}
function loadExamples() {
  loadVersion("latest");
  loadVersion("v2");
  //loadVersion('v1');
}
document.addEventListener("DOMContentLoaded", function () {
  loadExamples();
});
loadExamples();
