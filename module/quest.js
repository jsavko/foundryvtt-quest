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

//import MouseCombatModal from "./mouse-combat-modal.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function () {
    console.log(`Initializing Quest Quest System`);

    /**
     * Set an initiative formula for the system. This will be updated later.
     * @type {String}
     */

    let RollCount = 0;
    let RoleList = [];
    game.quest = {
        QuestActor,
        createQuestMacro,
        QuestRoll,
        AbilityDialog,
        CompendiumImportHelper,
        RoleList
    };

    // Define custom Entity classes
    CONFIG.Actor.documentClass = QuestActor;
    CONFIG.Item.documentClass = QuestItem;

    CONFIG.Dice.rolls.push(QuestRoll);

    CONFIG.Combat.initiative = {
        formula: "1d20",
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

    // Register system settings
    game.settings.register("foundryvtt-quest", "macroShorthand", {
        name: "SETTINGS.QuestMacroShorthandN",
        hint: "SETTINGS.QuestMacroShorthandL",
        scope: "world",
        type: Boolean,
        default: true,
        config: true
    });

    // Register initiative setting.
    game.settings.register("foundryvtt-quest", "initFormula", {
        name: "SETTINGS.QuestInitFormulaN",
        hint: "SETTINGS.QuestInitFormulaL",
        scope: "world",
        type: String,
        default: "1d20",
        config: true,
        onChange: (formula) => _simpleUpdateInit(formula, true)
    });

    // Retrieve and assign the initiative formula setting.
    const initFormula = game.settings.get("foundryvtt-quest", "initFormula");
    _simpleUpdateInit(initFormula);

    /**
     * Update the initiative formula.
     * @param {string} formula - Dice formula to evaluate.
     * @param {boolean} notify - Whether or not to post nofications.
     */
    function _simpleUpdateInit(formula, notify = false) {
        const isValid = Roll.validate(formula);
        if (!isValid) {
            if (notify)
                ui.notifications.error(
                    `${game.i18n.localize(
                        "QUEST.NotifyInitFormulaInvalid"
                    )}: ${formula}`
                );
            return;
        }
        CONFIG.Combat.initiative.formula = formula;
    }

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

    //Generate RoleList
    game.quest.roleList = await getRoleList();
});

async function getRoleList() {
    let sourceCompendium = game.settings.get(
        "foundryvtt-quest",
        "abilityCompendium"
    );

    const QUESTAbilities = await game.packs.get(sourceCompendium);
    let AllAbilities = await QUESTAbilities.getDocuments();
    const roleList = [
        ...new Set(AllAbilities.map((data) => data.data.data.role))
    ];
    return roleList;
}

Handlebars.registerHelper("times", function (n, block) {
    var accum = "";
    for (var i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper("concat", function () {
    var outStr = "";
    for (var arg in arguments) {
        if (typeof arguments[arg] != "object") {
            outStr += arguments[arg];
        }
    }
    return outStr;
});

Handlebars.registerHelper("enrich", function () {
    var outStr = TextEditor.enrichHTML(arguments[0]);
    return outStr;
});

Handlebars.registerHelper("enrich_stripcost", function () {
    var removeCost = arguments[0];
    const rgx = new RegExp(`@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`, "g");
    var removeCost = removeCost.replace(rgx, "");
    removeCost = removeCost.replace(/<p[^>]*>/g, "");
    var outStr = TextEditor.enrichHTML(removeCost);
    return outStr;
});

Handlebars.registerHelper("cost", function () {
    var outStr = TextEditor.enrichHTML("@cost[" + arguments[0] + "]");
    return outStr;
});

Handlebars.registerHelper("abilityLink", function (name, type, id) {
    var outStr = TextEditor.enrichHTML(
        "@Compendium[world.role-abilities." + id + "]{" + name + "}"
    );
    return outStr;
});

Handlebars.registerHelper("replace", function (value, find, replace) {
    return value.replace(find, replace);
});

/**
 * Slugify a string.
 */
Handlebars.registerHelper("slugify", function (value) {
    return value.slugify({ strict: true });
});
