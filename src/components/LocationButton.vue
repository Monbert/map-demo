<template>
    <div class="location-container">
        <!-- 获取当前位置的按钮 -->
        <el-button class="location-button" type="primary" icon="el-icon-place" circle @click="getCurrentLocation"></el-button>

        <!-- 显示结果 -->
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
            // 使用浏览器的Geolocation API获取当前位置
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.result = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
                });
            } else {
                this.result = "Geolocation is not supported by this browser.";
            }
        },

    },
};
</script>
  