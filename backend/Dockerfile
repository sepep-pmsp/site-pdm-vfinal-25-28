# Base para python slim
FROM python:3.11-slim

# Define a pasta de trabalho
WORKDIR /backend

# Copia os arquivos do projeto
COPY . /backend

# Copia o entrypoint e garante permissão de execução
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Instala dependências
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Expõe a porta padrão do Django
EXPOSE 8000

# Define o entrypoint para iniciar a aplicação e aplicar seeds/migrations
ENTRYPOINT ["/entrypoint.sh"]
