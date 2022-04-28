/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    // Define template paths to load
    const templatePaths = [
        // Attribute list partial.
        "systems/foundryvtt-quest/templates/parts/sheet-attributes.html",
        "systems/foundryvtt-quest/templates/parts/sheet-groups.html"
    ];

    Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    });

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
        const rgx = new RegExp(
            `@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`,
            "g"
        );
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
            "@Compendium[" + type + "." + id + "]{" + name + "}"
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

    Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
        switch (operator) {
            case "==":
                return v1 == v2 ? options.fn(this) : options.inverse(this);
            case "===":
                return v1 === v2 ? options.fn(this) : options.inverse(this);
            case "!=":
                return v1 != v2 ? options.fn(this) : options.inverse(this);
            case "!==":
                return v1 !== v2 ? options.fn(this) : options.inverse(this);
            case "<":
                return v1 < v2 ? options.fn(this) : options.inverse(this);
            case "<=":
                return v1 <= v2 ? options.fn(this) : options.inverse(this);
            case ">":
                return v1 > v2 ? options.fn(this) : options.inverse(this);
            case ">=":
                return v1 >= v2 ? options.fn(this) : options.inverse(this);
            case "&&":
                return v1 && v2 ? options.fn(this) : options.inverse(this);
            case "||":
                return v1 || v2 ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    // Load the template parts
    return loadTemplates(templatePaths);
};
