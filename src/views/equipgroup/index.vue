<template>
  <div class="equipgroupWrap">
    <div class="pageLf">
      <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange"/>
      <div
        class="IconList"
        :style="{position:'fixed',top:pageX+'px',left:pageY+'px'}"
        v-if="isshow"
      >
        <a-icon type="edit" @click="()=> edit()" style="font-size:18px;color:#888"/>
        <a-icon type="minus-circle" @click="(e)=> remove()" style="font-size:18px;color:#888"/>
        <a-icon type="plus-circle" @click="()=> append()" style="font-size:18px;color:#888"/>
        <a-icon type="pause" @click="()=> contacts()" style="font-size:18px;color:#888"/>
      </div>
      <a-tree
        showLine
        @expand="onExpand"
        @select="selectNodes"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        :treeData="gData"
      >
        <!-- expandedKeys 展开指定的树节点 -->
        <!-- autoExpandParent 是否自动展开父节点 -->
        <template slot="item" slot-scope="item">
          <span v-if="item.title.indexOf(searchValue) > -1">
            {{item.title.substr(0, title.indexOf(searchValue))}}
            <span
              style="color: #f50"
            >{{searchValue}}</span>
            {{item.title.substr(item.title.indexOf(searchValue) + searchValue.length)}}
          </span>
          <span v-else>
            {{item.title}}
            <!-- <a-button
              type="primary"
              class="but_type"
              style="right:200px;"
              @click="()=> append(item)"
            >新增</a-button>
            <a-button
              type="primary"
              class="but_type"
              style="right:120px;"
              @click="()=> edit(item)"
            >编辑</a-button>
            <a-button type="primary" class="but_type" @click="(e)=> remove(item)">删除</a-button>-->
          </span>
        </template>
      </a-tree>
    </div>
    <div class="dialog" v-if="visible">
      <a-modal
      width="37%"
        title="关联设备"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <a-transfer
        :listStyle="{
      width: '300px',
      height: '300px',
    }"
          :dataSource="mockData"
          :titles="['待关联设备分组', '已关联设备分组']"
          :targetKeys="targetKeys"
          :selectedKeys="selectedKeys"
          @change="handleChange"
          @selectChange="handleSelectChange"
          @scroll="handleScroll"
          :render="item=>item.title"
          :disabled="disabled"
        />
      </a-modal>
    </div>
    <div class="pageRt"></div>
  </div>
</template>
<script>
const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key, scopedSlots: { title: "title" } });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
export default {
  data() {
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1
      });
    }

    const oriTargetKeys = mockData
      .filter(item => +item.key % 3 > 1)
      .map(item => item.key);
    return {
      visible: false,
      confirmLoading: false,
      mockData,
      targetKeys: oriTargetKeys,
      selectedKeys: ["1", "4"],
      disabled: false,
      checkedItem: "",
      isshow: false,
      pageX: 0,
      pageY: 0,
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData
    };
  },
  created() {},
  methods: {
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys;
      console.log("targetKeys: ", nextTargetKeys);
      console.log("direction: ", direction);
      console.log("moveKeys: ", moveKeys);
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];

      console.log("sourceSelectedKeys: ", sourceSelectedKeys);
      console.log("targetSelectedKeys: ", targetSelectedKeys);
    },
    handleScroll(direction, e) {
      console.log("direction:", direction);
      console.log("target:", e.target);
    },
    searchOption(option, arr, type = "dele") {
      for (let s = 0; s < arr.length; s++) {
        if (arr[s].key === option) {
          if (type === "dele") {
            arr.splice(s, 1);
          } else if (type === "edit") {
            this.$set(arr, s, {
              title: "",
              key: "12121212",
              scopedSlots: { title: "title" }
            });
          }
          break;
        } else if (arr[s].children && arr[s].children.length > 0) {
          this.searchOption(option, arr[s].children);
        } else {
          continue;
        }
      }
    },
    onExpand(expandedKeys) {
      this.searchOption(expandedKeys, gData);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    // 删除
    remove(data) {
      this.searchOption(this.checkedItem, gData);
    },
    // 编辑
    edit(data) {
      this.searchOption(this.checkedItem, gData, "edit");
    },
    // 关联设备
    contacts(){
        this.visible=true;
    },
    handleOk(){},
     handleCancel() {
      this.visible = false;
    },
    selectNodes(e, d) {
      console.log("e: ", e);
      this.checkedItem = e[0];
      this.isshow = true;
      this.pageX = d.nativeEvent.pageX;
      this.pageY = d.nativeEvent.pageY;
    },
    onChange(e) {
      const value = e.target.value;
      console.log("value: ", value);
      const expandedKeys = dataList
        .map(item => {
          if (item.key.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.equipgroupWrap {
  margin: 50px;
  display: flex;
  .pageLf {
    flex: 1 1 15%;
    border: 1px solid #f1f1f1;
    .IconList {
      display: flex;
      width: 100px;
      justify-content: space-between;
    }
    .treeWrap {
      margin-top: 20px;
    }
  }
  .pageRt {
    flex: 1 1 70%;
  }
}
</style>


