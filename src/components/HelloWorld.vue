<template>
    <div class="hello">
        <base-video :auto-play="true"
                    :device-id="17"
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
