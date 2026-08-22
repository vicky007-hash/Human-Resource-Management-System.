from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Employee(Base):
    __tablename__ = "employees"
    
    # Core Authentication Data
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="Employee") # Admin vs Employee access
    
    # Profile Management Data
    full_name = Column(String, nullable=True)
    job_title = Column(String, nullable=True)
    salary_structure = Column(String, nullable=True)
    profile_picture = Column(String, nullable=True)

    # Relationships to link data
    attendances = relationship("Attendance", back_populates="employee")
    leaves = relationship("LeaveRequest", back_populates="employee")

class Attendance(Base):
    __tablename__ = "attendances"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    status = Column(String) # Present, Absent, Half-day, Leave
    
    employee_id = Column(Integer, ForeignKey("employees.id"))
    employee = relationship("Employee", back_populates="attendances")

class LeaveRequest(Base):
    __tablename__ = "leave_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    leave_type = Column(String) # Paid, Sick, Unpaid
    start_date = Column(Date)
    end_date = Column(Date)
    remarks = Column(String, nullable=True)
    status = Column(String, default="Pending") # Pending, Approved, Rejected
    
    employee_id = Column(Integer, ForeignKey("employees.id"))
    employee = relationship("Employee", back_populates="leaves")
