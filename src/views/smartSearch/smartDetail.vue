<template>
    <div class="smartDetailWrap">
        <div class="forms">
      <h2>设备名称</h2>
      <div class="basisMsg">
        <span>设备ID:111</span>
        <span>设备名称:xxxx</span>
        <span>设备地址:xxxx</span>
      </div>
      <a-form :form="form" layout="inline" class="forms">
        <a-form-item label="回放时间段">
          <a-range-picker
            :showTime="{ format: 'HH:mm' }"
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
export default {
  data() {
    return {
        form:{
            time:''
        }
    };
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
.smartDetailWrap {
  margin: 50px;
  .basisMsg {
    margin: 20px 0;
    span {
      margin-right: 10px;
    }
  }
}
</style>


