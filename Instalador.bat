@echo off
cd /d %~dp0
echo Instalando dependências...
pip install flask tinydb
pause
