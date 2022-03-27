<script lang="ts">
  import Header from "./components/header.svelte";
  import ControlPanel from "./components/controlPanel.svelte";

  let mobileControlPanelOpen = false;
</script>

<main>
  <div id="control-panel-container" class:opened={mobileControlPanelOpen}>
    <ControlPanel {mobileControlPanelOpen} isForMobile={true} />
    <button
      id="control-panel-button"
      on:click={() => (mobileControlPanelOpen = !mobileControlPanelOpen)}
      >{mobileControlPanelOpen ? "Close" : "Options"}</button
    >
  </div>
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

  @mixin ClosedControlPanel {
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
  }

  @mixin OpenControlPanel {
    background: linear-gradient(
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.75) 50%,
      rgba(0, 0, 0, 0.9)
    );
    pointer-events: auto;
  }

  #control-panel-container {
    align-items: center;
    box-sizing: border-box;
    color: white;
    display: flex;
    height: 100vh;
    justify-content: flex-end;
    flex-direction: column;
    gap: 20px;
    left: 0;
    padding: 1em;
    position: fixed;
    right: 0;
    z-index: 20;

    @media (min-width: 900px) {
      display: none;
    }

    @include ClosedControlPanel;

    &.opened {
      @include OpenControlPanel;
    }
  }

  #control-panel-button {
    border: solid 1px #000000;
    border-radius: 5px;
    background-color: white;
    color: #333333;
    filter: drop-shadow(0 3px 10px #000000ed);
    font-size: 1em;
    padding: 7px;
    pointer-events: auto;
  }
</style>
