import { writable, derived } from "svelte/store";
import type { componentUsedType } from "./utilities/types";
import { unitOfComponentInformation } from "./utilities/types";

export const DecimalPlaceStore = writable(3);
export const ComponentUsedStore = writable("R" as componentUsedType);
export const CurrentUnitStore = derived(ComponentUsedStore, $ComponentUsedStore => unitOfComponentInformation($ComponentUsedStore));
export const AppReset = writable (true);