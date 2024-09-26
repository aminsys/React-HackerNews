export function cleanHtml(rawHtml) {
    let formattedText = rawHtml.replace(/<p>/gm, '\n\n');
    formattedText = replaceHexaEntities(formattedText);
    formattedText = formattedText.replace(/<[^>]+>/gm, '');

    //formattedText = formattedText.replace(/<a href="[^"]*">([^<]*)<\/a>/gm, '<a href="{$1}">$1</a>');
    formattedText = formattedText.replace(/&quot;/gm, '"');
    formattedText = formattedText.replace(/&gt;/gm, '>');
    formattedText = formattedText.replace(/&lt;/gm, '<');

    return formattedText;
}

function replaceHexaEntities(input){
    const hexRegex = /&#x([0-9A-Fa-f]+);/gm;
    return input.replace(hexRegex, (match, hexValue) => {
        return String.fromCharCode(parseInt(hexValue, 16));
    })
}