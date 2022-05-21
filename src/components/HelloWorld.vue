<template>
  <div class="map-box">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import 'cesium/Source/Widgets/widgets.css'
import * as Cesium from 'cesium'

// import axios from 'axios'
import stopPoint from '../../public/points_data/stop_point'
// import wayPoint from '../../public/points_data/waypoint_flag'

export default {
  name: 'HelloWorld',
  props: {

  },
  data() {
    return{
      data:[]
    }
  },
  methods: {
    pointsData() {
      this.data = JSON.parse(JSON.stringify(stopPoint));
      console.log(this.data);
    }
  //   getData() {
  //     let script = document.createElement('script')
  //     script.src = '../../public/points_data/stop_point.json'
  //     document.body.appendChild(script)
  //     axios({ url: '../../public/points_data/stop_point.json', method: 'get' }).then(res => {
  //       this.data = []
  //       if (res.data.caseCenter) {
  //         console.log("success");
  //       }
  //     })
  //   }
  },
  mounted() {
    var viewer = new Cesium.Viewer("cesiumContainer", {
      animation: true,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: true,
      homeButton: false,
      sceneModePicker: true,
      selectionIndicator: false,
      timeline: true,
      navigationHelpButton: false,
      infoBox: true,
      navigationInstructionsInitiallyVisible: false,
      navigation: true
    });
    //谷歌影像
    viewer._cesiumWidget._creditContainer.style.display = "none";

    this.pointsData();

    var point_options = {
      show: true, //是否展示
      pixelSize: 5, //点的大小
      // heightReference:HeightReference.NONE,//相对高度
      color: Cesium.Color.RED, //颜色
      outlineColor: Cesium.Color.SKYBLUE, //边框颜色
      outlineWidth: 1, //边框宽度
      // scaleByDistance:new Cesium.NearFarScalar(100, 5, 10000, 15), //缩放距离设置
      // translucencyByDistance:new Cesium.NearFarScalar(100, 0.2, 10000, 0.8),//点的半透明设置
      // distanceDisplayCondition:new Cesium.DistanceDisplayCondition(1000, 10000),//点的显隐距离
      // disableDepthTestDistance:5000000,//禁用深度测试距离
    }

    var googleImagery = new Cesium.UrlTemplateImageryProvider({
      url:
        "http://mt{s}.google.cn/vt/lyrs=s&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}",
      subdomains: "0123",
    });

    viewer.imageryLayers.addImageryProvider(googleImagery);

    for(var i = 0; i < 765; i++) {
      // console.log(this.data[i]["lat"]);
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(this.data[i]["lon"], this.data[i]["lat"]),
        point: point_options
      });
    }

    // viewer.entities.add({
    //   position: Cesium.Cartesian3.fromDegrees(113.27, 23.13),
    //   point: point_options
    // });

    viewer.entities.add({
      name: "线几何对象",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            112.82436,
            23.071506,
            112.82742,
            23.067512,
            112.828878,
            23.064659,
            112.830799,
            23.060947,
            112.832166,
            24.058329
        ]),
        width: 2,
        material: Cesium.Color.YELLOW
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-box {
  width: 100%;
  height: 100%;
}

#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
