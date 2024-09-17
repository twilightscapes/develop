#!/bin/bash

# Set the URL of your central repository
# THEME_REPO_URL="https://github.com/twilightscapes/pirate"

# # Set the branch or tag you want to pull updates from
# BRANCH_OR_TAG="main"

# # Backup user changes
# mv src user_src_backup

# # Clone the central repository
# git clone --branch $BRANCH_OR_TAG --depth 1 $THEME_REPO_URL tmp_theme

# # Replace the src folder, keeping the content
# rm -rf src
# mv tmp_theme/src .
# mv user_src_backup/content src/

# # Replace the config.ts file in content
# cp tmp_theme/src/content/config.ts src/content/

# # Replace root configuration files
# cp tmp_theme/astro.config.mjs .
# cp tmp_theme/keystatic.config.ts .
# cp tmp_theme/netlify.toml .
# cp tmp_theme/package.json .
# cp tmp_theme/README.md .
# cp tmp_theme/tsconfig.json .
# cp tmp_theme/tailwind.config.cjs .
# cp tmp_theme/postcss.config.cjs .

# # Additional files you might want to update
# cp tmp_theme/.eslintrc.cjs .
# cp tmp_theme/.prettierrc .
# cp tmp_theme/.gitignore .

# # Clean up
# rm -rf tmp_theme
# rm -rf user_src_backup

echo "Theme updated successfully!"