# 1) Go to your project folder
cd "C:\Users\Sadia Abdul\Downloads\fotwrld\fotwrld-nextjs"

# 2) Create a folder for the extracted update
New-Item -ItemType Directory -Force -Path ".\fotwrld-master-files"

# 3) Extract the zip you downloaded from ChatGPT
Expand-Archive -Path "$HOME\Downloads\fotwrld_direct_replace_bundle.zip" -DestinationPath ".\fotwrld-master-files" -Force

# 4) Copy the files into your project and overwrite
Copy-Item ".\fotwrld-master-files\app\page.tsx" ".\app\page.tsx" -Force
Copy-Item ".\fotwrld-master-files\app\archive\page.tsx" ".\app\archive\page.tsx" -Force
Copy-Item ".\fotwrld-master-files\app\archive\[slug]\page.tsx" ".\app\archive\[slug]\page.tsx" -Force
Copy-Item ".\fotwrld-master-files\lib\content.ts" ".\lib\content.ts" -Force
Copy-Item ".\fotwrld-master-files\app\globals.css" ".\app\globals.css" -Force
Copy-Item ".\fotwrld-master-files\content\articles\fotwrld-report-overview.md" ".\content\articles\fotwrld-report-overview.md" -Force

# 5) Run locally
npm run dev

# 6) If it looks right, publish
git add .
git commit -m "apply direct replace site bundle"
git push
