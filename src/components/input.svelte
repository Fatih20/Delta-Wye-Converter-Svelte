<script lang="ts">
  import {
    inputConnectedVariable,
    unitLongPrefix,
    unitOfComponentUsedType,
    unitLongPrefixArray,
    unitPrefixInformation,
    gridAreaType,
  } from "../utilities/types";
  import { CurrentUnitStore } from "../stores";

  import { isInputValidFloat } from "../utilities/inputValidation";
  export let externalValue: inputConnectedVariable;
  export let changeExternalValue: (arg0: inputConnectedVariable) => void;
  export let changeDtW: () => void;
  export let currentUnitPrefix: unitLongPrefix;
  export let gridArea: gridAreaType;
  //   export let currentUnit: unitOfComponentUsedType;

  function handleValueChange(e: any) {
    let newValue = e.target.value;

    if (isInputValidFloat(e, newValue)) {
      changeDtW();
      if (newValue.length > 0) {
        console.log(newValue);
        changeExternalValue(parseFloat(newValue));
      } else {
        changeExternalValue("");
      }
    }
  }
</script>

<main id={gridArea}>
  <input
    type="number"
    id="styled-input"
    value={externalValue}
    on:change={handleValueChange}
  />
  <select
    name="unit"
    id="styled-select"
    bind:value={currentUnitPrefix}
    on:change={() => console.log(currentUnitPrefix)}
  >
    {#each unitLongPrefixArray as prefix}
      <option value={prefix} class="styled-option">
        {unitPrefixInformation(prefix)[1]}
        {`${$CurrentUnitStore}`}
      </option>
    {/each}
  </select>
</main>

<style lang="scss">
  #ra {
    grid-area: ra;
  }

  #rb {
    grid-area: rb;
  }

  #rc {
    grid-area: rc;
  }

  #r1 {
    grid-area: r1;
  }

  #r2 {
    grid-area: r2;
  }
  #r3 {
    grid-area: r3;
  }

  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  #styled-input {
    align-self: center;
    background-color: #333333;
    border: solid 2px #333333;
    border-radius: 4px;
    box-sizing: border-box;
    color: #fafafa;
    filter: drop-shadow(0 3px 5px #0000007a);
    height: 2.25em;
    padding: 0.4em;
    width: min(100%, 200px);
  }

  #styled-select {
    background-color: #333333;
    border: solid 2px #333333;
    border-radius: 4px;
    box-sizing: border-box;
    color: #ffffff;
    filter: drop-shadow(0 3px 5px #0000007a);
    outline: none;
    padding: 0.25em;
    text-align: center;
  }
</style>
