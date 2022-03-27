<script lang="ts">
  import { ComponentUsedStore, DecimalPlaceStore } from "../stores";
  import type { componentUsedType } from "../utilities/types";
  export let mobileControlPanelOpen: boolean;
  export let isForMobile: boolean;

  function incrementer(isAdd: boolean) {
    if (isAdd) {
      if ($DecimalPlaceStore < 7) {
        DecimalPlaceStore.update(
          (currentDecimalPlace) => currentDecimalPlace + 1
        );
      }
    } else {
      if ($DecimalPlaceStore > 0) {
        DecimalPlaceStore.update(
          (currentDecimalPlace) => currentDecimalPlace - 1
        );
      }
    }
  }
</script>

<main class:shown={mobileControlPanelOpen} class:isMobile={isForMobile}>
  <div id="component-chooser-container">
    <button
      class:selected={$ComponentUsedStore === "R"}
      class="component-button"
      on:click={() => {
        ComponentUsedStore.set("R");
      }}>Resistor</button
    >
    <button
      class:selected={$ComponentUsedStore === "L"}
      class="component-button"
      on:click={() => {
        ComponentUsedStore.set("L");
      }}>Inductor</button
    >
    <button
      class:selected={$ComponentUsedStore === "C"}
      class="component-button"
      on:click={() => {
        ComponentUsedStore.set("C");
      }}>Capacitor</button
    >
  </div>
  <div id="decimal-container">
    <p>Precise to</p>
    <div id="decimal-input">
      <button
        class="incrementer"
        id="remover"
        on:click={() => incrementer(false)}>-</button
      >
      <input
        type="number"
        id="decimal-box"
        readonly
        bind:value={$DecimalPlaceStore}
      />
      <button class="incrementer" id="adder" on:click={() => incrementer(true)}
        >+</button
      >
    </div>
    <p>decimal places</p>
  </div>
  <button id="reset-button">Reset All Value</button>
</main>

<style lang="scss">
  main {
    align-items: center;
    display: none;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-end;
    padding: 0 1em;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }

    @media (min-width: 900px) {
      display: flex;
      justify-content: center;
    }

    &.mobile {
      display: none;
      &.shown {
        display: flex;
      }
    }
  }

  #component-chooser-container {
    align-items: center;
    display: flex;
    gap: 5px;
    justify-content: center;
  }

  @mixin baseButton {
    border: solid 1px #000000;
    border-radius: 2px;
    background-color: #333333;
    filter: drop-shadow(0 3px 5px #0000007a);
    padding: 5px 0;
    width: 75px;
  }

  .component-button {
    @include baseButton;
    color: #abacae;

    &.selected {
      color: white;
    }
  }

  #decimal-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    p {
      line-height: 2;
      text-align: center;
    }
  }

  .incrementer {
    background-color: #333333;
    color: white;
  }

  #decimal-input {
    display: grid;
    gap: 5px;
    grid-template-columns: 20px 50px 20px;
    /* grid-template-rows: 1fr; */
    grid-template-areas: "remover input adder";
  }

  #decimal-box {
    background-color: #333333;
    border: solid 2px #333333;
    border-radius: 4px;
    box-sizing: border-box;
    color: #ffffff;
    display: inline-block;
    filter: drop-shadow(0 3px 5px #0000007a);
    grid-area: input;
    outline: none;
    padding: 0.25em;
    text-align: center;
  }

  #reset-button {
    @include baseButton;
    align-self: center;
    color: whitesmoke;
    padding: 5px 10px;
    width: auto;
  }
</style>
