<template>
  <div class="samrtSearchWrap">
    <div class="formContent">
      <a-form :form="form" layout="inline" class="forms">
        <a-form-item label="设备名称:">
          <a-tree-select
            style="width: 300px"
            :tree-data="treeData"
            :value="value"
            tree-checkable
            :show-checked-strategy="SHOW_PARENT"
            search-placeholder="Please select"
            @change="onChange"
          />
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
        <a-form-item label="选择人脸库">
          <!-- <a-input placeholder="请上传/请选择图片"/> -->
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleChange"
          >
            <a-button style="display:flex;">
              <a-icon type="upload"/>上传图片
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" @click="getpageList">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="tableContent">
      <a-table :columns="columns" :data-source="tableData" bordered>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() => Todetail(record.key)">详情</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { adminApi } from "@/api/admin.js";
import { parseTime } from "../../utils/format.js";
import { TreeSelect } from "ant-design-vue";
import moment from "moment";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const treeData = [
  {
    title: "Node1",
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
      headers: {
        authorization: "authorization-text"
      },
      form: {},
      value: ["0-0-0"],
      treeData,
      SHOW_PARENT,
      searchStartTime:'',
      searchEndTime:'',
      columns: [
        {
          title: "设备ID",
          dataIndex: "deviceId"
        },
        {
          title: "设备名称",
          dataIndex: "deviceName",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "位置信息",
          dataIndex: "address"
        },
        {
          title: "开始时间",
          dataIndex: "startTime"
        },
        {
          title: "结束时间",
          dataIndex: "endtime"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      tableData: [
        {
          key: "1",
          deviceId: 32,
          deviceName: "John Brown",
          address: "浙江温州",
          startTime: "2016-09-21 08:50:08",
          endtime: "2016-09-22 08:50:08"
        },
        {
          key: "2",
          deviceId: 32,
          deviceName: "John Brown",
          address: "浙江温州",
          startTime: "2016-09-21 08:50:08",
          endtime: "2016-09-22 08:50:08"
        }
      ]
    };
  },
  created(){
    this.getpageList();
  },
  methods: {
    getpageList(){
      let Msg={
          imgFile:'',
          deviceGroupId:'',
          searchFrom:this.searchStartTime,
          searchTo:this.searchEndTime
      }
      adminApi.Smartsearch(Msg).then(res=>{

      })
    },
    selectTime(date){
      this.searchStartTime=parseTime(date[0]._d,"{y}-{m}-{d} {h}:{i}:{s}")
      this.searchEndTime=parseTime(date[1]._d,"{y}-{m}-{d} {h}:{i}:{s}")
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    moment,
    onChange(value) {
      console.log("onChange ", val);
      this.value = value;
    },
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },
    Todetail(key) {
      const newData = [...this.tableData];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
      this.$router.push("/smartSearch/smartDetail");
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
  .formContent,.tableContent {
    // margin-top: 50px;
    background:#fff;
    padding:20px;
  }
}
</style>

