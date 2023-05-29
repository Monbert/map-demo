<!-- MapView.vue -->
<template>
    <GmapMap 
            :center="center" 
            :zoom="zoom"
            style="width: 100%; height: 670px;"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :icon="{url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}"
        @click="center=m.position"
      />
    </GmapMap>
  </template>
  
  <script>
  export default {
    props: ['places','tableData'],

    data() {
      return {
        center: { lat: 43.748, lng: -79.289 },
        zoom: 11,
        markers: []
      }
    },
    watch: {
      places(place) {
        if (place && place.geometry) {
          // console.log(place.formatted_address);
          const position = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          this.markers.push({ position });
          this.center = position;
          // console.log(this.markers[0].position.lat);
        }
      },
      
      tableData(data) {
        // this.searchHistory = data;
        // console.log("2222Add table data:", data);
        const existingMarkers = this.markers.filter(marker => {
          // 检查 markers 数组中是否存在与 tableData 中位置匹配的标记
          return data.some(item => {
            return item.lat === marker.position.lat &&
              item.lng === marker.position.lng;
          });
        });

        // 删除 markers 数组中不再存在于 tableData 的标记
        this.markers = existingMarkers;

        // 添加 tableData 中不存在于 markers 数组的标记
        data.forEach(item => {
          const existingMarker = this.markers.find(marker => {
            return marker.position.lat === item.lat &&
              marker.position.lng === item.lng;
          });

          if (!existingMarker) {
            this.markers.push({ position: item.position });
          }
        });

      }
    },


  };
  </script>
  