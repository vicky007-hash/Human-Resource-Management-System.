from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

# --- EMPLOYEE SCHEMAS ---
# Used when a user signs up
class EmployeeCreate(BaseModel):
    email: EmailStr # Automatically validates email formatting
    password: str
    role: str = "Employee"

# Used when returning user data (intentionally excludes the password)
class EmployeeResponse(BaseModel):
    id: int
    email: EmailStr
    role: str
    full_name: Optional[str] = None
    job_title: Optional[str] = None
    salary_structure: Optional[str] = None
    
    class Config:
        from_attributes = True

# --- ATTENDANCE SCHEMAS ---
class AttendanceCreate(BaseModel):
    date: date
    status: str

class AttendanceResponse(AttendanceCreate):
    id: int
    employee_id: int
    
    class Config:
        from_attributes = True

# --- LEAVE REQUEST SCHEMAS ---
class LeaveRequestCreate(BaseModel):
    leave_type: str
    start_date: date
    end_date: date
    remarks: Optional[str] = None

class LeaveRequestResponse(LeaveRequestCreate):
    id: int
    status: str
    employee_id: int
    
    class Config:
        from_attributes = True
