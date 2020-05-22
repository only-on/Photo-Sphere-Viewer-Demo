<template>
  <div class="body">
    <Row style="margin-bottom: 20px">
      <Input v-model="paramnter.keyword" placeholder="姓名、手机号码" style="width:250px;float: left;margin-right: 20px" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"/>
      <Select v-model="paramnter.roleId" style="width:200px;float: left;margin-right: 20px" placeholder="角色" clearable @on-change="changeSelect">
        <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button class="btn-save" style="float: right" @click="add">创建用户</Button>
    </Row>
    <div class="content">
      <Table stripe  :columns="columns" :data="dataTable" ></Table>
      <div class="pages-block">
        <div class="pages-right">
          <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                ref="tablePage" show-elevator :transfer="true"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { userList, epaPull, userDel } from '../../api/api'
  export default {
    data () {
      return {
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          pageNum: 1,
          pageSize: 10,
          keyword: '',
          roleId: '',
          epaId: ''
        },
        roleList: [
          {
            value: 1,
            label: '管理员'
          },
          {
            value: 2,
            label: '员工'
          }
        ],
        columns: [
          {
            title: '序号',
            width: 100,
            align: 'center',
            render: (h, params) => {
              let type
              if (this.paramnter.pageNum > 1) {
                type = (this.page - 1) * this.rows + params.index + 1
              } else {
                type = params.index + 1
              }
              return h('div', type)
            }
          },
          {
            title: '真实姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'phone',
            align: 'center'
          },
          {
            title: '角色',
            key: 'roleId',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.roleId === 1 ? '管理员' : '员工')
            }
          },
          {
            title: '所属环保局',
            key: 'epaNames',
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            align: 'center'
          },
          {
            title: '注册时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 260,
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'ios-create-outline',
                    size: 28
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.id)
                      // this.$router.push({name: 'feed_detail', params: {params: this.paramnter, id: params.row.id}})
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'ios-list-box-outline',
                    size: 24
                  },
                  style: {
                    color: '#516BEB',
                    cursor: 'pointer',
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'user_detail', params:{id:params.row.id, param: this.paramnter}})
                    }
                  }
                })
              ])
            }
          }
        ],
        dataTable: [],
      }
    },
    methods: {
      add () {
        this.$router.push({name: 'user_create'})
      },
      edit (id) {
        this.$router.push({name: 'user_create', params:{id:id, param: this.paramnter}})
      },
      keywordChange () {
        this.paramnter.keyword = this.paramnter.keyword.trim()
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      backKeyword () {
        this.paramnter.keyword = ''
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      changeSelect () {
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.paramnter.pageNum = this.page
        this.getTableDatas(this.paramnter)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.paramnter.pageSize = this.rows
        this.getTableDatas(this.paramnter)
      },
      getTableDatas (param) {
        // userList(param).then((res) => {
        //   if (res.data.code === 1000) {
        //     this.dataTable = res.data.content.list
        //     this.total = res.data.content.total
        //     this.rows = res.data.content.pageSize
        //     this.page = res.data.content.pageNum
        //     if (this.$refs.tablePage !== undefined) {
        //       this.$refs.tablePage.currentPage = this.page
        //     }
        //   } else {
        //     this.dataTable = []
        //   }
        // })
      }
    },
    created:function () {
      this.getTableDatas(this.paramnter)
    }
  }
</script>

<style lang="less" scoped>
</style>
