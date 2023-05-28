<template>
  <div>

    <div style="margin-top: 20px">
      <el-button size="mini" type="danger" @click="handleSelectionDelete()">Delete</el-button>
      <el-button size="mini"  @click="showTableData()">Show tableData</el-button>
    </div>


    <el-table
      ref="multipleTable"
      :data="paginatedData"
      :row-key="getRowKey"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55"
        :reserve-selection="true">
      </el-table-column>
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

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="tableData.length"
        :page-size="2"
        @current-change="handlePageChange">
      </el-pagination>
    </div>


  </div>
  </template>
  
  <script>

    export default {
      props: ['places'],
      data() {
        return {
          tableData: [],
          multipleSelection: [],
          currentPage: 1,
        };
      },

      computed: {
        paginatedData() {
          const startIndex = (this.currentPage - 1) * 2;
          const endIndex = startIndex + 2;
          return this.tableData.slice(startIndex, endIndex);
        },

      },

      watch: {
        places(newPlaces) {
          if (typeof newPlaces === 'object' && newPlaces.formatted_address) {
            // 从对象中获取需要的属性值，写入 tableData 数组的相应字段中
            const searchResult = {
              search: newPlaces.name,
              address: newPlaces.formatted_address,
              lat: newPlaces.geometry.location.lat(),
              lng: newPlaces.geometry.location.lng()
            };
            this.tableData.unshift(searchResult); // 将结果插入到数组开头
            this.$emit('addTableData', this.tableData);

          }
          else{
            console.log('Cant find the place')
          }
        }
      },


      methods: {

        getRowKey(row) {
          // 自定义获取行数据的唯一标识，可以根据实际情况修改
          // console.log(`getRowKey! ${row.search}`)
          return row.search;
        },

        handleSelectionChange(selection) {
          this.multipleSelection = selection;
        },


        handlePageChange(currentPage) {
          this.currentPage = currentPage;
        },


        handleSelectionDelete() {
          this.multipleSelection.forEach(row => {
            const index = this.tableData.findIndex(item => item.search === row.search);

            if (index != -1) {
                this.tableData.splice(index, 1);
            }
          });
          this.multipleSelection = [];

          // handle paginatedData after delete
          const pageSize = 2; // 每页显示的数量
          const totalData = this.tableData.length; // 总数据量
          const totalPages = Math.ceil(totalData / pageSize); // 总页数

          // 如果currentPage大于totalPages，那么将currentPage减1，但如果currentPage已经为1，那么就不再减少
          // 这样可以保证currentPage至少为1，从而避免在计算startIndex和endIndex时出现负数
          if (this.currentPage > totalPages) {
            if(this.currentPage > 1){
              this.currentPage--;
            }else{
              this.currentPage = 1;
            }
          }

        },


        showTableData() {
          this.tableData.forEach((item,index)=>{
            // console.log('Show tableData:', this.tableData);
            console.log(`Element ${index}:`, item.search);

          });

        }

        

      }
    }
  </script>