# jquery.my-select
一个简单的基于jquery的select插件

#### 效果预览：

<img src="http://opok8iwaa.bkt.clouddn.com/image/github/jquery.my-selectjquery.my-select.png" style="width:600px;">

#### html

```html
<div>
	单选：
	<select class="select" name="a">
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3" selected="selected">3</option>
	</select>
	多选的：
	<select class="select" name="aa" multiple="multiple">
		<option value="">4</option>
		<option value="5" selected="selected">5</option>
		<option value="6">6</option>
	</select>
	disable：
	<select class="select" name="aaa" disabled="disabled">
		<option value="">7</option>
		<option value="8">8</option>
		<option value="9" selected="selected">9</option>
	</select>
	<br />
	<br />
	<button id="btn">Change</button>
</div>
```

#### javascript

```html
<script type="text/javascript" src="jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="js/jquery.my-select.min.js"></script>
<script>
 		//$('.select').MySelect();
		$('.select').MySelect({
				afterSelect: function(val) {//点击后的回调函数
				//console.log('afterSelect:' + val)
			}
		});
		$('#btn').click(function() {
			$('.select').not(':disabled').val('').change();//修改select的值
		});
</script>
```

