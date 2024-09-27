import React, { useState, useEffect } from 'react';
import "./UrlPreview.css";

interface props {
    url: string;
}

interface urlObj {
    title: string;
    description: string;
    image: string;
    url: string;
}

export default function UrlPreview(url: props) {

    const [urlPreviewObj, setUrlPreviewObj] = useState<urlObj>({} as urlObj);

    useEffect(() => {
        const getUrlPreview = async(url: string) => {
            var data = {q: url};
            var key = process.env.REACT_APP_API_KEY;
            fetch("https://api.linkpreview.net", {
                method: "POST",
                headers: {
                    'X-Linkpreview-Api-Key': key,
                    'Content-Type': 'application/json'
                } as any,
                mode: "cors",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(response => setUrlPreviewObj(response))
            .catch(error => console.log(error));
        }

        getUrlPreview(url.url);
    }, [url.url]);
    
    return (
        <div className="url-preview">
            <a href={urlPreviewObj.url} target={urlPreviewObj.url}>
                <img src={urlPreviewObj.image} alt={"No image - " + urlPreviewObj.title} />
                <h3>{urlPreviewObj.title}</h3>
                <p>{urlPreviewObj.description}</p>
                <a href={urlPreviewObj.url}>{urlPreviewObj.url}</a>
            </a>
        </div>
    );
}