<script>
    import { setContext } from "svelte";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";
    import AutoComplete from "simple-svelte-autocomplete";
    import { dataset_dev } from "svelte/internal";
    import Tabs from "./Tabs.svelte";
    import QuestActorSheetInventory from "./QuestActorSheetInventory.svelte";
    import QuestActorSheetAbilities from "./QuestActorSheetAbilities.svelte";
    import Translation from "./Translation.svelte";

    // Component imports
    //TODO: IMPORTS

    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
    let { actor, data, sheet } = $dataStore;
    $: data = $dataStore.data;

    //TODO: Get rolls from compendiums
    //
    //console.log(roleList);

    let roles = game.quest.roleList;

    let featurebody = [
        game.i18n.localize("QUEST.Feature.Body.1"),
        game.i18n.localize("QUEST.Feature.Body.2"),
        game.i18n.localize("QUEST.Feature.Body.3"),
        game.i18n.localize("QUEST.Feature.Body.4"),
        game.i18n.localize("QUEST.Feature.Body.5"),
        game.i18n.localize("QUEST.Feature.Body.6"),
        game.i18n.localize("QUEST.Feature.Body.7"),
        game.i18n.localize("QUEST.Feature.Body.8"),
        game.i18n.localize("QUEST.Feature.Body.9"),
        game.i18n.localize("QUEST.Feature.Body.10"),
        game.i18n.localize("QUEST.Feature.Body.11"),
        game.i18n.localize("QUEST.Feature.Body.12"),
        game.i18n.localize("QUEST.Feature.Body.13"),
        game.i18n.localize("QUEST.Feature.Body.14"),
        game.i18n.localize("QUEST.Feature.Body.15"),
        game.i18n.localize("QUEST.Feature.Body.16"),
        game.i18n.localize("QUEST.Feature.Body.17"),
        game.i18n.localize("QUEST.Feature.Body.18")
    ];

    let featureface = [
        game.i18n.localize("QUEST.Feature.Face.1"),
        game.i18n.localize("QUEST.Feature.Face.2"),
        game.i18n.localize("QUEST.Feature.Face.3"),
        game.i18n.localize("QUEST.Feature.Face.4"),
        game.i18n.localize("QUEST.Feature.Face.5"),
        game.i18n.localize("QUEST.Feature.Face.6"),
        game.i18n.localize("QUEST.Feature.Face.7"),
        game.i18n.localize("QUEST.Feature.Face.8"),
        game.i18n.localize("QUEST.Feature.Face.9"),
        game.i18n.localize("QUEST.Feature.Face.10"),
        game.i18n.localize("QUEST.Feature.Face.11"),
        game.i18n.localize("QUEST.Feature.Face.12"),
        game.i18n.localize("QUEST.Feature.Face.13"),
        game.i18n.localize("QUEST.Feature.Face.14"),
        game.i18n.localize("QUEST.Feature.Face.15"),
        game.i18n.localize("QUEST.Feature.Face.16"),
        game.i18n.localize("QUEST.Feature.Face.17"),
        game.i18n.localize("QUEST.Feature.Face.18")
    ];

    let featurevibe = [
        game.i18n.localize("QUEST.Feature.Vibe.1"),
        game.i18n.localize("QUEST.Feature.Vibe.2"),
        game.i18n.localize("QUEST.Feature.Vibe.3"),
        game.i18n.localize("QUEST.Feature.Vibe.4"),
        game.i18n.localize("QUEST.Feature.Vibe.5"),
        game.i18n.localize("QUEST.Feature.Vibe.6"),
        game.i18n.localize("QUEST.Feature.Vibe.7"),
        game.i18n.localize("QUEST.Feature.Vibe.8"),
        game.i18n.localize("QUEST.Feature.Vibe.9"),
        game.i18n.localize("QUEST.Feature.Vibe.10"),
        game.i18n.localize("QUEST.Feature.Vibe.11"),
        game.i18n.localize("QUEST.Feature.Vibe.12"),
        game.i18n.localize("QUEST.Feature.Vibe.13"),
        game.i18n.localize("QUEST.Feature.Vibe.14"),
        game.i18n.localize("QUEST.Feature.Vibe.15"),
        game.i18n.localize("QUEST.Feature.Vibe.16"),
        game.i18n.localize("QUEST.Feature.Vibe.17"),
        game.i18n.localize("QUEST.Feature.Vibe.18")
    ];

    let styleoutfit = [
        game.i18n.localize("QUEST.Style.Outfit.1"),
        game.i18n.localize("QUEST.Style.Outfit.2"),
        game.i18n.localize("QUEST.Style.Outfit.3"),
        game.i18n.localize("QUEST.Style.Outfit.4"),
        game.i18n.localize("QUEST.Style.Outfit.5"),
        game.i18n.localize("QUEST.Style.Outfit.6"),
        game.i18n.localize("QUEST.Style.Outfit.7"),
        game.i18n.localize("QUEST.Style.Outfit.8"),
        game.i18n.localize("QUEST.Style.Outfit.9"),
        game.i18n.localize("QUEST.Style.Outfit.10"),
        game.i18n.localize("QUEST.Style.Outfit.11"),
        game.i18n.localize("QUEST.Style.Outfit.12"),
        game.i18n.localize("QUEST.Style.Outfit.13"),
        game.i18n.localize("QUEST.Style.Outfit.14"),
        game.i18n.localize("QUEST.Style.Outfit.15"),
        game.i18n.localize("QUEST.Style.Outfit.16"),
        game.i18n.localize("QUEST.Style.Outfit.17"),
        game.i18n.localize("QUEST.Style.Outfit.18"),
        game.i18n.localize("QUEST.Style.Outfit.19"),
        game.i18n.localize("QUEST.Style.Outfit.20"),
        game.i18n.localize("QUEST.Style.Outfit.21"),
        game.i18n.localize("QUEST.Style.Outfit.22"),
        game.i18n.localize("QUEST.Style.Outfit.23"),
        game.i18n.localize("QUEST.Style.Outfit.24"),
        game.i18n.localize("QUEST.Style.Outfit.25"),
        game.i18n.localize("QUEST.Style.Outfit.26"),
        game.i18n.localize("QUEST.Style.Outfit.27"),
        game.i18n.localize("QUEST.Style.Outfit.28"),
        game.i18n.localize("QUEST.Style.Outfit.29"),
        game.i18n.localize("QUEST.Style.Outfit.30"),
        game.i18n.localize("QUEST.Style.Outfit.31"),
        game.i18n.localize("QUEST.Style.Outfit.32"),
        game.i18n.localize("QUEST.Style.Outfit.33")
    ];

    let stylemovement = [
        game.i18n.localize("QUEST.Style.Movement.1"),
        game.i18n.localize("QUEST.Style.Movement.2"),
        game.i18n.localize("QUEST.Style.Movement.3"),
        game.i18n.localize("QUEST.Style.Movement.4"),
        game.i18n.localize("QUEST.Style.Movement.5"),
        game.i18n.localize("QUEST.Style.Movement.6"),
        game.i18n.localize("QUEST.Style.Movement.7"),
        game.i18n.localize("QUEST.Style.Movement.8"),
        game.i18n.localize("QUEST.Style.Movement.9"),
        game.i18n.localize("QUEST.Style.Movement.10"),
        game.i18n.localize("QUEST.Style.Movement.11"),
        game.i18n.localize("QUEST.Style.Movement.12"),
        game.i18n.localize("QUEST.Style.Movement.13"),
        game.i18n.localize("QUEST.Style.Movement.14"),
        game.i18n.localize("QUEST.Style.Movement.15"),
        game.i18n.localize("QUEST.Style.Movement.16"),
        game.i18n.localize("QUEST.Style.Movement.17"),
        game.i18n.localize("QUEST.Style.Movement.18")
    ];

    let homeland = [
        game.i18n.localize("QUEST.Homeland.1"),
        game.i18n.localize("QUEST.Homeland.2"),
        game.i18n.localize("QUEST.Homeland.3"),
        game.i18n.localize("QUEST.Homeland.4"),
        game.i18n.localize("QUEST.Homeland.5"),
        game.i18n.localize("QUEST.Homeland.6"),
        game.i18n.localize("QUEST.Homeland.7"),
        game.i18n.localize("QUEST.Homeland.8"),
        game.i18n.localize("QUEST.Homeland.9"),
        game.i18n.localize("QUEST.Homeland.10"),
        game.i18n.localize("QUEST.Homeland.11"),
        game.i18n.localize("QUEST.Homeland.12"),
        game.i18n.localize("QUEST.Homeland.13"),
        game.i18n.localize("QUEST.Homeland.14"),
        game.i18n.localize("QUEST.Homeland.15"),
        game.i18n.localize("QUEST.Homeland.16"),
        game.i18n.localize("QUEST.Homeland.17"),
        game.i18n.localize("QUEST.Homeland.18")
    ];

    let legacy = [
        game.i18n.localize("QUEST.Legacies.1"),
        game.i18n.localize("QUEST.Legacies.2"),
        game.i18n.localize("QUEST.Legacies.3"),
        game.i18n.localize("QUEST.Legacies.4"),
        game.i18n.localize("QUEST.Legacies.5"),
        game.i18n.localize("QUEST.Legacies.6"),
        game.i18n.localize("QUEST.Legacies.7"),
        game.i18n.localize("QUEST.Legacies.8"),
        game.i18n.localize("QUEST.Legacies.9"),
        game.i18n.localize("QUEST.Legacies.10"),
        game.i18n.localize("QUEST.Legacies.11"),
        game.i18n.localize("QUEST.Legacies.12"),
        game.i18n.localize("QUEST.Legacies.13"),
        game.i18n.localize("QUEST.Legacies.14"),
        game.i18n.localize("QUEST.Legacies.15"),
        game.i18n.localize("QUEST.Legacies.16"),
        game.i18n.localize("QUEST.Legacies.17"),
        game.i18n.localize("QUEST.Legacies.18"),
        game.i18n.localize("QUEST.Legacies.19"),
        game.i18n.localize("QUEST.Legacies.20"),
        game.i18n.localize("QUEST.Legacies.21"),
        game.i18n.localize("QUEST.Legacies.22")
    ];

    let ideal = [
        game.i18n.localize("QUEST.Ideals.1"),
        game.i18n.localize("QUEST.Ideals.2"),
        game.i18n.localize("QUEST.Ideals.3"),
        game.i18n.localize("QUEST.Ideals.4"),
        game.i18n.localize("QUEST.Ideals.5"),
        game.i18n.localize("QUEST.Ideals.6"),
        game.i18n.localize("QUEST.Ideals.7"),
        game.i18n.localize("QUEST.Ideals.8"),
        game.i18n.localize("QUEST.Ideals.9"),
        game.i18n.localize("QUEST.Ideals.10"),
        game.i18n.localize("QUEST.Ideals.11")
    ];

    let flaw = [
        game.i18n.localize("QUEST.Flaws.1"),
        game.i18n.localize("QUEST.Flaws.2"),
        game.i18n.localize("QUEST.Flaws.3"),
        game.i18n.localize("QUEST.Flaws.4"),
        game.i18n.localize("QUEST.Flaws.5"),
        game.i18n.localize("QUEST.Flaws.6"),
        game.i18n.localize("QUEST.Flaws.7"),
        game.i18n.localize("QUEST.Flaws.8"),
        game.i18n.localize("QUEST.Flaws.9"),
        game.i18n.localize("QUEST.Flaws.10"),
        game.i18n.localize("QUEST.Flaws.11")
    ];

    let dream = [
        game.i18n.localize("QUEST.Dreams.1"),
        game.i18n.localize("QUEST.Dreams.2"),
        game.i18n.localize("QUEST.Dreams.3"),
        game.i18n.localize("QUEST.Dreams.4"),
        game.i18n.localize("QUEST.Dreams.5"),
        game.i18n.localize("QUEST.Dreams.6"),
        game.i18n.localize("QUEST.Dreams.7"),
        game.i18n.localize("QUEST.Dreams.8"),
        game.i18n.localize("QUEST.Dreams.9"),
        game.i18n.localize("QUEST.Dreams.10"),
        game.i18n.localize("QUEST.Dreams.11"),
        game.i18n.localize("QUEST.Dreams.12"),
        game.i18n.localize("QUEST.Dreams.13"),
        game.i18n.localize("QUEST.Dreams.14"),
        game.i18n.localize("QUEST.Dreams.15"),
        game.i18n.localize("QUEST.Dreams.16"),
        game.i18n.localize("QUEST.Dreams.17"),
        game.i18n.localize("QUEST.Dreams.18"),
        game.i18n.localize("QUEST.Dreams.19"),
        game.i18n.localize("QUEST.Dreams.20"),
        game.i18n.localize("QUEST.Dreams.21"),
        game.i18n.localize("QUEST.Dreams.22"),
        game.i18n.localize("QUEST.Dreams.23"),
        game.i18n.localize("QUEST.Dreams.24"),
        game.i18n.localize("QUEST.Dreams.25"),
        game.i18n.localize("QUEST.Dreams.26"),
        game.i18n.localize("QUEST.Dreams.27"),
        game.i18n.localize("QUEST.Dreams.28")
    ];

    let selectedBody;
    let text = "New";
    let toCreateBody = "";
    let edit = sheet.isEditable;
    let editclass = "uneditable";

    // Allow sheet to be edited
    if (sheet.isEditable) {
        editclass = "";
    }

    //TODO: Need more eligant way to deal with this to remove all the extra functions here
    //This is just bad

    function handleCreate(newItem) {
        toCreateBody = "Creating " + newItem;
        featurebody.unshift(newItem);
        featurebody = featurebody;
        return newItem;
    }

    function handleCreateR(newItem) {
        toCreateBody = "Creating " + newItem;
        roles.unshift(newItem);
        roles = roles;
        return newItem;
    }

    function handleCreatef2(newItem) {
        toCreateBody = "Creating " + newItem;
        featureface.unshift(newItem);
        featureface = featureface;
        return newItem;
    }

    function handleCreatef3(newItem) {
        toCreateBody = "Creating " + newItem;
        featurevibe.unshift(newItem);
        featurevibe = featurevibe;
        return newItem;
    }

    function handleCreates1(newItem) {
        toCreateBody = "Creating " + newItem;
        styleoutfit.unshift(newItem);
        styleoutfit = styleoutfit;
        return newItem;
    }

    function handleCreates2(newItem) {
        toCreateBody = "Creating " + newItem;
        stylemovement.unshift(newItem);
        stylemovement = stylemovement;
        return newItem;
    }
    function handleCreateh1(newItem) {
        toCreateBody = "Creating " + newItem;
        homeland.unshift(newItem);
        homeland = homeland;
        return newItem;
    }
    function handleCreateh2(newItem) {
        toCreateBody = "Creating " + newItem;
        legacy.unshift(newItem);
        legacy = legacy;
        return newItem;
    }
    function handleCreateI(newItem) {
        toCreateBody = "Creating " + newItem;
        ideal.unshift(newItem);
        ideal = ideal;
        return newItem;
    }
    function handleCreateF(newItem) {
        toCreateBody = "Creating " + newItem;
        flaw.unshift(newItem);
        flaw = flaw;
        return newItem;
    }
    function handleCreateD(newItem) {
        toCreateBody = "Creating " + newItem;
        dream.unshift(newItem);
        dream = dream;
        return newItem;
    }

    //Setup Tabs

    let items = [
        {
            label: game.i18n.localize("QUEST.Inventory"),
            value: 1,
            component: QuestActorSheetInventory
        },
        {
            label: game.i18n.localize("QUEST.Abilities"),
            value: 2,
            component: QuestActorSheetAbilities
        }
    ];

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
</script>

<div class="header flexrow">
    <div class="hitpoints">
        <label class="character-label" for="data.hp"
            >{game.i18n.localize("QUEST.HP")}</label
        >
        <input
            type="number"
            class="hp {editclass}"
            name="data.hp"
            data-dtype="Number"
            value={data.data.hp}
        /> / 10
    </div>
    <div class="roll-generic">
        <a on:click={sheet?._rollDice.bind(sheet)}
            ><i class="fas fa-dice-d20 fa-2x" /></a
        >
    </div>
    <div class="actionpoints">
        <label class="character-label" for="data.actionpoints"
            >{game.i18n.localize("QUEST.AP")}
        </label>
        <input
            type="number"
            class="hp {editclass}"
            name="data.ap"
            data-dtype="Number"
            value={data.data.ap}
        />
    </div>
</div>
<div class="details flexrow flex2">
    <div class="biography flexcol flex1">
        <content>
            <p>
                <img
                    on:click={filePicker}
                    class="profile {editclass}"
                    src={data.img}
                    alt={data.name}
                    data-edit="img"
                    title={data.name}
                    align="left"
                />

                <Translation str={game.i18n.localize("QUEST.Actor.Hello")}>
                    <span slot="1">
                        <input
                            class="dotted long name quest {editclass}"
                            name="name"
                            type="text"
                            value={data.name}
                            placeholder={game.i18n.localize("QUEST.Name")}
                        />
                    </span>
                </Translation>
                <br />(<input
                    class="dotted medium {editclass}"
                    name="data.pronouns"
                    type="text"
                    value={data.data.pronouns}
                    placeholder={game.i18n.localize("QUEST.Pronouns")}
                />).
            </p>
            <p>
                <Translation str={game.i18n.localize("QUEST.Actor.AgeHeight")}>
                    <span slot="1">
                        <input
                            class="dotted short {editclass}"
                            name="data.age"
                            type="number"
                            value={data.data.age}
                            placeholder={game.i18n.localize("QUEST.Age")}
                        />
                    </span>
                    <span slot="2">
                        <input
                            class="dotted medium {editclass}"
                            name="data.height"
                            type="text"
                            value={data.data.height}
                            placeholder={game.i18n.localize("QUEST.Height")}
                        />
                    </span>
                </Translation>
            </p>
            <p>
                <Translation str={game.i18n.localize("QUEST.Actor.IAm")}>
                    <span slot="1">
                        <AutoComplete
                            placeholder={game.i18n.localize("QUEST.Role")}
                            items={roles}
                            inputClassName="dotted medium {editclass}"
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreateR}
                            bind:selectedItem={data.data.role}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                </Translation>
            </p>
            <p>
                <Translation
                    str={game.i18n.localize("QUEST.Actor.BodyFaceVibe")}
                >
                    <span slot="1">
                        <AutoComplete
                            items={featurebody}
                            placeholder={game.i18n.localize("QUEST.Body")}
                            inputClassName="dotted long {editclass}"
                            bind:selectedItem={data.data.featurebody}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreate}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                    <span slot="2"
                        ><AutoComplete
                            items={featureface}
                            placeholder={game.i18n.localize("QUEST.Face")}
                            inputClassName="dotted long {editclass}"
                            bind:selectedItem={data.data.featureface}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreatef2}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        /></span
                    >

                    <span slot="3">
                        <AutoComplete
                            items={featurevibe}
                            inputClassName="dotted long {editclass}"
                            placeholder={game.i18n.localize("QUEST.Vibe")}
                            bind:selectedItem={data.data.featurevibe}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreatef3}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                </Translation>
            </p>
            <p>
                <Translation str={game.i18n.localize("QUEST.Actor.Style")}>
                    <span slot="1">
                        <AutoComplete
                            items={styleoutfit}
                            placeholder={game.i18n.localize("QUEST.Outfit")}
                            inputClassName="dotted long {editclass}"
                            bind:selectedItem={data.data.style1}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreates1}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                    <span slot="2">
                        <AutoComplete
                            items={styleoutfit}
                            placeholder={game.i18n.localize("QUEST.Outfit")}
                            inputClassName="dotted long {editclass}"
                            bind:selectedItem={data.data.style2}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreates1}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                    <span slot="3">
                        <AutoComplete
                            items={stylemovement}
                            inputClassName="dotted long {editclass}"
                            placeholder={game.i18n.localize("QUEST.Movement")}
                            bind:selectedItem={data.data.style3}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreates2}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                </Translation>
            </p>
            <p>
                <Translation str={game.i18n.localize("QUEST.Actor.Home")}>
                    <span slot="1">
                        <AutoComplete
                            items={homeland}
                            inputClassName="dotted long {editclass}"
                            placeholder={game.i18n.localize("QUEST.Home")}
                            bind:selectedItem={data.data.home}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreateh1}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                    <span slot="2">
                        <AutoComplete
                            items={legacy}
                            className="verylong {editclass}"
                            inputClassName="dotted"
                            placeholder={game.i18n.localize("QUEST.Legacy")}
                            bind:selectedItem={data.data.community}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreateh2}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                </Translation>
            </p>
            <p>
                <Translation str={game.i18n.localize("QUEST.Actor.Ideal")}>
                    <span slot="1">
                        <AutoComplete
                            items={ideal}
                            placeholder={game.i18n.localize("QUEST.Ideal")}
                            inputClassName="dotted long {editclass}"
                            bind:selectedItem={data.data.ideal}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreateI}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                    <span slot="2">
                        <AutoComplete
                            items={flaw}
                            inputClassName="dotted long {editclass}"
                            placeholder={game.i18n.localize("QUEST.Flaw")}
                            bind:selectedItem={data.data.flaw}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreateF}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                </Translation>
            </p>
            <p>
                <Translation str={game.i18n.localize("QUEST.Actor.Dream")}>
                    <span slot="1">
                        <AutoComplete
                            items={dream}
                            className="verylong"
                            inputClassName="dotted {editclass}"
                            placeholder={game.i18n.localize("QUEST.Dream")}
                            bind:selectedItem={data.data.dream}
                            create={true}
                            createText={"Item doesn't exist, create one?"}
                            onCreate={handleCreateD}
                            onChange={(e) => {
                                sheet?._onSubmit(new Event("submit"));
                            }}
                        />
                    </span>
                </Translation>
            </p>
            <input
                class="long"
                name="data.role"
                type="hidden"
                value={data.data.role}
                placeholder="Role"
            />
            <input
                class="long"
                name="data.featurebody"
                type="hidden"
                value={data.data.featurebody}
                placeholder="Body"
            />
            <input
                class="long"
                name="data.featureface"
                type="hidden"
                value={data.data.featureface}
                placeholder="Face"
            />
            <input
                class="long"
                name="data.featurevibe"
                type="hidden"
                value={data.data.featurevibe}
                placeholder="Vibe"
            />
            <input
                class="long"
                name="data.style1"
                type="hidden"
                value={data.data.style1}
                placeholder="Outfit"
            />
            <input
                class="long"
                name="data.style2"
                type="hidden"
                value={data.data.style2}
                placeholder="Outfit"
            />
            <input
                class="long"
                name="data.style3"
                type="hidden"
                value={data.data.style3}
                placeholder="Movement"
            />
            <input
                class="long"
                name="data.home"
                type="hidden"
                value={data.data.home}
                placeholder="My Home"
            />
            <input
                class="long"
                name="data.community"
                type="hidden"
                value={data.data.community}
                placeholder=""
            />
            <input
                class="long"
                name="data.ideal"
                type="hidden"
                value={data.data.ideal}
                placeholder="my ideal"
            />
            <input
                class="long"
                name="data.flaw"
                type="hidden"
                value={data.data.flaw}
                placeholder="flaw"
            />
            <input
                class="long"
                name="data.dream"
                type="hidden"
                value={data.data.dream}
                placeholder="my dream"
            />
        </content>
    </div>
    <div class="inventory-abilities flexcol flex1">
        <content><Tabs {items} /></content>
    </div>
</div>

<style>
    input :global(.quest) {
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

    :global(.uneditable) {
        pointer-events: none;
        font-weight: bold;
    }
</style>
