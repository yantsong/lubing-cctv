<template>
  <div class="samrtSearchWrap">
    <div class="formContent">
      <a-form :form="form" layout="inline" class="forms" >
        <a-form-item label="事件名称:">
          <a-input placeholder="请输入事件名称" v-model="eventVal" />
        </a-form-item>
        <a-form-item label="查询时间段:">
          <a-range-picker
            :disabled-date="disabledDate"
            :disabled-time="disabledRangeTime"
            @change="selectTime"
            :show-time="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
      }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item label="设备名称/ID:">
          <a-input placeholder="请输入设备名称/ID" v-model="deviceVal"/>
        </a-form-item>
        <a-form-item label="事件类型:">
          <a-select default-value="正常" style="width: 120px" @change="handleChange">
            <a-select-option
              v-for="item in eventList"
              :value="item.value"
              :key="item.id"
            >{{ item.value }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" @click="getpageList">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="tableContent">
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="tableData" :pagination="false" bordered>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <router-link :to="'/eventMange/eventDetail/'+record.eventId" class="link-type">
              详情
              <!-- <a @click="() => Todetail(record)">详情</a> -->
              </router-link>
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
  </div>
</template>
<script>
import { adminApi } from "@/api/admin.js";
import {debounce} from "../../utils/Utility.js";
import { parseTime } from "../../utils/format.js";
import { TreeSelect } from "ant-design-vue";
import moment from "moment";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const treeData = [
  {
    title: "Node1",
    rowSelection: true,
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0"
      }
    ]
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
        disabled: true
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1"
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2"
      }
    ]
  }
];
export default {
  data() {
    return {
      currentPage:1,
      Alltotal:0,
      pageSize:10,
      deviceVal:'',
      eventVal:'',
      searchStartTime:'',
      searchEndTime:'',
      headers: {
        authorization: "authorization-text"
      },
      form: {},
      value: ["0-0-0"],
      eventList: [{ value: "正常", id: 1 }, { value: "报警", id: 2 }],
      treeData,
      SHOW_PARENT,
      columns: [
        {
          title: "事件名称",
          dataIndex: "eventName",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "事件类型",
          dataIndex: "eventType"
        },
        {
          title: "设备ID",
          dataIndex: "deviceId"
        },
        {
          title: "设备名称",
          dataIndex: "deviceName"
        },
        {
          title: "位置信息",
          dataIndex: "address"
        },
        {
          title: "开始时间",
          dataIndex: "eventTimeFrom"
        },
        {
          title: "结束时间",
          dataIndex: "eventTimeTo"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      tableData: [
      ]
    };
  },
 watch: {
  eventVal(newValue){
    debounce(newValue=>{
      this.eventVal=newValue;
      this.getpageList();
    },300)
  },
  deviceVal(newValue){
    debounce(newValue=>{
      this.deviceVal=newValue;
      this.getpageList();
    },300)
  }
},

  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            // disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  },
  created(){
    this.getpageList();
  },
  methods: {
   
    changePage(page){
      this.currentPage=page;
      this.getpageList();
    },
    changeSize(current,size){
      this.pageSize=size;
      this.getpageList();
    },
     getpageList(){
      let Msg={
          // eventTimeFrom:this.searchStartTime,
          // eventTimeTo:this.searchEndTime,
          pageNo:this.currentPage,
          pageSize:this.pageSize,
          // eventName:this.eventVal,
          // deviceName:this.deviceVal
      }
      adminApi.eventList(Msg).then(res=>{
        this.tableData=res.data.list;
        this.Alltotal=res.data.total;
      })
    },
    selectTime(date){
      this.searchStartTime=parseTime(date[0]._d,"{y}-{m}-{d} {h}:{i}:{s}")
      this.searchEndTime=parseTime(date[1]._d,"{y}-{m}-{d} {h}:{i}:{s}")
    },
    handleChange(info) {
    },
    moment,
    onChange(value) {
      
      this.value = value;
    },
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    Todetail(scope) {
      this.$router.push(`/eventMange/eventDetail?eventId=${scope.eventId}`);
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf("day");
    },
    disabledRangeTime(_, type) {
      if (type === "start") {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56]
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56]
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.samrtSearchWrap {
  .tableContent {
    margin-top: 30px;
    background: #fff;
    padding: 20px;
  }
  .formContent {
    background: #fff;
    padding: 20px;
  }
    .paginationWrap {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

