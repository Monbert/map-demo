<template>
  <div class="flex-container">
    <GmapAutocomplete @place_changed="handlePlaceChanged" @keyup.enter="submitPlace"
      :options="{ fields: ['geometry', 'formatted_address', 'address_components', 'name'] }" class="autocomplete" />
    <el-button type="primary" icon="el-icon-search" @click="submitPlace">Search</el-button>
  </div>
</template>
  
<script>
export default {
  props: ['tableData'],

  data() {
    return {
      searchHistory: [],
      searchContent: '',
      placeSelected: false,
    }
  },

  watch: {
    tableData(data) {
      this.searchHistory = data;
    }
  },

  methods: {
    handlePlaceChanged(place) {
      this.searchContent = place;
      this.placeSelected = true;
    },

    submitPlace() {
      if (this.placeSelected) {
        if (this.searchContent) {
          this.$emit('select-place', this.searchContent);
          this.placeSelected = false;
        }
      } else {
        this.popWarningMessage();
      }
    },

    popWarningMessage() {
      this.$message({
        showClose: true,
        message: `Please enter a new place`,
        type: 'warning'
      });
    },
  }
};
</script>
