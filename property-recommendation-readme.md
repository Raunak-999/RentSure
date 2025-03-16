# RentSure Property Recommendation System

## Overview
The RentSure Property Recommendation System is a hybrid recommendation engine designed to help users find rental properties that match their preferences. The system combines collaborative filtering (based on user interactions with properties) and content-based filtering (based on user preferences and property attributes) to provide personalized property recommendations.

## Features
- **Hybrid Recommendation Algorithm**: Combines collaborative and content-based filtering techniques for more accurate recommendations
- **RESTful API**: Flask-based API for easy integration with front-end applications
- **User Preference Matching**: Recommends properties based on budget, bedroom/bathroom preferences, location preferences, and pet-friendly requirements
- **Interaction-Based Learning**: Improves recommendations based on user interactions with properties
- **Sample Data Generation**: Includes functionality to generate sample data for testing and demonstration purposes

## Technology Stack
- **Backend**: Python, Flask
- **Data Processing**: Pandas, NumPy
- **Machine Learning**: scikit-learn (cosine similarity)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: Firebase Firestore

## System Architecture
The system consists of three main components:

1. **Core Recommendation Engine** (`PropertyRecommender` class)
   - Handles data preparation for collaborative and content-based filtering
   - Implements recommendation algorithms
   - Formats recommendations for presentation

2. **Flask API**
   - Exposes the recommendation engine via a RESTful API
   - Processes JSON requests and returns recommendations
   - Handles data conversion between JSON and DataFrames

3. **Web Interface**
   - Provides a user-friendly interface for interacting with the recommendation system
   - Displays property recommendations in a card-based layout
   - Connects to Firebase for data storage

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/rentsure-hackathon.git
   cd rentsure-hackathon
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up Firebase credentials (for the web interface):
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
   - Update the Firebase configuration in `script.js` with your project details

## Usage

### Running the Flask API
```python
python app.py
```
This will start the Flask server on port 5000.

### API Endpoints
- **POST** `/api/get_recommendations`: Get property recommendations for a user
  - Request body:
    ```json
    {
      "user_id": 123,
      "userData": [...],
      "propertyData": [...],
      "interactionData": [...],
      "count": 5
    }
    ```
  - Response:
    ```json
    {
      "user_id": 123,
      "recommendations": [...]
    }
    ```

### Testing with Sample Data
The `generate_sample_data()` function creates sample users, properties, and interactions for testing:

```python
user_df, property_df, interactions_df = generate_sample_data()
recommender = PropertyRecommender(user_df, property_df, interactions_df)
recommender.print_user_friendly_recommendations(user_id=5)
```

### Web Interface
1. Open `index.html` in your browser
2. Enter a user ID in the input field
3. Click "Get Recommendations" to see property recommendations
4. Use "Initialize Sample Data" to populate the Firebase database with sample data

## Data Model

### User Data
- `user_id`: Unique identifier for the user
- `budget`: Maximum monthly rent the user is willing to pay
- `bedrooms_preference`: Preferred number of bedrooms
- `bathrooms_preference`: Preferred number of bathrooms
- `location_preference`: Location quality rating preference (1-5)
- `pet_friendly_preference`: Whether the user needs a pet-friendly property (0 or 1)

### Property Data
- `property_id`: Unique identifier for the property
- `rent`: Monthly rent amount
- `bedrooms`: Number of bedrooms
- `bathrooms`: Number of bathrooms
- `location`: Location quality rating (1-5)
- `pet_friendly`: Whether the property is pet-friendly (0 or 1)

### Interaction Data
- `user_id`: User identifier
- `property_id`: Property identifier
- `interaction_type`: Type of interaction (1-3, higher value indicates stronger interest)

## Algorithm Details

### Collaborative Filtering
1. Creates a user-property interaction matrix
2. Calculates user similarity using cosine similarity
3. Identifies properties that similar users have interacted with
4. Weights recommendations by user similarity and interaction strength

### Content-Based Filtering
1. Filters properties based on user preferences (budget, bedrooms)
2. Normalizes user preferences and property features
3. Calculates similarity scores between user preferences and properties
4. Returns properties with the highest similarity scores

### Hybrid Approach
1. Gets recommendations from both collaborative and content-based filtering
2. Combines recommendations with weights (60% collaborative, 40% content-based)
3. Returns the top N properties with the highest combined scores

## Future Enhancements
- Implement more sophisticated recommendation algorithms (e.g., matrix factorization)
- Add user feedback mechanisms to improve recommendations over time
- Integrate with map services to provide location-based recommendations
- Implement user authentication and personalized dashboards
- Expand property attributes to include amenities, neighborhood information, etc.

## License
[MIT License](LICENSE)

## Contributors
- Your Name
- Team members from the RentSure Hackathon project

## Acknowledgments
- This project was developed as part of the RentSure Hackathon
- Special thanks to the organizing committee and mentors

## Contact
For questions or support, please contact: your.email@example.com
