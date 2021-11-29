<script>
    import { setContext } from "svelte";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";

    // Component imports
    //TODO: IMPORTS

    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
    let { actor, data, sheet } = $dataStore;
</script>

<content />

<style>
</style>
