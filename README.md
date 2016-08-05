## Loop-Images


### Description

* Endless Loop Images
* Based on react-native
* Android has no test

### Demo

![](https://github.com/miss-yadi/loopImages/blob/master/loopImage.gif)


### Install

	$ npm install react-native-loop-image --save

### Properties

	photos: 要展示的图片，可以传本地图片或者网络图片，用isNativePhoto属性来控制
	width:	整个轮播图的宽度，默认为屏幕宽度
	height: 整个轮播图的高度，默认为屏幕高度
	isNativePhoto: true为本地图片，false为网络图片，默认为false
	selectedIndicatorColor: 当前页的页码颜色，默认black
	normalIndicatorColor: 其它页的页码颜色，默认white
	onPress: 点击轮播图执行的事件
	delay: 延迟事件，默认3000

### Usage

	render() {
	   let HEIGHT = Dimensions.get('window').width / 2;
	   let photos = [require('./image/image_01.png'),
	               require('./image/image_02.png'),
	               require('./image/image_03.png'),
	               require('./image/image_04.png')];
	   return (
	     <View>
	       <LoopImages photos = {photos}
	         height = {HEIGHT}
	         isNativePhoto = {true}
	         selectedIndicatorColor = {'#00F406'}
	         normalIndicatorColor = {'#FF00F3'}
	         delay = {1000}
	         onPress = {this.onPress.bind(this)}/>
	     </View>
	   );
	  }
	
	  onPress(data) {
	  	// do something you want do
	    console.log('----------------' + data);
	  }
