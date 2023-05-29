<template>
    <div class="location-container">
        <el-button class="location-button" type="primary" icon="el-icon-place" circle
            @click="getCurrentLocation"></el-button>
        <!-- show cur location result -->
        <p class="location-result">{{ result }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            result: '',
        };
    },
    methods: {
        getCurrentLocation() {
            // get current location using browser's Geolocation API
            if (navigator.geolocation) {
                this.popSuccessMessage();
                navigator.geolocation.getCurrentPosition((position) => {
                    this.result = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
                });
            } else {
                this.result = "Geolocation is not supported by this browser.";
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
  