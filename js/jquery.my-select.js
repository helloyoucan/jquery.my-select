/**
 * author:wucanlong
 * update:2017/11/08
 * Github:https://github.com/helloyoucan
 * */
;
(function($) {
	function MySelect(el, opts) {
		this.$el = $(el);
		this.opts = $.extend({}, MySelect.OPTION, opts);
		this._parseData();
		this._addStyle();
		this._addDom();
		var  $this  =  this;    
	}
	MySelect.OPTION = {
		data: [],
		afterSelect: function(val) {},
		$my_selects: {}
	};
	MySelect.prototype._parseData = function() {
		//获取数据
		var that = this;
		that.opts.val = that.$el.val();
		if(that.$el.attr('multiple') != null) {
			that.opts.isMultiple = true;
		}
		if(that.$el.attr('disabled') != null) {
			that.opts.isDisabled = true;
		}
		that.opts.data = [];
		that.$el.children().each(function(index) {
			that.opts.data.push({
				val: $(this).val(),
				text: $(this).text()
			});
			if($(this).attr('selected') == "selected") {
				that.opts.data[index].class = "active"
			}
		});
	}
	MySelect.prototype._addStyle = function() {
		//添加css
		var styleStr = '<style>' +
			'.my-select {display: inline-block;border-left: 1px solid #e1e3e4;border-right: 1px solid #e1e3e4;border-radius: 2px;font-family: "microsoft yahei";font-size: 0;}' +
			'.my-select>a {display: inline-block;font-size: 14px;line-height: 2;padding: 0 10px;color: #323437;border-top: 1px solid #e1e3e4;border-bottom: 1px solid #e1e3e4;background-color: #fff;text-decoration: none}' +
			'.my-select>a:hover {background-color: #f3f4f4}' +
			'.my-select.disabled a {background-color: #eee;cursor: not-allowed;}' +
			'.my-select>a.active {background-color: #4da7fd;border-color: #4aa6fc;color: #fff}' +
			'</style>';
		$('head').eq(0).append(styleStr);
		this.$el.css({
			visibility: 'hidden',
			width: 0,
			height: 0,
		});
	}
	MySelect.prototype._addDom = function() {
		/*添加Dom*/
		$my_select = $('<div class="my-select"></div>');
		if(this.opts.isDisabled) {
			$my_select.addClass('disabled');
		}
		var domStr = '';
		this.opts.data.forEach(function(item, index) {
			domStr += '<a ';
			for(it in item) {
				domStr += 'data-' + it + '="' + item[it] + '" ';
			}
			if(item.href == undefined) {
				domStr += 'href="javascript:;"';
			}
			domStr += '>' + item.text + '</a>';
		});
		domStr = domStr.replace(/data-class/g, 'class');
		this.opts.$my_selects = $my_select;
		$my_select.append(domStr);
		this.$el.after($my_select);
		this._addEvent($my_select);
	}
	/*添加事件*/
	MySelect.prototype._addEvent = function($my_select) {
		var that = this;
		$my_select.on('click', 'a', function() {
			/*if(!that.opts.isDisabled) {*/
			if(!that.opts.isMultiple) {
				//单选
				$my_select.children('a.active').removeClass('active')
				$(this).addClass('active');
				var val = $(this).attr('data-val');
				that.$el.val(val);
				//钩子函数,返回val
				that.opts.afterSelect(val);
			} else {
				//多选
				$(this).toggleClass('active');
				var vals = [];
				var $a_s = $my_select.children('a.active');
				$a_s.each(function() {
					vals.push($(this).attr('data-val'));
				});
				that.$el.val(vals);
				//钩子函数,返回val
				that.opts.afterSelect(vals);
			}

			/*}*/

		});

		/*		监听select是否有变化,(select通过.val()方法改变值后,要手动用.change()触发,才能监听到select改变从而使插件的状态改变)*/
		this.$el.on('change', function() {
			that._setVal($(this).val());
		})
	}
	/*设置值*/
	MySelect.prototype._setVal = function(val) {
		var that = this;
		if(!that.opts.isDisabled) {
			this.opts.$my_selects.children('a.active').removeClass('active');
			if(typeof val == "object" && val instanceof Array) { //多选的状态
				val.forEach(function(v) {
					that.opts.$my_selects.children('a[data-val="' + v + '"]').addClass('active');
				});
			} else {
				var $a = this.opts.$my_selects.children('a[data-val="' + val + '"]');
				if($a.length > 0) {
					$a.addClass('active');
				}

			}

		}

	}

	/*弄成jquery插件*/
	$.fn.extend({
		MySelect: function(opts) {
			return this.each(function() {
				new MySelect(this, opts);
			});
		}
	});

})(jQuery);