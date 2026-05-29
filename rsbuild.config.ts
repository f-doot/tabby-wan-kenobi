import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  output: {
    // Crucial: Must start and end with a slash, matching your GitHub repo name
    assetPrefix: '/tabby-wan-kenobi/',
  },
});
