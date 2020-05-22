<template>
<!--<div>-->
  <div id="example"  style="width: 500px;height: 600px">
    <div style="position: absolute;width: 100px;height: 100px;background: red;left: 20px;top:20px" @click="test"></div>
  </div>
<!--</div>-->
</template>

<script>
  import img from '@/assets/image/1.jpg'
  import img1 from '@/assets/image/2.jpg'
    export default {
      data () {
        return {
          img: img,
          img1: img1,
          type: '',
          url: img,
        }
      },
      methods: {
        test () {
          this.$router.push('/map')
        },
        getTest (url) {
          let thi = this
          let container=document.getElementById('example')
          let renderer = new THREE.WebGLRenderer();
          container.appendChild(renderer.domElement);
          let scene = new THREE.Scene();
          let vr=new VR(scene,renderer,container);
          vr.loadProgressManager.onLoad=function () {
            vr.VRObject.getObjectByName("__mxrealityDefault").visible = true;
            console.log('loaded',vr.VRObject.getObjectByName("__mxrealityDefault").visible)
            vr.asteroidConfig.enable=true
            //vr.controls.enable=false;
          }
          vr.loadProgressManager.onProgress=function () {
            console.log("onProgress")
          }
          vr.loadProgressManager.onError=function () {
            console.log("onError")
          }
          vr.init(function(){
          })
            // vr.resType.video
          console.log(url)
          thi.type = vr.resType.video
          vr.playPanorama(url,'');
          // 自动旋转
          // vr.controls.autoRotate=true
        },
      },
      mounted:function () {
        if (this.$route.params.type === 1) {
          this.url = this.img
        } else {
          this.url = this.img1
        }
        this.getTest(this.url)
      }
    }
</script>

<style scoped>

</style>
