/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 */

// Import Modules
import { QuestActor } from "./actor.js";
import { QuestItem } from "./item.js";
import { QuestItemSheet } from "./item-sheet.js";
import { QuestAbilitySheet } from "./ability-sheet.js";
import { QuestActorSheet } from "./actor-sheet.js";
import { QuestNPCActorSheet } from "./npcactor-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { createQuestMacro } from "./macro.js";
import { QuestRoll } from "./quest-roll.js";
import { AbilityDialog } from "./ability-dialog.js";
import { CompendiumImportHelper } from "./compendium-helper.js";
import QuestCombatTracker from "./combat-tracker.js";
import { QuestAPI } from "./role-api.js";

//import { InlineTables } from "./inline-tables.js";

//import MouseCombatModal from "./mouse-combat-modal.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */

//Hooks.on("createChatMessage", (a) => {
//    if (a.data.content.match(/\[\[\~(.*?)\]\]/g))
//        InlineTables.parseInlineTables(a);
//});

Hooks.once("init", async function () {
    console.log(`Initializing Quest Quest System`);

    /**
     * Set an initiative formula for the system. This will be updated later.
     * @type {String}
     */

    let RollCount = 0;
    let roleList = [];
    let AbilitySources = [];

    game.quest = {
        QuestActor,
        createQuestMacro,
        QuestRoll,
        AbilityDialog,
        CompendiumImportHelper,
        roleList,
        AbilitySources,
        api: QuestAPI
    };

    game.quest.AbilitySources = [];

    // Define custom Entity classes
    CONFIG.Actor.documentClass = QuestActor;
    CONFIG.Item.documentClass = QuestItem;
    CONFIG.ui.combat = QuestCombatTracker;

    CONFIG.Dice.rolls.push(QuestRoll);

    CONFIG.Combat.initiative = {
        formula: "0",
        decimals: 2
    };

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);

    Actors.registerSheet("foundryvtt-quest", QuestActorSheet, {
        makeDefault: true,
        types: ["character"]
    });

    Actors.registerSheet("foundryvtt-quest", QuestNPCActorSheet, {
        types: ["npc"]
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("foundryvtt-quest", QuestItemSheet, {
        makeDefault: true
    });
    Items.registerSheet("foundryvtt-quest", QuestAbilitySheet, {
        types: ["ability", "detail"],
        makeDefault: true
    });

    // Preload template partials
    await preloadHandlebarsTemplates();

    // Replace functions for tinyMCE
    TextEditor.enrichHTML = function (
        content,
        {
            secrets = false,
            documents = true,
            links = true,
            rolls = true,
            cost = true,
            damage = true,
            rollData,
            ...options
        } = {}
    ) {
        // Create the HTML element
        const html = document.createElement("div");
        html.innerHTML = String(content || "");

        // Remove secret blocks
        if (!secrets) {
            let elements = html.querySelectorAll("section.secret");
            elements.forEach((e) => e.parentNode.removeChild(e));
        }

        // Plan text content replacements
        let updateTextArray = true;
        let text = [];

        // Replace document links
        if (options.entities) {
            console.warn(
                "The 'entities' option for TextEditor.enrichHTML is deprecated. Please use 'documents' instead."
            );
            documents = options.entities;
        }

        if (documents) {
            if (updateTextArray) text = this._getTextNodes(html);
            const documentTypes =
                CONST.DOCUMENT_LINK_TYPES.concat("Compendium");
            const rgx = new RegExp(
                `@(${documentTypes.join("|")})\\[([^\\]]+)\\](?:{([^}]+)})?`,
                "g"
            );
            updateTextArray = this._replaceTextContent(
                text,
                rgx,
                this._createContentLink
            );
        }

        // Replace hyperlinks
        if (links) {
            if (updateTextArray) text = this._getTextNodes(html);
            const rgx = /(https?:\/\/)(www\.)?([^\s<]+)/gi;
            updateTextArray = this._replaceTextContent(
                text,
                rgx,
                this._createHyperlink
            );
        }

        // Replace inline rolls
        if (rolls) {
            rollData =
                rollData instanceof Function ? rollData() : rollData || {};
            if (updateTextArray) text = this._getTextNodes(html);
            const rgx = /\[\[(\/[a-zA-Z]+\s)?(.*?)([\]]{2,3})(?:{([^}]+)})?/gi;
            updateTextArray = this._replaceTextContent(text, rgx, (...args) =>
                this._createInlineRoll(...args, rollData)
            );
        }

        // Look for Cost?
        if (cost) {
            if (updateTextArray) text = this._getTextNodes(html);
            const rgx = new RegExp(
                `@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`,
                "g"
            );
            updateTextArray = this._replaceTextContent(
                text,
                rgx,
                this._createCost
            );
        }

        if (damage) {
            if (updateTextArray) text = this._getTextNodes(html);
            const rgx = new RegExp(
                `@(damage|Damage)\\[([^\\]]+)\\](?:{([^}]+)})?`,
                "g"
            );
            updateTextArray = this._replaceTextContent(
                text,
                rgx,
                this._createDamage
            );
        }

        // Return the enriched HTML
        return html.innerHTML;
    };

    TextEditor._createCost = function (match) {
        const a = document.createElement("a");
        match = match.substring(6, match.length - 1);
        a.innerHTML = '<i class="cost">' + match + "</i>";

        return a;
    };

    TextEditor._createDamage = function (match) {
        const a = document.createElement("a");
        //console.log(match);
        match = match.substring(8, match.length - 1);
        a.innerHTML = '<i class="damage">' + match + "</i>";

        return a;
    };
});

/**
 * Macrobar hook.
 */
//Hooks.on("hotbarDrop", (bar, data, slot) => createQuestMacro(data, slot));

Hooks.once("ready", async () => {
    //Check if world compendium exisits and if not create it
    let compendium = await game.quest.CompendiumImportHelper.createCompenium();
    if (!!compendium != false) {
        ui.notifications.info("Importing Complete.");
    }

    let gamePacks = game.packs.filter((entry) => entry.documentName === "Item");
    let itemPacks = {};
    console.log("getting packs");
    for (let pack of gamePacks) {
        if (pack.metadata.package != "foundryvtt-quest") {
            let source = pack.metadata.package + "." + pack.metadata.name;
            itemPacks[source] = pack.title;
        }
    }

    game.settings.register("foundryvtt-quest", "abilityCompendium", {
        name: "SETTINGS.AbilityCompendium",
        hint: "SETTINGS.AbilityCompendiumHint",
        scope: "world",
        config: true,
        type: String,
        default: "world.role-abilities",
        choices: itemPacks
    });

    game.settings.register("foundryvtt-quest", "abilitySources", {
        name: "Additional Ability Sources",
        hint: "List of compendiums that are also loaded into the ability browser.",
        scope: "world",
        config: false,
        type: Array,
        default: [],
        filePicker: false
    });

    //Initalize API and call for ability registration
    game.quest.api.init();

    game.quest.roleList = await game.quest.AbilityDialog.getRollList();
});

Hooks.on("renderDialog", (dialog, html) => {
    Array.from(html.find("#document-create option")).forEach((i) => {
        if (i.value == "detail") {
            i.remove();
        }
    });
});

// Update Combat Tracker UI when actor data is changed
Hooks.on("updateActor", (actor, data, options, id) => {
    ui.combat.render();
});

Hooks.on("updateToken", (scene, token, data, options, id) => {
    if (data.actorData) {
        ui.combat.render();
    }
});
