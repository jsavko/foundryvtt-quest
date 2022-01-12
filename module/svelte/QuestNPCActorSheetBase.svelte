<script>
    import { setContext } from "svelte";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";

    // Component imports
    //TODO: IMPORTS

    import QuestEditor from "./QuestEditor.svelte";
    //Exports
    //export let dataStore;
    //setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
    //let { actor, data, sheet } = $dataStore;

    export let dataStore;
    setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
    let { actor, data, sheet } = $dataStore;
    $: data = $dataStore.data;

    // File picker
    const filePicker = (event) => {
        const attr = event.currentTarget.dataset.edit;
        const current = getProperty(data, attr);
        const fp = new FilePicker({
            type: "image",
            current: current,
            callback: (path) => {
                actor.update({ [attr]: path });
            },
            top: sheet.position.top + 40,
            left: sheet.position.left + 10
        });
        return fp.browse();
    };

    const TextEditor = globalThis.TextEditor;
</script>

<div class="header flexrow">
    <div class="hitpoints">
        <label class="character-label" for="data.hp">HP:</label>
        <input
            type="number"
            class="hp"
            name="data.hp"
            data-dtype="Number"
            value={data.data.hp}
        />
    </div>
    <div class="roll-generic">
        <a on:click={sheet?._rollDice.bind(sheet)}
            ><i class="fas fa-dice-d20 fa-2x" /></a
        >
    </div>
    <div class="actionpoints">
        <label class="character-label" for="data.attack">ATK: </label>
        <input
            type="number"
            class="hp"
            name="data.attack"
            data-dtype="Number"
            value={data.data.attack}
        />
    </div>
</div>

<content>
    <img
        on:click={filePicker}
        class="profile"
        src={data.img}
        alt={data.name}
        data-edit="img"
        title={data.name}
        align="right"
    />

    <div class="input-field">
        <label> Name </label>
        <input
            class="name"
            name="name"
            type="text"
            value={data.name}
            placeholder="Name"
        />
    </div>
    <ul>
        {#each data.data.itemTypes.detail as detail}
            <li>
                <div class="flex">
                    <span class="Uncommon">{detail.name}</span>
                    <div class="right">
                        <a
                            on:click={(e) =>
                                // sheet.delete.id
                                {
                                    sheet?._onItemEdit(detail.data._id);
                                }}><i class="fas fa-pen" /></a
                        >

                        <a
                            on:click={(e) =>
                                // sheet.delete.id
                                {
                                    sheet?._onItemDelete(detail.data._id);
                                }}><i class="fas fa-trash" /></a
                        >
                    </div>
                </div>
                <p class="shrink">
                    {@html TextEditor.enrichHTML(detail.data.data.description)}
                </p>
            </li>
        {/each}
    </ul>

    <ul>
        {#each data.data.itemTypes.ability as ability}
            <li>
                <div class="flex">
                    <span class="Uncommon">{ability.name}</span>
                    <div class="right">
                        <a
                            on:click={(e) =>
                                // sheet.delete.id
                                {
                                    sheet?._onItemEdit(ability.data._id);
                                }}><i class="fas fa-pen" /></a
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
                <p class="shrink">
                    {@html TextEditor.enrichHTML(ability.data.data.description)}
                </p>
            </li>
        {/each}
    </ul>
</content>

<style>
    input {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px dashed black;
        border-radius: 0em;
        background: rgba(0, 0, 0, 0.03);
    }
    :global(.dotted) {
        border-top: none !important ;
        border-left: none !important;
        border-right: none !important;
        border-bottom: 1px dashed black !important;
        border-radius: 0em !important;
        background: rgba(0, 0, 0, 0.03) !important;
    }

    content {
        font-size: 16px;
        margin-top: 10px;
        display: block;
    }
    content p {
        padding: 5px 11px;
        line-height: 2;
    }

    content input {
        width: 60px;
    }

    content label {
        padding: 5px 11px;
    }

    .biography {
        flex: 1.75 1 0;
        order: 1;
        padding-right: 0.2rem;
        max-width: 580px;
    }

    .inventory-abilities {
        flex: 1 1 0;
        order: 2;
        margin-left: 0.3rem;
    }

    input.long {
        width: 300px;
    }

    input.name {
        width: 200px;
    }

    input.medium {
        width: 100px;
        text-align: center;
    }
    input.short {
        width: 50px;
        text-align: center;
    }

    .profile {
        flex: 0 1 150px;
        max-width: 150px;
        height: 150px;
        border-radius: 150px;
        border: 1px solid #adb5bd;
        margin-right: 0.5rem;
    }

    .inventory-abilities {
        flex: 1 1 0;
        order: 2;
        border-left: 2px groove #eeeeee;
        margin-left: 0.3rem;
    }

    .hitpoints {
        font-family: "Alegreya Sans", sans-serif;
        font-weight: 700;
        font-size: 1rem;
        margin-right: 0.2rem;
        color: #000;
        text-align: left;
    }
    .roll-generic {
        color: #000;
        text-align: center;
    }
    .roll-generic :hover {
        color: #f04828;
    }

    .actionpoints {
        font-family: "Alegreya Sans", sans-serif;
        font-weight: 700;
        font-size: 1rem;
        color: #000;
        text-align: right;
    }

    .hp,
    .ap {
        min-width: 20px;
        max-width: 60px;
        border: 1px solid #7a7971;
        border-radius: 0.3rem;
        font-size: 1.1rem;
        padding-left: 0.3rem;
    }

    .header {
        padding-bottom: 5px;
        border-bottom: 2px groove #eeeeee;
    }

    li span {
        padding-left: 10px;
        padding-right: 10px;
        font-family: "Alegreya Sans", sans-serif;
        font-weight: 700;
    }
    .flex {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .shrink {
        margin: auto;
        padding-top: 0;
        line-height: 1;
    }

    p {
        line-height: 1;
    }
</style>
