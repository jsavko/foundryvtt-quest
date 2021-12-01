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

    game.quest = {
        QuestActor,
        createQuestMacro,
        QuestRoll
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

    Actors.registerSheet("quest", QuestActorSheet, {
        makeDefault: true
    });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("quest", QuestItemSheet, {
        makeDefault: true
    });
    Items.registerSheet("quest", QuestAbilitySheet, {
        types: ["ability"],
        makeDefault: true
    });

    // Register system settings
    game.settings.register("quest", "macroShorthand", {
        name: "SETTINGS.QuestMacroShorthandN",
        hint: "SETTINGS.QuestMacroShorthandL",
        scope: "world",
        type: Boolean,
        default: true,
        config: true
    });

    // Register initiative setting.
    game.settings.register("quest", "initFormula", {
        name: "SETTINGS.QuestInitFormulaN",
        hint: "SETTINGS.QuestInitFormulaL",
        scope: "world",
        type: String,
        default: "1d20",
        config: true,
        onChange: (formula) => _simpleUpdateInit(formula, true)
    });

    // Retrieve and assign the initiative formula setting.
    const initFormula = game.settings.get("quest", "initFormula");
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

    /**
     * Slugify a string.
     */
    Handlebars.registerHelper("slugify", function (value) {
        return value.slugify({ strict: true });
    });

    // Preload template partials
    await preloadHandlebarsTemplates();
});

/**
 * Macrobar hook.
 */
//Hooks.on("hotbarDrop", (bar, data, slot) => createQuestMacro(data, slot));

Hooks.once("init", async function () {
    // Replace functions for tinyMCE

    TextEditor.enrichHTML = function (
        content,
        {
            secrets = false,
            documents = true,
            links = true,
            rolls = true,
            cost = true,
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

        // Return the enriched HTML
        return html.innerHTML;
    };

    TextEditor._createCost = function (match) {
        const a = document.createElement("a");

        //match = match.replace(/@(cost|Cost)\[/g, "");
        //match = match.replace(/]/g, "");
        // (?<=\[).+?(?=\])
        match = match.substring(6, match.length - 1);
        a.innerHTML = '<i class="cost">' + match + "</i>";
        //a.classList.add("cost");

        return a;
    };
});

Hooks.once("ready", async () => {});

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
