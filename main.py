from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import date
from typing import List

# Import the database architecture and validation schemas
import models
import schemas
from database import engine, SessionLocal

# Automatically generate the SQLite database tables on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Dayflow HRMS API",
    description="Backend architecture for the Dayflow Human Resource Management System",
    version="1.0.0"
)

# Configure CORS to securely allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SECURITY & HASHING ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# --- DATABASE DEPENDENCY ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==========================================
# AUTHENTICATION ENDPOINTS
# ==========================================

@app.post("/signup", response_model=schemas.EmployeeResponse)
def sign_up(user: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.Employee).filter(models.Employee.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
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
    email = credentials.get("email")
    password = credentials.get("password")
    
    user = db.query(models.Employee).filter(models.Employee.email == email).first()
    
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
        
    return {
        "message": "Login successful",
        "user_id": user.id,
        "role": user.role
    }


# ==========================================
# ATTENDANCE TRACKING ENDPOINTS
# ==========================================

@app.post("/attendance/check-in", response_model=schemas.AttendanceResponse)
def check_in(attendance: schemas.AttendanceCreate, employee_id: int, db: Session = Depends(get_db)):
    new_attendance = models.Attendance(
        date=attendance.date,
        status=attendance.status,
        employee_id=employee_id
    )
    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)
    return new_attendance

@app.get("/attendance/employee/{employee_id}", response_model=List[schemas.AttendanceResponse])
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    records = db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id).all()
    return records

@app.get("/attendance/admin/all", response_model=List[schemas.AttendanceResponse])
def get_all_attendance(admin_id: int, db: Session = Depends(get_db)):
    admin_check = db.query(models.Employee).filter(models.Employee.id == admin_id).first()
    if not admin_check or admin_check.role != "HR":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    return db.query(models.Attendance).all()


# ==========================================
# LEAVE MANAGEMENT ENDPOINTS
# ==========================================

@app.post("/leave/apply", response_model=schemas.LeaveRequestResponse)
def apply_for_leave(leave: schemas.LeaveRequestCreate, employee_id: int, db: Session = Depends(get_db)):
    new_leave = models.LeaveRequest(
        leave_type=leave.leave_type,
        start_date=leave.start_date,
        end_date=leave.end_date,
        remarks=leave.remarks,
        employee_id=employee_id
    )
    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)
    return new_leave

@app.get("/leave/admin/pending", response_model=List[schemas.LeaveRequestResponse])
def get_pending_leaves(admin_id: int, db: Session = Depends(get_db)):
    admin_check = db.query(models.Employee).filter(models.Employee.id == admin_id).first()
    if not admin_check or admin_check.role != "HR":
        raise HTTPException(status_code=403, detail="Admin privileges required")
        
    return db.query(models.LeaveRequest).filter(models.LeaveRequest.status == "Pending").all()

@app.put("/leave/admin/evaluate/{leave_id}")
def evaluate_leave(leave_id: int, admin_id: int, new_status: str, db: Session = Depends(get_db)):
    admin_check = db.query(models.Employee).filter(models.Employee.id == admin_id).first()
    if not admin_check or admin_check.role != "HR":
        raise HTTPException(status_code=403, detail="Admin privileges required")
        
    leave_request = db.query(models.LeaveRequest).filter(models.LeaveRequest.id == leave_id).first()
    if not leave_request:
        raise HTTPException(status_code=404, detail="Leave request not found")
        
    if new_status not in ["Approved", "Rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status update")
        
    leave_request.status = new_status
    db.commit()
    
    return {"message": f"Leave request updated to {new_status}"}


# ==========================================
# PAYROLL & SALARY MANAGEMENT ENDPOINTS
# ==========================================

@app.get("/payroll/employee/{employee_id}", response_model=schemas.EmployeeResponse)
def get_employee_payroll(employee_id: int, db: Session = Depends(get_db)):
    # Employee Payroll View: Payroll data is strictly read-only for employees
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    return employee

@app.get("/payroll/admin/all", response_model=List[schemas.EmployeeResponse])
def get_all_payroll(admin_id: int, db: Session = Depends(get_db)):
    # Admin Payroll Control: Admin can view payroll of all employees
    admin_check = db.query(models.Employee).filter(models.Employee.id == admin_id).first()
    if not admin_check or admin_check.role != "HR":
        raise HTTPException(status_code=403, detail="Admin privileges required")
        
    return db.query(models.Employee).all()

@app.put("/payroll/admin/update/{target_employee_id}")
def update_salary_structure(target_employee_id: int, admin_id: int, new_salary_structure: str, db: Session = Depends(get_db)):
    # Admin Payroll Control: Admin can update salary structure and ensure accuracy
    admin_check = db.query(models.Employee).filter(models.Employee.id == admin_id).first()
    if not admin_check or admin_check.role != "HR":
        raise HTTPException(status_code=403, detail="Admin privileges required")
        
    target_employee = db.query(models.Employee).filter(models.Employee.id == target_employee_id).first()
    if not target_employee:
        raise HTTPException(status_code=404, detail="Target employee not found")
        
    target_employee.salary_structure = new_salary_structure
    db.commit()
    
    return {"message": f"Salary structure successfully updated for employee {target_employee_id}"}
