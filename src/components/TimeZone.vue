<template>
  <div>
    <p>Latest searched location: {{ latestSearchLocation }}</p>
    <p>Timezone: {{ timezone }}</p>
    <p>Local Time: {{ localTime }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['places', 'currLocation'],

  data() {
    return {
      latestSearchLocation: '',
      timezone: '',
      localTime: ''
    };
  },

  watch: {
    places(place) {
      if (place && place.geometry) {
        this.latestSearchLocation = place.name;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        this.getLocalTime(lat, lng);
      }
    },

    currLocation(curloc) {
      if (curloc) {
        this.latestSearchLocation = 'Your Current Location';
        const lat = curloc.lat;
        const lng = curloc.lng;
        this.getLocalTime(lat, lng);
      }
    }

  },

  methods: {
    async getLocalTime(lat, lng) {
      const timestamp = Math.floor((new Date()).getTime() / 1000);
      const GMAP_API_KEY = '{YOUR_GOOGLE_MAP_API}'; // Google Maps API
      const response = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${timestamp}&key=${GMAP_API_KEY}`);

      // receive local timezone json data from google_timezone api
      if (response.data.status === 'OK') {
        const timeZoneId = response.data.timeZoneId;
        this.timezone = response.data.timeZoneName;
        const curTime = new Date(timestamp * 1000);
        this.localTime = curTime.toLocaleString('en-US', { timeZone: timeZoneId });
      } else {
        console.error('Error fetching timezone data:', response.data);
      }
    }
  }
}
</script>
