from django.contrib.auth import get_user_model
from config import load_dot_env_config
import os

def get_superuser():

    load_dot_env_config()
    User = get_user_model()
    try:
        username = os.environ['ADMIN_USER']
        email = os.environ['ADMIN_EMAIL']
    except KeyError as e:
        raise RuntimeError(f"Erro ao carregar variáveis de ambiente: {e}. Configuração para superusuário não encontrada.")

    return User.objects.filter(username=username, email=email).first()