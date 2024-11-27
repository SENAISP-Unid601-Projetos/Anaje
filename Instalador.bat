@echo off
cd /d %~dp0
echo Instalando...
pip install flask tinydb
code ./
pause
