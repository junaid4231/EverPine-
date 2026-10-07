@echo off
REM Commits and pushes the SEO update for the EverPine website.
cd /d "%~dp0"
echo === Files that will be committed ===
git status --short
echo.
git add -A
git commit -m "SEO: villa & luxury landing pages, Dubai page rebuild, home intro, schema + image sitemap"
git push
echo.
echo === Done. If you see errors above, copy them to Claude. ===
pause
