<script lang="ts">
  import Header from "./components/header.svelte";
</script>

<main>
  <!-- <div id="control-panel">

	  </div> -->
  <Header />
</main>

<style>
  main {
    box-sizing: border-box;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 2em;
    position: relative;
    margin-bottom: 75px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
