@echo off
REM Commits and pushes the EverPine website with the author email that matches your GitHub account.
cd /d "%~dp0"
echo Current author email for this repo:
git config user.email
echo.
set /p GHEMAIL=Type the email address of your GitHub account (junaid4231) and press Enter: 
if "%GHEMAIL%"=="" goto push
git config user.email "%GHEMAIL%"
echo Author email for this repo set to %GHEMAIL%
:push
echo.
echo === Files that will be committed ===
git status --short
echo.
git add -A
git commit -m "SEO update + Search Console verification file"
if errorlevel 1 git commit --allow-empty -m "Redeploy with correct author email"
git push
echo.
echo === Done. If you see errors above, copy them to Claude. ===
pause
