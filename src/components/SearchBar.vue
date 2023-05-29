<template>
  <div id="app">
    <div class="flex-container">
      <GmapAutocomplete @place_changed="setPlace"
        :options="{ fields: ['geometry', 'formatted_address', 'address_components', 'name'] }" class="autocomplete" />
      <el-button type="primary" icon="el-icon-search" @click="setPlace">Search</el-button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: ['tableData'],


  data() {
    return {
      place: '',
      searchHistory: [],
    }
  },

  watch: {
    tableData(data) {
      this.searchHistory = data;
    }
  },

  methods: {

    setPlace(place) {
      if (!this.searchHistory.some(item => item.search === place.name)) {
        this.place = place;
        this.$emit('select-place', place);
      } else {
        this.popWarningMessage();
        // console.log('setPlace duplicate');
      }
    },

    popWarningMessage() {
      this.$message({
        showClose: true,
        message: 'Please enter a different location',
        type: 'warning'
      });
    }
  }
};
</script>
