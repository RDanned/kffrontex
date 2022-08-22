<template>
  <el-tooltip
    class="item"
    effect="light"
    :content="content"
    placement="right-start">
    <i class="el-icon-info"></i>
  </el-tooltip>
</template>
<script>
export default {
  props: ['content']
}
</script>