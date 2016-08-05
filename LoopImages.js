import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  TimerMixin,
} from 'react-timer-mixin';

export default class LoopImages extends Component {

  constructor(props) {
    super(props);
    this.state = {
      indicatorPage: 0, // 传到Indicator里的page值
    };
  }

  static defaultProps = {
    dragScrollView: false,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    isNativePhoto: false,
    selectedIndicatorColor: 'black',
    normalIndicatorColor: 'white',
    delay: 3000,
    onPress: (data)=>{},
  };

  componentDidMount() {
    let page = 1; // 初始的page值，用来指定默认显示的第几页
    this.initTimer(page);
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearInterval(this.timer);
  }

  render() {
    const {photos} = this.props;
    var images = [];
    var indicatiors = [];
    images.push(this.renderImage(i, photos[photos.length - 1]));
    for (var i = 0; i < photos.length; i++) {
      let photo = photos[i];
      images.push(this.renderImage(i, photo));
      indicatiors.push(this.renderIndicator(i));
    }
    images.push(this.renderImage(i, photos[0]));

    return (
      <View style = {[styles.containerStyle, {width: this.props.width, height: this.props.height}]}>
        <ScrollView ref = { (ref) => {this.scrollView = ref;} } horizontal = {true}
        containerStyle = {{width: this.props.width, height: this.props.height}} pagingEnabled = {true}
        onMomentumScrollEnd = {this.scrollEnd.bind(this)}
        onScrollBeginDrag = {this.onScrollBeginDrag.bind(this)}
        contentOffset = {{x: this.props.width, y: 0}}
        showsHorizontalScrollIndicator = {false}>
          {images}
        </ScrollView>
        <View style = {[styles.indicatorContainerStyle, {width: this.props.width}]}>
          {indicatiors}
        </View>
      </View>
    );
  }

  renderImage(key, photo) {
    let image = this.props.isNativePhoto ? photo : {uri: photo};
    return (
      <View key = {'image_' + key}>
        <TouchableOpacity onPress = {this.onClick.bind(this, photo)} activeOpacity = {1}>
          <Image source = {image} style = {{width: this.props.width, height: this.props.height}}/>
        </TouchableOpacity>
      </View>
    );
  }

  onClick(data) {
    this.props.onPress(data);
  }

  renderIndicator(key) {
    let backColor = key === this.state.indicatorPage ? this.props.selectedIndicatorColor : this.props.normalIndicatorColor;
    return (
      <View style = {[styles.indicatorStyle, {backgroundColor: backColor}]} key = {'indicator_' + key}></View>
    );
  }

  onScrollBeginDrag(e) {
    this.dragScrollView = true;
    this.timer && clearInterval(this.timer);
  }

  scrollEnd(e) {

    let contentOffX = e.nativeEvent.contentOffset.x;
    let currentPage = parseInt(contentOffX / this.props.width);

    if (currentPage === (this.props.photos.length + 1)) {
      this.scrollView.scrollTo({x: this.props.width, y: 0, animated: false});
      currentPage = 1;
    } else if (currentPage === 0) {
      this.scrollView.scrollTo({x: this.props.photos.length * this.props.width, y: 0, animated: false});
      currentPage = this.props.photos.length;
    }
    this.setState({
      indicatorPage: (currentPage - 1),
    });

    let page = currentPage;
    if (page > this.props.photos.length + 1) {
      page = 1;
    }

    if (this.dragScrollView === true) {
      this.timer && clearInterval(this.timer);
      this.initTimer(page);
    }
    this.dragScrollView = false;
  }

  initTimer(page) {
    this.timer = setInterval(
      () => {
        this.scrollToPage(page);
        page ++;

        if (page > this.props.photos.length + 1) {
          page = 2;
        }
      },
      this.props.delay
    );
  }

  scrollToPage(page) {
    this.scrollView.scrollTo({x: page * this.props.width, y: 0, animated: true});
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    position: 'relative',
  },
  indicatorContainerStyle: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 2,
  },
});
