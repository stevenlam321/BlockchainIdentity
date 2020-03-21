<template>
    <div>
        <Header/>
        <Loading/>
        <slot/>
    </div>
</template>

<script>
import Header from '../components/Loading';
export default {
    name:"CenterLayout"
}
</script>

<style>

</style>