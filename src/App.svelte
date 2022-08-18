<script lang="ts">
  import Scroll from "@/components/Scroll.svelte";
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
      <Scroll />
    {/if}
  </Route>
</Route>
<!-- </PageTransition> -->
