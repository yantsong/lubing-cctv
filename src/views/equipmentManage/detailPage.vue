<template>
  <div class="detailWrap">
    <div class="forms">
      <h2>设备名称</h2>
      <div class="basisMsg">
        <span>设备ID: {{detialInfo.deviceId}}</span>
        <span>设备名称: {{detialInfo.deviceId}}</span>
        <span>设备地址: {{detialInfo.deviceLocation}}</span>
      </div>
      <a-form :form="form" layout="inline" class="forms2">
        <a-form-item label="回放时间段">
          <a-range-picker
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['开始时间', '结束时间']"
            @change="onChange"
            @ok="onOk"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { adminApi } from "@/api/admin.js";
import { parseTime } from "../../utils/format.js";
export default {
  data() {
    return {
      form: {
        time: ""
      },
      detialInfo:{}
    };
  },
  created(){
     let deviceId=this.$route.query.deviceId;
      adminApi.deviceDetail({deviceId:deviceId}).then(res=>{
        if(res.msg='成功'){
           this.detialInfo=res.data;
        }
      })
  },
  methods: {
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    },
    onOk(value) {
      console.log("onOk: ", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.detailWrap {
  // margin: 50px;
  .basisMsg {
    margin: 20px 0;
    span {
      margin-right: 10px;
    }
  }
  .forms{
    background:#fff;
    min-height:70vh;
    padding:20px;
  }
}
</style>

