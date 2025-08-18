@echo off
REM Para o script se qualquer comando falhar
setlocal enabledelayedexpansion
set ERRLEV=0

echo Aplicando migrações
python manage.py migrate
if errorlevel 1 exit /b %errorlevel%

echo Coletando arquivos estáticos
python manage.py collectstatic --noinput
if errorlevel 1 exit /b %errorlevel%

echo Rodando seeds do banco de dados em ordem
python manage.py seed_superuser
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_subprefeituras
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_distritos
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_secretarias
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_prefeito
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_eixos
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_news
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_carta_prefeito
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_about_pdm
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_metas
if errorlevel 1 exit /b %errorlevel%


python manage.py seed_acoes
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_planos_setoriais
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_ods
if errorlevel 1 exit /b %errorlevel%

python manage.py seed_pdms
if errorlevel 1 exit /b %errorlevel%

echo Iniciando servidor
python manage.py runserver 0.0.0.0:8000