<template>
  <div>
    <div style="margin-top: 20px">
      <el-button size="mini" type="danger" @click="handleSelectionDelete()">Delete</el-button>
    </div>
    <el-table ref="multipleTable" :data="paginatedData" :row-key="getRowKey" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column prop="search" label="Search" width="200">
      </el-table-column>
      <el-table-column prop="address" label="Address" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="10"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>
  
<script>

export default {
  props: ['places', 'currLocation'],
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
    };
  },

  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      return this.tableData.slice(startIndex, endIndex);
    },
  },

  watch: {
    places(newPlaces) {
      if (newPlaces.formatted_address) { // only return gmap allowed search
        if (!this.tableData.some(item => item.search === newPlaces.name)) { // warning duplicated place
          const searchResult = {
            search: newPlaces.name,
            address: newPlaces.formatted_address,
            lat: newPlaces.geometry.location.lat(),
            lng: newPlaces.geometry.location.lng()
          };
          this.tableData.unshift(searchResult); // insert the result at the beginning of the array
          this.$emit('addTableData', this.tableData);
        } else {
          this.popWarningMessage();
        }
      }
      else {
        this.popErrorMessage();
      }
    },

    currLocation(currentlocation) {
      if (!this.tableData.some(item => item.search === 'Your Current Location')) {
        const searchResult = {
          search: 'Your Current Location',
          address: `lat: ${currentlocation.lat} lng: ${currentlocation.lng}`,
          lat: currentlocation.lat,
          lng: currentlocation.lng
        };
        this.tableData.unshift(searchResult); // insert the result at the beginning of the array
        this.$emit('addTableData', this.tableData);
      }
    }
  },

  methods: {
    getRowKey(row) {
      // unique id for row data
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
      const pageSize = 10;
      const totalData = this.tableData.length;
      const totalPages = Math.ceil(totalData / pageSize);

      // avoid negative numbers when calculating startIndex and endIndex, have to at least is 1
      if (this.currentPage > totalPages) {
        this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
      }
    },

    popErrorMessage() {
      this.$message({
        showClose: true,
        message: `No details available for search input`,
        type: 'error'
      });
    },

    popWarningMessage() {
      this.$message({
        showClose: true,
        message: 'This place already exists in table',
        type: 'warning'
      });
    }
  }
}
</script>