const apiURL = process.env.REACT_APP_BASE_URL;

async function client(
    endpoint,
    { body, token, headers: customHeaders, ...customConfig } = {}
) {
    const config = {
        method: body ? 'POST' : 'GET',
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': body ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    };

    return fetch(`${apiURL}/${endpoint}`, config).then(
        async (response) => {
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        }
    );
}

export { client };
