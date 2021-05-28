//@ts-check
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
    mount: {
        src: { url: "/" }
    },
    devOptions: {
        port: 7000
    },
    env: {
        // todo read fields from package.json because it snowpack could be launched from the terminal directly
        SNOWPACK_PUBLIC_NAME: process.env.npm_package_displayName,
        SNOWPACK_PUBLIC_BUILD_DATE: new Date().toLocaleDateString(),
        SNOWPACK_PUBLIC_GITHUB_REPO: process.env.npm_package_repository_url
    },
    packageOptions: {
        source: process.env.NODE_ENV === "production" ? "remote" : "local"
    }
};

module.exports = config;
