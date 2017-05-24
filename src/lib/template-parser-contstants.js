export const tabsheetHtml = `
<pragma-tabsheet>
    __tabs__
</pragma-tabsheet>
`;

export const tabHtml = `
<div id="__id__" data-tab="__title__">__content__</div>
`;

export const groupHtml = `
<div class="group" role="group" class.bind="groupVisiblity.__id__Checked ? '' : 'closed' ">
    <header>
        <h3>__title__</h3>
        <input type="checkbox" class="switch" checked.bind="groupVisiblity.__id__Checked" />
    </header>
    
    <div aria-hidden.bind="!groupVisiblity.__id__Checked" class="group-body">__content__</div>
</div>
`;

export const inputHtml = `
<input-composite id="__field__" label="__title__" descriptor="__description__" required.bind="__required__">
    <input value.bind="__prefix__.__field__" __classes__ __attributes__></input>
</input-composite>
`;

export const checkboxHtml = `
    <div class="checkbox-composite">
        <input id="__field__" type="checkbox" checked.bind="__prefix__.__field__" __classes__ __attributes__/>
        <label for="__field__">__title__</label>
    </div>
`;

export const textareaHtml = `
<input-composite id="__field__" label="__title__" descriptor="__description__">
    <textarea value.bind="__prefix__.__field__" __classes__ __attributes__></textarea>
</input-composite>
`;

export const selectHtml = `
<input-composite id="__field__" label="__title__" descriptor="__description__" required="__required__">
    <select value.bind="__prefix__.__field__">
        <option repeat.for="option of __datasource__" model.bind="option.id">__content__</option>
    </select>
</input-composite>
`;

export const readOnlyHtml = `
<input-composite id="__field__" label="__title__" descriptor="__description__">
    <div>__content__</div>
</input-composite>
`;

export const containerHtml = `
<div __classes__ __attribute__>__content__</div>
`;

export const buttonHtml = `
<button __classes__ __attributes__ click.delegate="__action__(event)">__title__</button>
`;

export const dynamicHtml = `
<__tagname__ __classes__ __attributes__>__content__</__tagname__>
`;

export const listTemplate1 = `
<template>
    <div class="no-mouse">
        <div class="stretch">__field1__</div>
        <div>__field2__</div>
    </div>
    
    <div class="no-mouse">
        <span class="bold">__field3__</span>
        <span class="piped">__field4__</span>
    </div>
    
    <div class="suppressed no-mouse">__field5__</div>
</template>
`;

export function populateTemplate(template, map) {
    let result = template;
    const keys = Object.keys(map);

    for (let key of keys) {
       const replacement = map[key];
        result = result.split(key).join(replacement);
    }

    return result;
}