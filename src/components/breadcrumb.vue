<template>
  <t-breadcrumb :maxItemWidth="'150'" class="tdesign-breadcrumb">
    <template v-for="item in crumbs">
      <t-breadcrumbItem :key="item.to" :to="item.to">
        {{ item.title }}
      </t-breadcrumbItem>
    </template>
  </t-breadcrumb>
</template>

<script>
export default {
  name: 'Tdesign-breadcrumb',
  props: {
    isVisible: Boolean,
  },
  computed: {
    crumbs() {
      const pathArray = this.$route.path.split('/');
      pathArray.shift();

      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path,
          to: breadcrumbArray[idx - 1] ? `/${breadcrumbArray[idx - 1].path}/${path}` : `/${path}`,
          title: this.$route.matched[idx].meta.title || path,
        });
        return breadcrumbArray;
      }, []);
      return breadcrumbs;
    },
  },
};
</script>
