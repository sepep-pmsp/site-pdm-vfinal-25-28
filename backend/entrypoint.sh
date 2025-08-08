#!/bin/sh

set -e  # para o script se qualquer comando falhar

echo ">> Aplicando migrações"
python manage.py migrate

echo ">> Coletando arquivos estáticos"
python manage.py collectstatic --noinput

echo ">> Rodando seeds do banco de dados em ordem"

python manage.py seed_superuser
python manage.py seed_subprefeituras
python manage.py seed_distritos
python manage.py seed_secretarias
python manage.py seed_prefeito
python manage.py seed_eixos
python manage.py seed_news
python manage.py seed_carta_prefeito
python manage.py seed_about_pdm


echo ">> Iniciando servidor"
exec gunicorn site_pdm_admin.wsgi:application --bind 0.0.0.0:8000