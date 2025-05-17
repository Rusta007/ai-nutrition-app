def recommend_diet_plan(data):
    age = data['age']
    gender = data['gender']
    activity = data['activity']
    goals = data['goal']
    
    # Placeholder logic
    if goals.lower() == "weight loss":
        return {
            "plan": ["Oats breakfast", "Grilled chicken salad", "Steamed veggies"],
            "tips": ["Avoid sugar", "Drink 3L water", "No late-night snacks"]
        }
    else:
        return {
            "plan": ["Peanut butter toast", "Rice and dal", "Paneer stir fry"],
            "tips": ["Include protein", "Stay hydrated", "Exercise daily"]
        }
