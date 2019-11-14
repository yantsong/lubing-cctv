<template>
  <div class="equipmentWrap">
    <div class="formContent">
      <a-form :form="form" layout="inline" class="forms">
        <a-form-item label="设备名称:">
          <a-input v-model="deviceName" placeholder="请输入设备名称" />
        </a-form-item>
        <a-form-item label="接入时间:">
          <a-date-picker
            v-model="joinTime"
            show-time
            placeholder="请选择时间"
            @change="selectTime"
            @ok="onOk"
          />
        </a-form-item>
        <a-form-item label="在线状态">
          <a-select default-value="请选择状态" style="width: 120px" @change="handleChange">
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
          <a-button type="primary" html-type="submit" @click="getPageList">
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
        :pagination="false"
        bordered
      >
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() => Todetail(record.key)">详情</a>
            </span>
            <span style="margin-left:20px">
              <a @click="() => Toedit(record)">编辑</a>
            </span>
          </div>
        </template>
      </a-table>
      <div class="paginationWrap">
        <a-pagination
          size="small"
          :total="Alltotal"
          :current="currentPage"
          show-size-changer
          show-quick-jumper
          @showSizeChange="changeSize"
          @change="changePage"
        />
      </div>
    </div>
    <div v-if="visible" class="dialog">
      <a-modal
        title="编辑设备"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="visible=false"
      >
        <a-form :form="eidtForm">
          <a-form-item
            label="设备ID"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
          {{ eidtForm.editdeviceId }}
          </a-form-item>
          <a-form-item label="设备名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-input
              v-decorator="['editdeviceName', { rules: [{ required: true, message: 'Please input your note!' }] }]"
              placeholder="请输入设备名称"
              @change="handleDeviceName"
            />
          </a-form-item>
          <a-form-item label="安装详细地址:" :wrapper-col="{ span: 18, offset: 5 }">
            <a-textarea placeholder="最多50个字符" :rows="4" maxlength="50" @change="editdeviceAddress" />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { adminApi } from '@/api/admin.js'
import { parseTime } from '../../utils/format.js'
export default {
  data() {
    return {
      eidtForm: this.$form.createForm(this, { editdeviceId: '',editdeviceName: '' ,editdeviceAddress:''}),
      Alltotal: 10,
      currentPage: 1,
      tableSize: 10,
      deviceName: "",
      joinTime: null,
      statusVal: null,
      visible: false,
      confirmLoading: false,
      // eidtForm: {
      //   editdeviceId: '',editdeviceName: ''
      // },
      form: {},
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
          dataIndex: 'deviceModel'
        },
        {
          title: '位置信息',
          dataIndex: 'deviceLocation'
        },
        {
          title: '在线状态',
          dataIndex: 'deviceStatus'
        },
        {
          title: '设备接入时间',
          dataIndex: 'joinTime'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      tableData: []
    }
  },
  computed: {
    // 多选
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
    this.getPageList()
  },
  methods: {
    handleDeviceName(value) {
      this.eidtForm.setFieldsValue({
        editdeviceName: value
      })
    },
    editdeviceAddress(value){
      this.eidtForm.setFieldsValue({
        editdeviceAddress: value
      })
    },
    selectTime() {},
    changePage(page, pageSize) {
      this.currentPage = page
      this.getPageList()
    },
    changeSize(page, pageSize) {
      this.tableSize = pageSize
      this.getPageList()
    },
    getPageList() {
      const Msg = {
        deviceName: this.deviceName,
        deviceStatus: this.statusVal,
        joinTimeFrom: this.joinTime
          ? parseTime(this.joinTime._d, '{y}-{m}-{d} {h}:{i}:{s}')
          : null,
        pageNo: this.currentPage,
        pageSize: this.tableSize
      }
      adminApi.deviceList(Msg).then(res => {
        res.data.forEach((item,index) => {
          item.deviceStatus = item.deviceStatus == 1 ? "在线" : "离线";
          item.joinTime = parseTime(item.joinTime, "{y}-{m}-{d} {h}:{i}:{s}")
          item.key=index;
        });
        this.tableData = res.data;
      });
    },
    onOk(value) {},
    handleChange(val) {
      this.statusVal = val == '在线' ? 1 : 0
    },
    handleOk() {
      this.confirmLoading = true
      // this.Dialogform.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values)
      //   }
      // })
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
    Toedit(scope) {
      // 先显示 再改变数据
      this.visible = true
      console.log('scope: ', scope.deviceLocation)
      this.eidtForm.editdeviceId = scope.deviceId
      // 改变input 的value 看起来必须用setFieldsValue
      // 上面的v-model改为@change了
      this.$nextTick(
        this.eidtForm.setFieldsValue.bind(this,{
          editdeviceName: scope.deviceName,
          editdeviceAddress:scope.deviceLocation
        })
      )
      // const newData = [...this.tableData];
      // const target = newData.filter(item => key === item.key)[0];
      // if (target) {
      //   target.editable = true;
      //   this.data = newData;
      // }
    }
  }
}
</script>
<style lang='scss' scoped>
.equipmentWrap {
  .formContent {
    width: 100%;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    .forms {
      display: flex;
      justify-content: space-between;
      width: 70%;
    }
  }
  .tableContent {
    margin-top: 20px;
    padding: 30px;
    background: #fff;
  }
  .paginationWrap {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

