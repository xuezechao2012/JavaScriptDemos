var $ = {};

/**
 * insertAfter 把 newEle 插入到 oldEle 的后面
 * newEle 新元素
 * oldEle 旧元素
 */
$.insertAfter = function(oldEle, newEle) {
    // 对应 inserBefore
    // 逻辑就是：判断oldEle有没有相邻的兄弟节点，如果有就把newEle插入到nextSibling节点的前面；如果没有，直接让oldEle的父节点把newEle添加到里面，作为最后一个子节点
    if (oldEle && oldEle.nodeType === 1 && newEle && newEle.nodeType === 1) {
        oldEle.nextSibling ? oldEle.parentNode.insertBefore(newEle, oldEle.nextSibling) : oldEle.parentNode.appendChild(newEle);
    } else {
        throw new Error('参数错误');
    }
}

/**
 * prependChild 把newEleNode当成第一个节点，添加到parentEle元素中
 * newEleNode 新节点
 * parentEle 父元素
 */
$.prependChild = function(newEleNode, parentEle) {
    // 对应 appendChild
    var firstChild = parentEle.firstChild;
    firstChild ? parentEle.insertBefore(newEleNode, firstChild) : parentEle.appendChild(newEleNode);
}

/**
 * previousSiblings 获取 currentEle 相同节点树前面所有的兄弟节点
 * currentEle 指定的节点
 */
$.previousSiblings = function(currentEle) {
    var pre = currentEle.previousSibling;
    var allPres = [];
    while (pre) {
        if (pre.nodeType === 1) {
            allPres.unshift(pre);
        }
        pre = pre.previousSibling;
    }
    return allPres;
}

/**
 * nextSiblings 获取 currentEle 相同节点树后面所有的兄弟节点
 * currentEle 指定的节点
 */
$.nextSiblings = function(currentEle) {
    var next = currentEle.nextSibling;
    var allNexts = [];
    while (next) {
        if (next.nodeType === 1) {
            allNexts.push(next);
        }
        next = next.nextSibling;
    }
    return allNexts;
}

/**
 * siblings 获取当前元素currentEle所有的兄弟节点
 * currentEle 当前元素
 */
$.siblings = function(currentEle) {
    var preNodes = [],
        nextNodes = [];
    var _ele = currentEle.previousSibling;
    while (_ele) {
        if (_ele.nodeType === 1) {
            preNodes.unshift(_ele);
        }
        _ele = _ele.previousSibling;
    }
    var _nextEle = currentEle.nextSibling;
    while (_nextEle) {
        if (_nextEle.nodeType === 1) {
            nextNodes.push(_nextEle);
        }
        _nextEle = _nextEle.nextSibling;
    }
    return preNodes.concat(nextNodes);
}

/**
 * preEle 获取currentEle的上一个元素节点
 * currentEle 当前元素
 */
$.preEle = function(currentEle) {
    var pre = currentEle.previousSibling;
    while (pre) {
        if (pre.nodeType === 1) {
            return pre;
        }
        pre = pre.previousSibling;
    }
    return null; // 找不到就返回 null
}

/**
 * nextELe 获取currentEle的下一个元素节点
 * currentEle 当前元素
 */
$.nextEle = function(currentEle) {
    var next = currentEle.nextSibling;
    while (next) {
        if (next.nodeType === 1) {
            return next;
        }
        next = next.nextSibling;
    }
    return null; // 找不到返回 null
}

/**
 * isFirstChild 判断是否为第一个子节点
 * currentEle 当前元素
 */
$.isFirstChild = function(currentEle) {
    return $.preEle(currentEle) ? false : true;
}

/**
 * isLastChild 判断是否为最后一个子节点
 * currentEle 当前元素
 */
$.isLastChild = function(currentEle) {
    return $.nextEle(currentEle) ? false : true;
}

/**
 * getChildByTag 获取ele元素中标签名为tag的子元素，tag参数不传的话，则表示获取所有ele元素中的子元素
 * ele 指定元素
 * tag 指定标签
 */
$.getChildByTag = function(ele, tag) {
    var children = ele.childNodes; // 返回元素子节点的nodeList
    if (typeof tag === 'string') {
        tag = tag.toUpperCase(); // 将节点名转为大写
        var targetArr = [];
        for (var index = 0; index < children.length; index++) {
            var element = children[index];
            if (element.nodeType === 1 && element.nodeName === tag) { // 满足节点类型为1，且节点名为tag的值
                targetArr.push(element);
            }
        }
        return targetArr; // 返回指定tag的元素集合
    } else if (typeof tag === 'undefined') {
        var allNodes = [];
        for (var index = 0; index < children.length; index++) {
            var element = children[index];
            if (element.nodeType === 1) {
                allNodes.push(element);
            }
        }
        return allNodes; // 返回所有子节点
    } else {
        throw new Error('参数类型错误！');
    }
}

/**
 * getIndex 获取元素ele的索引号, 索引从 0 开始
 * currentEle 当前元素
 */
$.getIndex = function(currentEle) {
    var index = 0;
    var pre = currentEle.previousSibling;
    while (pre) {
        if (pre.nodeType === 1) {
            index++;
        }
        pre = pre.previousSibling;
    }
    return index;
}

/**
 * addClass 给currentEle增加类
 * currentEle 当前元素
 * cls 要添加的类
 */
$.addClass = function(currentEle, cls) {
    if (!(currentEle && currentEle.nodeType === 1)) {
        throw new Error('第一个参数应该为DOM元素对象');
    }
    if (typeof cls !== 'string') {
        throw new Error('第二个参数有误，需为string类型');
    }
    var reg = new RegExp("\\b" + cls + "\\b");
    if (!reg.test(currentEle.className)) { // 如果不存在cls类，则添加
        currentEle.className += ' ' + cls;
    }
}

/**
 * removeClass 给 currentEle 删除指定类
 * currentEle 当前元素
 * cls 要删除的类
 */
$.removeClass = function(currentEle, cls) {
    if (!(currentEle && currentEle.nodeType === 1)) {
        throw new Error('第一个参数应该为DOM元素对象');
    }
    if (typeof cls !== 'string') {
        throw new Error('第二个参数有误，需为string类型');
    }
    var reg = new RegExp("\\b" + cls + "\\b");
    if (reg.test(currentEle.className)) { // 如果不存在cls类，则添加
        currentEle.className = currentEle.className.replace(reg, '');
    }
}

/**
 * hasClass 判断元素上是否有某个类
 * currentEle 当前元素
 * cls 类名
 */
$.hasClass = function(currentEle, cls) {
    if (!(currentEle && currentEle.nodeType === 1)) {
        throw new Error('第一个参数应该为DOM元素对象');
    }
    if (typeof cls !== 'string') {
        throw new Error('第二个参数有误，需为string类型');
    }
    var reg = new RegExp("\\b" + cls + "\\b");
    return reg.test(currentEle.className);
}

/**
 * getElementsByClass 根据类名获取元素
 */
$.getElementsByClass = function(parentEle, cls) {
    if (parentEle.getElementsByClass) {
        return parentEle.getElementsByClass(cls);
    } else {
        var arr = [];
        var reg = new RegExp('\\b' + cls + '\\b');
        var allEles = parentEle.getElementsByTagName('*');
        for (var index = 0; index < allEles.length; index++) {
            var element = allEles[index];
            if (reg.test(element.className)) {
                arr.push(element);
            }
        }
        return arr;
    }
}

/**
 * getCSS 获取CSS属性的值
 */
$.getCss = function(ele, attr) {
    if (ele && ele.nodeType && ele.nodeType === 1 && attr && typeof attr === 'string') {
        return ele.currentStyle[attr] || getComputedStyle(ele, false)[attr];
    } else {
        throw new Error('参数错误！');
    }
}