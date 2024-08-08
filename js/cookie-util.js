const CookieUtil = {
    // Set a cookie with optional attributes
    set: function (name, value, options = {}) {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
            value
        )}`;

        if (options.expires) {
            if (typeof options.expires === "number") {
                const d = new Date();
                d.setTime(d.getTime() + options.expires * 864e5);
                options.expires = d;
            }
            cookieString += `; expires=${options.expires.toUTCString()}`;
        }

        cookieString += `; path=${options.path || "/"}`;

        if (options.domain) cookieString += `; domain=${options.domain}`;
        if (options.secure) cookieString += "; secure";
        if (options.httpOnly) cookieString += "; httpOnly";
        if (options.sameSite) cookieString += `; sameSite=${options.sameSite}`;

        document.cookie = cookieString;
    },

    // Get a cookie or its attributes
    get: function (name, attribute = "value") {
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [cookieName, ...cookieValue] = cookie.split("=");
            acc[cookieName] = cookieValue.join("=");
            return acc;
        }, {});

        if (!(name in cookies)) {
            return null;
        }

        const cookieValue = cookies[name];
        if (attribute === "value") {
            return decodeURIComponent(cookieValue);
        }

        const attributes = cookieValue.split("; ").reduce((acc, attr) => {
            const [key, value] = attr.split("=");
            acc[key.toLowerCase()] = value;
            return acc;
        }, {});

        return attributes[attribute.toLowerCase()] || null;
    },

    // Delete a cookie
    delete: function (name, options = {}) {
        options.expires = -1;
        this.set(name, "", options);
    },
};
