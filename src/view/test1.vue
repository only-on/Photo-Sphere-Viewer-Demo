<template>
  <div id="content">
    <div id="example">
    </div>
    <div class="leftSlider">
      <!--垃圾桶3<span @click="isShow"> 11111111<br><img src="../assets/image/test.jpg" style="width: 30px;height: 30px"></span>-->
      <div @click="add">添加标记</div>
      <div @click="toggle">切换标记(HTML marker)</div>
      <div @click="removeAll">移除所有标记</div>
    </div>
  </div>
</template>

<script>
  // photo-sphere-viewer版本3.6.0   https://photo-sphere-viewer-3.netlify.app
  import PhotoSphereViewer from 'photo-sphere-viewer'
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
  import img from '@/assets/image/1.jpg'
  import img1 from '@/assets/image/2.jpg'
  import markImg from '@/assets/image/1.png'
  export default {
    data () {
      return {
        PSV: null,
        markImg: markImg,
        marker: {
          x: 2000,
          y: 1000
        }
      }
    },
    methods: {
      test () {
        this.PSV =  PhotoSphereViewer({
          container: document.getElementById('example'),
          panorama: img1,
          size: {
            width: '100%',
            height: '100%'
          },
          caption: '测试下',
          anim_speed: '1rpm',
          loading_txt: '加载中...',
          time_anim: false,
          markers: [
            {
              id: 'text',
              x: 2058,
              y: 1069,
              html: 'HTML <b>marker</b> &hearts;',
              anchor: 'bottom right',
              scale: [0.5, 1.5],
              style: {
                maxWidth: '100px',
                color: 'white',
                fontSize: '20px',
                fontFamily: 'Helvetica, sans-serif',
                textAlign: 'center'
              },
              tooltip: {
                content: 'An HTML marker',
                position: 'right'
              }
            },
            {
              id: '1',
              image: this.markImg,
              width: 32,
              height: 32,
              x: 680,
              y: 984,
              tooltip: '垃圾桶1'
            },
            {
              id: '2',
              image: this.markImg,
              width: 32,
              height: 32,
              x: 1080,
              y: 684,
              tooltip: '垃圾桶2'
            }
          ],
          navbar: [
            'autorotate',
            'zoom',
            'markers',
            {
              id: 'my-button',
              title: 'Hello world',
              className: 'custom-button',
              content: 'Custom',
              onClick: function() {
                alert('Hello from custom button');
              }
            },
            'caption',
            'fullscreen'
          ]
        })
        this.PSV.on('select-marker', function(marker) {
          console.log(marker)
        })
        this.PSV.on('select-marker-list',function (arr) {
          console.log(arr)
        })
      },
      add (e) {
        e.stopPropagation()
       if (this.marker.x < 3000) {
         this.marker.x += Math.random()*100
         this.marker.y += Math.random()*100
       }
        let s = {
            id: Math.random(),
            image: this.markImg,
            width: 32,
            height: 32,
            x: this.marker.x,
            y:this.marker.y,
            tooltip: '<div>垃圾桶3<br>使用时间：2020-05-03<br>检修时间：2020-09-01</div>'
          }
        this.PSV.addMarker(s, true)
      },
      removeAll (e) {
        e.stopPropagation()
        this.PSV.clearMarkers()
      },
      toggle () {
        this.PSV.toggleMarker('text')
      },
    },
    mounted:function () {
      this.test()
    }
  }
</script>

<style scoped>
  #content{
    width: 100vw;
    height: 100vh;
    position: relative;
  }
  #example{
    width: 100vw;
    height: 100vh;
  }
  .leftSlider{
    position: absolute;
    width:200px;
    height:200px;
    background: rgba(255,255,255,0.5);
    left: 20px;top:20px;
    cursor: pointer;
    /*重要！！！！！！！*/
    z-index: 999;
    padding: 20px;
  }
</style>
