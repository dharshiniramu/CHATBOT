from flask import Flask, request, jsonify
import pymongo
import requests
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

# Ollama setup
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL_NAME = "tinyllama"

# MongoDB connection
mongo_client = pymongo.MongoClient("mongodb+srv://thanishka:Thani%40123@chatbot.iagvzxg.mongodb.net/")
db = mongo_client["chatbotDB"]
collection = db["document_embeddings"]

# Load embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Load and compile bad words filter
with open("en.txt", "r") as f:
    BAD_WORDS = [line.strip().lower() for line in f if line.strip()]
BAD_WORD_REGEX = re.compile(r"|".join(rf"\b{re.escape(word)}\w*\b" for word in BAD_WORDS), re.IGNORECASE)

def contains_bad_words(text):
    return bool(BAD_WORD_REGEX.search(text))

def retrieve_relevant_docs(query, top_k=3):
    query_embedding = embedding_model.encode(query).tolist()
    all_docs = list(collection.find({}, {"text_content": 1, "embedding": 1, "_id": 0}))
    doc_texts = [doc["text_content"] for doc in all_docs]
    doc_embeddings = np.array([doc["embedding"] for doc in all_docs])
    similarities = cosine_similarity([query_embedding], doc_embeddings)[0]
    top_indices = similarities.argsort()[::-1][:top_k]
    return [doc_texts[i] for i in top_indices]

def call_ollama_model(prompt):
    payload = {
        "model": OLLAMA_MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }
    response = requests.post(OLLAMA_URL, json=payload)
    return response.json()["response"]

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_query = data.get("query", "")

    if contains_bad_words(user_query):
        return jsonify({"error": "Inappropriate message detected."}), 400

    relevant_docs = retrieve_relevant_docs(user_query)
    context = "\n".join(relevant_docs)
    prompt = f"""You are a helpful assistant. Use the following context to answer the question.

Context:
{context}

Question:
{user_query}

Answer:"""

    response = call_ollama_model(prompt)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
