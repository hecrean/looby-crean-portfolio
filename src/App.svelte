<script lang="ts">
  import HomePage from "@/pages/home-page.svelte";
  import { Route, router } from "tinro";
  router.mode.memory();

  let loading: boolean = false;
</script>

<!-- <PageTransition> -->
<Route>
  <Route path="/" fallback>
    {#if loading}
      <div />
    {:else}
      <HomePage />
    {/if}
  </Route>
</Route>
<!-- </PageTransition> -->
