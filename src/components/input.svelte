<script lang="ts">
  import {
    inputConnectedVariable,
    unitLongPrefix,
    unitOfComponentUsedType,
    unitLongPrefixArray,
    unitPrefixInformation,
  } from "../utilities/types";
  import { CurrentUnitStore } from "../stores";

  import { isInputValidFloat } from "../utilities/inputValidation";
  export let externalValue: inputConnectedVariable;
  export let changeExternalValue: (arg0: inputConnectedVariable) => void;
  export let changeDtW: () => void;
  export let currentUnitPrefix: unitLongPrefix;
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

<main>
  <input
    type="number"
    id="styled-input"
    value={externalValue}
    on:change={handleValueChange}
  />
  <select name="unit" id="styled-select" bind:value={currentUnitPrefix}>
    {#each unitLongPrefixArray as prefix}
      <option value={prefix} class="styled-option">
        {unitPrefixInformation(prefix)[1]}
        {`${$CurrentUnitStore}`}
      </option>
    {/each}
  </select>
</main>

<style lang="scss">
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }

  #styled-input {
    background-color: #333333;
    border: solid 2px #333333;
    border-radius: 4px;
    box-sizing: border-box;
    color: #fafafa;
    filter: drop-shadow(0 3px 5px #0000007a);
    padding: 0.4em;
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
