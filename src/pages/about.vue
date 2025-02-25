<template>
    <div>
        <span>부모 컴포넌트입니다.</span>
        <ChildComponent ref="childComponentRef" />
        <button @click="getData">버튼</button>
    </div>
</template>

<script setup lang="ts">
import ChildComponent from "./ChildComponent.vue";
import { ref } from "vue";

const childComponentRef = ref<InstanceType<typeof ChildComponent> | null>(null);

const getData = () => {
    childComponentRef.value?.createdChildComponentFunction()
}
</script>

<style lang="scss" scoped></style>