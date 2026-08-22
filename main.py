from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext

# Import the database architecture we built
import models
import schemas
from database import engine, SessionLocal

# This line automatically creates the SQLite database and tables when the server starts
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Dayflow HRMS API",
    description="Backend architecture for the Dayflow Human Resource Management System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SECURITY & HASHING ---
# Using bcrypt to securely hash passwords before storing them in the database
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# --- DATABASE DEPENDENCY ---
# This opens a database session for a single request and closes it safely afterward
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- AUTHENTICATION ENDPOINTS ---

@app.post("/signup", response_model=schemas.EmployeeResponse)
def sign_up(user: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    # Check if the email is already registered in the system
    existing_user = db.query(models.Employee).filter(models.Employee.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    # Hash the password and save the new user to the database
    hashed_pwd = get_password_hash(user.password)
    new_user = models.Employee(
        email=user.email,
        hashed_password=hashed_pwd,
        role=user.role
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/signin")
def sign_in(credentials: dict, db: Session = Depends(get_db)):
    # Extract the email and password sent by the React frontend
    email = credentials.get("email")
    password = credentials.get("password")
    
    # Query the database for the user
    user = db.query(models.Employee).filter(models.Employee.email == email).first()
    
    # Validate credentials and throw a clear error message if they fail
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
        
    # Return a success message with the user's role to drive frontend routing
    return {
        "message": "Login successful",
        "user_id": user.id,
        "role": user.role
    }
