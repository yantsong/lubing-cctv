<!-- te -->
<template>
  <div>
    <div class="search">
      <span>人脸库名称:</span>
      <a-input
      v-model="searchValue"
      placeholder="请输入"
/>
      <a-button type="primary" @click="onSearch">
        搜索
      </a-button>
    </div>
    <div class="content">
      <div class="top-button">
        <a-button type="primary" @click="onSearch">
          +新建
        </a-button>
      </div>
      <div class="tableContent">
        <a-table
          :row-selection="rowSelection"
          :columns="facelitle"
          :data-source="facedata"
          :row-key="record => record.dbId"
        >
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <span>
                <a @click="() => ShowDeleteConfirm(record.key)">删除</a>
              </span>
              <span style="margin-left:20px">
                <a @click="() => Addedit(record.key)">编辑</a>
              </span>
              <span style="margin-left:20px">
                <a @click="() => Todetail(record.key)">详情</a>
              </span>
              <span style="margin-left:20px">
                <a @click="() => Down(record.key)">导出</a>
              </span>
              <span style="margin-left:20px">
                <a @click="() => ToAssociated(record.key)">关联设备</a>
              </span>
            </div>
          </template>
        </a-table>
        <a-modal
          v-model="addShow"
          :confirm-loading="confirmLoading"
          title="新建人脸库"
          ok-text="确认"
          cancel-text="取消"
          @ok="Addok"
          @cancel="Addcancel"
        >
          <a-form :form="Dialogform">
            <a-form-item
              label="人脸库名称"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'name',
                  { rules: [{ required: true, message: '人脸库的名字必填' }] }
                ]"
                placeholder="请输入"
              />
            </a-form-item>
            <a-form-item
              label="人脸库名称"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-textarea
                v-decorator="['content']"
                placeholder="最多50个字符"
                :rows="4"
                maxlength="50"
              />
            </a-form-item>
          </a-form>
        </a-modal>
        <a-modal
          v-model="associatedShow"
          title="关联设备分组"
          ok-text="确认"
          cancel-text="取消"
        >
          <p style="text-align: center">
            望春园1号楼人脸库
          </p>
          <div>
            <a-transfer
              :data-source="mockData"
              :titles="['Source', 'Target']"
              :target-keys="targetKeys"
              :selected-keys="selectedKeys"
              :render="item => item.title"
              @change="handleChange"
              @selectChange="handleSelectChange"
              @scroll="handleScroll"
            />
          </div>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { searchFaceDB } from '@/api/event'
export default {
  components: {},
  data() {
    return {
      searchValue: '',
      confirmLoading: false,
      associatedShow: false,
      addShow: false,
      Dialogform: this.$form.createForm(this, {
        name: '',
        content: ''
      }),
      mockData: [],
      oriTargetKeys: [],
      targetKeys: [],
      selectedKeys: ['1', '4'],
      facedata: [
      ],
      facelitle: [
        {
          title: '人脸库名称',
          dataIndex: 'dbName',
          width: '30%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '描述',
          dataIndex: 'dbDesc'
        },
        {
          title: '数量',
          dataIndex: 'faceAmount'
        },
        {
          title: '创建时间',
          dataIndex: 'creationTime'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows)
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows)
        }
      }
    }
  },

  computed: {},

  created() {
    const value={}
    searchFaceDB(value).then(res => {
      console.log(res.data)
      this.facedata=res.data
    })
    for (let i = 0; i < 20; i++) {
      this.mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1
      })
      this.oriTargetKeys=this.mockData.filter(item => +item.key % 3 > 1).map(item => item.key)
      this.targetKeys=this.oriTargetKeys
    }
  },

  mounted() {},

  methods: {
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys
      console.log('direction: ', direction)
      console.log('moveKeys: ', moveKeys)
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]

      console.log('sourceSelectedKeys: ', sourceSelectedKeys)
      console.log('targetSelectedKeys: ', targetSelectedKeys)
    },
    handleScroll(direction, e) {
      console.log('direction:', direction)
      console.log('target:', e.target)
    },
    ToAssociated(key) {
      this.associatedShow = true
    },
    Down(key) {},
    Addcancel() {
      this.confirmLoading = false
    },
    Addok() {
      this.confirmLoading = true
      this.Dialogform.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    Addedit(key) {
      this.addShow = true
      const newData = [...this.facedata]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    ShowDeleteConfirm() {
      this.$confirm({
        title: '你确定删除该人脸库?',
        content: '你确定要删除该人脸库下的照片么？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    onSearch() {
      let value={
        dbName: this.searchValue
      }
      if (!value.dbName) {
        value={}
      }
      searchFaceDB(value).then(res => {
        console.log(res.data)
        this.facedata=res.data
      })
      console.log('onSearch')
    },
    Todetail(key) {
      const newData = [...this.facedata]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
      this.$router.push('/faceManagement/details')
    }
  }
}
</script>
<style lang='scss' scoped>
.search {
  width: 100%;
  height: 80px;
  background-color: #fff;
  padding-top: 30px;
  padding-left: 20px;
  text-align: left;
  .ant-input {
    width: 200px;
    margin: 0 20px;
  }
}
.content {
  background-color: #fff;
  padding: 10px;
  height: 600px;
  .top-button {
    text-align: right;
    padding-right: 40px;
  }
  .ant-table-wrapper {
    margin-top: 20px;
  }
}
</style>
