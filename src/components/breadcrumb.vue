<template>
  <t-breadcrumb :maxItemWidth="'150'" class="tdesign-breadcrumb">
    <template v-for="item in crumbs">
      <t-breadcrumbItem
        :key="item.path"
        :to="item.path">
          {{item.title}}
        </t-breadcrumbItem>
    </template>
  </t-breadcrumb>
</template>

<script>
export default {
  name: "Tdesign-breadcrumb",
  props: {
    isVisible: false,
  },
  computed: {
    crumbs: function() {
      let pathArray = this.$route.path.split('/');
      pathArray.shift();

      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {

        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? '/' + breadcrumbArray[idx - 1].path + "/" + path
            : '/' + path,
          title: this.$route.matched[idx].meta.title || path
        });
        return breadcrumbArray;
      }, [])
      return breadcrumbs;
    }
  },
}
</script>
<style lang="less" scoped>
    .tdesign-breadcrumb {
        margin-bottom: 24px;
    }
</style>
