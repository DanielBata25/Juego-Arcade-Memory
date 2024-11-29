import random
import string
import requests

def generate_random_link(length=9):
    # Genera una cadena de caracteres alfanuméricos de longitud especificada
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(length))
  
    # Solicita un enlace al azar utilizando el ID de usuario de OpenAI
    response = requests.get(f'https://api.example.com/links?uid={random_string}')
    if response.status_code == 200:
        return response.json()
    else:
        return generate_random_link(length)

# Ejemplo de uso
random_link = generate_random_link()
print('Link al azar generado:', random_link)