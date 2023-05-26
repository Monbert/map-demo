<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!-- <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column> -->
      <el-table-column
        prop="search"
        label="Search"
        width="200">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Address"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
  </template>
  
  <script>
    export default {
      props: ['places'],
      data() {
        return {
          tableData: [],
          multipleSelection: []
        };
      },


      watch: {
        places(newPlaces) {
          if (typeof newPlaces === 'object') {
            // 从对象中获取需要的属性值，写入 tableData 数组的相应字段中
            const searchResult = {
              search: newPlaces.name,
              address: newPlaces.formatted_address
            };
            this.tableData.unshift(searchResult); // 将结果插入到数组开头
      }
          else{
            console.log("noooooo");
          }
        }
      },

      methods: {
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      }
    }
  </script>