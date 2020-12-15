<template>
    <div class="hello">
        <button @click="handleStart">开始</button>
        <button @click="handlePause">停止</button>
        <base-video ref="video"
                    :device-id="17"
                    :show-log="true"
                    :service-ip="'10.76.7.8'"
                    :service-port="30886"></base-video>
    </div>
</template>

<script>
import BaseVideo from "./VideoComponent";

export default {
    name: 'HelloWorld',
    components: { BaseVideo },
    props: {
        msg: String
    },
    methods: {
        handleStart() {
            this.$refs.video.play()
        },
        handlePause() {
            this.$refs.video.stop()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
