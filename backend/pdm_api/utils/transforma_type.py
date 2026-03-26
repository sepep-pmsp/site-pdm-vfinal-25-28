import json

def transformar_str(value):
    '''
    Transforma qualquer tipo em string, usando o json.dumps
    '''
    if isinstance(value, str):
        return value

    if isinstance(value, (dict, list)):
        try:
            return json.dumps(value, ensure_ascii=False)
        except Exception as e:
            raise ValueError(f"Erro ao converter para JSON (str): {e}")