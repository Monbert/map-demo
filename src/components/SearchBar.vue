<template>
  <div class="flex-container">
    <GmapAutocomplete @place_changed="setPlace"
      :options="{ fields: ['geometry', 'formatted_address', 'address_components', 'name'] }" class="autocomplete" />
    <el-button type="primary" icon="el-icon-search" @click="setPlace">Search</el-button>
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
      this.place = place;
      this.$emit('select-place', place);
    }

  }
};
</script>
