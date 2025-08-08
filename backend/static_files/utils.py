import unicodedata
import re

def remover_caracteres_especiais(texto: str) -> str:
    # Normaliza acentos (ex: 'á' -> 'a')
    texto = unicodedata.normalize('NFKD', texto).encode('ASCII', 'ignore').decode('utf-8')
    # Remove tudo que não for letra, número ou espaço
    texto = re.sub(r'[^a-zA-Z0-9\s]', '', texto)
    return texto
