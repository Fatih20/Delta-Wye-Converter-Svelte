<script lang="ts">
  let isDelta = true;
  let isWye = true;
  let convertingDtW = true;
</script>

<main>
  <div id="delta-container">
    <div class="network-type-chooser">
      <button
        class:selected={isDelta}
        class="network-button"
        on:click={() => (isDelta = true)}>Delta</button
      >
      <button
        class:selected={!isDelta}
        class="network-button"
        on:click={() => (isDelta = false)}>Pi</button
      >
    </div>
    <div id="field-container">
      <!-- <div class="svg-container">
            <img src={} alt="" class="circuit-image">
        </div> -->
      <div id="delta-input-container" class:isDelta />
    </div>
  </div>
  <div id="arrow-container" />
  <div id="wye-container">
    <div class="network-type-chooser">
      <button
        class="network-button"
        class:selected={isWye}
        on:click={() => (isWye = true)}>Wye</button
      >
      <button
        class="network-button"
        class:selected={!isWye}
        on:click={() => (isWye = false)}>Tee</button
      >
    </div>
    <div id="field-container">
      <div id="wye-input-container" class:isWye />
    </div>
  </div>
</main>

<style type="scss">
  main {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0 1em;
    position: relative;

    /* border: solid 1px white; */

    @media (min-width: 900px) {
      display: grid;
      grid-template-columns: 1fr 40px 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: "delta arrow wye";
      grid-column-gap: 50px;
      justify-items: center;
    }

    /* Chrome, Safari, Edge, Opera */
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    & input[type="number"] {
      -moz-appearance: textfield;
    }
  }

  #arrow-container {
    align-items: center;
    color: #d4d4d4;
    display: flex;
    height: 100%;
    justify-content: center;
    /* padding-top: 40px; */
    width: 100%;

    * {
      font-size: 4em;
      /* font-weight: 600; */
    }
  }

  button.network-button {
    border: solid 1px #000000;
    border-radius: 2px;
    background-color: #333333;
    color: #abacae;
    filter: drop-shadow(0 3px 5px #0000007a);
    padding: 5px 0;
    width: 50px;
    &.selected {
      color: white;
    }
  }

  @mixin DeltaWyeContainer {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: min(100%, 450px);
    @media (min-width: 900px) {
      width: min(100%, 600px);
    }

    /* border: solid 1px white; */
  }

  #delta-container {
    @include DeltaWyeContainer;
    margin-bottom: 40px;
    @media (min-width: 900px) {
      grid-area: delta;
      margin-bottom: none;
    }
  }

  #wye-container {
    @media (min-width: 900px) {
      grid-area: wye;
    }
  }

  #field-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
    position: relative;
    width: min(100%, 450px);

    @media (min-width: 900px) {
      width: min(100%, 600px);
    }

    /* border: solid 1px white; */
  }

  .svg-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 100%;
    & * {
      width: 100%;
    }
  }

  .circuit-image {
    &.dimmed {
      filter: brightness(0.5);
    }
  }

  @mixin input-container {
    display: grid;
    height: 100%;
    justify-items: center;
    position: absolute;
    width: 100%;
    z-index: 10;

    input {
      align-self: center;
      width: min(100%, 200px);
      height: 2.25em;

      /* @media (min-width: 600px) {
      height: 3.5em;
      font-size: 1em;
    } */
    }

    /* border: solid 1px white; */
  }

  #delta-input-container {
    @include input-container;
    &.isDelta {
      grid-template-columns: 12.5% 1fr 1fr 1fr 12.5%;
      grid-template-rows: 1fr 20% 1fr 1fr 33%;
      grid-template-areas:
        ". . ra . ."
        ". . . . ."
        ". rb . rc ."
        ". rb . rc ."
        ". . . . .";
    }

    &:not(.isDelta) {
      grid-template-columns: 1fr 12.5% 1fr 12.5% 1fr;
      grid-template-rows: 1fr 20% 1fr 1fr 33%;
      grid-template-areas:
        ". . ra . ."
        ". . . . ."
        "rb . . . rc"
        "rb . . . rc"
        ". . . . .";
    }
    & *:nth-child(1) {
      grid-area: ra;
    }

    & *:nth-child(2) {
      grid-area: rb;
    }

    & *:nth-child(3) {
      grid-area: rc;
    }
  }

  #wye-input-container {
    @include input-container;
    &.isWye {
      grid-template-columns: 16% 1fr 1fr 1fr 16%;
      grid-template-rows: 6% 1fr 20% 1fr 20%;
      grid-template-areas:
        ". . . . ."
        ". r1 . r2 ."
        ". . . . ."
        ". . r3 . ."
        ". . . . .";
    }

    &:not(.isWye) {
      grid-template-columns: 16% 1fr 1fr 1fr 16%;
      grid-template-rows: 1fr 20% 2fr 33%;
      grid-template-areas:
        ". r1 . r2 ."
        ". . . . ."
        ". . r3 . ."
        ". . . . ."
        ". . . . .";
    }

    & *:nth-child(1) {
      grid-area: r1;
    }

    & *:nth-child(2) {
      grid-area: r2;
    }

    & *:nth-child(3) {
      grid-area: r3;
    }
  }
</style>
