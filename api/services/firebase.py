import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

# We only want to initialize the app once
if not firebase_admin._apps:
    try:
        # Load the JSON string from the .env file
        cred_json = os.getenv("FIREBASE_CREDENTIALS")
        if cred_json:
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
            print("🔥 Firebase connected successfully!")
        else:
            print("⚠️ FIREBASE_CREDENTIALS not found in .env")
    except Exception as e:
        print(f"❌ Firebase connection error: {e}")

# Export the database client so our routes can use it
db = firestore.client() if firebase_admin._apps else None