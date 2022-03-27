import { writable } from "svelte/store";
import type { componentUsedType } from "./utilities/types";

export const DecimalPlaceStore = writable(3);
export const ComponentUsedStore = writable("R" as componentUsedType)
export const AppReset = writable (true);