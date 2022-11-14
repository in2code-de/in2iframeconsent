const consent = document.createElement('iframe-consent');
consent.innerHTML = `
    <template id="consent">
        <h1>Consent</h1>
    </template>

    <template id="iframe">
        <iframe />
    </template>
`;

document.body.appendChild(consent);
