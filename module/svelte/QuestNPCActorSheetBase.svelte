<script>
    import { setContext } from "svelte";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";

    // Component imports
    //TODO: IMPORTS

    import QuestEditor from "./QuestEditor.svelte";
    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
    let { actor, data, sheet } = $dataStore;
</script>

<style>
</style>
