from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI application
app = FastAPI(
    title="Dayflow HRMS API",
    description="Backend architecture for the Dayflow Human Resource Management System",
    version="1.0.0"
)

# Configure CORS to securely allow your frontend to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For the hackathon prototype, we allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health-check endpoint to verify the server is active
@app.get("/")
def health_check():
    return {"status": "success", "message": "Dayflow HRMS Backend is online!"}
