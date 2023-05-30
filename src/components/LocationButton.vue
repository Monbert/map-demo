<template>
    <div class="location-container">
        <el-button type="primary" icon="el-icon-place" circle @click="getCurrentLocation"></el-button>
        <!-- show cur location result -->
        <p class="location-result">{{ curLocation }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            curLocation: ''
        };
    },
    methods: {
        getCurrentLocation() {
            // get current location using browser's Geolocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.curLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    this.$emit('cur-location', this.curLocation);
                });
                this.popSuccessMessage();
            } else {
                this.curLocation = "Geolocation is not supported by this browser.";
            }
        },

        popSuccessMessage() {
            this.$message({
                showClose: true,
                message: 'Successful',
                type: 'success'
            });
        },

    },
};
</script>
  