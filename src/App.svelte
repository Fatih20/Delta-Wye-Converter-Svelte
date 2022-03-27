<script lang="ts">
  import Header from "./components/header.svelte";
  import ControlPanel from "./components/controlPanel.svelte";

  let mobileControlPanelOpen = true;
</script>

<main>
  <!-- <div id="control-panel">

	  </div> -->
  <Header />
  <ControlPanel {mobileControlPanelOpen} isForMobile={false} />
</main>

<style lang="scss">
  main {
    box-sizing: border-box;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 2em;
    position: relative;
    margin-bottom: 75px;
  }
</style>
