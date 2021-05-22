interface ImportMeta {
    env: {
        NODE_ENV: "development" | "production";
        SNOWPACK_PUBLIC_NAME: string;
        SNOWPACK_PUBLIC_BUILD_DATE: string;
        SNOWPACK_PUBLIC_GITHUB_REPO: string;
    };
}
