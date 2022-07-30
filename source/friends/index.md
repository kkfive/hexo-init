---
title: 友情链接
date: 2020-02-02 10:00:00
update: 2022-02-12 16:49:00
type: 'link'
top_img: https://tva1.sinaimg.cn/large/832afe33ly1gbi1rf2bppj21hc0jgwmw.jpg
aside: false
description: 快点和小康交朋友吧！
---

<link rel="stylesheet" href="https://cdn1.tianli0.top/npm/butterfly-friend@3.2.0/style.css">

<script src='https://cdn1.tianli0.top/npm/butterfly-friend@3.2.0/butterfly-friend.umd.js'></script>

<script>
    document.querySelector('.flink').insertAdjacentHTML('afterbegin',"<div id='friend1'></div>")
    xkFriend.init({
        el: '#friend1',
        api: [
            'https://kkfriend.vercel.app/index.json',
            'https://friend.kkfive.top/index.json'],
        loading_img: 'https://bu.dusays.com/2021/03/04/d2d5e983e2961.gif',
        fail_img:
        'https://file.acs.pw/picGo/2021/1/22/90331f043583fe472e59602f835cc28c.gif'
    })
</script>

## 申请友链格式

{% tabs tab-id %}

<!-- tab 申请友链 -->

1. 进入[my-friend](https://github.com/kkfive/my-friend)仓库，并且登陆账号
2. fork 此仓库，并写入你的友链信息
3. 将改动提交，等待管理员合并

> 1. 关于修改信息
>
>    修改友链重新进行 PR 即可，合并分支后将会更新您的信息
>
> 2. 关于清理友链
>
>    我会不定期访问你的友链，如果出现网站无法访问、404、友链入口难以发现、删除本站友链等情况我会直接将你的网站在此站上移除，如需再次添加友链，请重新申请。

<!-- endtab -->

<!-- tab 友链须知 -->

<div class="checkbox cyan checked"><input type="checkbox" checked><p>大佬可不受以下要求限制</p></div>
<div class="checkbox green checked"><input type="checkbox" checked><p>小站是 🍤学习 or 🍥博客站</p></div>

<div class="checkbox green checked"><input type="checkbox" checked><p>至少一篇原创，没有原创的内容📔📕📗📘📙📓的话很快就会死掉的呢  </p></div>

<div class="checkbox minus yellow checked"><input type="checkbox" checked><p>申请友联请务必能在你的友联处看到本站链接。</p></div>

<div class="checkbox minus yellow checked"><input type="checkbox" checked><p>网站要有维护，定期或不定期均可</p></div>

<div class="checkbox minus yellow checked"><input type="checkbox" checked><p>如果内容含有广告会酌情处理。</p></div>

<div class="checkbox times red checked"><input type="checkbox" checked><p>含有违反中国法律内容的一律不通过。</p></div>

<div class="checkbox times red checked"><input type="checkbox" checked><p>网站被QQ、微信标红(不包含非官方提示)的一律不通过。</p></div>

<div class="checkbox times red checked"><input type="checkbox" checked><p>3个月以上没有新文章、网站打不开、取消本站链接本站将直接移除你的链接。</p></div>

<div class="checkbox times red checked"><input type="checkbox" checked><p>新站请过段时间再来申请。</p></div>

<!-- endtab -->

<!-- tab 友链魔改 -->

友链魔改参考[butterfly-friend 食用文档](https://www.yuque.com/kdoc/bf/friend)

<!-- endtab -->

{% endtabs %}

<div class="note danger icon flat">
    <p>注意：添加友链请到<a href='https://github.com/kkfive/my-friend' target="_blank">friend</a>参照README文件进行添加。在此留言进行申请友链直接忽略！！！</p>
</div>

## 我的信息

```yaml
name: 小康博客
link: https://www.antmoe.com/
avatar: https://cdn.jsdelivr.net/npm/kang-static@latest/avatar.jpg
descr: 一个收藏回忆与分享技术的地方！
```
