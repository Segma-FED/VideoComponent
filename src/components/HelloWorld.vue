<template>
    <div class="hello">
        <base-video :auto-play="true"
                    :device-id="17"></base-video>
    </div>
</template>

<script>
import BaseVideo from "./BaseVideo";

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
