<script>
    import { setContext } from "svelte";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";
    import AutoComplete from "simple-svelte-autocomplete";
    import { dataset_dev } from "svelte/internal";
    import Tabs from "./Tabs.svelte";
    import QuestActorSheetInventory from "./QuestActorSheetInventory.svelte";
    import QuestActorSheetAbilities from "./QuestActorSheetAbilities.svelte";

    // Component imports
    //TODO: IMPORTS

    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
    let { actor, data, sheet } = $dataStore;
    $: data = $dataStore.data;

    const roles = [
        "Fighter",
        "Invoker",
        "Ranger",
        "Naturalist",
        "Doctor",
        "Spy",
        "Magician",
        "Wizard"
    ];

    let featurebody = [
        "scales",
        "worn scars",
        "iridescent skin",
        "rack of muscles",
        "towering physique",
        "speckled complexion",
        "barrel-sized belly",
        "head of tentacles",
        "generous curves",
        "elongated limbs",
        "bumpy exterior",
        "willowy frame",
        "sculpted hair",
        "stout stature",
        "lived-in body",
        "vestigial tail",
        "webbed fins",
        "rough hide"
    ];

    let featureface = [
        "gaunt face",
        "sharp teeth",
        "fulsome cheeks",
        "large pointy ears",
        "vestigial antennae",
        "knee-length beard",
        "devastating smile",
        "windswept face",
        "manicured fuzz",
        "ridged forehead",
        "triangular head",
        "timeworn face",
        "romantic eyes",
        "severe jawline",
        "skeptical eyes",
        "radiant smile",
        "burning eyes",
        "heavy brows"
    ];

    let featurevibe = [
        "long shadow",
        "sleepy mood",
        "sparkling gaze",
        "eternal grimace",
        "bursting energy",
        "an air of mystery",
        "gentle disposition",
        "androgynous vibes",
        "thousand-yard stare",
        "tightly wound energy",
        "brooding presence",
        "friendly demeanor",
        "meandering gaze",
        "graceful posture",
        "captivating grin",
        "raucous laugh",
        "flawless poise",
        "fiery temper"
    ];

    let styleoutfit = [
        "tched leather armor",
        "a billowing jumpsuit",
        "a tightly fitted tunic",
        "religious vestments",
        "nicked chainmail",
        "runes in my hair",
        "a fluttering cape",
        "weathered rags",
        "a layered dress",
        "a warm cloak",
        "an owl pin",
        "a charmed necklace",
        "a ragged headcover",
        "antique eyeglasses",
        "a patterned hijab",
        "a silken eyepatch",
        "fingerless gloves",
        "a quilted jacket",
        "encrusted cuffs",
        "a feathered cap",
        "a boned bodice",
        "a fancy hat",
        "a bronze breastplate",
        "oversized spectacles",
        "a homemade charm",
        "hammered earrings",
        "an ornamented belt",
        "a shining hauberk",
        "an animal brooch",
        "obsidian bracers",
        "a symbol of god",
        "a tarnished ring",
        "a humble tunic"
    ];

    let stylemovement = [
        "no sense of urgency",
        "an effortless glide",
        "frenzied footwork",
        "a confident step",
        "great difficulty",
        "a reliable pace",
        "wide-swinging arms",
        "a spring in my step",
        "a singularpurpose",
        "no sense of space",
        "music inmy feet",
        "an uneven gait",
        "a joyful whistle",
        "relentless focus",
        "casual swagger",
        "apprehension",
        "a heavy step",
        "fearlessness"
    ];

    let homeland = [
        "a great metropolis",
        "a remote village",
        "afrontier town",
        "a lonely island",
        "a capital city",
        "a seastead",
        "a remote stronghold",
        "a traveling caravan",
        "a hidden warren",
        "a working farm",
        "a roadside inn",
        "a ship atsea",
        "a place I can't name",
        "a subterranean city",
        "a forgotten nation",
        "a mountain town",
        "a city in the mist",
        "a homestead"
    ];

    let legacy = [
        "their steady pursuit of pleasure",
        "theireasygoing temperament",
        "their unhurried sense of time",
        "treating strangers with love",
        "restoring justice to the land",
        "onceruling a vast empire",
        "creating a worldwonder",
        "enduring a great tragedy",
        "theirneutral rationality",
        "their warm hospitality",
        "a culture of secrecy",
        "non-hierarchical relationships",
        "plainly stating their intentions",
        "their sense of duty to each other ",
        "resisting a brutal ruling order",
        "creating historic works of art",
        "strict adherence to the law",
        "their commercial success",
        "setting cultural trends",
        "their tradition always",
        "inventing the future",
        "losing a great war"
    ];

    let ideal = [
        "Order",
        "Justice",
        "Heroism",
        "Compassion",
        "Generosity",
        "Pleasure",
        "Pragmatism",
        "Honor",
        "Power",
        "Salvation",
        "The Ends"
    ];

    let flaw = [
        "Fearful",
        "Megalomaniac",
        "Idiot",
        "Impish",
        "Oblivious",
        "Thief",
        "hedonist",
        "liar",
        "reckless",
        "wrathful",
        "vain"
    ];

    let dream = [
        "returning to my hometown as a renowned hero",
        "freeing myself from agang that wants me dead",
        "getting revengeon someone who wronged me",
        "finding a corner of the world to make my own",
        "publishing a book that's found in everyhome",
        "sparking an idea that transforms the world",
        "becoming the greatest scholarin my field",
        "recovering a stolen artifact for my people",
        "stealing from the rich togive to the poor",
        "having my name spoken by my leader",
        "meeting my parents for the first time",
        "spreading my ideal across theland",
        "overturning a corrupt government",
        "producing a timeless work of art",
        "becoming tremendously wealthy",
        "finding thesource of eternal life",
        "becoming a leaderof my nation",
        "becoming a notorious gambler",
        "making every stranger smile",
        "becoming a master artisan",
        "dying an honorable death",
        "mapping the entir eworld",
        "meeting the grim reaper",
        "pullingoff the big score",
        "traveling to the stars",
        "becoming a celebrity",
        "meeting my god(s)",
        "killing my past"
    ];

    let selectedBody;
    let text = "New";
    let toCreateBody = "";
    let edit = true;

    if (data.data.dream == "") {
        edit = true;
    }

    function handleCreate(newItem) {
        toCreateBody = "Creating " + newItem;
        featurebody.unshift(newItem);
        featurebody = featurebody;
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
        { label: "Inventory", value: 1, component: QuestActorSheetInventory },
        {
            label: "Abilities",
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
        <label class="character-label" for="data.hp">HP:</label>
        <input
            type="number"
            class="hp"
            name="data.hp"
            data-dtype="Number"
            value={data.data.hp}
        /> / 10
    </div>
    <div class="roll-generic"><i class="fas fa-dice-d20 fa-2x" /></div>
    <div class="actionpoints">
        <label class="character-label" for="data.actionpoints">AP: </label>
        <input
            type="number"
            class="hp"
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
                    class="profile"
                    src={data.img}
                    alt={data.name}
                    data-edit="img"
                    title={data.name}
                    align="left"
                />
                Hi, my name is
                <input
                    class="name"
                    name="name"
                    type="text"
                    value={data.name}
                    placeholder="Name"
                />
                <br />(<input
                    class="medium"
                    name="data.pronouns"
                    type="text"
                    value={data.data.pronouns}
                    placeholder="Pronouns"
                />).
            </p>
            <p>
                I'm {#if !!edit}
                    <input
                        class="short"
                        name="data.age"
                        type="number"
                        value={data.data.age}
                        placeholder="Age"
                    />
                {:else}<strong>{data.data.age}</strong>{/if}. years old and
                stand
                {#if !!edit}
                    <input
                        class="medium"
                        name="data.height"
                        type="text"
                        value={data.data.height}
                        placeholder="Height"
                    />
                {:else}<strong>{data.data.height}</strong>{/if}
                tall.
            </p>
            <p>
                I'm the party's <input
                    class="long"
                    name="data.role"
                    type="hidden"
                    value={data.data.role}
                    placeholder="Role"
                />
                {#if !!edit}
                    <AutoComplete
                        placeholder="Role"
                        items={roles}
                        inputClassName="dotted medium"
                        bind:selectedItem={data.data.role}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />
                {:else}
                    <strong>{data.data.role}</strong>
                {/if}.
            </p>
            <p>
                When people see me, they first notice my <input
                    class="long"
                    name="data.featurebody"
                    type="hidden"
                    x
                    value={data.data.featurebody}
                    placeholder="Body"
                />
                {#if !!edit}
                    <AutoComplete
                        items={featurebody}
                        placeholder="Body"
                        inputClassName="dotted long"
                        bind:selectedItem={data.data.featurebody}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreate}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />
                {:else}
                    <strong>{data.data.featurebody}</strong>
                {/if},
                <input
                    class="long"
                    name="data.featureface"
                    type="hidden"
                    value={data.data.featureface}
                    placeholder="Face"
                />
                {#if !!edit}
                    <AutoComplete
                        items={featureface}
                        placeholder="Face"
                        inputClassName="dotted long"
                        bind:selectedItem={data.data.featureface}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreatef2}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}
                    <strong>{data.data.featureface}</strong>{/if}, and
                <input
                    class="long"
                    name="data.featurevibe"
                    type="hidden"
                    value={data.data.featurevibe}
                    placeholder="Vibe"
                />
                {#if !!edit}<AutoComplete
                        items={featurevibe}
                        inputClassName="dotted long"
                        placeholder="Vibe"
                        bind:selectedItem={data.data.featurevibe}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreatef3}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}
                    <strong>{data.data.featurevibe}</strong>{/if}.
            </p>
            <p>
                I wear <input
                    class="long"
                    name="data.style1"
                    type="hidden"
                    value={data.data.style1}
                    placeholder="Outfit"
                />
                {#if !!edit}<AutoComplete
                        items={styleoutfit}
                        placeholder="Outfit"
                        inputClassName="dotted long"
                        bind:selectedItem={data.data.style1}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreates1}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}<strong>{data.data.style1}</strong>{/if}
                ,
                <input
                    class="long"
                    name="data.style2"
                    type="hidden"
                    value={data.data.style2}
                    placeholder="Outfit"
                />
                {#if !!edit}<AutoComplete
                        items={styleoutfit}
                        placeholder="Outfit"
                        inputClassName="dotted long"
                        bind:selectedItem={data.data.style2}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreates1}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}<strong>{data.data.style2}</strong>{/if}
                , and move with
                <input
                    class="long"
                    name="data.style3"
                    type="hidden"
                    value={data.data.style3}
                    placeholder="Movement"
                />
                {#if !!edit}<AutoComplete
                        items={stylemovement}
                        inputClassName="dotted long"
                        placeholder="Movement"
                        bind:selectedItem={data.data.style3}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreates2}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}<strong>{data.data.style3}</strong>{/if}
                .
            </p>
            <p>
                I'm from <input
                    class="long"
                    name="data.home"
                    type="hidden"
                    value={data.data.home}
                    placeholder="My Home"
                />
                {#if !!edit}<AutoComplete
                        items={homeland}
                        inputClassName="dotted long"
                        placeholder="My Home"
                        bind:selectedItem={data.data.home}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreateh1}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}
                    <strong>{data.data.home}</strong>{/if}
                where my people are known for
                <input
                    class="long"
                    name="data.community"
                    type="hidden"
                    value={data.data.community}
                    placeholder=""
                />
                {#if !!edit}<AutoComplete
                        items={legacy}
                        className="verylong"
                        inputClassName="dotted"
                        placeholder="Legacy"
                        bind:selectedItem={data.data.community}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreateD}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}<strong>{data.data.community}</strong>{/if}.
            </p>
            <p>
                I believe in <input
                    class="long"
                    name="data.ideal"
                    type="hidden"
                    value={data.data.ideal}
                    placeholder="my ideal"
                />
                {#if !!edit}<AutoComplete
                        items={ideal}
                        placeholder="Ideal"
                        inputClassName="dotted long"
                        bind:selectedItem={data.data.ideal}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreateI}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}<strong>{data.data.ideal}</strong>{/if}
                , but my
                <input
                    class="long"
                    name="data.flaw"
                    type="hidden"
                    value={data.data.flaw}
                    placeholder="flaw"
                />
                {#if !!edit}<AutoComplete
                        items={flaw}
                        inputClassName="dotted long"
                        placeholder="Flaw"
                        bind:selectedItem={data.data.flaw}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreateF}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}<strong>{data.data.flaw}</strong>{/if}
                side can get in the way.
            </p>
            <p>
                I dream of <input
                    class="long"
                    name="data.dream"
                    type="hidden"
                    value={data.data.dream}
                    placeholder="my dream"
                />
                {#if !!edit}<AutoComplete
                        items={dream}
                        className="verylong"
                        inputClassName="dotted"
                        placeholder="My Dream"
                        bind:selectedItem={data.data.dream}
                        create={true}
                        createText={"Item doesn't exist, create one?"}
                        onCreate={handleCreateD}
                        onChange={(e) => {
                            sheet?._onSubmit(new Event("submit"));
                        }}
                    />{:else}<strong>{data.data.dream}</strong>{/if}
                .
            </p>
        </content>
    </div>
    <div class="inventory-abilities flexcol flex1">
        <content><Tabs {items} /></content>
    </div>
</div>

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
</style>
