<template>
  <!--<div>-->
    <!--<img :src="lajitong" alt="" style="width: 60px;height: 60px">-->
  <!--</div>-->
    <div id="mapBox"></div>
</template>

<script>
  import infoBox from '@/utils/InfoBox.min.js'
  import buleImg from '../../assets/image/1.png'
    export default {
        data () {
          return {
            buleImg: buleImg,
            infoWindowArr: []
          }
        },
      methods: {
        loadMap () {
          let thi = this
          var map = new BMap.Map("mapBox",{enableMapClick:false});
          var point = new BMap.Point(116.404, 39.915);
          map.centerAndZoom(point, 18);
          // 设置地图鼠标滚轮放大缩小
          map.enableScrollWheelZoom()
          let pointArr =[
            new BMap.Point(116.380919,39.895417),
            new BMap.Point(116.357348,39.894615),
            new BMap.Point(116.357707,39.885009),
            new BMap.Point(116.381853,39.886089)
          ]
          var polygon = new BMap.Polygon(pointArr, {strokeColor:"red", strokeWeight:3, strokeOpacity:0.5,fillColor: "#0000ff", fillOpacity:0.1});  //创建多边形
          map.addOverlay(polygon);
          let markArr = [
            {
              name: '垃圾桶2',
              type: 1,
              addressX: 116.370005,
              addressY: 39.890352
            },
            // {
            //   name: '垃圾桶3',
            //   type: 2,
            //   addressX: 116.363573,
            //   addressY: 39.889854
            // },
            {
              name: '垃圾桶7',
              type: 2,
              addressX: 116.363573,
              addressY: 39.889870
            },
            {
              name: '垃圾桶4',
              type: 2,
              addressX: 116.370939,
              addressY: 39.885701
            },
            {
              name: '垃圾桶5',
              type: 1,
              addressX: 116.360303,
              addressY: 39.887445
            },
            {
              name: '垃圾桶6',
              type: 2,
              addressX: 116.371586,
              addressY: 39.882629
            },

            {
              name: '垃圾桶1',
              type: 1,
              addressX: 116.373742,
              addressY: 39.893314
            },
          ]
          for (let i = 0; i < markArr.length; i++) {
            let s = {
              name: markArr[i].name,
              point: new BMap.Point(markArr[i].addressX,markArr[i].addressY)
            }
            let marker
            let myIcon = new BMap.Icon(thi.buleImg, new BMap.Size(38,38),{anchor: new BMap.Size(14, 25), infoWindowAnchor: new BMap.Size(18, -20)});
            if (markArr[i].name !== '垃圾桶7') {
               marker = new BMap.Marker(s.point,{icon:myIcon});
            }  else {
               marker = new BMap.Marker(s.point);
            }// 创建点
            map.addOverlay(marker)
            map.setViewport(pointArr)
            let sContent = '<div style="position: relative">' +
              "<div style='word-wrap:break-word;margin-top: 20px'>名称：&nbsp;" + s.name+ '</div>' +
              "<div style='height:25px;margin-top: 10px'>使用时间：&nbsp;2020-05-01"+ '</div>' +
              "<div style='height:25px;'>检修时间：&nbsp;2020-05-16"+ '</div>' +
              "<div style='height:25px;'>下次检修时间：&nbsp;2020-07-01"+ '</div>' +
              "<div style='line-height:30px;text-align: right;font-size: 14px;cursor:pointer;color: #82c225'><a id='checkBtn' javascript=':void(0)' style='color: #82c225'>详细信息</a></div>" +
              "<div style='position: absolute;bottom:-36px;left:0;right:0;margin-left: auto;margin-right: auto;width:0;height: 0;border-top:20px solid #00A47E;border-left:10px solid transparent;border-right:10px solid transparent'>" + '</div>' +
              '</div>'
            let opts = {
              boxStyle: {
                width: '300px',
                // height: '240px',
                background: '#00A47E',
                borderRadius: '8px',
                padding: '10px 20px 20px',
                color: '#fff',
                fontSize: '14px'
              },
              enableAutoPan: true,
              align: 1,
              closeIconMargin: '3px 10px',
              closeIconZIndex: 1,
              closeIconWidth: '15px'
            }
            let infoWindow =  new BMapLib.InfoBox(map, sContent,opts)
            // 得到所有的信息窗体
            thi.infoWindowArr.push(infoWindow)
            marker.addEventListener('mouseover',function () {
              marker.setTop(true)
              if (thi.lastInfoWindow) {
                // 判断上一个窗体是否存在，若存在则执行close
                thi.lastInfoWindow.close()
              }
              thi.lastInfoWindow = infoWindow
              infoWindow.open(marker)
            })
            marker.addEventListener('mouseout',function () {
              marker.setTop(false)
            })
            marker.addEventListener('click',function () {
              infoWindow.open(marker)
              // thi.$router.push({name: 'test',params:{type: 2}})
            })
          }
        },
      },
      mounted:function () {
        this.loadMap()
      }
    }
</script>

<style scoped>
#mapBox{
  width: 100%;
  height: 100%;
}
</style>
