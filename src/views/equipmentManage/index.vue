<template>
  <div class="equipmentWrap">
    <div class="formContent">
      <a-form :form="form" layout="inline" class="forms">
        <a-form-item label="设备名称:">
          <a-input placeholder="请输入设备名称" />
        </a-form-item>
        <a-form-item label="接入时间:">
          <a-date-picker
            show-time
            placeholder="Select Time"
            @change="onChange"
            @ok="onOk"
          />
        </a-form-item>
        <a-form-item label="在线状态">
          <a-select
            default-value="在线"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option
              v-for="item in statusList"
              :key="item.id"
              :value="item.value"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="tableContent">
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="tableData"
        bordered
      >
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() => Todetail(record.key)">详情</a>
            </span>
            <span style="margin-left:20px">
              <a @click="() => Toedit(record.key)">编辑</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
    <div v-if="visible" class="dialog">
      <a-modal
        title="新建任务"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form :form="Dialogform">
          <a-form-item
            label="设备ID"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            12345
          </a-form-item>
          <a-form-item
            label="设备名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入设备名称' }] }
              ]"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
            <a-textarea placeholder="最多50个字符" :rows="4" maxlength="50" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      Dialogform: this.$form.createForm(this, {
        id: 12314,
        name: '',
        Inptxt: 1111
      }),
      form: {
        name: '',
        Importdate: '',
        status: ''
      },
      statusList: [{ value: '在线', id: 1 }, { value: '离线', id: 2 }],
      columns: [
        {
          title: '设备名称',
          dataIndex: 'deviceName',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '设备ID',
          dataIndex: 'deviceId'
        },
        {
          title: '设备类型',
          dataIndex: 'deviceType'
        },
        {
          title: '位置信息',
          dataIndex: 'address'
        },
        {
          title: '在线状态',
          dataIndex: 'deviceStatus'
        },
        {
          title: '设备接入时间',
          dataIndex: 'joinTimeFrom'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      tableData: [
        {
          key: '1',
          deviceName: 'John Brown',
          deviceId: 32,
          deviceType: 1,
          address: '浙江温州',
          deviceStatus: '在线',
          joinTimeFrom: '2016-09-21 08:50:08'
        },
        {
          key: '2',
          deviceName: 'John Brown',
          deviceId: 32,
          deviceType: 1,
          address: '浙江温州',
          joinTimeFrom: '2016-09-21 08:50:08'
        }
      ]
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        },
        getCheckboxProps: record => ({
          props: {
            // disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  created() {
  },
  methods: {
    onOk(value) {
      console.log('onOk: ', value)
    },
    handleChange() {},
    handleCancel() {
      this.visible = false
    },
    handleOk() {
      this.confirmLoading = true
      this.Dialogform.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
      //   setTimeout(() => {
      //     this.visible = false;
      //     this.confirmLoading = false;
      //   }, 2000);
    },
    Todetail(key) {
      const newData = [...this.tableData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
      this.$router.push('/detailPage')
    },
    Toedit(key) {
      this.visible = true
      const newData = [...this.tableData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.equipmentWrap {
  .formContent {
    width:100%;
    background:#fff;
    padding:30px;
    box-sizing:border-box;
    .forms {
      display: flex;
      justify-content: space-between;
      width: 70%;
    }
  }
  .tableContent {
    margin-top: 20px;
    padding:30px;
    background:#fff;
  }
}
</style>

