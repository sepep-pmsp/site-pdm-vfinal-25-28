from dotenv import load_dotenv
import os


def gen_env_file_from_example(env_file_path:str)->str:

    example_file_path = env_file_path+'.example'
    if not os.path.exists(example_file_path):
        raise FileNotFoundError(f"Example env file not found: {example_file_path}")
    print('Generating .env file from example...')
    with open(example_file_path, 'r') as example_file:
        example_content = example_file.read()
    with open(env_file_path, 'w') as env_file:
        env_file.write(example_content)

def get_env_file():

    curr_dir = os.path.dirname(os.path.abspath(__file__))
    top_dir = os.path.dirname(curr_dir)
    env_file_path = os.path.join(top_dir, '.env')
    if not os.path.exists(env_file_path):
        gen_env_file_from_example(env_file_path)

    return env_file_path

def load_dot_env_config():

    env_file_path = get_env_file()
    if not os.path.exists(env_file_path):
        raise FileNotFoundError(f".env file not found: {env_file_path}")
    
    load_dotenv(env_file_path)
    print(f"Loaded environment variables from {env_file_path}")
    