<template>
  <b-container class="bv-example-row">
    <b-row class="justify-content-md-center">
      <b-col col lg="6">
        <HeadNavbar />
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col col lg="6" class="mt-5 pt-5">
        <h3>Welcome Home</h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import HeadNavbar from "@/components/HeadNavbar.vue";

export default {
  name: "home",
  components: {
    HeadNavbar
  }
};
</script>
