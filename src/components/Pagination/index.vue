<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startPageAndEndPage.startPage > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startPageAndEndPage.startPage > 2">···</button>

    <button
      v-for="(page, index) in startPageAndEndPage.endPage"
      :key="index"
      v-if="page >= startPageAndEndPage.startPage"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <button v-if="startPageAndEndPage.endPage < totalPage - 1">···</button>
    <button
      v-if="startPageAndEndPage.endPage < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // pageNo： 当前页  pageSize：每页展示条数  total：总条数    continues：连续页码标签
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码起始数字和结束数字
    startPageAndEndPage() {
      const { continues, pageNo, totalPage } = this;
      // 声明起始数字与结束数字
      let startPage = 0,
        endPage = 0;
      //不正常现象【总页数没有连续页码多】
      if (continues > totalPage) {
        startPage = 1;
        endPage = totalPage;
      } else {
        // 动态连续页码标签
        startPage = pageNo - parseInt(continues / 2);
        endPage = pageNo + parseInt(continues / 2);
        if (startPage < 1) {
          startPage = 1;
          endPage = continues;
        }
        //把出现不正常的现象[end数字大于总页码]纠正
        if (endPage > totalPage) {
          endPage = totalPage;
          startPage = totalPage - continues + 1;
        }
      }
      return { startPage, endPage };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: #409eff;
}
</style>
