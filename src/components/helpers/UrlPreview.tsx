import React from 'react';
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

interface props {
    url: string;
}

function tempOLDDelete(url: string) {
    // bee62f68808af0b11cfe34da98f7a8f6
    var data = {q: url};
    var key = "bee62f68808af0b11cfe34da98f7a8f6";
    var result = null;
    fetch("https://api.linkpreview.net", {
        method: "POST",
        headers: {
            "X-Linkpreview-Api-Key": key
        },
        mode: "cors",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => result = response)
    .catch(error => console.log(error));


    return (
        <div>
            <p>Link preview</p>
            <h3>{result?.title}</h3>
            <p>{result?.description}</p>
            <img src={result?.image} width={50} height={50} />
            <a href={result?.url}>{result?.url}</a>
        </div>
    );
}

function UrlMetadata(url: string) {
    var result;
    getLinkPreview(url).then((data) => result = data);
    return result;
}

export default function UrlPreview(url: props) {
    var preview = UrlMetadata(url.url);
    return (
        <div>
            <h3>{preview.title}</h3>
            <p>{preview.description}</p>
        </div>
    );
}