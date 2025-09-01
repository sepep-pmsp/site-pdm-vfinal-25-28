#!/bin/sh

set -e  # para o script se qualquer comando falhar

echo ">> Aplicando migrações"
python manage.py migrate

echo ">> Coletando arquivos estáticos"
python manage.py collectstatic --noinput

echo ">> Rodando seeds do banco de dados em ordem"

python manage.py seed_superuser
python manage.py seed_subprefeituras
python manage.py seed_zonas
python manage.py seed_distritos
python manage.py seed_secretarias
python manage.py seed_prefeito
python manage.py seed_pdms
python manage.py seed_eixos
python manage.py seed_news
python manage.py seed_carta_prefeito
python manage.py seed_about_pdm
python manage.py seed_metas
python manage.py seed_regionalizacao_metas
python manage.py seed_acoes
python manage.py seed_ods
python manage.py seed_planos_setoriais
python manage.py seed_historico
python manage.py seed_transparencia
python manage.py seed_regionalizacao
python manage.py seed_devolutivas
python manage.py seed_secao_devolutivas
python manage.py seed_sobre

echo ">> Iniciando servidor"
exec gunicorn site_pdm_admin.wsgi:application --bind 0.0.0.0:8000