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
<input-composite id="__field__" label="__title__" descriptor="__description__">
    <input value.bind="__prefix__.__field__" __classes__ __attributes__></input>
</input-composite>
`;

export const textareaHtml = `
<input-composite id="__field__" label="__title__" descriptor="__description__">
    <textarea value.bind="__prefix__.__field__" __classes__ __attributes__></textarea>
</input-composite>
`;

export const selectHtml = `
<input-composite id="__field__" label="__title__" descriptor="__description__">
    <select value.bind="__field__">
        <option repeat.for="option of __prefix__.__datasource__" value.bind="option">__content__</option>
    </select>
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

export function populateTemplate(template, map) {
    let result = template;
    const keys = Object.keys(map);

    for (let key of keys) {
       const replacement = map[key];
        result = result.split(key).join(replacement);
    }

    return result;
}