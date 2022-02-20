var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/Tabs.esbuild-svelte-fake-css
var require_ = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/Tabs.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestActorSheetInventory.esbuild-svelte-fake-css
var require_2 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestActorSheetInventory.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestActorSheetAbilities.esbuild-svelte-fake-css
var require_3 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestActorSheetAbilities.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestActorSheetBase.esbuild-svelte-fake-css
var require_4 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestActorSheetBase.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestEditor.esbuild-svelte-fake-css
var require_5 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestEditor.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestNPCActorSheetBase.esbuild-svelte-fake-css
var require_6 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/foundryvtt-quest/module/svelte/QuestNPCActorSheetBase.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// module/constants.js
var ATTRIBUTE_TYPES = ["String", "Number", "Boolean", "Formula", "Resource"];

// module/helper.js
var EntitySheetHelper = class {
  static getAttributeData(data) {
    for (let attr3 of Object.values(data.data.attributes)) {
      if (attr3.dtype) {
        attr3.isCheckbox = attr3.dtype === "Boolean";
        attr3.isResource = attr3.dtype === "Resource";
        attr3.isFormula = attr3.dtype === "Formula";
      }
    }
    data.data.ungroupedAttributes = {};
    const groups = data.data.groups || {};
    let groupKeys = Object.keys(groups).sort((a, b) => {
      let aSort = groups[a].label ?? a;
      let bSort = groups[b].label ?? b;
      return aSort.localeCompare(bSort);
    });
    for (let key of groupKeys) {
      let group = data.data.attributes[key] || {};
      if (!data.data.groups[key]["attributes"])
        data.data.groups[key]["attributes"] = {};
      Object.keys(group).sort((a, b) => a.localeCompare(b)).forEach((attr3) => {
        if (typeof group[attr3] != "object" || !group[attr3])
          return;
        group[attr3]["isCheckbox"] = group[attr3]["dtype"] === "Boolean";
        group[attr3]["isResource"] = group[attr3]["dtype"] === "Resource";
        group[attr3]["isFormula"] = group[attr3]["dtype"] === "Formula";
        data.data.groups[key]["attributes"][attr3] = group[attr3];
      });
    }
    Object.keys(data.data.attributes).filter((a) => !groupKeys.includes(a)).sort((a, b) => a.localeCompare(b)).forEach((key) => {
      data.data.ungroupedAttributes[key] = data.data.attributes[key];
    });
    if (data.items) {
      data.items.forEach((item2) => {
        for (let [k, v] of Object.entries(item2.data.attributes)) {
          if (!v.dtype) {
            for (let [gk, gv] of Object.entries(v)) {
              if (gv.dtype) {
                if (!gv.label)
                  gv.label = gk;
                if (gv.dtype === "Formula") {
                  gv.isFormula = true;
                } else {
                  gv.isFormula = false;
                }
              }
            }
          } else {
            if (!v.label)
              v.label = k;
            if (v.dtype === "Formula") {
              v.isFormula = true;
            } else {
              v.isFormula = false;
            }
          }
        }
      });
    }
  }
  static onSubmit(event) {
    if (event.currentTarget) {
      if (event.currentTarget.tagName.toLowerCase() === "input" && !event.currentTarget.hasAttribute("name")) {
        return false;
      }
      let attr3 = false;
      const el = event.currentTarget;
      if (el.classList.contains("attribute-key")) {
        let val = el.value;
        let oldVal = el.closest(".attribute").dataset.attribute;
        let attrError = false;
        let groups = document.querySelectorAll(".group-key");
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].value === val) {
            ui.notifications.error(game.i18n.localize("QUEST.NotifyAttrDuplicate") + ` (${val})`);
            el.value = oldVal;
            attrError = true;
            break;
          }
        }
        if (!attrError) {
          oldVal = oldVal.includes(".") ? oldVal.split(".")[1] : oldVal;
          attr3 = $(el).attr("name").replace(oldVal, val);
        }
      }
      return attr3 ? attr3 : true;
    }
  }
  static async onClickAttributeControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;
    switch (action) {
      case "create":
        return EntitySheetHelper.createAttribute(event, this);
      case "delete":
        return EntitySheetHelper.deleteAttribute(event, this);
    }
  }
  static async onClickAttributeGroupControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;
    switch (action) {
      case "create-group":
        return EntitySheetHelper.createAttributeGroup(event, this);
      case "delete-group":
        return EntitySheetHelper.deleteAttributeGroup(event, this);
    }
  }
  static onAttributeRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const label = button.closest(".attribute").querySelector(".attribute-label")?.value;
    const chatLabel = label ?? button.parentElement.querySelector(".attribute-key").value;
    const shorthand = game.settings.get("quest", "macroShorthand");
    const rollData = this.actor.getRollData();
    let formula = button.closest(".attribute").querySelector(".attribute-value")?.value;
    if (formula) {
      let replacement = null;
      if (formula.includes("@item.") && this.item) {
        let itemName = this.item.name.slugify({ strict: true });
        replacement = !!shorthand ? `@items.${itemName}.` : `@items.${itemName}.attributes.`;
        formula = formula.replace("@item.", replacement);
      }
      let r = new Roll(formula, rollData);
      return r.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `${chatLabel}`
      });
    }
  }
  static getAttributeHtml(items, index, group = false) {
    let result = '<div style="display: none;">';
    for (let [key, item2] of Object.entries(items)) {
      result = result + `<input type="${item2.type}" name="data.attributes${group ? "." + group : ""}.attr${index}.${key}" value="${item2.value}"/>`;
    }
    return result + "</div>";
  }
  static validateGroup(groupName, document2) {
    let groups = Object.keys(document2.data.data.groups || {});
    let attributes = Object.keys(document2.data.data.attributes).filter((a) => !groups.includes(a));
    if (groups.includes(groupName)) {
      ui.notifications.error(game.i18n.localize("QUEST.NotifyGroupDuplicate") + ` (${groupName})`);
      return false;
    }
    if (attributes.includes(groupName)) {
      ui.notifications.error(game.i18n.localize("QUEST.NotifyGroupAttrDuplicate") + ` (${groupName})`);
      return false;
    }
    if (groupName.match(/[\s|\.]/i)) {
      ui.notifications.error(game.i18n.localize("QUEST.NotifyGroupAlphanumeric"));
      return false;
    }
    return true;
  }
  static async createAttribute(event, app) {
    const a = event.currentTarget;
    const group = a.dataset.group;
    let dtype = a.dataset.dtype;
    const attrs = app.object.data.data.attributes;
    const groups = app.object.data.data.groups;
    const form = app.form;
    let objKeys = Object.keys(attrs).filter((k) => !Object.keys(groups).includes(k));
    let nk = Object.keys(attrs).length + 1;
    let newValue = `attr${nk}`;
    let newKey = document.createElement("div");
    while (objKeys.includes(newValue)) {
      ++nk;
      newValue = `attr${nk}`;
    }
    let htmlItems = {
      key: {
        type: "text",
        value: newValue
      }
    };
    if (group) {
      objKeys = attrs[group] ? Object.keys(attrs[group]) : [];
      nk = objKeys.length + 1;
      newValue = `attr${nk}`;
      while (objKeys.includes(newValue)) {
        ++nk;
        newValue = `attr${nk}`;
      }
      htmlItems.key.value = newValue;
      htmlItems.group = {
        type: "hidden",
        value: group
      };
      htmlItems.dtype = {
        type: "hidden",
        value: dtype
      };
    } else {
      if (!dtype) {
        let lastAttr = document.querySelector(".attributes > .attributes-group .attribute:last-child .attribute-dtype")?.value;
        dtype = lastAttr ? lastAttr : "String";
        htmlItems.dtype = {
          type: "hidden",
          value: dtype
        };
      }
    }
    newKey.innerHTML = EntitySheetHelper.getAttributeHtml(htmlItems, nk, group);
    newKey = newKey.children[0];
    form.appendChild(newKey);
    await app._onSubmit(event);
  }
  static async deleteAttribute(event, app) {
    const a = event.currentTarget;
    const li = a.closest(".attribute");
    if (li) {
      li.parentElement.removeChild(li);
      await app._onSubmit(event);
    }
  }
  static async createAttributeGroup(event, app) {
    const a = event.currentTarget;
    const form = app.form;
    let newValue = $(a).siblings(".group-prefix").val();
    if (newValue.length > 0 && EntitySheetHelper.validateGroup(newValue, app.object)) {
      let newKey = document.createElement("div");
      newKey.innerHTML = `<input type="text" name="data.groups.${newValue}.key" value="${newValue}"/>`;
      newKey = newKey.children[0];
      form.appendChild(newKey);
      await app._onSubmit(event);
    }
  }
  static async deleteAttributeGroup(event, app) {
    const a = event.currentTarget;
    let groupHeader = a.closest(".group-header");
    let groupContainer = groupHeader.closest(".group");
    let group = $(groupHeader).find(".group-key");
    new Dialog({
      title: game.i18n.localize("QUEST.DeleteGroup"),
      content: `${game.i18n.localize("QUEST.DeleteGroupContent")} <strong>${group.val()}</strong>`,
      buttons: {
        confirm: {
          icon: '<i class="fas fa-trash"></i>',
          label: game.i18n.localize("Yes"),
          callback: async () => {
            groupContainer.parentElement.removeChild(groupContainer);
            await app._onSubmit(event);
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize("No")
        }
      }
    }).render(true);
  }
  static updateAttributes(formData, document2) {
    let groupKeys = [];
    const formAttrs = foundry.utils.expandObject(formData)?.data?.attributes || {};
    const attributes = Object.values(formAttrs).reduce((obj, v) => {
      let attrs = [];
      let group = null;
      if (!v["key"]) {
        attrs = Object.keys(v);
        attrs.forEach((attrKey) => {
          group = v[attrKey]["group"];
          groupKeys.push(group);
          let attr3 = v[attrKey];
          let k = v[attrKey]["key"] ? v[attrKey]["key"].trim() : attrKey.trim();
          if (/[\s\.]/.test(k))
            return ui.notifications.error("Attribute keys may not contain spaces or periods");
          delete attr3["key"];
          if (!obj[group]) {
            obj[group] = {};
          }
          obj[group][k] = attr3;
        });
      } else {
        let k = v["key"].trim();
        if (/[\s\.]/.test(k))
          return ui.notifications.error("Attribute keys may not contain spaces or periods");
        delete v["key"];
        if (!group) {
          obj[k] = v;
        }
      }
      return obj;
    }, {});
    for (let k of Object.keys(document2.data.data.attributes)) {
      if (!attributes.hasOwnProperty(k))
        attributes[`-=${k}`] = null;
    }
    for (let group of groupKeys) {
      if (document2.data.data.attributes[group]) {
        for (let k of Object.keys(document2.data.data.attributes[group])) {
          if (!attributes[group].hasOwnProperty(k))
            attributes[group][`-=${k}`] = null;
        }
      }
    }
    formData = Object.entries(formData).filter((e) => !e[0].startsWith("data.attributes")).reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, { _id: document2.id, "data.attributes": attributes });
    return formData;
  }
  static updateGroups(formData, document2) {
    const formGroups = expandObject(formData).data.groups || {};
    const groups = Object.values(formGroups).reduce((obj, v) => {
      if (Array.isArray(v["key"])) {
        v["key"] = v["key"][0];
      }
      let k = v["key"].trim();
      if (/[\s\.]/.test(k))
        return ui.notifications.error("Group keys may not contain spaces or periods");
      delete v["key"];
      obj[k] = v;
      return obj;
    }, {});
    for (let k of Object.keys(document2.data.data.groups)) {
      if (!groups.hasOwnProperty(k))
        groups[`-=${k}`] = null;
    }
    formData = Object.entries(formData).filter((e) => !e[0].startsWith("data.groups")).reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, { _id: document2.id, "data.groups": groups });
    return formData;
  }
  static async createDialog(data = {}, options = {}) {
    const documentName = this.metadata.name;
    const folders = game.folders.filter((f) => f.data.type === documentName && f.displayed);
    const label = game.i18n.localize(this.metadata.label);
    const title = game.i18n.format("ENTITY.Create", { entity: label });
    const collection = game.collections.get(this.documentName);
    const templates = collection.filter((a) => a.getFlag("quest", "isTemplate"));
    const defaultType = this.metadata.types[0];
    const types = {
      [defaultType]: game.i18n.localize("QUEST.NoTemplate")
    };
    for (let a of templates) {
      types[a.id] = a.name;
    }
    const html = await renderTemplate(`templates/sidebar/entity-create.html`, {
      name: data.name || game.i18n.format("ENTITY.New", { entity: label }),
      folder: data.folder,
      folders,
      hasFolders: folders.length > 1,
      type: data.type || templates[0]?.id || "",
      types,
      hasTypes: true
    });
    return Dialog.prompt({
      title,
      content: html,
      label: title,
      callback: (html2) => {
        const form = html2[0].querySelector("form");
        const fd = new FormDataExtended(form);
        let createData = fd.toObject();
        const template = collection.get(form.type.value);
        if (template) {
          createData = foundry.utils.mergeObject(template.toObject(), createData);
          createData.type = template.data.type;
          delete createData.flags.quest.isTemplate;
        }
        createData = foundry.utils.mergeObject(createData, data);
        return this.create(createData, { renderSheet: true });
      },
      rejectClose: false,
      options
    });
  }
};

// module/actor.js
var QuestActor = class extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();
    this.data.data.groups = this.data.data.groups || {};
    this.data.data.attributes = this.data.data.attributes || {};
  }
  prepareData() {
    super.prepareData();
    const actorData = this.data;
    if (actorData.type == "character") {
      this._prepareCharacterData(this.data);
    } else if (actorData.type == "npc") {
      this._prepareNPCData(this.data);
    }
    return this.data;
  }
  _prepareCharacterData(actorData) {
    actorData.data.itemTypes = this.itemTypes;
    let abilities = this.itemTypes.ability;
    let paths = {};
    for (let ability of abilities) {
      if (!!paths[ability.data.data.path] == false)
        paths[ability.data.data.path] = [];
      paths[ability.data.data.path].push(ability);
    }
    actorData.data.abilityTypes = paths;
    return actorData;
  }
  _prepareNPCData(actorData) {
    actorData.data.itemTypes = this.itemTypes;
    return actorData;
  }
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    if (data.type === "npc" && this.itemTypes.detail.length <= 0) {
      const details = [];
      let create_detail = [
        "what do they look like? (body / face / vibe)",
        "occupation / organizations",
        "special features / ideal / flaw",
        "what's something that they want?",
        "what is a problem that they have?",
        "what's something useful that they know?",
        "who are their friends?",
        "who are their adversaries?",
        "what's their biggest secret?",
        "what valuable things do they own?"
      ];
      if (Object(create_detail).length > 0) {
        for (let i of create_detail) {
          details.push({
            name: i,
            type: "detail"
          });
        }
        this.data.update({ items: details });
      }
    }
  }
  async getRollData() {
    const data = this.toObject(false).data;
    if (game.combat && game.combat.combatants) {
      let combatant = game.combat.combatants.find((c) => c.actor.id == this.id);
      if (combatant) {
        let actionCount = combatant.data.flags["foundryvtt-quest"] ? combatant.data.flags["foundryvtt-quest"].actionCount : 0;
        actionCount = actionCount ? Number(actionCount) + 1 : 1;
        console.log(actionCount);
        console.log("update action Count!");
        combatant.setFlag("foundryvtt-quest", "actionCount", actionCount);
      }
    }
    return data;
  }
};

// module/item.js
var QuestItem = class extends Item {
  prepareDerivedData() {
    super.prepareDerivedData();
    this.data.data.groups = this.data.data.groups || {};
    this.data.data.attributes = this.data.data.attributes || {};
    if (this.data.type == "ability") {
      let tmp = String(this.data.data.description).toLowerCase();
      const rgx = new RegExp(`@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`, "g");
      let CostArray = rgx.exec(tmp);
      this.data.data.cost = 0;
      if (!!CostArray) {
        this.data.data.cost = CostArray[2];
        var count = (tmp.match(/@cost/g) || []).length;
        if (count > 1)
          this.data.data.cost = CostArray[2] + "+";
      }
    }
  }
};

// module/item-sheet.js
var QuestItemSheet = class extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["quest", "sheet", "item"],
      template: "systems/foundryvtt-quest/templates/item-sheet.html",
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ],
      scrollY: [".attributes"]
    });
  }
  getData() {
    const context = super.getData();
    EntitySheetHelper.getAttributeData(context.data);
    context.systemData = context.data.data;
    context.dtypes = ATTRIBUTE_TYPES;
    return context;
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable)
      return;
    html.find(".attributes").on("click", ".attribute-control", EntitySheetHelper.onClickAttributeControl.bind(this));
    html.find(".groups").on("click", ".group-control", EntitySheetHelper.onClickAttributeGroupControl.bind(this));
    html.find(".attributes").on("click", "a.attribute-roll", EntitySheetHelper.onAttributeRoll.bind(this));
    html.find(".attributes a.attribute-roll").each((i, a) => {
      a.setAttribute("draggable", true);
      a.addEventListener("dragstart", (ev) => {
        let dragData = ev.currentTarget.dataset;
        ev.dataTransfer.setData("text/plain", JSON.stringify(dragData));
      }, false);
    });
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    formData = EntitySheetHelper.updateAttributes(formData, this.object);
    formData = EntitySheetHelper.updateGroups(formData, this.object);
    return formData;
  }
};

// module/ability-sheet.js
var QuestAbilitySheet = class extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["quest", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ],
      scrollY: [".attributes"]
    });
  }
  get template() {
    const path = "systems/foundryvtt-quest/templates/";
    return `${path}/${this.item.type}-sheet.html`;
  }
  getData() {
    const context = super.getData();
    EntitySheetHelper.getAttributeData(context.data);
    context.systemData = context.data.data;
    context.dtypes = ATTRIBUTE_TYPES;
    return context;
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable)
      return;
    html.find(".attributes").on("click", ".attribute-control", EntitySheetHelper.onClickAttributeControl.bind(this));
    html.find(".groups").on("click", ".group-control", EntitySheetHelper.onClickAttributeGroupControl.bind(this));
    html.find(".attributes").on("click", "a.attribute-roll", EntitySheetHelper.onAttributeRoll.bind(this));
    html.find(".attributes a.attribute-roll").each((i, a) => {
      a.setAttribute("draggable", true);
      a.addEventListener("dragstart", (ev) => {
        let dragData = ev.currentTarget.dataset;
        ev.dataTransfer.setData("text/plain", JSON.stringify(dragData));
      }, false);
    });
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    formData = EntitySheetHelper.updateAttributes(formData, this.object);
    formData = EntitySheetHelper.updateGroups(formData, this.object);
    return formData;
  }
};

// node_modules/svelte/internal/index.mjs
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var tasks = new Set();
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init)
    return;
  target.hydrate_init = true;
  const children3 = target.childNodes;
  const m = new Int32Array(children3.length + 1);
  const p = new Int32Array(children3.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children3.length; i++) {
    const current = children3[i].claim_order;
    const seqLen = upper_bound(1, longest + 1, (idx) => children3[m[idx]].claim_order, current) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children3.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children3[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children3[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children3[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    }
    if (node !== target.actual_end_child) {
      target.insertBefore(node, target.actual_end_child);
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target) {
    target.appendChild(node);
  }
}
function insert(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append(target, node);
  } else if (node.parentNode !== target || anchor && node.nextSibling !== anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element3) {
  return Array.from(element3.childNodes);
}
function set_data(text3, data) {
  data = "" + data;
  if (text3.wholeText !== data)
    text3.data = data;
}
function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? "important" : "");
}
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
var flushing = false;
var seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach3, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach3)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance8, create_fragment8, not_equal, props, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : options.context || []),
    callbacks: blank_object(),
    dirty,
    skip_bound: false
  };
  let ready = false;
  $$.ctx = instance8 ? instance8(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment8 ? create_fragment8($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr3, _oldValue, newValue) {
      this[attr3] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// node_modules/svelte/store/index.mjs
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update3(fn) {
    set(fn(value));
  }
  function subscribe2(run3, invalidate = noop) {
    const subscriber = [run3, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run3(value);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update3, subscribe: subscribe2 };
}

// node_modules/simple-svelte-autocomplete/index.mjs
function noop2() {
}
function assign2(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run2(fn) {
  return fn();
}
function blank_object2() {
  return Object.create(null);
}
function run_all2(fns) {
  fns.forEach(run2);
}
function is_function2(thing) {
  return typeof thing === "function";
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty2(obj) {
  return Object.keys(obj).length === 0;
}
function create_slot2(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context2(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context2(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign2($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes2(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot2(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_changes2(slot_definition, $$scope, dirty, get_slot_changes_fn);
  if (slot_changes) {
    const slot_context = get_slot_context2(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function append2(target, node) {
  target.appendChild(node);
}
function insert2(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach2(node) {
  node.parentNode.removeChild(node);
}
function destroy_each2(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element2(name) {
  return document.createElement(name);
}
function text2(data) {
  return document.createTextNode(data);
}
function space2() {
  return text2(" ");
}
function empty2() {
  return text2("");
}
function listen2(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function attr2(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children2(element3) {
  return Array.from(element3.childNodes);
}
function set_data2(text3, data) {
  data = "" + data;
  if (text3.wholeText !== data)
    text3.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function toggle_class(element3, name, toggle) {
  element3.classList[toggle ? "add" : "remove"](name);
}
var HtmlTag = class {
  constructor(anchor = null) {
    this.a = anchor;
    this.e = this.n = null;
  }
  m(html, target, anchor = null) {
    if (!this.e) {
      this.e = element2(target.nodeName);
      this.t = target;
      this.h(html);
    }
    this.i(anchor);
  }
  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(this.e.childNodes);
  }
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert2(this.t, this.n[i], anchor);
    }
  }
  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }
  d() {
    this.n.forEach(detach2);
  }
};
var current_component2;
function set_current_component2(component) {
  current_component2 = component;
}
var dirty_components2 = [];
var binding_callbacks2 = [];
var render_callbacks2 = [];
var flush_callbacks2 = [];
var resolved_promise2 = Promise.resolve();
var update_scheduled2 = false;
function schedule_update2() {
  if (!update_scheduled2) {
    update_scheduled2 = true;
    resolved_promise2.then(flush2);
  }
}
function add_render_callback2(fn) {
  render_callbacks2.push(fn);
}
var flushing2 = false;
var seen_callbacks2 = new Set();
function flush2() {
  if (flushing2)
    return;
  flushing2 = true;
  do {
    for (let i = 0; i < dirty_components2.length; i += 1) {
      const component = dirty_components2[i];
      set_current_component2(component);
      update2(component.$$);
    }
    set_current_component2(null);
    dirty_components2.length = 0;
    while (binding_callbacks2.length)
      binding_callbacks2.pop()();
    for (let i = 0; i < render_callbacks2.length; i += 1) {
      const callback = render_callbacks2[i];
      if (!seen_callbacks2.has(callback)) {
        seen_callbacks2.add(callback);
        callback();
      }
    }
    render_callbacks2.length = 0;
  } while (dirty_components2.length);
  while (flush_callbacks2.length) {
    flush_callbacks2.pop()();
  }
  update_scheduled2 = false;
  flushing2 = false;
  seen_callbacks2.clear();
}
function update2($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all2($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback2);
  }
}
var outroing2 = new Set();
var outros2;
function group_outros2() {
  outros2 = {
    r: 0,
    c: [],
    p: outros2
  };
}
function check_outros2() {
  if (!outros2.r) {
    run_all2(outros2.c);
  }
  outros2 = outros2.p;
}
function transition_in2(block, local) {
  if (block && block.i) {
    outroing2.delete(block);
    block.i(local);
  }
}
function transition_out2(block, local, detach3, callback) {
  if (block && block.o) {
    if (outroing2.has(block))
      return;
    outroing2.add(block);
    outros2.c.push(() => {
      outroing2.delete(block);
      if (callback) {
        if (detach3)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
function mount_component2(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback2(() => {
      const new_on_destroy = on_mount.map(run2).filter(is_function2);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all2(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback2);
}
function destroy_component2(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all2($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty2(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components2.push(component);
    schedule_update2();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init2(component, options, instance8, create_fragment8, not_equal, props, dirty = [-1]) {
  const parent_component = current_component2;
  set_current_component2(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop2,
    not_equal,
    bound: blank_object2(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : options.context || []),
    callbacks: blank_object2(),
    dirty,
    skip_bound: false
  };
  let ready = false;
  $$.ctx = instance8 ? instance8(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty2(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all2($$.before_update);
  $$.fragment = create_fragment8 ? create_fragment8($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children2(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach2);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in2(component.$$.fragment);
    mount_component2(component, options.target, options.anchor, options.customElement);
    flush2();
  }
  set_current_component2(parent_component);
}
var SvelteComponent2 = class {
  $destroy() {
    destroy_component2(this, 1);
    this.$destroy = noop2;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty2($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};
function add_css() {
  var style = element2("style");
  style.id = "svelte-lduj97-style";
  style.textContent = '.autocomplete.svelte-lduj97.svelte-lduj97{min-width:200px;display:inline-block;max-width:100%;position:relative;vertical-align:top;height:2.25em}.autocomplete.svelte-lduj97.svelte-lduj97:not(.hide-arrow):not(.is-loading)::after{border:3px solid transparent;border-radius:2px;border-right:0;border-top:0;content:" ";display:block;height:0.625em;margin-top:-0.4375em;pointer-events:none;position:absolute;top:50%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:center;transform-origin:center;width:0.625em;border-color:#3273dc;right:1.125em;z-index:4}.autocomplete.show-clear.svelte-lduj97.svelte-lduj97:not(.hide-arrow)::after{right:2.3em}.autocomplete.svelte-lduj97 .svelte-lduj97{box-sizing:border-box}.autocomplete-input.svelte-lduj97.svelte-lduj97{font:inherit;width:100%;height:100%;padding:5px 11px}.autocomplete.svelte-lduj97:not(.hide-arrow) .autocomplete.show-clear.svelte-lduj97:not(.hide-arrow) .autocomplete-input.svelte-lduj97{padding-right:3.2em}.autocomplete.hide-arrow.show-clear.svelte-lduj97 .autocomplete-input.svelte-lduj97{padding-right:2em}.autocomplete-list.svelte-lduj97.svelte-lduj97{background:#fff;position:relative;width:100%;overflow-y:auto;z-index:99;padding:10px 0;top:0px;border:1px solid #999;max-height:calc(15 * (1rem + 10px) + 15px);user-select:none}.autocomplete-list.svelte-lduj97.svelte-lduj97:empty{padding:0}.autocomplete-list-item.svelte-lduj97.svelte-lduj97{padding:5px 15px;color:#333;cursor:pointer;line-height:1}.autocomplete-list-item.confirmed.svelte-lduj97.svelte-lduj97{background-color:#789fed;color:#fff}.autocomplete-list-item.selected.svelte-lduj97.svelte-lduj97{background-color:#2e69e2;color:#fff}.autocomplete-list-item-no-results.svelte-lduj97.svelte-lduj97{padding:5px 15px;color:#999;line-height:1}.autocomplete-list-item-create.svelte-lduj97.svelte-lduj97{padding:5px 15px;line-height:1}.autocomplete-list-item-loading.svelte-lduj97.svelte-lduj97{padding:5px 15px;line-height:1}.autocomplete-list.hidden.svelte-lduj97.svelte-lduj97{display:none}.autocomplete.show-clear.svelte-lduj97 .autocomplete-clear-button.svelte-lduj97{cursor:pointer;display:block;text-align:center;position:absolute;right:0.1em;padding:0.3em 0.6em;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);z-index:4}.autocomplete.svelte-lduj97:not(.show-clear) .autocomplete-clear-button.svelte-lduj97{display:none}.autocomplete.svelte-lduj97 select.svelte-lduj97{display:none}.autocomplete.is-multiple.svelte-lduj97 .input-container.svelte-lduj97{height:auto;box-shadow:inset 0 1px 2px rgba(10, 10, 10, 0.1);border-radius:4px;border:1px solid #b5b5b5;padding-left:0.4em;padding-right:0.4em;display:flex;flex-wrap:wrap;align-items:stretch;background-color:#fff}.autocomplete.is-multiple.svelte-lduj97 .tag.svelte-lduj97{display:flex;margin-top:0.5em;margin-bottom:0.3em}.autocomplete.is-multiple.svelte-lduj97 .tag.is-delete.svelte-lduj97{cursor:pointer}.autocomplete.is-multiple.svelte-lduj97 .tags.svelte-lduj97{margin-right:0.3em;margin-bottom:0}.autocomplete.is-multiple.svelte-lduj97 .autocomplete-input.svelte-lduj97{display:flex;width:100%;flex:1 1 50px;min-width:3em;border:none;box-shadow:none;background:none}';
  append2(document.head, style);
}
var get_no_results_slot_changes = (dirty) => ({
  noResultsText: dirty[0] & 2048
});
var get_no_results_slot_context = (ctx) => ({ noResultsText: ctx[11] });
var get_create_slot_changes = (dirty) => ({
  createText: dirty[0] & 8192
});
var get_create_slot_context = (ctx) => ({ createText: ctx[13] });
var get_loading_slot_changes = (dirty) => ({
  loadingText: dirty[0] & 4096
});
var get_loading_slot_context = (ctx) => ({ loadingText: ctx[12] });
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[108] = list[i];
  child_ctx[110] = i;
  return child_ctx;
}
var get_item_slot_changes = (dirty) => ({
  item: dirty[0] & 134217728,
  label: dirty[0] & 134217728
});
var get_item_slot_context = (ctx) => ({
  item: ctx[108].item,
  label: ctx[108].highlighted ? ctx[108].highlighted : ctx[108].label
});
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[111] = list[i];
  return child_ctx;
}
var get_tag_slot_changes = (dirty) => ({
  label: dirty[0] & 2,
  item: dirty[0] & 2
});
var get_tag_slot_context = (ctx) => ({
  label: ctx[34](ctx[111]),
  item: ctx[111],
  unselectItem: ctx[41]
});
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[110] = list[i];
  return child_ctx;
}
function create_if_block_11(ctx) {
  let each_1_anchor;
  let each_value_2 = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty2();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert2(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 18 | dirty[1] & 8) {
        each_value_2 = ctx2[1];
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_2.length;
      }
    },
    d(detaching) {
      destroy_each2(each_blocks, detaching);
      if (detaching)
        detach2(each_1_anchor);
    }
  };
}
function create_if_block_10(ctx) {
  let option;
  let t;
  return {
    c() {
      option = element2("option");
      t = text2(ctx[3]);
      option.__value = ctx[2];
      option.value = option.__value;
      option.selected = true;
      attr2(option, "class", "svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, option, anchor);
      append2(option, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 8)
        set_data2(t, ctx2[3]);
      if (dirty[0] & 4) {
        option.__value = ctx2[2];
        option.value = option.__value;
      }
    },
    d(detaching) {
      if (detaching)
        detach2(option);
    }
  };
}
function create_each_block_2(ctx) {
  let option;
  let t0_value = ctx[34](ctx[110]) + "";
  let t0;
  let t1;
  let option_value_value;
  return {
    c() {
      option = element2("option");
      t0 = text2(t0_value);
      t1 = space2();
      option.__value = option_value_value = ctx[4](ctx[110], true);
      option.value = option.__value;
      option.selected = true;
      attr2(option, "class", "svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, option, anchor);
      append2(option, t0);
      append2(option, t1);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 2 && t0_value !== (t0_value = ctx2[34](ctx2[110]) + ""))
        set_data2(t0, t0_value);
      if (dirty[0] & 18 && option_value_value !== (option_value_value = ctx2[4](ctx2[110], true))) {
        option.__value = option_value_value;
        option.value = option.__value;
      }
    },
    d(detaching) {
      if (detaching)
        detach2(option);
    }
  };
}
function create_if_block_9(ctx) {
  let each_1_anchor;
  let current;
  let each_value_1 = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out2(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty2();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert2(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 2 | dirty[1] & 1032 | dirty[2] & 8192) {
        each_value_1 = ctx2[1];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in2(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in2(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros2();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros2();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in2(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out2(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each2(each_blocks, detaching);
      if (detaching)
        detach2(each_1_anchor);
    }
  };
}
function fallback_block_4(ctx) {
  let div;
  let span0;
  let t0_value = ctx[34](ctx[111]) + "";
  let t0;
  let t1;
  let span1;
  let t2;
  let mounted;
  let dispose;
  return {
    c() {
      div = element2("div");
      span0 = element2("span");
      t0 = text2(t0_value);
      t1 = space2();
      span1 = element2("span");
      t2 = space2();
      attr2(span0, "class", "tag svelte-lduj97");
      attr2(span1, "class", "tag is-delete svelte-lduj97");
      attr2(div, "class", "tags has-addons svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, div, anchor);
      append2(div, span0);
      append2(span0, t0);
      append2(div, t1);
      append2(div, span1);
      insert2(target, t2, anchor);
      if (!mounted) {
        dispose = listen2(span1, "click", prevent_default(function() {
          if (is_function2(ctx[41](ctx[111])))
            ctx[41](ctx[111]).apply(this, arguments);
        }));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & 2 && t0_value !== (t0_value = ctx[34](ctx[111]) + ""))
        set_data2(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach2(div);
      if (detaching)
        detach2(t2);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_1(ctx) {
  let current;
  const tag_slot_template = ctx[76].tag;
  const tag_slot = create_slot2(tag_slot_template, ctx, ctx[75], get_tag_slot_context);
  const tag_slot_or_fallback = tag_slot || fallback_block_4(ctx);
  return {
    c() {
      if (tag_slot_or_fallback)
        tag_slot_or_fallback.c();
    },
    m(target, anchor) {
      if (tag_slot_or_fallback) {
        tag_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (tag_slot) {
        if (tag_slot.p && dirty[0] & 2 | dirty[2] & 8192) {
          update_slot2(tag_slot, tag_slot_template, ctx2, ctx2[75], dirty, get_tag_slot_changes, get_tag_slot_context);
        }
      } else {
        if (tag_slot_or_fallback && tag_slot_or_fallback.p && dirty[0] & 2) {
          tag_slot_or_fallback.p(ctx2, dirty);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(tag_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out2(tag_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (tag_slot_or_fallback)
        tag_slot_or_fallback.d(detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let span;
  let mounted;
  let dispose;
  return {
    c() {
      span = element2("span");
      span.textContent = "\u2716";
      attr2(span, "class", "autocomplete-clear-button svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, span, anchor);
      if (!mounted) {
        dispose = listen2(span, "click", ctx[45]);
        mounted = true;
      }
    },
    p: noop2,
    d(detaching) {
      if (detaching)
        detach2(span);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_7(ctx) {
  let div;
  let current;
  const no_results_slot_template = ctx[76]["no-results"];
  const no_results_slot = create_slot2(no_results_slot_template, ctx, ctx[75], get_no_results_slot_context);
  const no_results_slot_or_fallback = no_results_slot || fallback_block_3(ctx);
  return {
    c() {
      div = element2("div");
      if (no_results_slot_or_fallback)
        no_results_slot_or_fallback.c();
      attr2(div, "class", "autocomplete-list-item-no-results svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, div, anchor);
      if (no_results_slot_or_fallback) {
        no_results_slot_or_fallback.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (no_results_slot) {
        if (no_results_slot.p && dirty[0] & 2048 | dirty[2] & 8192) {
          update_slot2(no_results_slot, no_results_slot_template, ctx2, ctx2[75], dirty, get_no_results_slot_changes, get_no_results_slot_context);
        }
      } else {
        if (no_results_slot_or_fallback && no_results_slot_or_fallback.p && dirty[0] & 2048) {
          no_results_slot_or_fallback.p(ctx2, dirty);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(no_results_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out2(no_results_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach2(div);
      if (no_results_slot_or_fallback)
        no_results_slot_or_fallback.d(detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let div;
  let current;
  let mounted;
  let dispose;
  const create_slot_template = ctx[76].create;
  const create_slot_1 = create_slot2(create_slot_template, ctx, ctx[75], get_create_slot_context);
  const create_slot_or_fallback = create_slot_1 || fallback_block_2(ctx);
  return {
    c() {
      div = element2("div");
      if (create_slot_or_fallback)
        create_slot_or_fallback.c();
      attr2(div, "class", "autocomplete-list-item-create svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, div, anchor);
      if (create_slot_or_fallback) {
        create_slot_or_fallback.m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen2(div, "click", ctx[35]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (create_slot_1) {
        if (create_slot_1.p && dirty[0] & 8192 | dirty[2] & 8192) {
          update_slot2(create_slot_1, create_slot_template, ctx2, ctx2[75], dirty, get_create_slot_changes, get_create_slot_context);
        }
      } else {
        if (create_slot_or_fallback && create_slot_or_fallback.p && dirty[0] & 8192) {
          create_slot_or_fallback.p(ctx2, dirty);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(create_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out2(create_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach2(div);
      if (create_slot_or_fallback)
        create_slot_or_fallback.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_5(ctx) {
  let div;
  let current;
  const loading_slot_template = ctx[76].loading;
  const loading_slot = create_slot2(loading_slot_template, ctx, ctx[75], get_loading_slot_context);
  const loading_slot_or_fallback = loading_slot || fallback_block_1(ctx);
  return {
    c() {
      div = element2("div");
      if (loading_slot_or_fallback)
        loading_slot_or_fallback.c();
      attr2(div, "class", "autocomplete-list-item-loading svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, div, anchor);
      if (loading_slot_or_fallback) {
        loading_slot_or_fallback.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (loading_slot) {
        if (loading_slot.p && dirty[0] & 4096 | dirty[2] & 8192) {
          update_slot2(loading_slot, loading_slot_template, ctx2, ctx2[75], dirty, get_loading_slot_changes, get_loading_slot_context);
        }
      } else {
        if (loading_slot_or_fallback && loading_slot_or_fallback.p && dirty[0] & 4096) {
          loading_slot_or_fallback.p(ctx2, dirty);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(loading_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out2(loading_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach2(div);
      if (loading_slot_or_fallback)
        loading_slot_or_fallback.d(detaching);
    }
  };
}
function create_if_block(ctx) {
  let t;
  let if_block_anchor;
  let current;
  let each_value = ctx[27];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out2(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block = ctx[5] > 0 && ctx[27].length > ctx[5] && create_if_block_1(ctx);
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space2();
      if (if_block)
        if_block.c();
      if_block_anchor = empty2();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert2(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert2(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 201326624 | dirty[1] & 32800 | dirty[2] & 8192) {
        each_value = ctx2[27];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in2(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in2(each_blocks[i], 1);
            each_blocks[i].m(t.parentNode, t);
          }
        }
        group_outros2();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros2();
      }
      if (ctx2[5] > 0 && ctx2[27].length > ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in2(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out2(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each2(each_blocks, detaching);
      if (detaching)
        detach2(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach2(if_block_anchor);
    }
  };
}
function fallback_block_3(ctx) {
  let t;
  return {
    c() {
      t = text2(ctx[11]);
    },
    m(target, anchor) {
      insert2(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 2048)
        set_data2(t, ctx2[11]);
    },
    d(detaching) {
      if (detaching)
        detach2(t);
    }
  };
}
function fallback_block_2(ctx) {
  let t;
  return {
    c() {
      t = text2(ctx[13]);
    },
    m(target, anchor) {
      insert2(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 8192)
        set_data2(t, ctx2[13]);
    },
    d(detaching) {
      if (detaching)
        detach2(t);
    }
  };
}
function fallback_block_1(ctx) {
  let t;
  return {
    c() {
      t = text2(ctx[12]);
    },
    m(target, anchor) {
      insert2(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 4096)
        set_data2(t, ctx2[12]);
    },
    d(detaching) {
      if (detaching)
        detach2(t);
    }
  };
}
function create_if_block_2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[108] && create_if_block_3(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty2();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert2(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[108]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 134217728) {
            transition_in2(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx2);
          if_block.c();
          transition_in2(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros2();
        transition_out2(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros2();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(if_block);
      current = true;
    },
    o(local) {
      transition_out2(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach2(if_block_anchor);
    }
  };
}
function create_if_block_3(ctx) {
  let div;
  let div_class_value;
  let current;
  let mounted;
  let dispose;
  const item_slot_template = ctx[76].item;
  const item_slot = create_slot2(item_slot_template, ctx, ctx[75], get_item_slot_context);
  const item_slot_or_fallback = item_slot || fallback_block(ctx);
  function click_handler() {
    return ctx[79](ctx[108]);
  }
  function pointerenter_handler() {
    return ctx[80](ctx[110]);
  }
  return {
    c() {
      div = element2("div");
      if (item_slot_or_fallback)
        item_slot_or_fallback.c();
      attr2(div, "class", div_class_value = "autocomplete-list-item " + (ctx[110] === ctx[26] ? "selected" : "") + " svelte-lduj97");
      toggle_class(div, "confirmed", ctx[46](ctx[108].item));
    },
    m(target, anchor) {
      insert2(target, div, anchor);
      if (item_slot_or_fallback) {
        item_slot_or_fallback.m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen2(div, "click", click_handler),
          listen2(div, "pointerenter", pointerenter_handler)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (item_slot) {
        if (item_slot.p && dirty[0] & 134217728 | dirty[2] & 8192) {
          update_slot2(item_slot, item_slot_template, ctx, ctx[75], dirty, get_item_slot_changes, get_item_slot_context);
        }
      } else {
        if (item_slot_or_fallback && item_slot_or_fallback.p && dirty[0] & 134217728) {
          item_slot_or_fallback.p(ctx, dirty);
        }
      }
      if (!current || dirty[0] & 67108864 && div_class_value !== (div_class_value = "autocomplete-list-item " + (ctx[110] === ctx[26] ? "selected" : "") + " svelte-lduj97")) {
        attr2(div, "class", div_class_value);
      }
      if (dirty[0] & 201326592 | dirty[1] & 32768) {
        toggle_class(div, "confirmed", ctx[46](ctx[108].item));
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(item_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out2(item_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach2(div);
      if (item_slot_or_fallback)
        item_slot_or_fallback.d(detaching);
      mounted = false;
      run_all2(dispose);
    }
  };
}
function create_else_block(ctx) {
  let html_tag;
  let raw_value = ctx[108].label + "";
  let html_anchor;
  return {
    c() {
      html_anchor = empty2();
      html_tag = new HtmlTag(html_anchor);
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert2(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 134217728 && raw_value !== (raw_value = ctx2[108].label + ""))
        html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching)
        detach2(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
function create_if_block_4(ctx) {
  let html_tag;
  let raw_value = ctx[108].highlighted + "";
  let html_anchor;
  return {
    c() {
      html_anchor = empty2();
      html_tag = new HtmlTag(html_anchor);
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor);
      insert2(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 134217728 && raw_value !== (raw_value = ctx2[108].highlighted + ""))
        html_tag.p(raw_value);
    },
    d(detaching) {
      if (detaching)
        detach2(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
function fallback_block(ctx) {
  let if_block_anchor;
  function select_block_type_2(ctx2, dirty) {
    if (ctx2[108].highlighted)
      return create_if_block_4;
    return create_else_block;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty2();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert2(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach2(if_block_anchor);
    }
  };
}
function create_each_block(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[108] && (ctx[5] <= 0 || ctx[110] < ctx[5]) && create_if_block_2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty2();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert2(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[108] && (ctx2[5] <= 0 || ctx2[110] < ctx2[5])) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 134217760) {
            transition_in2(if_block, 1);
          }
        } else {
          if_block = create_if_block_2(ctx2);
          if_block.c();
          transition_in2(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros2();
        transition_out2(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros2();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(if_block);
      current = true;
    },
    o(local) {
      transition_out2(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach2(if_block_anchor);
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let t0;
  let t1_value = ctx[27].length - ctx[5] + "";
  let t1;
  let t2;
  return {
    c() {
      div = element2("div");
      t0 = text2("...");
      t1 = text2(t1_value);
      t2 = text2(" results not shown");
      attr2(div, "class", "autocomplete-list-item-no-results svelte-lduj97");
    },
    m(target, anchor) {
      insert2(target, div, anchor);
      append2(div, t0);
      append2(div, t1);
      append2(div, t2);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 134217760 && t1_value !== (t1_value = ctx2[27].length - ctx2[5] + ""))
        set_data2(t1, t1_value);
    },
    d(detaching) {
      if (detaching)
        detach2(div);
    }
  };
}
function create_fragment(ctx) {
  let div2;
  let select;
  let t0;
  let div0;
  let t1;
  let input_1;
  let input_1_class_value;
  let input_1_id_value;
  let input_1_autocomplete_value;
  let input_1_readonly_value;
  let t2;
  let t3;
  let div1;
  let current_block_type_index;
  let if_block3;
  let div1_class_value;
  let div2_class_value;
  let current;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (!ctx2[6] && ctx2[2])
      return create_if_block_10;
    if (ctx2[6] && ctx2[1])
      return create_if_block_11;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type && current_block_type(ctx);
  let if_block1 = ctx[6] && ctx[1] && create_if_block_9(ctx);
  let if_block2 = ctx[32] && create_if_block_8(ctx);
  const if_block_creators = [create_if_block, create_if_block_5, create_if_block_6, create_if_block_7];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[27] && ctx2[27].length > 0)
      return 0;
    if (ctx2[30] && ctx2[12])
      return 1;
    if (ctx2[7])
      return 2;
    if (ctx2[11])
      return 3;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_1(ctx))) {
    if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div2 = element2("div");
      select = element2("select");
      if (if_block0)
        if_block0.c();
      t0 = space2();
      div0 = element2("div");
      if (if_block1)
        if_block1.c();
      t1 = space2();
      input_1 = element2("input");
      t2 = space2();
      if (if_block2)
        if_block2.c();
      t3 = space2();
      div1 = element2("div");
      if (if_block3)
        if_block3.c();
      attr2(select, "name", ctx[19]);
      attr2(select, "id", ctx[20]);
      select.multiple = ctx[6];
      attr2(select, "class", "svelte-lduj97");
      attr2(input_1, "type", "text");
      attr2(input_1, "class", input_1_class_value = "" + ((ctx[16] ? ctx[16] : "") + " input autocomplete-input svelte-lduj97"));
      attr2(input_1, "id", input_1_id_value = ctx[17] ? ctx[17] : "");
      attr2(input_1, "autocomplete", input_1_autocomplete_value = ctx[22] ? "on" : "some-other-text");
      attr2(input_1, "placeholder", ctx[14]);
      attr2(input_1, "name", ctx[18]);
      input_1.disabled = ctx[25];
      attr2(input_1, "title", ctx[21]);
      input_1.readOnly = input_1_readonly_value = ctx[23] || ctx[8] && ctx[1];
      attr2(div0, "class", "input-container svelte-lduj97");
      attr2(div1, "class", div1_class_value = "" + ((ctx[24] ? ctx[24] : "") + " autocomplete-list " + (ctx[31] ? "" : "hidden") + "\n    is-fullwidth svelte-lduj97"));
      attr2(div2, "class", div2_class_value = "" + ((ctx[15] ? ctx[15] : "") + "\n  " + (ctx[9] || !ctx[0].length ? "hide-arrow" : "") + "\n  " + (ctx[6] ? "is-multiple" : "") + " autocomplete select is-fullwidth " + ctx[33] + " svelte-lduj97"));
      toggle_class(div2, "show-clear", ctx[32]);
      toggle_class(div2, "is-loading", ctx[10] && ctx[30]);
    },
    m(target, anchor) {
      insert2(target, div2, anchor);
      append2(div2, select);
      if (if_block0)
        if_block0.m(select, null);
      append2(div2, t0);
      append2(div2, div0);
      if (if_block1)
        if_block1.m(div0, null);
      append2(div0, t1);
      append2(div0, input_1);
      ctx[77](input_1);
      set_input_value(input_1, ctx[3]);
      append2(div0, t2);
      if (if_block2)
        if_block2.m(div0, null);
      append2(div2, t3);
      append2(div2, div1);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div1, null);
      }
      ctx[81](div1);
      current = true;
      if (!mounted) {
        dispose = [
          listen2(window, "click", ctx[37]),
          listen2(input_1, "input", ctx[78]),
          listen2(input_1, "input", ctx[40]),
          listen2(input_1, "focus", ctx[43]),
          listen2(input_1, "blur", ctx[44]),
          listen2(input_1, "keydown", ctx[38]),
          listen2(input_1, "click", ctx[42]),
          listen2(input_1, "keypress", ctx[39])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if (if_block0)
          if_block0.d(1);
        if_block0 = current_block_type && current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(select, null);
        }
      }
      if (!current || dirty[0] & 524288) {
        attr2(select, "name", ctx2[19]);
      }
      if (!current || dirty[0] & 1048576) {
        attr2(select, "id", ctx2[20]);
      }
      if (!current || dirty[0] & 64) {
        select.multiple = ctx2[6];
      }
      if (ctx2[6] && ctx2[1]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & 66) {
            transition_in2(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_9(ctx2);
          if_block1.c();
          transition_in2(if_block1, 1);
          if_block1.m(div0, t1);
        }
      } else if (if_block1) {
        group_outros2();
        transition_out2(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros2();
      }
      if (!current || dirty[0] & 65536 && input_1_class_value !== (input_1_class_value = "" + ((ctx2[16] ? ctx2[16] : "") + " input autocomplete-input svelte-lduj97"))) {
        attr2(input_1, "class", input_1_class_value);
      }
      if (!current || dirty[0] & 131072 && input_1_id_value !== (input_1_id_value = ctx2[17] ? ctx2[17] : "")) {
        attr2(input_1, "id", input_1_id_value);
      }
      if (!current || dirty[0] & 4194304 && input_1_autocomplete_value !== (input_1_autocomplete_value = ctx2[22] ? "on" : "some-other-text")) {
        attr2(input_1, "autocomplete", input_1_autocomplete_value);
      }
      if (!current || dirty[0] & 16384) {
        attr2(input_1, "placeholder", ctx2[14]);
      }
      if (!current || dirty[0] & 262144) {
        attr2(input_1, "name", ctx2[18]);
      }
      if (!current || dirty[0] & 33554432) {
        input_1.disabled = ctx2[25];
      }
      if (!current || dirty[0] & 2097152) {
        attr2(input_1, "title", ctx2[21]);
      }
      if (!current || dirty[0] & 8388866 && input_1_readonly_value !== (input_1_readonly_value = ctx2[23] || ctx2[8] && ctx2[1])) {
        input_1.readOnly = input_1_readonly_value;
      }
      if (dirty[0] & 8 && input_1.value !== ctx2[3]) {
        set_input_value(input_1, ctx2[3]);
      }
      if (ctx2[32]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_8(ctx2);
          if_block2.c();
          if_block2.m(div0, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block3) {
          group_outros2();
          transition_out2(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros2();
        }
        if (~current_block_type_index) {
          if_block3 = if_blocks[current_block_type_index];
          if (!if_block3) {
            if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block3.c();
          } else {
            if_block3.p(ctx2, dirty);
          }
          transition_in2(if_block3, 1);
          if_block3.m(div1, null);
        } else {
          if_block3 = null;
        }
      }
      if (!current || dirty[0] & 16777216 | dirty[1] & 1 && div1_class_value !== (div1_class_value = "" + ((ctx2[24] ? ctx2[24] : "") + " autocomplete-list " + (ctx2[31] ? "" : "hidden") + "\n    is-fullwidth svelte-lduj97"))) {
        attr2(div1, "class", div1_class_value);
      }
      if (!current || dirty[0] & 33345 && div2_class_value !== (div2_class_value = "" + ((ctx2[15] ? ctx2[15] : "") + "\n  " + (ctx2[9] || !ctx2[0].length ? "hide-arrow" : "") + "\n  " + (ctx2[6] ? "is-multiple" : "") + " autocomplete select is-fullwidth " + ctx2[33] + " svelte-lduj97"))) {
        attr2(div2, "class", div2_class_value);
      }
      if (dirty[0] & 33345 | dirty[1] & 2) {
        toggle_class(div2, "show-clear", ctx2[32]);
      }
      if (dirty[0] & 1073776193) {
        toggle_class(div2, "is-loading", ctx2[10] && ctx2[30]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in2(if_block1);
      transition_in2(if_block3);
      current = true;
    },
    o(local) {
      transition_out2(if_block1);
      transition_out2(if_block3);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach2(div2);
      if (if_block0) {
        if_block0.d();
      }
      if (if_block1)
        if_block1.d();
      ctx[77](null);
      if (if_block2)
        if_block2.d();
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      ctx[81](null);
      mounted = false;
      run_all2(dispose);
    }
  };
}
function safeStringFunction(theFunction, argument) {
  if (typeof theFunction !== "function") {
    console.error("Not a function: " + theFunction + ", argument: " + argument);
  }
  let originalResult;
  try {
    originalResult = theFunction(argument);
  } catch (error) {
    console.warn("Error executing Autocomplete function on value: " + argument + " function: " + theFunction);
  }
  let result = originalResult;
  if (result === void 0 || result === null) {
    result = "";
  }
  if (typeof result !== "string") {
    result = result.toString();
  }
  return result;
}
function numberOfMatches(listItem, searchWords) {
  if (!listItem) {
    return 0;
  }
  const itemKeywords = listItem.keywords;
  let matches = 0;
  searchWords.forEach((searchWord) => {
    if (itemKeywords.includes(searchWord)) {
      matches++;
    }
  });
  return matches;
}
function defaultItemSortFunction(obj1, obj2, searchWords) {
  return numberOfMatches(obj2, searchWords) - numberOfMatches(obj1, searchWords);
}
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function instance($$self, $$props, $$invalidate) {
  let showList;
  let clearable;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { items = [] } = $$props;
  let { searchFunction = false } = $$props;
  let { labelFieldName = void 0 } = $$props;
  let { keywordsFieldName = labelFieldName } = $$props;
  let { valueFieldName = void 0 } = $$props;
  let { labelFunction = function(item2) {
    if (item2 === void 0 || item2 === null) {
      return "";
    }
    return labelFieldName ? item2[labelFieldName] : item2;
  } } = $$props;
  let { keywordsFunction = function(item2) {
    if (item2 === void 0 || item2 === null) {
      return "";
    }
    return keywordsFieldName ? item2[keywordsFieldName] : labelFunction(item2);
  } } = $$props;
  let { valueFunction = function(item2, forceSingle = false) {
    if (item2 === void 0 || item2 === null) {
      return item2;
    }
    if (!multiple || forceSingle) {
      return valueFieldName ? item2[valueFieldName] : item2;
    } else {
      return item2.map((i) => valueFieldName ? i[valueFieldName] : i);
    }
  } } = $$props;
  let { keywordsCleanFunction = function(keywords) {
    return keywords;
  } } = $$props;
  let { textCleanFunction = function(userEnteredText) {
    return userEnteredText;
  } } = $$props;
  let { beforeChange = function(oldSelectedItem, newSelectedItem) {
    return true;
  } } = $$props;
  let { onChange = function(newSelectedItem) {
  } } = $$props;
  let { onFocus = function() {
  } } = $$props;
  let { onBlur = function() {
  } } = $$props;
  let { onCreate = function(text4) {
    if (debug) {
      console.log("onCreate: " + text4);
    }
  } } = $$props;
  let { selectFirstIfEmpty = false } = $$props;
  let { minCharactersToSearch = 1 } = $$props;
  let { maxItemsToShowInList = 0 } = $$props;
  let { multiple = false } = $$props;
  let { create = false } = $$props;
  let { ignoreAccents = true } = $$props;
  let { matchAllKeywords = true } = $$props;
  let { sortByMatchedKeywords = false } = $$props;
  let { itemFilterFunction = void 0 } = $$props;
  let { itemSortFunction = void 0 } = $$props;
  let { lock = false } = $$props;
  let { delay = 0 } = $$props;
  let { localFiltering = true } = $$props;
  let { hideArrow = false } = $$props;
  let { showClear = false } = $$props;
  let { showLoadingIndicator = false } = $$props;
  let { noResultsText = "No results found" } = $$props;
  let { loadingText = "Loading results..." } = $$props;
  let { createText = "Not found, add anyway?" } = $$props;
  let { placeholder = void 0 } = $$props;
  let { className = void 0 } = $$props;
  let { inputClassName = void 0 } = $$props;
  let { inputId = void 0 } = $$props;
  let { name = void 0 } = $$props;
  let { selectName = void 0 } = $$props;
  let { selectId = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { html5autocomplete = void 0 } = $$props;
  let { readonly = void 0 } = $$props;
  let { dropdownClassName = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { debug = false } = $$props;
  let { selectedItem = multiple ? [] : void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { highlightedItem = void 0 } = $$props;
  const uniqueId = "sautocomplete-" + Math.floor(Math.random() * 1e3);
  let input;
  let list;
  let opened = false;
  let loading = false;
  let highlightIndex = -1;
  let { text: text3 } = $$props;
  let filteredTextLength = 0;
  let filteredListItems;
  let listItems = [];
  let lastRequestId = 0;
  let lastResponseId = 0;
  let inputDelayTimeout;
  function safeLabelFunction(item2) {
    return safeStringFunction(labelFunction, item2);
  }
  function safeKeywordsFunction(item2) {
    const keywords = safeStringFunction(keywordsFunction, item2);
    let result = safeStringFunction(keywordsCleanFunction, keywords);
    result = result.toLowerCase().trim();
    if (ignoreAccents) {
      result = removeAccents(result);
    }
    if (debug) {
      console.log("Extracted keywords: '" + result + "' from item: " + JSON.stringify(item2));
    }
    return result;
  }
  function prepareListItems() {
    let timerId;
    if (debug) {
      timerId = `Autocomplete prepare list ${inputId ? `(id: ${inputId})` : ""}`;
      console.time(timerId);
      console.log("Prepare items to search");
      console.log("items: " + JSON.stringify(items));
    }
    if (!Array.isArray(items)) {
      console.warn("Autocomplete items / search function did not return array but", items);
      $$invalidate(0, items = []);
    }
    const length = items ? items.length : 0;
    listItems = new Array(length);
    if (length > 0) {
      items.forEach((item2, i) => {
        const listItem = getListItem(item2);
        if (listItem == void 0) {
          console.log("Undefined item for: ", item2);
        }
        listItems[i] = listItem;
      });
    }
    if (debug) {
      console.log(listItems.length + " items to search");
      console.timeEnd(timerId);
    }
  }
  function getListItem(item2) {
    return {
      keywords: safeKeywordsFunction(item2),
      label: safeLabelFunction(item2),
      item: item2
    };
  }
  function onSelectedItemChanged() {
    $$invalidate(2, value = valueFunction(selectedItem));
    $$invalidate(3, text3 = !multiple ? safeLabelFunction(selectedItem) : "");
    $$invalidate(27, filteredListItems = listItems);
    onChange(selectedItem);
  }
  function prepareUserEnteredText(userEnteredText) {
    if (userEnteredText === void 0 || userEnteredText === null) {
      return "";
    }
    const textFiltered = userEnteredText.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, " ").trim();
    $$invalidate(74, filteredTextLength = textFiltered.length);
    if (minCharactersToSearch > 1) {
      if (filteredTextLength < minCharactersToSearch) {
        return "";
      }
    }
    const cleanUserEnteredText = textCleanFunction(textFiltered);
    const textFilteredLowerCase = cleanUserEnteredText.toLowerCase().trim();
    if (debug) {
      console.log("Change user entered text '" + userEnteredText + "' into '" + textFilteredLowerCase + "'");
    }
    return textFilteredLowerCase;
  }
  async function search() {
    let timerId;
    if (debug) {
      timerId = `Autocomplete search ${inputId ? `(id: ${inputId})` : ""})`;
      console.time(timerId);
      console.log("Searching user entered text: '" + text3 + "'");
    }
    const textFiltered = prepareUserEnteredText(text3);
    if (textFiltered === "") {
      if (searchFunction) {
        $$invalidate(0, items = []);
        if (debug) {
          console.log("User entered text is empty clear list of items");
        }
      } else {
        $$invalidate(27, filteredListItems = listItems);
        if (debug) {
          console.log("User entered text is empty set the list of items to all items");
        }
      }
      closeIfMinCharsToSearchReached();
      if (debug) {
        console.timeEnd(timerId);
      }
      return;
    }
    if (!searchFunction) {
      processListItems(textFiltered);
    } else {
      lastRequestId = lastRequestId + 1;
      const currentRequestId = lastRequestId;
      $$invalidate(30, loading = true);
      if (searchFunction.constructor.name === "AsyncGeneratorFunction") {
        for await (const chunk of searchFunction(textFiltered)) {
          if (currentRequestId < lastResponseId) {
            return false;
          }
          if (currentRequestId > lastResponseId) {
            $$invalidate(0, items = []);
          }
          lastResponseId = currentRequestId;
          $$invalidate(0, items = [...items, ...chunk]);
          processListItems(textFiltered);
        }
        if (lastResponseId < currentRequestId) {
          lastResponseId = currentRequestId;
          $$invalidate(0, items = []);
          processListItems(textFiltered);
        }
      } else {
        let result = await searchFunction(textFiltered);
        if (currentRequestId < lastResponseId) {
          return false;
        }
        lastResponseId = currentRequestId;
        $$invalidate(0, items = result);
        processListItems(textFiltered);
      }
      $$invalidate(30, loading = false);
    }
    if (debug) {
      console.timeEnd(timerId);
      console.log("Search found " + filteredListItems.length + " items");
    }
  }
  function defaultItemFilterFunction(listItem, searchWords) {
    var matches = numberOfMatches(listItem, searchWords);
    if (matchAllKeywords) {
      return matches >= searchWords.length;
    } else {
      return matches > 0;
    }
  }
  function processListItems(textFiltered) {
    prepareListItems();
    const textFilteredWithoutAccents = ignoreAccents ? removeAccents(textFiltered) : textFiltered;
    const searchWords = textFilteredWithoutAccents.split(/\s+/g);
    let tempfilteredListItems;
    if (localFiltering) {
      if (itemFilterFunction) {
        tempfilteredListItems = listItems.filter((item2) => itemFilterFunction(item2.item, searchWords));
      } else {
        tempfilteredListItems = listItems.filter((item2) => defaultItemFilterFunction(item2, searchWords));
      }
      if (itemSortFunction) {
        tempfilteredListItems = tempfilteredListItems.sort((item1, item2) => itemSortFunction(item1.item, item2.item, searchWords));
      } else {
        if (sortByMatchedKeywords) {
          tempfilteredListItems = tempfilteredListItems.sort((item1, item2) => defaultItemSortFunction(item1, item2, searchWords));
        }
      }
    } else {
      tempfilteredListItems = listItems;
    }
    const hlfilter = highlightFilter(searchWords, "label");
    const filteredListItemsHighlighted = tempfilteredListItems.map(hlfilter);
    $$invalidate(27, filteredListItems = filteredListItemsHighlighted);
    closeIfMinCharsToSearchReached();
    return true;
  }
  function selectListItem(listItem) {
    if (debug) {
      console.log("selectListItem", listItem);
    }
    if (typeof listItem === "undefined" && create) {
      const createdItem = onCreate(text3);
      if (typeof createdItem !== "undefined") {
        prepareListItems();
        $$invalidate(27, filteredListItems = listItems);
        const index = findItemIndex(createdItem, filteredListItems);
        if (index >= 0) {
          $$invalidate(26, highlightIndex = index);
          listItem = filteredListItems[highlightIndex];
        }
      }
    }
    if (typeof listItem === "undefined") {
      if (debug) {
        console.log(`listItem is undefined. Can not select.`);
      }
      return false;
    }
    const newSelectedItem = listItem.item;
    if (beforeChange(selectedItem, newSelectedItem)) {
      if (!multiple) {
        $$invalidate(1, selectedItem = void 0);
        $$invalidate(1, selectedItem = newSelectedItem);
      } else if (!selectedItem) {
        $$invalidate(1, selectedItem = [newSelectedItem]);
      } else if (selectedItem.includes(newSelectedItem)) {
        $$invalidate(1, selectedItem = selectedItem.filter((i) => i !== newSelectedItem));
      } else {
        $$invalidate(1, selectedItem = [...selectedItem, newSelectedItem]);
      }
    }
    return true;
  }
  function selectItem() {
    if (debug) {
      console.log("selectItem", highlightIndex);
    }
    const listItem = filteredListItems[highlightIndex];
    if (selectListItem(listItem)) {
      close();
      if (multiple) {
        input.focus();
      }
    }
  }
  function up() {
    if (debug) {
      console.log("up");
    }
    open();
    if (highlightIndex > 0) {
      $$invalidate(26, highlightIndex--, highlightIndex);
    }
    highlight();
  }
  function down() {
    if (debug) {
      console.log("down");
    }
    open();
    if (highlightIndex < filteredListItems.length - 1) {
      $$invalidate(26, highlightIndex++, highlightIndex);
    }
    highlight();
  }
  function highlight() {
    if (debug) {
      console.log("highlight");
    }
    const query = ".selected";
    if (debug) {
      console.log("Seaching DOM element: " + query + " in " + list);
    }
    const el = list && list.querySelector(query);
    if (el) {
      if (typeof el.scrollIntoViewIfNeeded === "function") {
        if (debug) {
          console.log("Scrolling selected item into view");
        }
        el.scrollIntoViewIfNeeded();
      } else {
        if (debug) {
          console.warn("Could not scroll selected item into view, scrollIntoViewIfNeeded not supported");
        }
      }
    } else {
      if (debug) {
        console.warn("Selected item not found to scroll into view");
      }
    }
  }
  function onListItemClick(listItem) {
    if (debug) {
      console.log("onListItemClick");
    }
    if (selectListItem(listItem)) {
      close();
      if (multiple) {
        input.focus();
      }
    }
  }
  function onDocumentClick(e) {
    if (debug) {
      console.log("onDocumentClick: " + JSON.stringify(e.composedPath()));
    }
    if (e.composedPath().some((path) => path.classList && path.classList.contains(uniqueId))) {
      if (debug) {
        console.log("onDocumentClick inside");
      }
      highlight();
    } else {
      if (debug) {
        console.log("onDocumentClick outside");
      }
      close();
    }
  }
  function onKeyDown(e) {
    if (debug) {
      console.log("onKeyDown");
    }
    let key = e.key;
    if (key === "Tab" && e.shiftKey)
      key = "ShiftTab";
    const fnmap = {
      Tab: opened ? down.bind(this) : null,
      ShiftTab: opened ? up.bind(this) : null,
      ArrowDown: down.bind(this),
      ArrowUp: up.bind(this),
      Escape: onEsc.bind(this),
      Backspace: multiple && selectedItem && selectedItem.length && !text3 ? onBackspace.bind(this) : null
    };
    const fn = fnmap[key];
    if (typeof fn === "function") {
      fn(e);
    }
  }
  function onKeyPress(e) {
    if (debug) {
      console.log("onKeyPress");
    }
    if (e.key === "Enter" && opened) {
      e.preventDefault();
      onEnter();
    }
  }
  function onEnter() {
    selectItem();
  }
  function onInput(e) {
    if (debug) {
      console.log("onInput");
    }
    $$invalidate(3, text3 = e.target.value);
    if (inputDelayTimeout) {
      clearTimeout(inputDelayTimeout);
    }
    if (delay) {
      inputDelayTimeout = setTimeout(processInput, delay);
    } else {
      processInput();
    }
  }
  function unselectItem(tag) {
    if (debug) {
      console.log("unselectItem", tag);
    }
    $$invalidate(1, selectedItem = selectedItem.filter((i) => i !== tag));
    input.focus();
  }
  function processInput() {
    if (search()) {
      $$invalidate(26, highlightIndex = 0);
      open();
    }
  }
  function onInputClick() {
    if (debug) {
      console.log("onInputClick");
    }
    resetListToAllItemsAndOpen();
  }
  function onEsc(e) {
    if (debug) {
      console.log("onEsc");
    }
    e.stopPropagation();
    if (opened) {
      input.focus();
      close();
    }
  }
  function onBackspace(e) {
    if (debug) {
      console.log("onBackspace");
    }
    unselectItem(selectedItem[selectedItem.length - 1]);
  }
  function onFocusInternal() {
    if (debug) {
      console.log("onFocus");
    }
    onFocus();
    resetListToAllItemsAndOpen();
  }
  function onBlurInternal() {
    if (debug) {
      console.log("onBlur");
    }
    onBlur();
  }
  function resetListToAllItemsAndOpen() {
    if (debug) {
      console.log("resetListToAllItemsAndOpen");
    }
    if (!text3) {
      $$invalidate(27, filteredListItems = listItems);
    } else if (!listItems.length && selectedItem && searchFunction) {
      search();
    }
    open();
    if (selectedItem) {
      if (debug) {
        console.log("Searching currently selected item: " + JSON.stringify(selectedItem));
      }
      const index = findItemIndex(selectedItem, filteredListItems);
      if (index >= 0) {
        $$invalidate(26, highlightIndex = index);
        highlight();
      }
    }
  }
  function findItemIndex(item2, items2) {
    if (debug) {
      console.log("Finding index for item", item2);
    }
    let index = -1;
    for (let i = 0; i < items2.length; i++) {
      const listItem = items2[i];
      if (typeof listItem === "undefined") {
        if (debug) {
          console.log(`listItem ${i} is undefined. Skipping.`);
        }
        continue;
      }
      if (debug) {
        console.log("Item " + i + ": " + JSON.stringify(listItem));
      }
      if (item2 == listItem.item) {
        index = i;
        break;
      }
    }
    if (debug) {
      if (index >= 0) {
        console.log("Found index for item: " + index);
      } else {
        console.warn("Not found index for item: " + item2);
      }
    }
    return index;
  }
  function open() {
    if (debug) {
      console.log("open");
    }
    if (isMinCharsToSearchReached()) {
      return;
    }
    $$invalidate(73, opened = true);
  }
  function close() {
    if (debug) {
      console.log("close");
    }
    $$invalidate(73, opened = false);
    $$invalidate(30, loading = false);
    if (!text3 && selectFirstIfEmpty) {
      $$invalidate(26, highlightIndex = 0);
      selectItem();
    }
  }
  function isMinCharsToSearchReached() {
    return minCharactersToSearch > 1 && filteredTextLength < minCharactersToSearch;
  }
  function closeIfMinCharsToSearchReached() {
    if (isMinCharsToSearchReached()) {
      close();
    }
  }
  function clear() {
    if (debug) {
      console.log("clear");
    }
    $$invalidate(3, text3 = "");
    $$invalidate(1, selectedItem = multiple ? [] : void 0);
    setTimeout(() => {
      input.focus();
      close();
    });
  }
  function highlightFilter(keywords, field) {
    return (item2) => {
      let label = item2[field];
      const newItem = Object.assign({ highlighted: void 0 }, item2);
      newItem.highlighted = label;
      const labelLowercase = label.toLowerCase();
      const labelLowercaseNoAc = ignoreAccents ? removeAccents(labelLowercase) : labelLowercase;
      if (keywords && keywords.length) {
        const positions = [];
        for (let i = 0; i < keywords.length; i++) {
          let keyword = keywords[i];
          if (ignoreAccents) {
            keyword = removeAccents(keyword);
          }
          const keywordLen = keyword.length;
          let pos1 = 0;
          do {
            pos1 = labelLowercaseNoAc.indexOf(keyword, pos1);
            if (pos1 >= 0) {
              let pos2 = pos1 + keywordLen;
              positions.push([pos1, pos2]);
              pos1 = pos2;
            }
          } while (pos1 !== -1);
        }
        if (positions.length > 0) {
          const keywordPatterns = new Set();
          for (let i = 0; i < positions.length; i++) {
            const pair = positions[i];
            const pos1 = pair[0];
            const pos2 = pair[1];
            const keywordPattern = labelLowercase.substring(pos1, pos2);
            keywordPatterns.add(keywordPattern);
          }
          for (let keywordPattern of keywordPatterns) {
            if (keywordPattern === "b") {
              continue;
            }
            const reg = new RegExp("(" + keywordPattern + ")", "ig");
            const newHighlighted = newItem.highlighted.replace(reg, "<b>$1</b>");
            newItem.highlighted = newHighlighted;
          }
        }
      }
      return newItem;
    };
  }
  function isConfirmed(listItem) {
    if (!selectedItem) {
      return false;
    }
    if (multiple) {
      return selectedItem.includes(listItem);
    } else {
      return listItem == selectedItem;
    }
  }
  function input_1_binding($$value) {
    binding_callbacks2[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(28, input);
    });
  }
  function input_1_input_handler() {
    text3 = this.value;
    $$invalidate(3, text3);
  }
  const click_handler = (listItem) => onListItemClick(listItem);
  const pointerenter_handler = (i) => {
    $$invalidate(26, highlightIndex = i);
  };
  function div1_binding($$value) {
    binding_callbacks2[$$value ? "unshift" : "push"](() => {
      list = $$value;
      $$invalidate(29, list);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("items" in $$props2)
      $$invalidate(0, items = $$props2.items);
    if ("searchFunction" in $$props2)
      $$invalidate(48, searchFunction = $$props2.searchFunction);
    if ("labelFieldName" in $$props2)
      $$invalidate(49, labelFieldName = $$props2.labelFieldName);
    if ("keywordsFieldName" in $$props2)
      $$invalidate(50, keywordsFieldName = $$props2.keywordsFieldName);
    if ("valueFieldName" in $$props2)
      $$invalidate(51, valueFieldName = $$props2.valueFieldName);
    if ("labelFunction" in $$props2)
      $$invalidate(52, labelFunction = $$props2.labelFunction);
    if ("keywordsFunction" in $$props2)
      $$invalidate(53, keywordsFunction = $$props2.keywordsFunction);
    if ("valueFunction" in $$props2)
      $$invalidate(4, valueFunction = $$props2.valueFunction);
    if ("keywordsCleanFunction" in $$props2)
      $$invalidate(54, keywordsCleanFunction = $$props2.keywordsCleanFunction);
    if ("textCleanFunction" in $$props2)
      $$invalidate(55, textCleanFunction = $$props2.textCleanFunction);
    if ("beforeChange" in $$props2)
      $$invalidate(56, beforeChange = $$props2.beforeChange);
    if ("onChange" in $$props2)
      $$invalidate(57, onChange = $$props2.onChange);
    if ("onFocus" in $$props2)
      $$invalidate(58, onFocus = $$props2.onFocus);
    if ("onBlur" in $$props2)
      $$invalidate(59, onBlur = $$props2.onBlur);
    if ("onCreate" in $$props2)
      $$invalidate(60, onCreate = $$props2.onCreate);
    if ("selectFirstIfEmpty" in $$props2)
      $$invalidate(61, selectFirstIfEmpty = $$props2.selectFirstIfEmpty);
    if ("minCharactersToSearch" in $$props2)
      $$invalidate(62, minCharactersToSearch = $$props2.minCharactersToSearch);
    if ("maxItemsToShowInList" in $$props2)
      $$invalidate(5, maxItemsToShowInList = $$props2.maxItemsToShowInList);
    if ("multiple" in $$props2)
      $$invalidate(6, multiple = $$props2.multiple);
    if ("create" in $$props2)
      $$invalidate(7, create = $$props2.create);
    if ("ignoreAccents" in $$props2)
      $$invalidate(63, ignoreAccents = $$props2.ignoreAccents);
    if ("matchAllKeywords" in $$props2)
      $$invalidate(64, matchAllKeywords = $$props2.matchAllKeywords);
    if ("sortByMatchedKeywords" in $$props2)
      $$invalidate(65, sortByMatchedKeywords = $$props2.sortByMatchedKeywords);
    if ("itemFilterFunction" in $$props2)
      $$invalidate(66, itemFilterFunction = $$props2.itemFilterFunction);
    if ("itemSortFunction" in $$props2)
      $$invalidate(67, itemSortFunction = $$props2.itemSortFunction);
    if ("lock" in $$props2)
      $$invalidate(8, lock = $$props2.lock);
    if ("delay" in $$props2)
      $$invalidate(68, delay = $$props2.delay);
    if ("localFiltering" in $$props2)
      $$invalidate(69, localFiltering = $$props2.localFiltering);
    if ("hideArrow" in $$props2)
      $$invalidate(9, hideArrow = $$props2.hideArrow);
    if ("showClear" in $$props2)
      $$invalidate(70, showClear = $$props2.showClear);
    if ("showLoadingIndicator" in $$props2)
      $$invalidate(10, showLoadingIndicator = $$props2.showLoadingIndicator);
    if ("noResultsText" in $$props2)
      $$invalidate(11, noResultsText = $$props2.noResultsText);
    if ("loadingText" in $$props2)
      $$invalidate(12, loadingText = $$props2.loadingText);
    if ("createText" in $$props2)
      $$invalidate(13, createText = $$props2.createText);
    if ("placeholder" in $$props2)
      $$invalidate(14, placeholder = $$props2.placeholder);
    if ("className" in $$props2)
      $$invalidate(15, className = $$props2.className);
    if ("inputClassName" in $$props2)
      $$invalidate(16, inputClassName = $$props2.inputClassName);
    if ("inputId" in $$props2)
      $$invalidate(17, inputId = $$props2.inputId);
    if ("name" in $$props2)
      $$invalidate(18, name = $$props2.name);
    if ("selectName" in $$props2)
      $$invalidate(19, selectName = $$props2.selectName);
    if ("selectId" in $$props2)
      $$invalidate(20, selectId = $$props2.selectId);
    if ("title" in $$props2)
      $$invalidate(21, title = $$props2.title);
    if ("html5autocomplete" in $$props2)
      $$invalidate(22, html5autocomplete = $$props2.html5autocomplete);
    if ("readonly" in $$props2)
      $$invalidate(23, readonly = $$props2.readonly);
    if ("dropdownClassName" in $$props2)
      $$invalidate(24, dropdownClassName = $$props2.dropdownClassName);
    if ("disabled" in $$props2)
      $$invalidate(25, disabled = $$props2.disabled);
    if ("debug" in $$props2)
      $$invalidate(71, debug = $$props2.debug);
    if ("selectedItem" in $$props2)
      $$invalidate(1, selectedItem = $$props2.selectedItem);
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
    if ("highlightedItem" in $$props2)
      $$invalidate(47, highlightedItem = $$props2.highlightedItem);
    if ("text" in $$props2)
      $$invalidate(3, text3 = $$props2.text);
    if ("$$scope" in $$props2)
      $$invalidate(75, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 1) {
      prepareListItems();
    }
    if ($$self.$$.dirty[0] & 2) {
      onSelectedItemChanged();
    }
    if ($$self.$$.dirty[0] & 201326592) {
      $$invalidate(47, highlightedItem = filteredListItems && highlightIndex && highlightIndex >= 0 && highlightIndex < filteredListItems.length ? filteredListItems[highlightIndex].item : null);
    }
    if ($$self.$$.dirty[0] & 1 | $$self.$$.dirty[2] & 6144) {
      $$invalidate(31, showList = opened && (items && items.length > 0 || filteredTextLength > 0));
    }
    if ($$self.$$.dirty[0] & 322 | $$self.$$.dirty[2] & 256) {
      $$invalidate(32, clearable = showClear || (lock || multiple) && selectedItem);
    }
  };
  return [
    items,
    selectedItem,
    value,
    text3,
    valueFunction,
    maxItemsToShowInList,
    multiple,
    create,
    lock,
    hideArrow,
    showLoadingIndicator,
    noResultsText,
    loadingText,
    createText,
    placeholder,
    className,
    inputClassName,
    inputId,
    name,
    selectName,
    selectId,
    title,
    html5autocomplete,
    readonly,
    dropdownClassName,
    disabled,
    highlightIndex,
    filteredListItems,
    input,
    list,
    loading,
    showList,
    clearable,
    uniqueId,
    safeLabelFunction,
    selectItem,
    onListItemClick,
    onDocumentClick,
    onKeyDown,
    onKeyPress,
    onInput,
    unselectItem,
    onInputClick,
    onFocusInternal,
    onBlurInternal,
    clear,
    isConfirmed,
    highlightedItem,
    searchFunction,
    labelFieldName,
    keywordsFieldName,
    valueFieldName,
    labelFunction,
    keywordsFunction,
    keywordsCleanFunction,
    textCleanFunction,
    beforeChange,
    onChange,
    onFocus,
    onBlur,
    onCreate,
    selectFirstIfEmpty,
    minCharactersToSearch,
    ignoreAccents,
    matchAllKeywords,
    sortByMatchedKeywords,
    itemFilterFunction,
    itemSortFunction,
    delay,
    localFiltering,
    showClear,
    debug,
    highlightFilter,
    opened,
    filteredTextLength,
    $$scope,
    slots,
    input_1_binding,
    input_1_input_handler,
    click_handler,
    pointerenter_handler,
    div1_binding
  ];
}
var SimpleAutocomplete = class extends SvelteComponent2 {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-lduj97-style"))
      add_css();
    init2(this, options, instance, create_fragment, safe_not_equal2, {
      items: 0,
      searchFunction: 48,
      labelFieldName: 49,
      keywordsFieldName: 50,
      valueFieldName: 51,
      labelFunction: 52,
      keywordsFunction: 53,
      valueFunction: 4,
      keywordsCleanFunction: 54,
      textCleanFunction: 55,
      beforeChange: 56,
      onChange: 57,
      onFocus: 58,
      onBlur: 59,
      onCreate: 60,
      selectFirstIfEmpty: 61,
      minCharactersToSearch: 62,
      maxItemsToShowInList: 5,
      multiple: 6,
      create: 7,
      ignoreAccents: 63,
      matchAllKeywords: 64,
      sortByMatchedKeywords: 65,
      itemFilterFunction: 66,
      itemSortFunction: 67,
      lock: 8,
      delay: 68,
      localFiltering: 69,
      hideArrow: 9,
      showClear: 70,
      showLoadingIndicator: 10,
      noResultsText: 11,
      loadingText: 12,
      createText: 13,
      placeholder: 14,
      className: 15,
      inputClassName: 16,
      inputId: 17,
      name: 18,
      selectName: 19,
      selectId: 20,
      title: 21,
      html5autocomplete: 22,
      readonly: 23,
      dropdownClassName: 24,
      disabled: 25,
      debug: 71,
      selectedItem: 1,
      value: 2,
      highlightedItem: 47,
      text: 3,
      highlightFilter: 72
    }, [-1, -1, -1, -1]);
  }
  get highlightFilter() {
    return this.$$.ctx[72];
  }
};
var simple_svelte_autocomplete_default = SimpleAutocomplete;

// module/svelte/Tabs.svelte
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function get_each_context_12(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function create_each_block_12(ctx) {
  let li;
  let span;
  let t0_value = ctx[3].label + "";
  let t0;
  let t1;
  let li_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      li = element("li");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      attr(span, "class", "svelte-8kv0mp");
      attr(li, "class", li_class_value = "" + (null_to_empty(ctx[0] === ctx[3].value ? "active" : "") + " svelte-8kv0mp"));
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, span);
      append(span, t0);
      append(li, t1);
      if (!mounted) {
        dispose = listen(span, "click", function() {
          if (is_function(ctx[2](ctx[3].value)))
            ctx[2](ctx[3].value).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && t0_value !== (t0_value = ctx[3].label + ""))
        set_data(t0, t0_value);
      if (dirty & 3 && li_class_value !== (li_class_value = "" + (null_to_empty(ctx[0] === ctx[3].value ? "active" : "") + " svelte-8kv0mp"))) {
        attr(li, "class", li_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block2(ctx) {
  let div;
  let switch_instance;
  let t;
  let current;
  var switch_value = ctx[3].component;
  function switch_props(ctx2) {
    return {};
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      div = element("div");
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t = space();
      attr(div, "class", "box svelte-8kv0mp");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (switch_instance) {
        mount_component(switch_instance, div, null);
      }
      append(div, t);
      current = true;
    },
    p(ctx2, dirty) {
      if (switch_value !== (switch_value = ctx2[3].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, t);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
function create_each_block2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0] == ctx[3].value && create_if_block2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[0] == ctx2[3].value) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 3) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment2(ctx) {
  let ul;
  let t;
  let each1_anchor;
  let current;
  let each_value_1 = ctx[1];
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
  }
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each1_anchor = empty();
      attr(ul, "class", "svelte-8kv0mp");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(ul, null);
      }
      insert(target, t, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 7) {
        each_value_1 = ctx2[1];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_12(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_12(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(ul, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_1.length;
      }
      if (dirty & 3) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      destroy_each(each_blocks_1, detaching);
      if (detaching)
        detach(t);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each1_anchor);
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let { items = [] } = $$props;
  let { activeTabValue = 1 } = $$props;
  const handleClick = (tabValue) => () => $$invalidate(0, activeTabValue = tabValue);
  $$self.$$set = ($$props2) => {
    if ("items" in $$props2)
      $$invalidate(1, items = $$props2.items);
    if ("activeTabValue" in $$props2)
      $$invalidate(0, activeTabValue = $$props2.activeTabValue);
  };
  return [activeTabValue, items, handleClick];
}
var Tabs = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, { items: 1, activeTabValue: 0 });
  }
};
var Tabs_default = Tabs;
require_();

// module/svelte/QuestActorSheetInventory.svelte
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[12] = i;
  return child_ctx;
}
function create_if_block3(ctx) {
  let ol;
  let t;
  let each_value = { length: 12 };
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
  }
  let if_block = ctx[3].isEditable && create_if_block_12(ctx);
  return {
    c() {
      ol = element("ol");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block)
        if_block.c();
      attr(ol, "class", "svelte-gddmne");
    },
    m(target, anchor) {
      insert(target, ol, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ol, null);
      }
      append(ol, t);
      if (if_block)
        if_block.m(ol, null);
    },
    p(ctx2, dirty) {
      if (dirty & 10) {
        each_value = { length: 12 };
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ol, t);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (ctx2[3].isEditable)
        if_block.p(ctx2, dirty);
    },
    d(detaching) {
      if (detaching)
        detach(ol);
      destroy_each(each_blocks, detaching);
      if (if_block)
        if_block.d();
    }
  };
}
function create_else_block2(ctx) {
  let li;
  return {
    c() {
      li = element("li");
      attr(li, "class", "svelte-gddmne");
    },
    m(target, anchor) {
      insert(target, li, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_if_block_22(ctx) {
  let li;
  let div1;
  let span;
  let t0_value = ctx[1][ctx[12]].data.name + "";
  let t0;
  let span_class_value;
  let t1;
  let div0;
  let if_block = ctx[3].isEditable && create_if_block_32(ctx);
  return {
    c() {
      li = element("li");
      div1 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      div0 = element("div");
      if (if_block)
        if_block.c();
      attr(span, "class", span_class_value = "" + (null_to_empty(ctx[1][ctx[12]].data.data.rarity) + " svelte-gddmne"));
      attr(div0, "class", "right");
      attr(div1, "class", "flex svelte-gddmne");
      attr(li, "class", "svelte-gddmne");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, div1);
      append(div1, span);
      append(span, t0);
      append(div1, t1);
      append(div1, div0);
      if (if_block)
        if_block.m(div0, null);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t0_value !== (t0_value = ctx2[1][ctx2[12]].data.name + ""))
        set_data(t0, t0_value);
      if (dirty & 2 && span_class_value !== (span_class_value = "" + (null_to_empty(ctx2[1][ctx2[12]].data.data.rarity) + " svelte-gddmne"))) {
        attr(span, "class", span_class_value);
      }
      if (ctx2[3].isEditable)
        if_block.p(ctx2, dirty);
    },
    d(detaching) {
      if (detaching)
        detach(li);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_32(ctx) {
  let a0;
  let t0;
  let a1;
  let t1;
  let a2;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[4](ctx[12], ...args);
  }
  function click_handler_1(...args) {
    return ctx[5](ctx[12], ...args);
  }
  function click_handler_2(...args) {
    return ctx[6](ctx[12], ...args);
  }
  return {
    c() {
      a0 = element("a");
      a0.innerHTML = `<i class="fas fa-bullhorn svelte-gddmne"></i>`;
      t0 = space();
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-pen svelte-gddmne"></i>`;
      t1 = space();
      a2 = element("a");
      a2.innerHTML = `<i class="fas fa-trash svelte-gddmne"></i>`;
    },
    m(target, anchor) {
      insert(target, a0, anchor);
      insert(target, t0, anchor);
      insert(target, a1, anchor);
      insert(target, t1, anchor);
      insert(target, a2, anchor);
      if (!mounted) {
        dispose = [
          listen(a0, "click", click_handler),
          listen(a1, "click", click_handler_1),
          listen(a2, "click", click_handler_2)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(a0);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(a1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(a2);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_each_block3(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (!!ctx2[1][ctx2[12]])
      return create_if_block_22;
    return create_else_block2;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_12(ctx) {
  let li;
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      li = element("li");
      a = element("a");
      a.innerHTML = `<i class="fas fa-plus svelte-gddmne"></i>`;
      attr(a, "class", "item-control item-create");
      attr(a, "title", "Create item");
      attr(a, "data-type", "item");
      set_style(li, "list-style-type", "none");
      set_style(li, "text-align", "right");
      attr(li, "class", "svelte-gddmne");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, a);
      if (!mounted) {
        dispose = listen(a, "click", ctx[3]?._onItemCreate.bind(ctx[3]));
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment3(ctx) {
  let if_block_anchor;
  let if_block = !ctx[0].limited && create_if_block3(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (!ctx2[0].limited) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block3(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let items;
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(0, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  let abilities;
  const click_handler = (i, e) => {
    sheet?._chatAbility(items[i].data._id);
  };
  const click_handler_1 = (i, e) => {
    sheet?._onItemEdit(items[i].data._id);
  };
  const click_handler_2 = (i, e) => {
    sheet?._onItemDelete(items[i].data._id);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 1) {
      $:
        $$invalidate(1, items = $sheetData.data.data.itemTypes.item);
    }
  };
  return [
    $sheetData,
    items,
    sheetData,
    sheet,
    click_handler,
    click_handler_1,
    click_handler_2
  ];
}
var QuestActorSheetInventory = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance3, create_fragment3, safe_not_equal, {});
  }
};
var QuestActorSheetInventory_default = QuestActorSheetInventory;
require_2();

// module/svelte/QuestActorSheetAbilities.svelte
function get_each_context4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[12] = i;
  return child_ctx;
}
function get_each_context_13(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}
function create_if_block4(ctx) {
  let t;
  let each_1_anchor;
  let if_block = ctx[3].isEditable && create_if_block_23(ctx);
  let each_value = {
    length: Object.keys(ctx[1]).length
  };
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
  }
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (ctx2[3].isEditable)
        if_block.p(ctx2, dirty);
      if (dirty & 10) {
        each_value = {
          length: Object.keys(ctx2[1]).length
        };
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_if_block_23(ctx) {
  let ul;
  let li;
  let a;
  let mounted;
  let dispose;
  return {
    c() {
      ul = element("ul");
      li = element("li");
      a = element("a");
      a.innerHTML = `<i class="fas fa-plus svelte-17i6vo1"></i>`;
      set_style(li, "list-style-type", "none");
      set_style(li, "text-align", "right");
      attr(li, "class", "svelte-17i6vo1");
      attr(ul, "class", "svelte-17i6vo1");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li);
      append(li, a);
      if (!mounted) {
        dispose = listen(a, "click", ctx[3]?._openAbilityDialog.bind(ctx[3]));
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(ul);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_13(ctx) {
  let a0;
  let t;
  let a1;
  let mounted;
  let dispose;
  function click_handler_1(...args) {
    return ctx[5](ctx[13], ...args);
  }
  function click_handler_2(...args) {
    return ctx[6](ctx[13], ...args);
  }
  return {
    c() {
      a0 = element("a");
      a0.innerHTML = `<i class="fas fa-info-circle svelte-17i6vo1"></i>`;
      t = space();
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-trash svelte-17i6vo1"></i>`;
    },
    m(target, anchor) {
      insert(target, a0, anchor);
      insert(target, t, anchor);
      insert(target, a1, anchor);
      if (!mounted) {
        dispose = [
          listen(a0, "click", click_handler_1),
          listen(a1, "click", click_handler_2)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(a0);
      if (detaching)
        detach(t);
      if (detaching)
        detach(a1);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_each_block_13(ctx) {
  let li;
  let div2;
  let div0;
  let a;
  let i;
  let t0_value = ctx[13].data.data.cost + "";
  let t0;
  let t1_value = ctx[13].name + "";
  let t1;
  let t2;
  let div1;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[4](ctx[13], ...args);
  }
  let if_block = ctx[3].isEditable && create_if_block_13(ctx);
  return {
    c() {
      li = element("li");
      div2 = element("div");
      div0 = element("div");
      a = element("a");
      i = element("i");
      t0 = text(t0_value);
      t1 = text(t1_value);
      t2 = space();
      div1 = element("div");
      if (if_block)
        if_block.c();
      attr(i, "class", "cost svelte-17i6vo1");
      attr(div1, "class", "flex medium svelte-17i6vo1");
      attr(div2, "class", "flex svelte-17i6vo1");
      attr(li, "class", "svelte-17i6vo1");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, div2);
      append(div2, div0);
      append(div0, a);
      append(a, i);
      append(i, t0);
      append(div0, t1);
      append(div2, t2);
      append(div2, div1);
      if (if_block)
        if_block.m(div1, null);
      if (!mounted) {
        dispose = listen(a, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && t0_value !== (t0_value = ctx[13].data.data.cost + ""))
        set_data(t0, t0_value);
      if (dirty & 2 && t1_value !== (t1_value = ctx[13].name + ""))
        set_data(t1, t1_value);
      if (ctx[3].isEditable)
        if_block.p(ctx, dirty);
    },
    d(detaching) {
      if (detaching)
        detach(li);
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_each_block4(ctx) {
  let h3;
  let t0_value = Object.keys(ctx[1])[ctx[12]] + "";
  let t0;
  let t1;
  let ul;
  let t2;
  let each_value_1 = ctx[1][Object.keys(ctx[1])[ctx[12]]];
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_13(get_each_context_13(ctx, each_value_1, i));
  }
  return {
    c() {
      h3 = element("h3");
      t0 = text(t0_value);
      t1 = space();
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      attr(h3, "class", "svelte-17i6vo1");
      attr(ul, "class", "svelte-17i6vo1");
    },
    m(target, anchor) {
      insert(target, h3, anchor);
      append(h3, t0);
      insert(target, t1, anchor);
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
      append(ul, t2);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t0_value !== (t0_value = Object.keys(ctx2[1])[ctx2[12]] + ""))
        set_data(t0, t0_value);
      if (dirty & 10) {
        each_value_1 = ctx2[1][Object.keys(ctx2[1])[ctx2[12]]];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_13(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_13(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, t2);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(h3);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(ul);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment4(ctx) {
  let if_block_anchor;
  let if_block = !ctx[0].limited && create_if_block4(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (!ctx2[0].limited) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block4(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let abilityTypes;
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(0, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  let abilities;
  const click_handler = (ability, e) => {
    if (sheet.isEditable)
      sheet?._chatAbility(ability.data._id);
  };
  const click_handler_1 = (ability, e) => {
    sheet?._onItemEdit(ability.data._id);
  };
  const click_handler_2 = (ability, e) => {
    sheet?._onItemDelete(ability.data._id);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 1) {
      $:
        $$invalidate(1, abilityTypes = $sheetData.data.data.abilityTypes);
    }
  };
  return [
    $sheetData,
    abilityTypes,
    sheetData,
    sheet,
    click_handler,
    click_handler_1,
    click_handler_2
  ];
}
var QuestActorSheetAbilities = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance4, create_fragment4, safe_not_equal, {});
  }
};
var QuestActorSheetAbilities_default = QuestActorSheetAbilities;
require_3();

// module/svelte/Translation.svelte
function get_each_context5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i];
  child_ctx[6] = i;
  return child_ctx;
}
var get__3_slot_changes = (dirty) => ({});
var get__3_slot_context = (ctx) => ({});
var get__2_slot_changes = (dirty) => ({});
var get__2_slot_context = (ctx) => ({});
var get__1_slot_changes = (dirty) => ({});
var get__1_slot_context = (ctx) => ({});
function create_else_block3(ctx) {
  let t_value = ctx[4] + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 1 && t_value !== (t_value = ctx2[4] + ""))
        set_data(t, t_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block_24(ctx) {
  let current;
  const _3_slot_template = ctx[3]["3"];
  const _3_slot = create_slot(_3_slot_template, ctx, ctx[2], get__3_slot_context);
  return {
    c() {
      if (_3_slot)
        _3_slot.c();
    },
    m(target, anchor) {
      if (_3_slot) {
        _3_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (_3_slot) {
        if (_3_slot.p && (!current || dirty & 4)) {
          update_slot(_3_slot, _3_slot_template, ctx2, ctx2[2], !current ? -1 : dirty, get__3_slot_changes, get__3_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(_3_slot, local);
      current = true;
    },
    o(local) {
      transition_out(_3_slot, local);
      current = false;
    },
    d(detaching) {
      if (_3_slot)
        _3_slot.d(detaching);
    }
  };
}
function create_if_block_14(ctx) {
  let current;
  const _2_slot_template = ctx[3]["2"];
  const _2_slot = create_slot(_2_slot_template, ctx, ctx[2], get__2_slot_context);
  return {
    c() {
      if (_2_slot)
        _2_slot.c();
    },
    m(target, anchor) {
      if (_2_slot) {
        _2_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (_2_slot) {
        if (_2_slot.p && (!current || dirty & 4)) {
          update_slot(_2_slot, _2_slot_template, ctx2, ctx2[2], !current ? -1 : dirty, get__2_slot_changes, get__2_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(_2_slot, local);
      current = true;
    },
    o(local) {
      transition_out(_2_slot, local);
      current = false;
    },
    d(detaching) {
      if (_2_slot)
        _2_slot.d(detaching);
    }
  };
}
function create_if_block5(ctx) {
  let current;
  const _1_slot_template = ctx[3]["1"];
  const _1_slot = create_slot(_1_slot_template, ctx, ctx[2], get__1_slot_context);
  return {
    c() {
      if (_1_slot)
        _1_slot.c();
    },
    m(target, anchor) {
      if (_1_slot) {
        _1_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (_1_slot) {
        if (_1_slot.p && (!current || dirty & 4)) {
          update_slot(_1_slot, _1_slot_template, ctx2, ctx2[2], !current ? -1 : dirty, get__1_slot_changes, get__1_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(_1_slot, local);
      current = true;
    },
    o(local) {
      transition_out(_1_slot, local);
      current = false;
    },
    d(detaching) {
      if (_1_slot)
        _1_slot.d(detaching);
    }
  };
}
function create_each_block5(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block5, create_if_block_14, create_if_block_24, create_else_block3];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[6] != 0 && ctx2[4] === "1")
      return 0;
    if (ctx2[6] != 0 && ctx2[4] === "2")
      return 1;
    if (ctx2[6] != 0 && ctx2[4] === "3")
      return 2;
    return 3;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment5(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block5(get_each_context5(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 5) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context5(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block5(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function instance5($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { str } = $$props;
  let dump;
  $$self.$$set = ($$props2) => {
    if ("str" in $$props2)
      $$invalidate(1, str = $$props2.str);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2) {
      $:
        $$invalidate(0, dump = str.split(/\{(.*?)\}/));
    }
  };
  return [dump, str, $$scope, slots];
}
var Translation = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, create_fragment5, safe_not_equal, { str: 1 });
  }
};
var Translation_default = Translation;

// module/svelte/QuestActorSheetBase.svelte
function create__1_slot_7(ctx) {
  let span;
  let input;
  let input_class_value;
  let input_value_value;
  let input_placeholder_value;
  return {
    c() {
      span = element("span");
      input = element("input");
      attr(input, "class", input_class_value = "dotted long name quest " + ctx[13] + " svelte-811xhi");
      attr(input, "name", "name");
      attr(input, "type", "text");
      input.value = input_value_value = ctx[1].name;
      attr(input, "placeholder", input_placeholder_value = game.i18n.localize("QUEST.Name"));
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, input);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 8192 && input_class_value !== (input_class_value = "dotted long name quest " + ctx2[13] + " svelte-811xhi")) {
        attr(input, "class", input_class_value);
      }
      if (dirty[0] & 2 && input_value_value !== (input_value_value = ctx2[1].name) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create__1_slot_6(ctx) {
  let span;
  let input;
  let input_class_value;
  let input_value_value;
  let input_placeholder_value;
  return {
    c() {
      span = element("span");
      input = element("input");
      attr(input, "class", input_class_value = "dotted short " + ctx[13] + " svelte-811xhi");
      attr(input, "name", "data.age");
      attr(input, "type", "number");
      input.value = input_value_value = ctx[1].data.age;
      attr(input, "placeholder", input_placeholder_value = game.i18n.localize("QUEST.Age"));
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, input);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 8192 && input_class_value !== (input_class_value = "dotted short " + ctx2[13] + " svelte-811xhi")) {
        attr(input, "class", input_class_value);
      }
      if (dirty[0] & 2 && input_value_value !== (input_value_value = ctx2[1].data.age)) {
        input.value = input_value_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create__2_slot_4(ctx) {
  let span;
  let input;
  let input_class_value;
  let input_value_value;
  let input_placeholder_value;
  return {
    c() {
      span = element("span");
      input = element("input");
      attr(input, "class", input_class_value = "dotted medium " + ctx[13] + " svelte-811xhi");
      attr(input, "name", "data.height");
      attr(input, "type", "text");
      input.value = input_value_value = ctx[1].data.height;
      attr(input, "placeholder", input_placeholder_value = game.i18n.localize("QUEST.Height"));
      attr(span, "slot", "2");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, input);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 8192 && input_class_value !== (input_class_value = "dotted medium " + ctx2[13] + " svelte-811xhi")) {
        attr(input, "class", input_class_value);
      }
      if (dirty[0] & 2 && input_value_value !== (input_value_value = ctx2[1].data.height) && input.value !== input_value_value) {
        input.value = input_value_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(span);
    }
  };
}
function create__1_slot_5(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding(value) {
    ctx[30](value);
  }
  let autocomplete_props = {
    placeholder: game.i18n.localize("QUEST.Role"),
    items: ctx[2],
    inputClassName: "dotted medium " + ctx[13],
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[16],
    onChange: ctx[29]
  };
  if (ctx[1].data.role !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.role;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 4)
        autocomplete_changes.items = ctx2[2];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted medium " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.role;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__1_slot_4(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_3(value) {
    ctx[36](value);
  }
  let autocomplete_props = {
    items: ctx[3],
    placeholder: game.i18n.localize("QUEST.Body"),
    inputClassName: "dotted long " + ctx[13],
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[15],
    onChange: ctx[35]
  };
  if (ctx[1].data.featurebody !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.featurebody;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_3));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 8)
        autocomplete_changes.items = ctx2[3];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.featurebody;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__2_slot_3(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_2(value) {
    ctx[34](value);
  }
  let autocomplete_props = {
    items: ctx[4],
    placeholder: game.i18n.localize("QUEST.Face"),
    inputClassName: "dotted long " + ctx[13],
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[17],
    onChange: ctx[33]
  };
  if (ctx[1].data.featureface !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.featureface;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_2));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "2");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 16)
        autocomplete_changes.items = ctx2[4];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.featureface;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__3_slot_1(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_1(value) {
    ctx[32](value);
  }
  let autocomplete_props = {
    items: ctx[5],
    inputClassName: "dotted long " + ctx[13],
    placeholder: game.i18n.localize("QUEST.Vibe"),
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[18],
    onChange: ctx[31]
  };
  if (ctx[1].data.featurevibe !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.featurevibe;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_1));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "3");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 32)
        autocomplete_changes.items = ctx2[5];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.featurevibe;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__1_slot_3(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_6(value) {
    ctx[42](value);
  }
  let autocomplete_props = {
    items: ctx[6],
    placeholder: game.i18n.localize("QUEST.Outfit"),
    inputClassName: "dotted long " + ctx[13],
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[19],
    onChange: ctx[41]
  };
  if (ctx[1].data.style1 !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.style1;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_6));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 64)
        autocomplete_changes.items = ctx2[6];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.style1;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__2_slot_2(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_5(value) {
    ctx[40](value);
  }
  let autocomplete_props = {
    items: ctx[6],
    placeholder: game.i18n.localize("QUEST.Outfit"),
    inputClassName: "dotted long " + ctx[13],
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[19],
    onChange: ctx[39]
  };
  if (ctx[1].data.style2 !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.style2;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_5));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "2");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 64)
        autocomplete_changes.items = ctx2[6];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.style2;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__3_slot(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_4(value) {
    ctx[38](value);
  }
  let autocomplete_props = {
    items: ctx[7],
    inputClassName: "dotted long " + ctx[13],
    placeholder: game.i18n.localize("QUEST.Movement"),
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[20],
    onChange: ctx[37]
  };
  if (ctx[1].data.style3 !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.style3;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_4));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "3");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 128)
        autocomplete_changes.items = ctx2[7];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.style3;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__1_slot_2(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_8(value) {
    ctx[46](value);
  }
  let autocomplete_props = {
    items: ctx[8],
    inputClassName: "dotted long " + ctx[13],
    placeholder: game.i18n.localize("QUEST.Home"),
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[21],
    onChange: ctx[45]
  };
  if (ctx[1].data.home !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.home;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_8));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 256)
        autocomplete_changes.items = ctx2[8];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.home;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__2_slot_1(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_7(value) {
    ctx[44](value);
  }
  let autocomplete_props = {
    items: ctx[9],
    className: "verylong " + ctx[13],
    inputClassName: "dotted",
    placeholder: game.i18n.localize("QUEST.Legacy"),
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[22],
    onChange: ctx[43]
  };
  if (ctx[1].data.community !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.community;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_7));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "2");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 512)
        autocomplete_changes.items = ctx2[9];
      if (dirty[0] & 8192)
        autocomplete_changes.className = "verylong " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.community;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__1_slot_1(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_10(value) {
    ctx[50](value);
  }
  let autocomplete_props = {
    items: ctx[10],
    placeholder: game.i18n.localize("QUEST.Ideal"),
    inputClassName: "dotted long " + ctx[13],
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[23],
    onChange: ctx[49]
  };
  if (ctx[1].data.ideal !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.ideal;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_10));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 1024)
        autocomplete_changes.items = ctx2[10];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.ideal;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__2_slot(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_9(value) {
    ctx[48](value);
  }
  let autocomplete_props = {
    items: ctx[11],
    inputClassName: "dotted long " + ctx[13],
    placeholder: game.i18n.localize("QUEST.Flaw"),
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[24],
    onChange: ctx[47]
  };
  if (ctx[1].data.flaw !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.flaw;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_9));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "2");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 2048)
        autocomplete_changes.items = ctx2[11];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted long " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.flaw;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create__1_slot(ctx) {
  let span;
  let autocomplete;
  let updating_selectedItem;
  let current;
  function autocomplete_selectedItem_binding_11(value) {
    ctx[52](value);
  }
  let autocomplete_props = {
    items: ctx[12],
    className: "verylong",
    inputClassName: "dotted " + ctx[13],
    placeholder: game.i18n.localize("QUEST.Dream"),
    create: true,
    createText: "Item doesn't exist, create one?",
    onCreate: ctx[25],
    onChange: ctx[51]
  };
  if (ctx[1].data.dream !== void 0) {
    autocomplete_props.selectedItem = ctx[1].data.dream;
  }
  autocomplete = new simple_svelte_autocomplete_default({ props: autocomplete_props });
  binding_callbacks.push(() => bind(autocomplete, "selectedItem", autocomplete_selectedItem_binding_11));
  return {
    c() {
      span = element("span");
      create_component(autocomplete.$$.fragment);
      attr(span, "slot", "1");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(autocomplete, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const autocomplete_changes = {};
      if (dirty[0] & 4096)
        autocomplete_changes.items = ctx2[12];
      if (dirty[0] & 8192)
        autocomplete_changes.inputClassName = "dotted " + ctx2[13];
      if (!updating_selectedItem && dirty[0] & 2) {
        updating_selectedItem = true;
        autocomplete_changes.selectedItem = ctx2[1].data.dream;
        add_flush_callback(() => updating_selectedItem = false);
      }
      autocomplete.$set(autocomplete_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autocomplete.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autocomplete.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(autocomplete);
    }
  };
}
function create_fragment6(ctx) {
  let div3;
  let div0;
  let label0;
  let t1;
  let input0;
  let input0_class_value;
  let input0_value_value;
  let t2;
  let span;
  let input1;
  let input1_class_value;
  let input1_value_value;
  let t3;
  let div1;
  let a;
  let t4;
  let div2;
  let label1;
  let t6;
  let input2;
  let input2_class_value;
  let input2_value_value;
  let t7;
  let div6;
  let div4;
  let content0;
  let p0;
  let img;
  let img_class_value;
  let img_src_value;
  let img_alt_value;
  let img_title_value;
  let t8;
  let translation0;
  let t9;
  let br;
  let t10;
  let input3;
  let input3_class_value;
  let input3_value_value;
  let input3_placeholder_value;
  let t11;
  let t12;
  let p1;
  let translation1;
  let t13;
  let p2;
  let translation2;
  let t14;
  let p3;
  let translation3;
  let t15;
  let p4;
  let translation4;
  let t16;
  let p5;
  let translation5;
  let t17;
  let p6;
  let translation6;
  let t18;
  let p7;
  let translation7;
  let t19;
  let input4;
  let input4_value_value;
  let t20;
  let input5;
  let input5_value_value;
  let t21;
  let input6;
  let input6_value_value;
  let t22;
  let input7;
  let input7_value_value;
  let t23;
  let input8;
  let input8_value_value;
  let t24;
  let input9;
  let input9_value_value;
  let t25;
  let input10;
  let input10_value_value;
  let t26;
  let input11;
  let input11_value_value;
  let t27;
  let input12;
  let input12_value_value;
  let t28;
  let input13;
  let input13_value_value;
  let t29;
  let input14;
  let input14_value_value;
  let t30;
  let input15;
  let input15_value_value;
  let t31;
  let div5;
  let content1;
  let tabs;
  let current;
  let mounted;
  let dispose;
  translation0 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.Hello"),
      $$slots: { "1": [create__1_slot_7] },
      $$scope: { ctx }
    }
  });
  translation1 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.AgeHeight"),
      $$slots: {
        "2": [create__2_slot_4],
        "1": [create__1_slot_6]
      },
      $$scope: { ctx }
    }
  });
  translation2 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.IAm"),
      $$slots: { "1": [create__1_slot_5] },
      $$scope: { ctx }
    }
  });
  translation3 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.BodyFaceVibe"),
      $$slots: {
        "3": [create__3_slot_1],
        "2": [create__2_slot_3],
        "1": [create__1_slot_4]
      },
      $$scope: { ctx }
    }
  });
  translation4 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.Style"),
      $$slots: {
        "3": [create__3_slot],
        "2": [create__2_slot_2],
        "1": [create__1_slot_3]
      },
      $$scope: { ctx }
    }
  });
  translation5 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.Home"),
      $$slots: {
        "2": [create__2_slot_1],
        "1": [create__1_slot_2]
      },
      $$scope: { ctx }
    }
  });
  translation6 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.Ideal"),
      $$slots: {
        "2": [create__2_slot],
        "1": [create__1_slot_1]
      },
      $$scope: { ctx }
    }
  });
  translation7 = new Translation_default({
    props: {
      str: game.i18n.localize("QUEST.Actor.Dream"),
      $$slots: { "1": [create__1_slot] },
      $$scope: { ctx }
    }
  });
  tabs = new Tabs_default({ props: { items: ctx[26] } });
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      label0 = element("label");
      label0.textContent = `${game.i18n.localize("QUEST.HP")}`;
      t1 = space();
      input0 = element("input");
      t2 = text("\r\n        /\r\n        ");
      span = element("span");
      input1 = element("input");
      t3 = space();
      div1 = element("div");
      a = element("a");
      a.innerHTML = `<i class="fas fa-dice-d20 fa-2x svelte-811xhi"></i>`;
      t4 = space();
      div2 = element("div");
      label1 = element("label");
      label1.textContent = `${game.i18n.localize("QUEST.AP")}`;
      t6 = space();
      input2 = element("input");
      t7 = space();
      div6 = element("div");
      div4 = element("div");
      content0 = element("content");
      p0 = element("p");
      img = element("img");
      t8 = space();
      create_component(translation0.$$.fragment);
      t9 = space();
      br = element("br");
      t10 = text("(");
      input3 = element("input");
      t11 = text(").");
      t12 = space();
      p1 = element("p");
      create_component(translation1.$$.fragment);
      t13 = space();
      p2 = element("p");
      create_component(translation2.$$.fragment);
      t14 = space();
      p3 = element("p");
      create_component(translation3.$$.fragment);
      t15 = space();
      p4 = element("p");
      create_component(translation4.$$.fragment);
      t16 = space();
      p5 = element("p");
      create_component(translation5.$$.fragment);
      t17 = space();
      p6 = element("p");
      create_component(translation6.$$.fragment);
      t18 = space();
      p7 = element("p");
      create_component(translation7.$$.fragment);
      t19 = space();
      input4 = element("input");
      t20 = space();
      input5 = element("input");
      t21 = space();
      input6 = element("input");
      t22 = space();
      input7 = element("input");
      t23 = space();
      input8 = element("input");
      t24 = space();
      input9 = element("input");
      t25 = space();
      input10 = element("input");
      t26 = space();
      input11 = element("input");
      t27 = space();
      input12 = element("input");
      t28 = space();
      input13 = element("input");
      t29 = space();
      input14 = element("input");
      t30 = space();
      input15 = element("input");
      t31 = space();
      div5 = element("div");
      content1 = element("content");
      create_component(tabs.$$.fragment);
      attr(label0, "class", "character-label");
      attr(label0, "for", "data.hp");
      attr(input0, "type", "number");
      attr(input0, "class", input0_class_value = "hp " + ctx[13] + " svelte-811xhi");
      attr(input0, "name", "data.hp");
      attr(input0, "data-dtype", "Number");
      input0.value = input0_value_value = ctx[1].data.hp;
      attr(input1, "type", "number");
      attr(input1, "class", input1_class_value = "hp " + ctx[13] + " svelte-811xhi");
      attr(input1, "name", "data.maxhp");
      attr(input1, "data-dtype", "Number");
      input1.value = input1_value_value = ctx[1].data.maxhp;
      attr(span, "id", "maxhp");
      attr(div0, "class", "hitpoints svelte-811xhi");
      attr(a, "class", "svelte-811xhi");
      attr(div1, "class", "roll-generic svelte-811xhi");
      attr(label1, "class", "character-label");
      attr(label1, "for", "data.actionpoints");
      attr(input2, "type", "number");
      attr(input2, "class", input2_class_value = "hp " + ctx[13] + " svelte-811xhi");
      attr(input2, "name", "data.ap");
      attr(input2, "data-dtype", "Number");
      input2.value = input2_value_value = ctx[1].data.ap;
      attr(div2, "class", "actionpoints svelte-811xhi");
      attr(div3, "class", "header flexrow svelte-811xhi");
      attr(img, "class", img_class_value = "profile " + ctx[13] + " svelte-811xhi");
      if (img.src !== (img_src_value = ctx[1].img))
        attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = ctx[1].name);
      attr(img, "data-edit", "img");
      attr(img, "title", img_title_value = ctx[1].name);
      attr(img, "align", "left");
      attr(input3, "class", input3_class_value = "dotted medium " + ctx[13] + " svelte-811xhi");
      attr(input3, "name", "data.pronouns");
      attr(input3, "type", "text");
      input3.value = input3_value_value = ctx[1].data.pronouns;
      attr(input3, "placeholder", input3_placeholder_value = game.i18n.localize("QUEST.Pronouns"));
      attr(p0, "class", "svelte-811xhi");
      attr(p1, "class", "svelte-811xhi");
      attr(p2, "class", "svelte-811xhi");
      attr(p3, "class", "svelte-811xhi");
      attr(p4, "class", "svelte-811xhi");
      attr(p5, "class", "svelte-811xhi");
      attr(p6, "class", "svelte-811xhi");
      attr(p7, "class", "svelte-811xhi");
      attr(input4, "class", "long svelte-811xhi");
      attr(input4, "name", "data.role");
      attr(input4, "type", "hidden");
      input4.value = input4_value_value = ctx[1].data.role;
      attr(input4, "placeholder", "Role");
      attr(input5, "class", "long svelte-811xhi");
      attr(input5, "name", "data.featurebody");
      attr(input5, "type", "hidden");
      input5.value = input5_value_value = ctx[1].data.featurebody;
      attr(input5, "placeholder", "Body");
      attr(input6, "class", "long svelte-811xhi");
      attr(input6, "name", "data.featureface");
      attr(input6, "type", "hidden");
      input6.value = input6_value_value = ctx[1].data.featureface;
      attr(input6, "placeholder", "Face");
      attr(input7, "class", "long svelte-811xhi");
      attr(input7, "name", "data.featurevibe");
      attr(input7, "type", "hidden");
      input7.value = input7_value_value = ctx[1].data.featurevibe;
      attr(input7, "placeholder", "Vibe");
      attr(input8, "class", "long svelte-811xhi");
      attr(input8, "name", "data.style1");
      attr(input8, "type", "hidden");
      input8.value = input8_value_value = ctx[1].data.style1;
      attr(input8, "placeholder", "Outfit");
      attr(input9, "class", "long svelte-811xhi");
      attr(input9, "name", "data.style2");
      attr(input9, "type", "hidden");
      input9.value = input9_value_value = ctx[1].data.style2;
      attr(input9, "placeholder", "Outfit");
      attr(input10, "class", "long svelte-811xhi");
      attr(input10, "name", "data.style3");
      attr(input10, "type", "hidden");
      input10.value = input10_value_value = ctx[1].data.style3;
      attr(input10, "placeholder", "Movement");
      attr(input11, "class", "long svelte-811xhi");
      attr(input11, "name", "data.home");
      attr(input11, "type", "hidden");
      input11.value = input11_value_value = ctx[1].data.home;
      attr(input11, "placeholder", "My Home");
      attr(input12, "class", "long svelte-811xhi");
      attr(input12, "name", "data.community");
      attr(input12, "type", "hidden");
      input12.value = input12_value_value = ctx[1].data.community;
      attr(input12, "placeholder", "");
      attr(input13, "class", "long svelte-811xhi");
      attr(input13, "name", "data.ideal");
      attr(input13, "type", "hidden");
      input13.value = input13_value_value = ctx[1].data.ideal;
      attr(input13, "placeholder", "my ideal");
      attr(input14, "class", "long svelte-811xhi");
      attr(input14, "name", "data.flaw");
      attr(input14, "type", "hidden");
      input14.value = input14_value_value = ctx[1].data.flaw;
      attr(input14, "placeholder", "flaw");
      attr(input15, "class", "long svelte-811xhi");
      attr(input15, "name", "data.dream");
      attr(input15, "type", "hidden");
      input15.value = input15_value_value = ctx[1].data.dream;
      attr(input15, "placeholder", "my dream");
      attr(content0, "class", "svelte-811xhi");
      attr(div4, "class", "biography flexcol flex1 svelte-811xhi");
      attr(content1, "class", "svelte-811xhi");
      attr(div5, "class", "inventory-abilities flexcol flex1 svelte-811xhi");
      attr(div6, "class", "details flexrow flex2");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, label0);
      append(div0, t1);
      append(div0, input0);
      append(div0, t2);
      append(div0, span);
      append(span, input1);
      append(div3, t3);
      append(div3, div1);
      append(div1, a);
      append(div3, t4);
      append(div3, div2);
      append(div2, label1);
      append(div2, t6);
      append(div2, input2);
      insert(target, t7, anchor);
      insert(target, div6, anchor);
      append(div6, div4);
      append(div4, content0);
      append(content0, p0);
      append(p0, img);
      append(p0, t8);
      mount_component(translation0, p0, null);
      append(p0, t9);
      append(p0, br);
      append(p0, t10);
      append(p0, input3);
      append(p0, t11);
      append(content0, t12);
      append(content0, p1);
      mount_component(translation1, p1, null);
      append(content0, t13);
      append(content0, p2);
      mount_component(translation2, p2, null);
      append(content0, t14);
      append(content0, p3);
      mount_component(translation3, p3, null);
      append(content0, t15);
      append(content0, p4);
      mount_component(translation4, p4, null);
      append(content0, t16);
      append(content0, p5);
      mount_component(translation5, p5, null);
      append(content0, t17);
      append(content0, p6);
      mount_component(translation6, p6, null);
      append(content0, t18);
      append(content0, p7);
      mount_component(translation7, p7, null);
      append(content0, t19);
      append(content0, input4);
      append(content0, t20);
      append(content0, input5);
      append(content0, t21);
      append(content0, input6);
      append(content0, t22);
      append(content0, input7);
      append(content0, t23);
      append(content0, input8);
      append(content0, t24);
      append(content0, input9);
      append(content0, t25);
      append(content0, input10);
      append(content0, t26);
      append(content0, input11);
      append(content0, t27);
      append(content0, input12);
      append(content0, t28);
      append(content0, input13);
      append(content0, t29);
      append(content0, input14);
      append(content0, t30);
      append(content0, input15);
      append(div6, t31);
      append(div6, div5);
      append(div5, content1);
      mount_component(tabs, content1, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(a, "click", ctx[14]?._rollDice.bind(ctx[14])),
          listen(img, "click", ctx[27])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty[0] & 8192 && input0_class_value !== (input0_class_value = "hp " + ctx2[13] + " svelte-811xhi")) {
        attr(input0, "class", input0_class_value);
      }
      if (!current || dirty[0] & 2 && input0_value_value !== (input0_value_value = ctx2[1].data.hp)) {
        input0.value = input0_value_value;
      }
      if (!current || dirty[0] & 8192 && input1_class_value !== (input1_class_value = "hp " + ctx2[13] + " svelte-811xhi")) {
        attr(input1, "class", input1_class_value);
      }
      if (!current || dirty[0] & 2 && input1_value_value !== (input1_value_value = ctx2[1].data.maxhp)) {
        input1.value = input1_value_value;
      }
      if (!current || dirty[0] & 8192 && input2_class_value !== (input2_class_value = "hp " + ctx2[13] + " svelte-811xhi")) {
        attr(input2, "class", input2_class_value);
      }
      if (!current || dirty[0] & 2 && input2_value_value !== (input2_value_value = ctx2[1].data.ap)) {
        input2.value = input2_value_value;
      }
      if (!current || dirty[0] & 8192 && img_class_value !== (img_class_value = "profile " + ctx2[13] + " svelte-811xhi")) {
        attr(img, "class", img_class_value);
      }
      if (!current || dirty[0] & 2 && img.src !== (img_src_value = ctx2[1].img)) {
        attr(img, "src", img_src_value);
      }
      if (!current || dirty[0] & 2 && img_alt_value !== (img_alt_value = ctx2[1].name)) {
        attr(img, "alt", img_alt_value);
      }
      if (!current || dirty[0] & 2 && img_title_value !== (img_title_value = ctx2[1].name)) {
        attr(img, "title", img_title_value);
      }
      const translation0_changes = {};
      if (dirty[0] & 8194 | dirty[1] & 67108864) {
        translation0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation0.$set(translation0_changes);
      if (!current || dirty[0] & 8192 && input3_class_value !== (input3_class_value = "dotted medium " + ctx2[13] + " svelte-811xhi")) {
        attr(input3, "class", input3_class_value);
      }
      if (!current || dirty[0] & 2 && input3_value_value !== (input3_value_value = ctx2[1].data.pronouns) && input3.value !== input3_value_value) {
        input3.value = input3_value_value;
      }
      const translation1_changes = {};
      if (dirty[0] & 8194 | dirty[1] & 67108864) {
        translation1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation1.$set(translation1_changes);
      const translation2_changes = {};
      if (dirty[0] & 8198 | dirty[1] & 67108864) {
        translation2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation2.$set(translation2_changes);
      const translation3_changes = {};
      if (dirty[0] & 8250 | dirty[1] & 67108864) {
        translation3_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation3.$set(translation3_changes);
      const translation4_changes = {};
      if (dirty[0] & 8386 | dirty[1] & 67108864) {
        translation4_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation4.$set(translation4_changes);
      const translation5_changes = {};
      if (dirty[0] & 8962 | dirty[1] & 67108864) {
        translation5_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation5.$set(translation5_changes);
      const translation6_changes = {};
      if (dirty[0] & 11266 | dirty[1] & 67108864) {
        translation6_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation6.$set(translation6_changes);
      const translation7_changes = {};
      if (dirty[0] & 12290 | dirty[1] & 67108864) {
        translation7_changes.$$scope = { dirty, ctx: ctx2 };
      }
      translation7.$set(translation7_changes);
      if (!current || dirty[0] & 2 && input4_value_value !== (input4_value_value = ctx2[1].data.role)) {
        input4.value = input4_value_value;
      }
      if (!current || dirty[0] & 2 && input5_value_value !== (input5_value_value = ctx2[1].data.featurebody)) {
        input5.value = input5_value_value;
      }
      if (!current || dirty[0] & 2 && input6_value_value !== (input6_value_value = ctx2[1].data.featureface)) {
        input6.value = input6_value_value;
      }
      if (!current || dirty[0] & 2 && input7_value_value !== (input7_value_value = ctx2[1].data.featurevibe)) {
        input7.value = input7_value_value;
      }
      if (!current || dirty[0] & 2 && input8_value_value !== (input8_value_value = ctx2[1].data.style1)) {
        input8.value = input8_value_value;
      }
      if (!current || dirty[0] & 2 && input9_value_value !== (input9_value_value = ctx2[1].data.style2)) {
        input9.value = input9_value_value;
      }
      if (!current || dirty[0] & 2 && input10_value_value !== (input10_value_value = ctx2[1].data.style3)) {
        input10.value = input10_value_value;
      }
      if (!current || dirty[0] & 2 && input11_value_value !== (input11_value_value = ctx2[1].data.home)) {
        input11.value = input11_value_value;
      }
      if (!current || dirty[0] & 2 && input12_value_value !== (input12_value_value = ctx2[1].data.community)) {
        input12.value = input12_value_value;
      }
      if (!current || dirty[0] & 2 && input13_value_value !== (input13_value_value = ctx2[1].data.ideal)) {
        input13.value = input13_value_value;
      }
      if (!current || dirty[0] & 2 && input14_value_value !== (input14_value_value = ctx2[1].data.flaw)) {
        input14.value = input14_value_value;
      }
      if (!current || dirty[0] & 2 && input15_value_value !== (input15_value_value = ctx2[1].data.dream)) {
        input15.value = input15_value_value;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(translation0.$$.fragment, local);
      transition_in(translation1.$$.fragment, local);
      transition_in(translation2.$$.fragment, local);
      transition_in(translation3.$$.fragment, local);
      transition_in(translation4.$$.fragment, local);
      transition_in(translation5.$$.fragment, local);
      transition_in(translation6.$$.fragment, local);
      transition_in(translation7.$$.fragment, local);
      transition_in(tabs.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(translation0.$$.fragment, local);
      transition_out(translation1.$$.fragment, local);
      transition_out(translation2.$$.fragment, local);
      transition_out(translation3.$$.fragment, local);
      transition_out(translation4.$$.fragment, local);
      transition_out(translation5.$$.fragment, local);
      transition_out(translation6.$$.fragment, local);
      transition_out(translation7.$$.fragment, local);
      transition_out(tabs.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div3);
      if (detaching)
        detach(t7);
      if (detaching)
        detach(div6);
      destroy_component(translation0);
      destroy_component(translation1);
      destroy_component(translation2);
      destroy_component(translation3);
      destroy_component(translation4);
      destroy_component(translation5);
      destroy_component(translation6);
      destroy_component(translation7);
      destroy_component(tabs);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance6($$self, $$props, $$invalidate) {
  let $dataStore, $$unsubscribe_dataStore = noop, $$subscribe_dataStore = () => ($$unsubscribe_dataStore(), $$unsubscribe_dataStore = subscribe(dataStore, ($$value) => $$invalidate(28, $dataStore = $$value)), dataStore);
  $$self.$$.on_destroy.push(() => $$unsubscribe_dataStore());
  let { dataStore } = $$props;
  $$subscribe_dataStore();
  setContext("sheetStore", dataStore);
  let { actor, data, sheet } = $dataStore;
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
  let toCreateBody = "";
  let edit = sheet.isEditable;
  let editclass = "uneditable";
  if (sheet.isEditable) {
    editclass = "";
  }
  function handleCreate(newItem) {
    toCreateBody = "Creating " + newItem;
    featurebody.unshift(newItem);
    $$invalidate(3, featurebody);
    return newItem;
  }
  function handleCreateR(newItem) {
    toCreateBody = "Creating " + newItem;
    roles.unshift(newItem);
    $$invalidate(2, roles);
    return newItem;
  }
  function handleCreatef2(newItem) {
    toCreateBody = "Creating " + newItem;
    featureface.unshift(newItem);
    $$invalidate(4, featureface);
    return newItem;
  }
  function handleCreatef3(newItem) {
    toCreateBody = "Creating " + newItem;
    featurevibe.unshift(newItem);
    $$invalidate(5, featurevibe);
    return newItem;
  }
  function handleCreates1(newItem) {
    toCreateBody = "Creating " + newItem;
    styleoutfit.unshift(newItem);
    $$invalidate(6, styleoutfit);
    return newItem;
  }
  function handleCreates2(newItem) {
    toCreateBody = "Creating " + newItem;
    stylemovement.unshift(newItem);
    $$invalidate(7, stylemovement);
    return newItem;
  }
  function handleCreateh1(newItem) {
    toCreateBody = "Creating " + newItem;
    homeland.unshift(newItem);
    $$invalidate(8, homeland);
    return newItem;
  }
  function handleCreateh2(newItem) {
    toCreateBody = "Creating " + newItem;
    legacy.unshift(newItem);
    $$invalidate(9, legacy);
    return newItem;
  }
  function handleCreateI(newItem) {
    toCreateBody = "Creating " + newItem;
    ideal.unshift(newItem);
    $$invalidate(10, ideal);
    return newItem;
  }
  function handleCreateF(newItem) {
    toCreateBody = "Creating " + newItem;
    flaw.unshift(newItem);
    $$invalidate(11, flaw);
    return newItem;
  }
  function handleCreateD(newItem) {
    toCreateBody = "Creating " + newItem;
    dream.unshift(newItem);
    $$invalidate(12, dream);
    return newItem;
  }
  let items = [
    {
      label: game.i18n.localize("QUEST.Inventory"),
      value: 1,
      component: QuestActorSheetInventory_default
    },
    {
      label: game.i18n.localize("QUEST.Abilities"),
      value: 2,
      component: QuestActorSheetAbilities_default
    }
  ];
  const filePicker = (event) => {
    const attr3 = event.currentTarget.dataset.edit;
    const current = getProperty(data, attr3);
    const fp = new FilePicker({
      type: "image",
      current,
      callback: (path) => {
        actor.update({ [attr3]: path });
      },
      top: sheet.position.top + 40,
      left: sheet.position.left + 10
    });
    return fp.browse();
  };
  const func = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding(value) {
    if ($$self.$$.not_equal(data.data.role, value)) {
      data.data.role = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_1 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_1(value) {
    if ($$self.$$.not_equal(data.data.featurevibe, value)) {
      data.data.featurevibe = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_2 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_2(value) {
    if ($$self.$$.not_equal(data.data.featureface, value)) {
      data.data.featureface = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_3 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_3(value) {
    if ($$self.$$.not_equal(data.data.featurebody, value)) {
      data.data.featurebody = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_4 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_4(value) {
    if ($$self.$$.not_equal(data.data.style3, value)) {
      data.data.style3 = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_5 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_5(value) {
    if ($$self.$$.not_equal(data.data.style2, value)) {
      data.data.style2 = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_6 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_6(value) {
    if ($$self.$$.not_equal(data.data.style1, value)) {
      data.data.style1 = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_7 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_7(value) {
    if ($$self.$$.not_equal(data.data.community, value)) {
      data.data.community = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_8 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_8(value) {
    if ($$self.$$.not_equal(data.data.home, value)) {
      data.data.home = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_9 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_9(value) {
    if ($$self.$$.not_equal(data.data.flaw, value)) {
      data.data.flaw = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_10 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_10(value) {
    if ($$self.$$.not_equal(data.data.ideal, value)) {
      data.data.ideal = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  const func_11 = (e) => {
    sheet?._onSubmit(new Event("submit"));
  };
  function autocomplete_selectedItem_binding_11(value) {
    if ($$self.$$.not_equal(data.data.dream, value)) {
      data.data.dream = value;
      $$invalidate(1, data), $$invalidate(28, $dataStore);
    }
  }
  $$self.$$set = ($$props2) => {
    if ("dataStore" in $$props2)
      $$subscribe_dataStore($$invalidate(0, dataStore = $$props2.dataStore));
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 268435456) {
      $:
        $$invalidate(1, data = $dataStore.data);
    }
  };
  return [
    dataStore,
    data,
    roles,
    featurebody,
    featureface,
    featurevibe,
    styleoutfit,
    stylemovement,
    homeland,
    legacy,
    ideal,
    flaw,
    dream,
    editclass,
    sheet,
    handleCreate,
    handleCreateR,
    handleCreatef2,
    handleCreatef3,
    handleCreates1,
    handleCreates2,
    handleCreateh1,
    handleCreateh2,
    handleCreateI,
    handleCreateF,
    handleCreateD,
    items,
    filePicker,
    $dataStore,
    func,
    autocomplete_selectedItem_binding,
    func_1,
    autocomplete_selectedItem_binding_1,
    func_2,
    autocomplete_selectedItem_binding_2,
    func_3,
    autocomplete_selectedItem_binding_3,
    func_4,
    autocomplete_selectedItem_binding_4,
    func_5,
    autocomplete_selectedItem_binding_5,
    func_6,
    autocomplete_selectedItem_binding_6,
    func_7,
    autocomplete_selectedItem_binding_7,
    func_8,
    autocomplete_selectedItem_binding_8,
    func_9,
    autocomplete_selectedItem_binding_9,
    func_10,
    autocomplete_selectedItem_binding_10,
    func_11,
    autocomplete_selectedItem_binding_11
  ];
}
var QuestActorSheetBase = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment6, safe_not_equal, { dataStore: 0 }, [-1, -1]);
  }
};
var QuestActorSheetBase_default = QuestActorSheetBase;
require_4();

// module/actor-sheet.js
var QuestActorSheet = class extends ActorSheet {
  app = null;
  dataStore = null;
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["quest", "sheet", "actor"],
      template: "systems/foundryvtt-quest/templates/actor-sheetv2.html",
      width: 850,
      height: 740,
      tabs: []
    });
  }
  getData() {
    const context = super.getData();
    context.systemData = context.data.data;
    context.sheet = this;
    return context;
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable)
      return;
    html.find(".item-control").click(this._onItemControl.bind(this));
    html.find(".items .rollable").on("click", this._onItemRoll.bind(this));
  }
  _onItemControl(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const li = button.closest(".item");
    const item2 = this.actor.items.get(li?.dataset.itemId);
    switch (button.dataset.action) {
      case "create":
        const cls = getDocumentClass("Item");
        return cls.create({
          name: "New Item",
          type: "item"
        }, { parent: this.actor });
      case "edit":
        return item2.sheet.render(true);
      case "delete":
        return item2.delete();
    }
  }
  _onItemRoll(event) {
    let button = $(event.currentTarget);
    const li = button.parents(".item");
    const item2 = this.actor.items.get(li.data("itemId"));
    let r = new Roll(button.data("roll"), this.actor.getRollData());
    return r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `<h2>${item2.name}</h2><h3>${button.text()}</h3>`
    });
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    return formData;
  }
  async _updateActorAbility(id, type, value) {
    await this.actor.updateEmbeddedDocuments("Item", [
      { _id: id, data: { [type]: value } }
    ]);
  }
  async _updateEmbededItem(id, _data) {
    await this.actor.updateEmbeddedDocuments("Item", [
      { _id: id, data: _data }
    ]);
  }
  async _onItemEdit(itemId) {
    const item2 = this.actor.items.get(itemId);
    return item2.sheet.render(true);
  }
  async _onItemDelete(itemId) {
    const item2 = this.actor.items.get(itemId);
    item2.delete();
    this.render();
  }
  async _openAbilityDialog() {
    game.quest.AbilityDialog.showAbilityDialog(this.object.data.data.role);
  }
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = duplicate(header.dataset);
    const name = `New ${type.capitalize()}`;
    const itemData = {
      name,
      type,
      data
    };
    itemData.data = { rank: 1 };
    delete itemData.data["type"];
    if (type == "item" && Object(this.actor.itemTypes.item).length >= 12) {
      ui.notifications.error(this.actor.name + " can not carry another item.");
      return false;
    }
    return await Item.create(itemData, { parent: this.actor }).then((item2) => {
      item2.sheet.render(true);
    });
  }
  async _onDropItem(event, data) {
    if (!this.actor.isOwner)
      return false;
    const item2 = await Item.implementation.fromDropData(data);
    const itemData = item2.toObject();
    const actor = this.actor;
    let sameActor = data.actorId === actor.id || actor.isToken && data.tokenId === actor.token.id;
    if (sameActor)
      return this._onSortItem(event, itemData);
    if (Object(actor.itemTypes.item).length >= 12 && item2.type == "item") {
      ui.notifications.error(actor.name + " can not carry another item.");
    } else {
      return this._onDropItemCreate(itemData);
    }
  }
  async _rollDice() {
    let roll = new game.quest.QuestRoll("1d20");
    await roll.evaluate({ async: true });
    roll.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor })
    });
  }
  async _chatAbility(id) {
    const item2 = this.actor.items.get(id);
    let template = "systems/foundryvtt-quest/templates/chat/ability.html";
    if (item2.data.data.long_description == "" || !!item2.data.data.long_description == false)
      item2.data.data.long_description = item2.data.data.description;
    let data = { ability: item2.data, actor: this.actor.data };
    const html = await renderTemplate(template, data);
    const chatData = {
      actor: this.actor._id,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: html,
      speaker: {
        actor: this.actor
      }
    };
    return ChatMessage.create(chatData);
  }
  render(force = false, options = {}) {
    let sheetData = this.getData();
    if (this.app !== null) {
      let states = Application.RENDER_STATES;
      if (this._state == states.RENDERING || this._state == states.RENDERED) {
        this.dataStore?.set(sheetData);
        return;
      }
    }
    this._render(force, options).catch((err) => {
      err.message = `An error occurred while rendering ${this.constructor.name} ${this.appId}: ${err.message}`;
      console.error(err);
      this._state = Application.RENDER_STATES.ERROR;
    }).then((rendered) => {
      this.dataStore = writable(sheetData);
      this.app = new QuestActorSheetBase_default({
        target: this.element.find("form").get(0),
        props: {
          dataStore: this.dataStore
        }
      });
    });
    options.editable = options.editable ?? this.object.isOwner;
    this.object.apps[this.appId] = this;
    return this;
  }
  close(options = {}) {
    if (this.app != null) {
      this.app.$destroy();
      this.app = null;
      this.dataStore = null;
    }
    return super.close(options);
  }
};

// module/svelte/QuestEditor.svelte
require_5();

// module/svelte/QuestNPCActorSheetBase.svelte
function get_each_context6(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}
function get_each_context_14(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}
function create_each_block_14(ctx) {
  let li;
  let div1;
  let span;
  let t0_value = ctx[14].name + "";
  let t0;
  let t1;
  let div0;
  let a0;
  let t2;
  let a1;
  let t3;
  let p;
  let raw_value = ctx[4].enrichHTML(ctx[14].data.data.description) + "";
  let t4;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[6](ctx[14], ...args);
  }
  function click_handler_1(...args) {
    return ctx[7](ctx[14], ...args);
  }
  return {
    c() {
      li = element("li");
      div1 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      div0 = element("div");
      a0 = element("a");
      a0.innerHTML = `<i class="fas fa-pen"></i>`;
      t2 = space();
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-trash"></i>`;
      t3 = space();
      p = element("p");
      t4 = space();
      attr(span, "class", "Uncommon svelte-1yi3kjs");
      attr(div0, "class", "right");
      attr(div1, "class", "flex svelte-1yi3kjs");
      attr(p, "class", "shrink svelte-1yi3kjs");
      attr(li, "class", "svelte-1yi3kjs");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, div1);
      append(div1, span);
      append(span, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, a0);
      append(div0, t2);
      append(div0, a1);
      append(li, t3);
      append(li, p);
      p.innerHTML = raw_value;
      append(li, t4);
      if (!mounted) {
        dispose = [listen(a0, "click", click_handler), listen(a1, "click", click_handler_1)];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && t0_value !== (t0_value = ctx[14].name + ""))
        set_data(t0, t0_value);
      if (dirty & 2 && raw_value !== (raw_value = ctx[4].enrichHTML(ctx[14].data.data.description) + ""))
        p.innerHTML = raw_value;
      ;
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_each_block6(ctx) {
  let li;
  let div1;
  let span;
  let t0_value = ctx[11].name + "";
  let t0;
  let t1;
  let div0;
  let a0;
  let t2;
  let a1;
  let t3;
  let p;
  let raw_value = ctx[4].enrichHTML(ctx[11].data.data.description) + "";
  let t4;
  let mounted;
  let dispose;
  function click_handler_2(...args) {
    return ctx[8](ctx[11], ...args);
  }
  function click_handler_3(...args) {
    return ctx[9](ctx[11], ...args);
  }
  return {
    c() {
      li = element("li");
      div1 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      div0 = element("div");
      a0 = element("a");
      a0.innerHTML = `<i class="fas fa-pen"></i>`;
      t2 = space();
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-trash"></i>`;
      t3 = space();
      p = element("p");
      t4 = space();
      attr(span, "class", "Uncommon svelte-1yi3kjs");
      attr(div0, "class", "right");
      attr(div1, "class", "flex svelte-1yi3kjs");
      attr(p, "class", "shrink svelte-1yi3kjs");
      attr(li, "class", "svelte-1yi3kjs");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, div1);
      append(div1, span);
      append(span, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, a0);
      append(div0, t2);
      append(div0, a1);
      append(li, t3);
      append(li, p);
      p.innerHTML = raw_value;
      append(li, t4);
      if (!mounted) {
        dispose = [
          listen(a0, "click", click_handler_2),
          listen(a1, "click", click_handler_3)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && t0_value !== (t0_value = ctx[11].name + ""))
        set_data(t0, t0_value);
      if (dirty & 2 && raw_value !== (raw_value = ctx[4].enrichHTML(ctx[11].data.data.description) + ""))
        p.innerHTML = raw_value;
      ;
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment7(ctx) {
  let div3;
  let div0;
  let label0;
  let t1;
  let input0;
  let input0_value_value;
  let t2;
  let div1;
  let a;
  let t3;
  let div2;
  let label1;
  let t5;
  let input1;
  let input1_value_value;
  let t6;
  let content;
  let img;
  let img_src_value;
  let img_alt_value;
  let img_title_value;
  let t7;
  let div4;
  let label2;
  let t9;
  let input2;
  let input2_value_value;
  let t10;
  let ul0;
  let t11;
  let ul1;
  let mounted;
  let dispose;
  let each_value_1 = ctx[1].data.itemTypes.detail;
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_14(get_each_context_14(ctx, each_value_1, i));
  }
  let each_value = ctx[1].data.itemTypes.ability;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block6(get_each_context6(ctx, each_value, i));
  }
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      label0 = element("label");
      label0.textContent = "HP:";
      t1 = space();
      input0 = element("input");
      t2 = space();
      div1 = element("div");
      a = element("a");
      a.innerHTML = `<i class="fas fa-dice-d20 fa-2x svelte-1yi3kjs"></i>`;
      t3 = space();
      div2 = element("div");
      label1 = element("label");
      label1.textContent = "ATK:";
      t5 = space();
      input1 = element("input");
      t6 = space();
      content = element("content");
      img = element("img");
      t7 = space();
      div4 = element("div");
      label2 = element("label");
      label2.textContent = "Name";
      t9 = space();
      input2 = element("input");
      t10 = space();
      ul0 = element("ul");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t11 = space();
      ul1 = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(label0, "class", "character-label");
      attr(label0, "for", "data.hp");
      attr(input0, "type", "number");
      attr(input0, "class", "hp svelte-1yi3kjs");
      attr(input0, "name", "data.hp");
      attr(input0, "data-dtype", "Number");
      input0.value = input0_value_value = ctx[1].data.hp;
      attr(div0, "class", "hitpoints svelte-1yi3kjs");
      attr(a, "class", "svelte-1yi3kjs");
      attr(div1, "class", "roll-generic svelte-1yi3kjs");
      attr(label1, "class", "character-label");
      attr(label1, "for", "data.attack");
      attr(input1, "type", "number");
      attr(input1, "class", "hp svelte-1yi3kjs");
      attr(input1, "name", "data.attack");
      attr(input1, "data-dtype", "Number");
      input1.value = input1_value_value = ctx[1].data.attack;
      attr(div2, "class", "actionpoints svelte-1yi3kjs");
      attr(div3, "class", "header flexrow svelte-1yi3kjs");
      attr(img, "class", "profile svelte-1yi3kjs");
      if (img.src !== (img_src_value = ctx[1].img))
        attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = ctx[1].name);
      attr(img, "data-edit", "img");
      attr(img, "title", img_title_value = ctx[1].name);
      attr(img, "align", "right");
      attr(label2, "class", "svelte-1yi3kjs");
      attr(input2, "class", "name svelte-1yi3kjs");
      attr(input2, "name", "name");
      attr(input2, "type", "text");
      input2.value = input2_value_value = ctx[1].name;
      attr(input2, "placeholder", "Name");
      attr(div4, "class", "input-field");
      attr(content, "class", "svelte-1yi3kjs");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, label0);
      append(div0, t1);
      append(div0, input0);
      append(div3, t2);
      append(div3, div1);
      append(div1, a);
      append(div3, t3);
      append(div3, div2);
      append(div2, label1);
      append(div2, t5);
      append(div2, input1);
      insert(target, t6, anchor);
      insert(target, content, anchor);
      append(content, img);
      append(content, t7);
      append(content, div4);
      append(div4, label2);
      append(div4, t9);
      append(div4, input2);
      append(content, t10);
      append(content, ul0);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(ul0, null);
      }
      append(content, t11);
      append(content, ul1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul1, null);
      }
      if (!mounted) {
        dispose = [
          listen(a, "click", ctx[2]?._rollDice.bind(ctx[2])),
          listen(img, "click", ctx[3])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2 && input0_value_value !== (input0_value_value = ctx2[1].data.hp)) {
        input0.value = input0_value_value;
      }
      if (dirty & 2 && input1_value_value !== (input1_value_value = ctx2[1].data.attack)) {
        input1.value = input1_value_value;
      }
      if (dirty & 2 && img.src !== (img_src_value = ctx2[1].img)) {
        attr(img, "src", img_src_value);
      }
      if (dirty & 2 && img_alt_value !== (img_alt_value = ctx2[1].name)) {
        attr(img, "alt", img_alt_value);
      }
      if (dirty & 2 && img_title_value !== (img_title_value = ctx2[1].name)) {
        attr(img, "title", img_title_value);
      }
      if (dirty & 2 && input2_value_value !== (input2_value_value = ctx2[1].name) && input2.value !== input2_value_value) {
        input2.value = input2_value_value;
      }
      if (dirty & 22) {
        each_value_1 = ctx2[1].data.itemTypes.detail;
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_14(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_14(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(ul0, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_1.length;
      }
      if (dirty & 22) {
        each_value = ctx2[1].data.itemTypes.ability;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context6(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block6(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div3);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(content);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance7($$self, $$props, $$invalidate) {
  let $dataStore, $$unsubscribe_dataStore = noop, $$subscribe_dataStore = () => ($$unsubscribe_dataStore(), $$unsubscribe_dataStore = subscribe(dataStore, ($$value) => $$invalidate(5, $dataStore = $$value)), dataStore);
  $$self.$$.on_destroy.push(() => $$unsubscribe_dataStore());
  let { dataStore } = $$props;
  $$subscribe_dataStore();
  setContext("sheetStore", dataStore);
  let { actor, data, sheet } = $dataStore;
  const filePicker = (event) => {
    const attr3 = event.currentTarget.dataset.edit;
    const current = getProperty(data, attr3);
    const fp = new FilePicker({
      type: "image",
      current,
      callback: (path) => {
        actor.update({ [attr3]: path });
      },
      top: sheet.position.top + 40,
      left: sheet.position.left + 10
    });
    return fp.browse();
  };
  const TextEditor2 = globalThis.TextEditor;
  const click_handler = (detail, e) => {
    sheet?._onItemEdit(detail.data._id);
  };
  const click_handler_1 = (detail, e) => {
    sheet?._onItemDelete(detail.data._id);
  };
  const click_handler_2 = (ability, e) => {
    sheet?._onItemEdit(ability.data._id);
  };
  const click_handler_3 = (ability, e) => {
    sheet?._onItemDelete(ability.data._id);
  };
  $$self.$$set = ($$props2) => {
    if ("dataStore" in $$props2)
      $$subscribe_dataStore($$invalidate(0, dataStore = $$props2.dataStore));
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 32) {
      $:
        $$invalidate(1, data = $dataStore.data);
    }
  };
  return [
    dataStore,
    data,
    sheet,
    filePicker,
    TextEditor2,
    $dataStore,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3
  ];
}
var QuestNPCActorSheetBase = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance7, create_fragment7, safe_not_equal, { dataStore: 0 });
  }
};
var QuestNPCActorSheetBase_default = QuestNPCActorSheetBase;
require_6();

// module/npcactor-sheet.js
var QuestNPCActorSheet = class extends ActorSheet {
  app = null;
  dataStore = null;
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["quest", "sheet", "actor"],
      template: "systems/foundryvtt-quest/templates/actor-sheetv2.html",
      width: 550,
      height: 600,
      tabs: []
    });
  }
  getData() {
    const context = super.getData();
    context.systemData = context.data.data;
    context.sheet = this;
    return context;
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable)
      return;
    html.find(".item-control").click(this._onItemControl.bind(this));
    html.find(".items .rollable").on("click", this._onItemRoll.bind(this));
  }
  _onItemControl(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const li = button.closest(".item");
    const item2 = this.actor.items.get(li?.dataset.itemId);
    switch (button.dataset.action) {
      case "create":
        const cls = getDocumentClass("Item");
        return cls.create({
          name: game.i18n.localize("QUEST.ItemNew"),
          type: "item"
        }, { parent: this.actor });
      case "edit":
        return item2.sheet.render(true);
      case "delete":
        return item2.delete();
    }
  }
  async _onItemEdit(itemId) {
    const item2 = this.actor.items.get(itemId);
    return item2.sheet.render(true);
  }
  async _onItemDelete(itemId) {
    const item2 = this.actor.items.get(itemId);
    item2.delete();
    this.render();
  }
  async _rollDice() {
    let roll = new game.quest.QuestRoll("1d20");
    await roll.evaluate({ async: true });
    roll.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor })
    });
  }
  _onItemRoll(event) {
    let button = $(event.currentTarget);
    const li = button.parents(".item");
    const item2 = this.actor.items.get(li.data("itemId"));
    let r = new Roll(button.data("roll"), this.actor.getRollData());
    return r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `<h2>${item2.name}</h2><h3>${button.text()}</h3>`
    });
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    return formData;
  }
  _setMouseDice(count) {
    game.quest.RollCount = count;
    game.quest.updateDisplay(count);
  }
  async _updateActorAbility(id, type, value) {
    await this.actor.updateEmbeddedDocuments("Item", [
      { _id: id, data: { [type]: value } }
    ]);
  }
  async _updateEmbededItem(id, _data) {
    await this.actor.updateEmbeddedDocuments("Item", [
      { _id: id, data: _data }
    ]);
  }
  async _onItemDelete(itemId) {
    const item2 = this.actor.items.get(itemId);
    item2.delete();
    this.render();
  }
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = duplicate(header.dataset);
    const name = `New ${type.capitalize()}`;
    const itemData = {
      name,
      type,
      data
    };
    itemData.data = { rank: 1 };
    delete itemData.data["type"];
    return await Item.create(itemData, { parent: this.actor }).then((item2) => {
      item2.sheet.render(true);
    });
  }
  render(force = false, options = {}) {
    let sheetData = this.getData();
    if (this.app !== null) {
      let states = Application.RENDER_STATES;
      if (this._state == states.RENDERING || this._state == states.RENDERED) {
        this.dataStore?.set(sheetData);
        return;
      }
    }
    this._render(force, options).catch((err) => {
      err.message = `An error occurred while rendering ${this.constructor.name} ${this.appId}: ${err.message}`;
      console.error(err);
      this._state = Application.RENDER_STATES.ERROR;
    }).then((rendered) => {
      this.dataStore = writable(sheetData);
      this.app = new QuestNPCActorSheetBase_default({
        target: this.element.find("form").get(0),
        props: {
          dataStore: this.dataStore
        }
      });
    });
    options.editable = options.editable ?? this.object.isOwner;
    this.object.apps[this.appId] = this;
    return this;
  }
  close(options = {}) {
    if (this.app != null) {
      this.app.$destroy();
      this.app = null;
      this.dataStore = null;
    }
    return super.close(options);
  }
};

// module/templates.js
var preloadHandlebarsTemplates = async function() {
  const templatePaths = [
    "systems/foundryvtt-quest/templates/parts/sheet-attributes.html",
    "systems/foundryvtt-quest/templates/parts/sheet-groups.html"
  ];
  Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper("times", function(n, block) {
    var accum = "";
    for (var i = 0; i < n; ++i)
      accum += block.fn(i);
    return accum;
  });
  Handlebars.registerHelper("concat", function() {
    var outStr = "";
    for (var arg in arguments) {
      if (typeof arguments[arg] != "object") {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });
  Handlebars.registerHelper("enrich", function() {
    var outStr = TextEditor.enrichHTML(arguments[0]);
    return outStr;
  });
  Handlebars.registerHelper("enrich_stripcost", function() {
    var removeCost = arguments[0];
    const rgx = new RegExp(`@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`, "g");
    var removeCost = removeCost.replace(rgx, "");
    removeCost = removeCost.replace(/<p[^>]*>/g, "");
    var outStr = TextEditor.enrichHTML(removeCost);
    return outStr;
  });
  Handlebars.registerHelper("cost", function() {
    var outStr = TextEditor.enrichHTML("@cost[" + arguments[0] + "]");
    return outStr;
  });
  Handlebars.registerHelper("abilityLink", function(name, type, id) {
    let sourceCompendium = game.settings.get("foundryvtt-quest", "abilityCompendium");
    var outStr = TextEditor.enrichHTML("@Compendium[" + sourceCompendium + "." + id + "]{" + name + "}");
    return outStr;
  });
  Handlebars.registerHelper("replace", function(value, find, replace) {
    return value.replace(find, replace);
  });
  Handlebars.registerHelper("slugify", function(value) {
    return value.slugify({ strict: true });
  });
  Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
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
  return loadTemplates(templatePaths);
};

// module/macro.js
async function createQuestMacro(data, slot) {
  const command = `const roll = new Roll("${data.roll}", actor ? actor.getRollData() : {});
  roll.toMessage({speaker, flavor: "${data.label}"});`;
  let macro = game.macros.entities.find((m) => m.name === item.label && m.command === command);
  if (!macro) {
    macro = await Macro.create({
      name: data.label,
      type: "script",
      command,
      flags: { "quest.attrMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

// module/quest-roll.js
var QuestRoll = class extends Roll {
  constructor(...args) {
    super(...args);
  }
  async render(chatOptions = {}) {
    chatOptions = foundry.utils.mergeObject({
      user: game.user.id,
      flavor: null,
      template: this.constructor.CHAT_TEMPLATE,
      blind: false
    }, chatOptions);
    if (!this._evaluated)
      this.evaluate();
    let chatData = await questChatData(this, chatOptions);
    return renderTemplate(chatOptions.template, chatData);
  }
};
__publicField(QuestRoll, "CHAT_TEMPLATE", "systems/foundryvtt-quest/templates/dice/roll.html");
var questChatData = async (roll, chatOptions) => {
  const isPrivate = chatOptions.isPrivate;
  let outcome;
  let css;
  if (roll.result == "20") {
    outcome = game.i18n.localize("QUEST.Triumph");
    css = "triumph";
  } else if (roll.result > 11) {
    outcome = game.i18n.localize("QUEST.Success");
    css = "success";
  } else if (roll.result > 5) {
    outcome = game.i18n.localize("QUEST.TChoice");
    css = "touch-choice";
  } else if (roll.result > 1) {
    outcome = game.i18n.localize("QUEST.Failure");
    css = "catastrophe";
  } else {
    outcome = game.i18n.localize("QUEST.Catastrophe");
    css = "catastrophe";
  }
  return {
    formula: isPrivate ? "???" : roll._formula,
    flavor: isPrivate ? null : chatOptions.flavor,
    user: chatOptions.user,
    tooltip: isPrivate ? "" : await roll.getTooltip(),
    result: isPrivate ? "?" : roll.result,
    total: isPrivate ? "?" : roll.total,
    outcome: isPrivate ? "?" : outcome,
    css: isPrivate ? "?" : css
  };
};

// module/ability-dialog.js
var AbilityDialog = class extends Dialog {
  constructor(options) {
    super(options);
    this.data = {};
    this.data.title = options?.title ?? "Ability Browser";
    this.data.buttons = {
      close: { label: "Close", callback: () => {
      } }
    };
    this.data.default = "close";
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: `systems/foundryvtt-quest/templates/role-ability.html`,
      resizable: true,
      jQuery: true,
      width: "710",
      height: "760",
      close: () => {
        ui.notify;
      }
    });
  }
  async _getContent(role) {
    if (!role)
      role = "Spy";
    let sourceCompendium = game.settings.get("foundryvtt-quest", "abilityCompendium");
    const QUESTAbilities = await game.packs.get(sourceCompendium);
    let AllAbilities = await QUESTAbilities.getDocuments();
    const roleList = [
      ...new Set(AllAbilities.map((data) => data.data.data.role))
    ];
    let abilityList = AllAbilities.filter((i) => i.data.type == "ability" && i.data.data.role === role);
    let quickStart = await abilityList.filter((i) => i.data.type == "ability" && i.data.data.quickstart == true && i.data.data.role === role);
    abilityList.sort((first, second) => {
      return String(first.data.data.path).localeCompare(second.data.data.path) || String(first.data.data.order).localeCompare(second.data.data.order);
    });
    let unGrouped = abilityList.reduce(function(r, a) {
      let keys = [];
      r[a.data.data.path] = r[a.data.data.path] || [];
      r[a.data.data.path].push(a);
      return r;
    }, Object.create(null));
    let groupedAbilitiies = [];
    for (let i = 0; i < Object.keys(unGrouped).length; i++) {
      let obj = {};
      obj.name = Object.keys(unGrouped)[i];
      obj.data = Object(unGrouped[Object.keys(unGrouped)[i]]);
      groupedAbilitiies.push(obj);
    }
    groupedAbilitiies.sort(function(a, b) {
      if (a.name == b.name)
        return 0;
      if (a.name == "Legendary")
        return 1;
      if (b.name == "Legendary")
        return -1;
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    });
    let content = {
      role,
      abilities: groupedAbilitiies,
      quickStart,
      roleList
    };
    return content;
  }
  static async showAbilityDialog(role) {
    let Dialog2 = new AbilityDialog();
    let content = await Dialog2._getContent(role);
    Dialog2.data.content = content;
    Dialog2.Dialog = Dialog2;
    Dialog2.render(true);
  }
  async _updateContent(event) {
    let content = await this._getContent(event.currentTarget.value);
    this.Dialog.data.content = content;
    this.Dialog.render(true);
  }
  _scrollTo(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const target = header.dataset.target;
    $(".window-content").animate({
      scrollTop: $.find("#" + target)[0].offsetTop - $.find("#" + target)[0].scrollHeight - 10
    }, 600);
  }
  activateListeners(html) {
    super.activateListeners(html);
    html.find("#displayrole").change(this._updateContent.bind(this));
    html.find(".paths").click(this._scrollTo.bind(this));
  }
};

// module/compendium-helper.js
var CompendiumImportHelper = class {
  static async findCompendium() {
    let QUESTAbilities = await game.packs.get("world.role-abilities");
    return !!QUESTAbilities;
  }
  static async getCompendium() {
    let QUESTAbilities = await game.packs.get("world.role-abilities");
    return QUESTAbilities;
  }
  static async getSystemCompendium() {
    return await game.packs.get("foundryvtt-quest.role-abilities");
  }
  static async createCompenium() {
    if (await this.findCompendium() == false) {
      ui.notifications.info(game.i18n.localize("QUEST.ImportMessage"));
      let systemCompendium = await this.getSystemCompendium();
      return systemCompendium.duplicateCompendium({
        label: game.i18n.localize("QUEST.RoleAbilities")
      });
    }
    return false;
  }
};

// module/combat-tracker.js
var QuestCombatTracker = class extends CombatTracker {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "combat",
      template: "systems/foundryvtt-quest/templates/sidebar/combat-tracker.html",
      title: "Combat Tracker",
      scrollY: [".directory-list"]
    });
  }
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".ct-item-hp").change((ev) => this._updateActor(ev));
    html.find(".ct-item-ap").change((ev) => this._updateActor(ev));
  }
  async _updateActor(ev) {
    ev.preventDefault();
    console.log(ev);
    const dataset = ev.currentTarget.dataset;
    console.log(dataset.combatantId);
    const combatant = game.combat.combatants.find((c) => c.id == dataset.combatantId);
    console.log(combatant);
    const actor = combatant.actor;
    let target = ev.currentTarget;
    let value = ev.currentTarget.value;
    if (dataset.dtype == "Number") {
      value = Number(value);
      if (Number.isNaN(value)) {
        if (target.name == "data.hp")
          ev.currentTarget.value = actor.data.data.hp;
        else if (target.name == "data.ap")
          ev.currentTarget.value = actor.data.data.ap;
        return false;
      }
    }
    let updateData = {};
    updateData[target.name] = value;
    actor.update(updateData);
    return;
  }
  async _onCombatantControl(event) {
    event.preventDefault();
    event.stopPropagation();
    const btn = event.currentTarget;
    const li = btn.closest(".combatant");
    const combat = this.viewed;
    const c = combat.combatants.get(li.dataset.combatantId);
    switch (btn.dataset.control) {
      case "toggleHidden":
        return c.update({ hidden: !c.hidden });
      case "toggleDefeated":
        return this._onToggleDefeatedStatus(c);
      case "rollInitiative":
        let roll = new game.quest.QuestRoll("1d20");
        await roll.evaluate({ async: true });
        roll.toMessage({
          user: game.user.id,
          speaker: ChatMessage.getSpeaker({ actor: c.actor })
        });
        return true;
    }
  }
  async getData(options) {
    let context = await super.getData(options);
    context.groups = { character: [], npc: [] };
    context.difficulty = {
      character: 0,
      npc: 0,
      score: null,
      rating: null
    };
    for (let [i, combatant] of context.combat.turns.entries()) {
      let group = combatant.actor.data.type;
      let turn = context.turns[i];
      turn.css = turn.css.replace("active", "");
      turn.combatant = combatant;
      context.groups[group].push(turn);
      context.difficulty[group] += combatant.actor.data.data.hp;
    }
    context.difficulty.score = parseInt(context.difficulty.npc / context.difficulty.character * 100);
    if (context.difficulty.score > 80) {
      context.difficulty.rating = "QUEST.Deadly";
    } else if (context.difficulty.score > 50) {
      context.difficulty.rating = "QUEST.DeadlyFair";
    } else if (context.difficulty.score > 30) {
      context.difficulty.rating = "QUEST.Fair";
    } else {
      context.difficulty.rating = "QUEST.Easy";
    }
    console.log(context);
    return context;
  }
  firstOwner(doc) {
    if (!doc)
      return false;
    const gmOwners = Object.entries(doc.data.permission).filter(([id, level]) => game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    const otherOwners = Object.entries(doc.data.permission).filter(([id, level]) => !game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    if (otherOwners.length > 0)
      return game.users.get(otherOwners[0]);
    else
      return game.users.get(gmOwners[0]);
  }
  isFirstOwner(doc) {
    return game.user.id === this.firstOwner(doc).id;
  }
  hasPlayerOwner(doc) {
    if (!doc)
      return false;
    const gmOwners = Object.entries(doc.data.permission).filter(([id, level]) => game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    const otherOwners = Object.entries(doc.data.permission).filter(([id, level]) => !game.users.get(id)?.isGM && game.users.get(id)?.active && level === 3).map(([id, level]) => id);
    if (otherOwners.length > 0)
      return true;
    else
      return false;
  }
};

// module/quest.js
Hooks.once("init", async function() {
  console.log(`Initializing Quest Quest System`);
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
  CONFIG.Actor.documentClass = QuestActor;
  CONFIG.Item.documentClass = QuestItem;
  CONFIG.ui.combat = QuestCombatTracker;
  CONFIG.Dice.rolls.push(QuestRoll);
  CONFIG.Combat.initiative = {
    formula: "0",
    decimals: 2
  };
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
  await preloadHandlebarsTemplates();
  TextEditor.enrichHTML = function(content, {
    secrets = false,
    documents = true,
    links = true,
    rolls = true,
    cost = true,
    damage = true,
    rollData,
    ...options
  } = {}) {
    const html = document.createElement("div");
    html.innerHTML = String(content || "");
    if (!secrets) {
      let elements = html.querySelectorAll("section.secret");
      elements.forEach((e) => e.parentNode.removeChild(e));
    }
    let updateTextArray = true;
    let text3 = [];
    if (options.entities) {
      console.warn("The 'entities' option for TextEditor.enrichHTML is deprecated. Please use 'documents' instead.");
      documents = options.entities;
    }
    if (documents) {
      if (updateTextArray)
        text3 = this._getTextNodes(html);
      const documentTypes = CONST.DOCUMENT_LINK_TYPES.concat("Compendium");
      const rgx = new RegExp(`@(${documentTypes.join("|")})\\[([^\\]]+)\\](?:{([^}]+)})?`, "g");
      updateTextArray = this._replaceTextContent(text3, rgx, this._createContentLink);
    }
    if (links) {
      if (updateTextArray)
        text3 = this._getTextNodes(html);
      const rgx = /(https?:\/\/)(www\.)?([^\s<]+)/gi;
      updateTextArray = this._replaceTextContent(text3, rgx, this._createHyperlink);
    }
    if (rolls) {
      rollData = rollData instanceof Function ? rollData() : rollData || {};
      if (updateTextArray)
        text3 = this._getTextNodes(html);
      const rgx = /\[\[(\/[a-zA-Z]+\s)?(.*?)([\]]{2,3})(?:{([^}]+)})?/gi;
      updateTextArray = this._replaceTextContent(text3, rgx, (...args) => this._createInlineRoll(...args, rollData));
    }
    if (cost) {
      if (updateTextArray)
        text3 = this._getTextNodes(html);
      const rgx = new RegExp(`@(cost|Cost)\\[([^\\]]+)\\](?:{([^}]+)})?`, "g");
      updateTextArray = this._replaceTextContent(text3, rgx, this._createCost);
    }
    if (damage) {
      if (updateTextArray)
        text3 = this._getTextNodes(html);
      const rgx = new RegExp(`@(damage|Damage)\\[([^\\]]+)\\](?:{([^}]+)})?`, "g");
      updateTextArray = this._replaceTextContent(text3, rgx, this._createDamage);
    }
    return html.innerHTML;
  };
  TextEditor._createCost = function(match) {
    const a = document.createElement("a");
    match = match.substring(6, match.length - 1);
    a.innerHTML = '<i class="cost">' + match + "</i>";
    return a;
  };
  TextEditor._createDamage = function(match) {
    const a = document.createElement("a");
    match = match.substring(8, match.length - 1);
    a.innerHTML = '<i class="damage">' + match + "</i>";
    return a;
  };
});
Hooks.once("ready", async () => {
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
  game.quest.roleList = await getRoleList();
});
Hooks.on("renderDialog", (dialog, html) => {
  Array.from(html.find("#document-create option")).forEach((i) => {
    if (i.value == "detail") {
      i.remove();
    }
  });
});
async function getRoleList() {
  let sourceCompendium = game.settings.get("foundryvtt-quest", "abilityCompendium");
  const QUESTAbilities = await game.packs.get(sourceCompendium);
  let AllAbilities = await QUESTAbilities.getDocuments();
  const roleList = [
    ...new Set(AllAbilities.map((data) => data.data.data.role))
  ];
  return roleList;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=quest.js.map
