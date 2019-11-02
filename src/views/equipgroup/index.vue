<template>
  <div class="equipgroupWrap">
    <div class="pageLf">
      <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange"/>
      <div :style="{position:'absolute',top:pageX+'px',left:pageY+'px'}">
        <a-icon type="edit" @click="()=> edit(item)"/>
        <a-icon type="minus-circle" @click="(e)=> remove(item)"/>
        <a-icon type="plus-circle" @click="()=> append(item)"/>
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
    return {
      pageX: 0,
      pageY: 0,
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData
    };
  },
  methods: {
    onExpand(expandedKeys) {
      console.log("expandedKeys: ", expandedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    selectNodes(e, d) {
      console.log("d: ", d);
      this.pageX = d.pageX;
      this.pageY = d.pageY;
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
    flex: 1 1 30%;
    border: 1px solid #f1f1f1;
    .treeWrap {
      margin-top: 20px;
    }
  }
  .pageRt {
    flex: 1 1 70%;
  }
}
</style>


