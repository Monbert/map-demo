<template>
  <GmapMap :center="center" :zoom="zoom" style="width: 100%; height: 670px;">
    <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
      :icon="{ url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }" @click="center = m.position" />
  </GmapMap>
</template>
  
<script>
export default {
  props: ['places', 'tableData', 'currLocation'],

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
        const position = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        this.markers.push({ position });
        this.center = position;
      }
    },

    tableData(data) {
      // check if there is a marker in the markers array that matches the position in tableData
      const existingMarkers = this.markers.filter(marker => {
        return data.some(item => {
          return item.lat === marker.position.lat &&
            item.lng === marker.position.lng;
        });
      });

      // remove markers from the markers array that no longer exist in tableData
      this.markers = existingMarkers;

      // add markers in tableData that do not exist in the markers array
      data.forEach(item => {
        const existingMarker = this.markers.find(marker => {
          return marker.position.lat === item.lat &&
            marker.position.lng === item.lng;
        });
        if (!existingMarker) {
          this.markers.push({ position: item.position });
        }
      });
    },

    currLocation(currentlocation) {
      if (currentlocation) {
        const position = {
          lat: currentlocation.lat,
          lng: currentlocation.lng
        };
        this.markers.push({ position });
        this.center = position;
      }
    }
  },
};
</script>
  