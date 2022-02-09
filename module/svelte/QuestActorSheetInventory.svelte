<script>
    import { getContext } from "svelte";
    import { identity } from "svelte/internal";
    import { writable } from "svelte/store";

    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    let abilities;
    $: data = $sheetData.data;
    $: items = $sheetData.data.data.itemTypes.item;
</script>

{#if !$sheetData.limited}
    <ol>
        {#each { length: 12 } as _, i}
            {#if !!items[i]}
                <li>
                    <div class="flex">
                        <span class={items[i].data.data.rarity}
                            >{items[i].data.name}</span
                        >
                        <div class="right">
                            {#if sheet.isEditable}<a
                                    on:click={(e) => {
                                        sheet?._chatAbility(items[i].data._id);
                                    }}><i class="fas fa-bullhorn" /></a
                                >
                                <a
                                    on:click={(e) => {
                                        sheet?._onItemEdit(items[i].data._id);
                                    }}><i class="fas fa-pen" /></a
                                >

                                <a
                                    on:click={(e) => {
                                        sheet?._onItemDelete(items[i].data._id);
                                    }}><i class="fas fa-trash" /></a
                                >{/if}
                        </div>
                    </div>
                </li>
            {:else}
                <li />
            {/if}
        {/each}
        {#if sheet.isEditable}
            <li style="list-style-type: none; text-align:right;">
                <a
                    on:click={sheet?._onItemCreate.bind(sheet)}
                    class="item-control item-create"
                    title="Create item"
                    data-type="item"><i class="fas fa-plus" /></a
                >
            </li>
        {/if}
    </ol>
{/if}

<style>
    ol {
        padding-left: 30px;
    }
    li {
        padding-left: 10px;
        padding-right: 10px;
        font-family: "Alegreya Sans", sans-serif;
        font-weight: 700;
        line-height: 2.5;
    }
    .flex {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .medium {
        width: 40px;
    }

    li i {
        opacity: 66%;
    }
    li i:hover {
        opacity: 100%;
    }
</style>
