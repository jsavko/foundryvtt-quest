<script>
    import { getContext } from "svelte";
    import { identity } from "svelte/internal";
    import { writable } from "svelte/store";

    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    let abilities;
    $: data = $sheetData.data;
    $: abilityTypes = $sheetData.data.data.abilityTypes;
</script>

{#each { length: Object.keys(abilityTypes).length } as _, i}
    <h3>{Object.keys(abilityTypes)[i]}</h3>
    <ul>
        {#each abilityTypes[Object.keys(abilityTypes)[i]] as ability}
            <li>
                <div class="flex">
                    <div>
                        <a
                            on:click={(e) =>
                                // sheet.delete.id
                                {
                                    sheet?._chatAbility(ability.data._id);
                                }}
                            ><i class="cost">{ability.data.data.cost}</i></a
                        >{ability.name}
                    </div>
                    <div class="flex medium">
                        <a
                            on:click={(e) =>
                                // sheet.delete.id
                                {
                                    sheet?._onItemEdit(ability.data._id);
                                }}><i class="fas fa-info-circle" /></a
                        >

                        <a
                            on:click={(e) =>
                                // sheet.delete.id
                                {
                                    sheet?._onItemDelete(ability.data._id);
                                }}><i class="fas fa-trash" /></a
                        >
                    </div>
                </div>
            </li>
        {/each}
    </ul>
{/each}

<style>
    ul {
        padding-left: 15px;
        list-style-type: none;
    }
    li {
        line-height: 1.5;
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

    h3 {
        padding-left: 5px;
        font-family: "Alegreya Sans", sans-serif;
        font-weight: 900;
    }
</style>
