<script>
    import { getContext } from "svelte";
    import { identity } from "svelte/internal";
    import { writable } from "svelte/store";

    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    let abilities;
    $: data = $sheetData.data;
</script>

<ol>
    {#each { length: 12 } as _, i}
        {#if !!items[i]}
            <li>
                {items[i].data.name}
                <a
                    on:click={(e) =>
                        // sheet.delete.id
                        {
                            sheet?._onItemDelete(items[i].data._id);
                        }}>[delete]</a
                >
            </li>
        {:else}
            <li />
        {/if}
    {/each}
    <li>Add Item</li>
</ol>

<style>
    ol {
        padding-left: 30px;
    }
    li {
        padding-left: 10px;
        font-family: "Alegreya Sans", sans-serif;
        font-weight: 700;
        line-height: 2.5;
    }
</style>
