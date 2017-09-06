(function() {
    var NavigateBar = function(elementId) {
        this.eId = elementId || 'wrap'; // 防止未传递参数造成错误
        this.el = document.getElementById(this.eId);
        this.el.addEventListener('click', function(e) {
            var e = e || window.event;
            e.stopPropagation();
        })
        this.state = 'allClosed'; // 关闭状态
        this.currentOpenedEl = null; // 当前打开的标签

        var forEach = Array.prototype.forEach;
        var self = this;
        var navigatorList = document.querySelectorAll('#' + this.eId + ' > div'); // 获取所有的标签按钮
        forEach.call(navigatorList, function(navigator) {
            navigator.addEventListener('click', function(e) {
                var e = e || window.event;
                var currentEl = document.getElementById(e.currentTarget.id + '-content');
                if (self.state === 'allClosed') { // 如果当前所有的内容都是隐藏状态下
                    currentEl.className = 'nav-content';
                    currentEl.style.top = '0px';
                    currentEl.style.left = '-85px';
                    currentEl.classList.add('nc_move_right'); // 不存在已打开的元素，则打开方式为从左往右
                    self.state = 'hasOpended'; // 内容被展开
                    self.currentOpenedEl = currentEl; // 保存当前展开的元素
                } else {
                    self.currentOpenedEl.className = 'nav-content';
                    self.currentOpenedEl.style.top = '0px';
                    self.currentOpenedEl.style.left = '35px';
                    self.currentOpenedEl.classList.add('nc_move_left'); // 先把之前打开的内容给关闭

                    currentEl.className = 'nav-content';
                    currentEl.style.top = '250px';
                    currentEl.style.left = '35px';
                    currentEl.classList.add('move_up'); // 如果存在已打开的内容，则新内容打开的方式是从下往上
                    self.currentOpenedEl = currentEl;
                }
            });
        });

        // 关闭按钮,内容部分右上角的关闭按钮
        var navConCloseBarList = document.querySelectorAll('.nav-content > div.nav-con-close');
        forEach.call(navConCloseBarList, function(navConCloseBar) {
            navConCloseBar.addEventListener('click', function(e) {
                var e = e || window.event;
                var currentEl = e.currentTarget.parentNode;
                currentEl.className = 'nav-content';
                currentEl.style.top = '0px';
                currentEl.style.left = '35px';
                currentEl.classList.add('nc_move_left');
                self.state = 'allClosed';
            });
        });
    };

    // 增加一个关闭事件
    NavigateBar.prototype.close = function() {
        this.currentOpenedEl.className = 'nav-content';
        this.currentOpenedEl.style.top = '0px';
        this.currentOpenedEl.style.left = '35px';
        this.currentOpenedEl.classList.add('nc_move_left');
        this.state = 'allClosed';
    }

    var navigateBar = new NavigateBar();

    var SideBar = function(elementId) {
        this.eId = elementId || 'sidebar';
        this.el = document.getElementById(this.eId);
        this.closeBarEl = document.getElementById('closeBar');
        this.state = 'opened';
        var self = this;
        this.el.addEventListener('click', function(e) {
            if (e.target !== self.el) {
                self.triggerSwitch();
            }
        });
    }

    SideBar.prototype.triggerSwitch = function() { // 增加切换关闭打开按钮的方法
        if (this.state === 'opened') {
            this.close();
        } else if (this.state === 'closed') {
            this.open();
        }
    }

    SideBar.prototype.close = function() { // 关闭
        navigateBar.close();
        this.el.style.left = '0px';
        this.el.className = 'move_left';
        this.closeBarEl.style.left = '0px';
        this.closeBarEl.className = 'closeBar_move_right';
        this.state = 'closed';
    }

    SideBar.prototype.open = function() { // 打开
        this.el.style.left = '-120px';
        this.el.className = 'move_right';
        this.closeBarEl.style.left = '160px';
        this.closeBarEl.className = 'closeBar_move_left';
        this.state = 'opened';
    };
    var sideBar = new SideBar();

})();