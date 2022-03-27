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
