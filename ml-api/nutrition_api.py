import requests

def get_nutrition_info(food):
    url = "https://api.api-ninjas.com/v1/nutrition?query=" + food
    headers = {'X-Api-Key': 'YOUR_API_KEY'}  # replace with actual
    response = requests.get(url, headers=headers)
    return response.json()
