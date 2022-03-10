import * as path from 'path';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const isProduction = process.env.NODE_ENV === "production";

const webConfig: webpack.Configuration = {
    mode: isProduction ? "production" : "development",
    entry: {
        main: "./src/app/index.tsx",
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: [/\.tsx?$/, /\.ts$/],
                loader: "ts-loader",
                options: { compilerOptions: { module: "ES2020", moduleResolution: "node" } },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    }
}

const serverConfig: webpack.Configuration = {
    mode: isProduction ? "production" : "development",
    entry: {
        main: "./src/index.ts",
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: [/\.tsx?$/, /\.ts$/],
                loader: "ts-loader",
                options: { compilerOptions: { module: "es2020", moduleResolution: "node" } },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    }
}

module.exports = [webConfig, serverConfig]
