# Usa uma imagem base com Python
FROM python:3.11-slim

# Define a pasta de trabalho dentro do container
WORKDIR /site_pdm_admin

# Copia os arquivos do projeto
COPY . /site_pdm_admin

# Instala as dependências
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Expõe a porta padrão do Django
EXPOSE 8000

# Comando padrão: aplica migrações e inicia o servidor
CMD ["sh", "-c", "python site_pdm_admin/manage.py migrate && python site_pdm_admin/manage.py runserver 0.0.0.0:8000"]
