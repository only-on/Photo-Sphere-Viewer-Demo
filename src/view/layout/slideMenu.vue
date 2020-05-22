<template>
  <div>
    <div class="header">
      <div class="login_title">北京法源寺历史文化街区智慧运营平台</div>
      <div class="userInfo">
        <span>1111111</span>
        <div style="position: relative;display: inline-block;">
          <Icon type="md-contact" size="30" style="margin-right: 10px;line-height: 60px"/>
          <div class="userSlider">
           <div>
             <Icon type="ios-create-outline" size="25"/>
             <span>个人信息</span>
           </div>
            <div>
              <Icon type="ios-exit-outline" size="25"/>
              <span>退出</span>
            </div>
            <Icon type="md-arrow-dropup" size="25" style="position: absolute;top:-15px;right:15px;color: #fff"/>
          </div>
        </div>
      </div>
    </div>
    <nav class="slider">
      <Menu :active-name="activeName"  width="180" @on-select="clickMenuItems">
        <MenuItem  name="map">
          <Icon type="ios-home-outline" size="25"/>
          <span class="menuText">首页</span>
        </MenuItem>
        <MenuItem  name="user">
          <Icon type="md-contacts" size="25"/>
          <span class="menuText">用户管理</span>
        </MenuItem>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            固定资产管理
          </template>
          <MenuItem name="1-1">Option 1</MenuItem>
          <MenuItem name="1-2">Option 2</MenuItem>
          <MenuItem name="1-3">Option 3</MenuItem>
        </Submenu>
      </Menu>
    </nav>
  </div>
</template>

<script>
    export default {
       data () {
         return {
           activeName: ''
         }
       },
      methods: {
        clickMenuItems (key) {
          key = key.indexOf('/') === 0 ? key : '/' + key
          this.$router.push({ path: key })
        },
      },
      created:function () {
        this.activeName = this.$route.name
      }
    }
</script>

<style lang="less" scoped >
  @import "../../assets/styles/variable/variable.less";
  .header{
    height: 60px;
    background:@layout-header-background;
    color: #fff;
    padding: 0 40px;
  }
  .login-img{
    vertical-align: middle;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 15px;
    float: left;
  }
  .login_title {
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
    font-size: 18px;
    line-height: 60px;
    float: left;
  }
  .header>div:last-child{
    float: right;
    font-size: 14px;
    line-height: 60px;
    cursor: pointer;
  }
  .slider{
    width: 180px;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    background: @layout-background;
    overflow: auto;
  }
  .userSlider{
    width:120px;
    height: 80px;
    padding: 0 10px;
    position: absolute;
    left:-75px;
    top:60px;
    z-index: 99;
    color: #666;
    background: #fff;
    box-shadow:0px 2px 17px 0px rgba(190,190,190,0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    transition: all .1s;
    visibility: hidden;
  }
  .userSlider div{
    text-align: center;
    line-height: 30px;
  }
  .userInfo:hover .userSlider{
    visibility: visible;
  }
  .menuText{
    font-size: 14px;
  }
</style>
