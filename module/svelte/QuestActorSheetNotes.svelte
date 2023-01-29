<script>
    import { getContext } from "svelte";

    import QuestEditor from "./QuestEditor.svelte";

    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.actor;
</script>

<div>
    <QuestEditor target="system.notes" />
</div>

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
