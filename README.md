# eQuery
模拟jQuery写的一个js类库

### 类库api介绍

1、事件绑定：

``` js
eQuery('button').on('click', function(){
    alert(‘我是eQuery’)
})
```

2、获取css属性以及设置css属性

``` js
// 获取css
eQuery('#div').css('color')
// 设置css
eQuery('#div').css('width', '100px')
// 设置多个css
eQuery('#div').css({
    color: 'red',
    background: '#eee'
})
```

3、获取和设置attr属性

``` js
// 访问attr
eQuery('#demo').attr('title')
// 设置attr
eQuery('#demo').attr('title', '关于我们')
// 设置attrs
eQuery('#demo').attr({
    title: '关于我们',
    name: 'goldprog'
})
```

4、获取和设置html

``` js
// 访问
eQuery('#demo').html()
// 设置
eQuery('#demo').html('前端学习原生框架')
```
