<template>
  <div>
    <Row type="flex" justify="start" class="titleBar">
      <Icon type="md-close" size="30" class="closeIcon" @click="back"/>
      <div style="margin:10px 30px">
       <span>
         用户管理
         <Icon type="ios-arrow-forward" size="20" />
       </span>
        <span>{{formItem.id === '' ? '创建' : '编辑'}}用户</span>
      </div>
    </Row>
    <div class="detailBody">
      <div class="detailContent">
        <Row type="flex" justify="start" class="detailTitle">用户信息</Row>
        <div class="formContent">
          <Form :model="formItem" :label-width="150" ref="formItem">
            <Row type="flex">
              <FormItem label="用户昵称" class="selfValidate">
                <Input  v-model="formItem.nickName" style="width: 300px;float: left" placeholder="用户昵称" ></Input><br>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="真实姓名" class="selfValidate">
                <Input  v-model="formItem.realName" style="width: 300px;float: left" placeholder="真实姓名" ></Input><br>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="手机号码" class="selfValidate">
                <Input  v-model="formItem.phone"   placeholder="手机号码" style="width: 300px; float: left" @on-change="mobilePhoneVal(formItem.phone)"></Input>
                <span class="notice" v-if="mobilePhoneNotice">请输入合法的手机号码</span><br>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem :label="formItem.id === '' ? '用户密码' : '重置密码'" class="selfValidate" style="margin-bottom: 0px">
                <Input v-model="formItem.password" type="password" style="width: 300px;float: left" @on-change="checkPassword(formItem.password)"></Input>
                <span class="notice" v-if="passNotice">请输入6~11位的数字</span><br>
              </FormItem>
            </Row>
            <Row type="flex" >
              <FormItem style="margin-top: 0px;margin-bottom: 0px">
                <div class="noticeTextGray">用户密码默认是123456</div>
              </FormItem>
            </Row>
            <Row type="flex">
              <FormItem label="用户角色" class="selfValidate">
                <Select v-model="formItem.type" style="width:300px" placeholder="用户角色">
                  <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Row>
          </Form>
        </div>
      </div>
      <Row type="flex" style="margin-top: 30px">
        <Button class="btn-save" @click="save" style="padding: 5px 30px">保存</Button>
      </Row>
    </div>
  </div>
</template>

<script>
  // import region from '../../components/region'
  // import { addUser, userDetail, userUpdate, epaPull } from '../../api/api'
  export default {
    components: {
      // region
    },
    data () {
      return {
        formItem: {
          id: '',
          nickName: '',
          realName: '',
          phone: '',
          password: '123456',
          type: ''
        },
        mobilePhoneNotice: false,
        passNotice: false,
        roleList: [
          {
            value: 1,
            label: '超级管理员'
          },
          {
            value: 2,
            label: '运维管理员'
          },
          {
            value: 3,
            label: '普通用户'
          }
        ]
      }
    },
    methods:{
      checkPassword (string) {
        if (string !== '' && string !== undefined) {
          let validate = /^[0-9]*$/
          string = string.replace(/\s+/g, '')
          if (validate.test(string)) {
            if (string.length > 5 && string.length < 12) {
              this.passNotice = false
            } else {
              this.passNotice = true
            }
          } else {
            this.passNotice = true
          }
        } else {
          this.passNotice = false
        }
      },
      mobilePhoneVal (string) {
        this.formItem.phone = string.trim()
        var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (!validataPrice.test(string.trim())) {
          this.mobilePhoneNotice = true
        } else {
          this.mobilePhoneNotice = false
        }
      },
      submitVal (formData) {
        if (formData.nickName.trim().length === 0) {
          this.$Message.error('用户昵称不能为空！')
          return false
        } else if (formData.nickName.trim().length > 30) {
          this.$Message.error('用户昵称不能超过30字！')
          return false
        } else if (formData.realName.trim().length === 0) {
          this.$Message.error('真实姓名不能为空！')
          return false
        } else if (formData.realName.trim().length > 30) {
          this.$Message.error('真实姓名不能超过30字！')
          return false
        } else if (formData.phone === '') {
          this.$Message.error('手机号码不能为空！')
          return false
        } else if (this.mobilePhoneNotice === true) {
          this.$Message.error('请输入合法的手机号码！')
          return false
        } else if (formData.password === '') {
          this.$Message.error('用户密码不能为空！')
          return false
        } else if (this.passNotice === true) {
          this.$Message.error('密码请输入6~11位的数字！')
          return false
        } else if (formData.type === '' || formData.type === undefined) {
          this.$Message.error('用户角色不能为空！')
          return false
        } else {
          return true
        }
      },
      save () {
        if (this.submitVal(this.formItem)) {
          // if (this.formItem.id === '' || this.formItem.id === undefined) {
          //   addUser(this.formItem).then((res) =>{
          //     if (res.data.code === 1000) {
          //       this.$Message.info('用户添加成功！')
          //       this.$router.push({name: 'user_index'})
          //     } else {
          //       this.$Message.error(res.data.message)
          //     }
          //   })
          // } else {
          //   userUpdate(this.formItem).then((res) =>{
          //     if (res.data.code === 1000) {
          //       this.$Message.info('用户编辑成功！')
          //       this.$router.push({name: 'user_index', params:{param: this.$route.params.param}})
          //     } else {
          //       this.$Message.error(res.data.message)
          //     }
          //   })
          // }
        }
      },
      getDetail (id) {},
      back () {
        if (this.formItem.id === '') {
          this.$router.push({name: 'user'})
        } else {
          this.$router.push({name: 'user', params:{param: this.$route.params.param}})
        }
      }
    },
    created:function () {
      if (this.$route.params.id !== undefined) {
        this.formItem.id = this.$route.params.id
        this.getDetail(this.formItem.id)
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';

</style>
