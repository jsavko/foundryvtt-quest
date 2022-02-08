<script>
    export let str;
    let dump;
    $: dump = str.split(/\{(.*?)\}/);
</script>

{#each dump as chunk, key}
    {#if key != 0 && chunk === "1"}<slot name="1" />
    {:else if key != 0 && chunk === "2"}<slot name="2" />
    {:else if key != 0 && chunk === "3"}<slot name="3" />
    {:else}
        {chunk}
    {/if}
{/each}

<style>
</style>
