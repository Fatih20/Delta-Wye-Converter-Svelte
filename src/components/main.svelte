<script lang="ts">
  import ValidatedInput from "./input.svelte";
  import { ComponentUsedStore, DecimalPlaceStore } from "../stores";
  import { conversionFunction } from "../utilities/conversionLogic";
  import type {
    inputConnectedVariable,
    unitLongPrefix,
  } from "../utilities/types";
  import Input from "./input.svelte";

  const rootPath = "CompressedCircuitImages/";

  interface ICircuitTypeIndex {
    L: string;
    C: string;
    R: string;
  }

  const deltaIndex: ICircuitTypeIndex = {
    R: `${rootPath}Delta.svg`,
    L: `${rootPath}DeltaInductor.svg`,
    C: `${rootPath}DeltaCapacitor.svg`,
  };

  const piIndex: ICircuitTypeIndex = {
    R: `${rootPath}Pi.svg`,
    L: `${rootPath}PiInductor.svg`,
    C: `${rootPath}PiCapacitor.svg`,
  };

  const wyeIndex: ICircuitTypeIndex = {
    R: `${rootPath}Wye.svg`,
    L: `${rootPath}WyeInductor.svg`,
    C: `${rootPath}WyeCapacitor.svg`,
  };

  const teeIndex: ICircuitTypeIndex = {
    R: `${rootPath}Tee.svg`,
    L: `${rootPath}TeeInductor.svg`,
    C: `${rootPath}TeeCapacitor.svg`,
  };

  type keyIndex = keyof typeof deltaIndex;

  let raValue: inputConnectedVariable = "";
  let rbValue: inputConnectedVariable = "";
  let rcValue: inputConnectedVariable = "";

  let raUnitPrefix: unitLongPrefix = "none";
  let rbUnitPrefix: unitLongPrefix = "none";
  let rcUnitPrefix: unitLongPrefix = "none";

  let r1UnitPrefix: unitLongPrefix = "none";
  let r2UnitPrefix: unitLongPrefix = "none";
  let r3UnitPrefix: unitLongPrefix = "none";

  let r1Value: inputConnectedVariable = "";
  let r2Value: inputConnectedVariable = "";
  let r3Value: inputConnectedVariable = "";

  let isDelta = true;
  let isWye = true;
  let convertingDtW = true;

  $: conversionFunctionUsed = conversionFunction(
    $ComponentUsedStore,
    convertingDtW
  );

  function recalculateDelta(
    r1Value: inputConnectedVariable,
    r1UnitPrefix: unitLongPrefix,
    r2Value: inputConnectedVariable,
    r2UnitPrefix: unitLongPrefix,
    r3Value: inputConnectedVariable,
    r3UnitPrefix: unitLongPrefix,
    DecimalPlaceStore: number
  ) {
    if (!(r1Value === "" || r2Value === "" || r3Value === "")) {
      [raValue, raUnitPrefix, rbValue, rbUnitPrefix, rcValue, rcUnitPrefix] =
        conversionFunctionUsed(
          r1Value,
          r1UnitPrefix,
          r2Value,
          r2UnitPrefix,
          r3Value,
          r3UnitPrefix,
          DecimalPlaceStore
        );
    } else {
      [raValue, raUnitPrefix, rbValue, rbUnitPrefix, rcValue, rcUnitPrefix] = [
        "",
        "none",
        "",
        "none",
        "",
        "none",
      ];
    }
  }

  $: console.log(raUnitPrefix);
  $: console.log(rbUnitPrefix);
  $: console.log(rcUnitPrefix);

  function recalculateWye(
    raValue: inputConnectedVariable,
    raUnitPrefix: unitLongPrefix,
    rbValue: inputConnectedVariable,
    rbUnitPrefix: unitLongPrefix,
    rcValue: inputConnectedVariable,
    rcUnitPrefix: unitLongPrefix,
    DecimalPlaceStore: number
  ) {
    console.log("Bruh");
    if (!(raValue === "" || rbValue === "" || rcValue === "")) {
      [r1Value, r1UnitPrefix, r2Value, r2UnitPrefix, r3Value, r3UnitPrefix] =
        conversionFunctionUsed(
          raValue,
          raUnitPrefix,
          rbValue,
          rbUnitPrefix,
          rcValue,
          rcUnitPrefix,
          DecimalPlaceStore
        );
    } else {
      [r1Value, r1UnitPrefix, r2Value, r2UnitPrefix, r3Value, r3UnitPrefix] = [
        "",
        "none",
        "",
        "none",
        "",
        "none",
      ];
    }
  }

  $: convertingDtW
    ? recalculateWye(
        raValue,
        raUnitPrefix,
        rbValue,
        rbUnitPrefix,
        rcValue,
        rcUnitPrefix,
        $DecimalPlaceStore
      )
    : recalculateDelta(
        r1Value,
        r1UnitPrefix,
        r2Value,
        r2UnitPrefix,
        r3Value,
        r3UnitPrefix,
        $DecimalPlaceStore
      );

  $: deltaImageUsed = (isDelta ? deltaIndex : piIndex)[$ComponentUsedStore];
  $: wyeImageUSed = (isWye ? wyeIndex : teeIndex)[$ComponentUsedStore];

  // Coba approach yang lain. Gunakan event dispatcher on:change di tiap input. Lalu buat supaya ketika input di-change, rekalkulasi wye atau delta (tergantung itu input yang mana) dilakukan.
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
      <div class="svg-container">
        <img
          src={deltaImageUsed}
          alt="{isDelta ? 'Delta' : 'Pi'} circuit"
          class="circuit-image"
        />
      </div>
      <div id="delta-input-container" class:isDelta>
        <ValidatedInput
          externalValue={raValue}
          changeExternalValue={(newValue) => {
            raValue = newValue;
          }}
          changeDtW={() => {
            convertingDtW = true;
          }}
          currentUnitPrefix={raUnitPrefix}
        />
        <ValidatedInput
          externalValue={rbValue}
          changeExternalValue={(newValue) => {
            rbValue = newValue;
          }}
          changeDtW={() => {
            convertingDtW = true;
          }}
          currentUnitPrefix={rbUnitPrefix}
        />
        <ValidatedInput
          externalValue={rcValue}
          changeExternalValue={(newValue) => {
            rcValue = newValue;
          }}
          changeDtW={() => {
            convertingDtW = true;
          }}
          currentUnitPrefix={rcUnitPrefix}
        />
      </div>
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
      <div class="svg-container">
        <img
          src={wyeImageUSed}
          alt="{isWye ? 'Wye' : 'Tee'} circuit"
          class="circuit-image"
        />
      </div>

      <div id="wye-input-container" class:isWye>
        <ValidatedInput
          externalValue={r1Value}
          changeExternalValue={(newValue) => {
            r1Value = newValue;
          }}
          changeDtW={() => {
            convertingDtW = false;
          }}
          currentUnitPrefix={r1UnitPrefix}
        />
        <ValidatedInput
          externalValue={r2Value}
          changeExternalValue={(newValue) => {
            r2Value = newValue;
          }}
          changeDtW={() => {
            convertingDtW = false;
          }}
          currentUnitPrefix={r2UnitPrefix}
        />
        <ValidatedInput
          externalValue={r3Value}
          changeExternalValue={(newValue) => {
            r3Value = newValue;
          }}
          changeDtW={() => {
            convertingDtW = false;
          }}
          currentUnitPrefix={r3UnitPrefix}
        />
      </div>
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

  .network-type-chooser {
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px 0;
    width: 100%;
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
    @include DeltaWyeContainer;

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
    *:nth-child(1) {
      grid-area: ra;
    }

    *:nth-child(2) {
      grid-area: rb;
    }

    *:nth-child(3) {
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

    * {
      color: red;
    }

    *:nth-child(1) {
      grid-area: r1;
    }

    *:nth-child(2) {
      grid-area: r2;
    }

    *:nth-child(3) {
      grid-area: r3;
    }
  }
</style>
