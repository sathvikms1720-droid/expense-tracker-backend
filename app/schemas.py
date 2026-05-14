from pydantic import BaseModel

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
class LoginRequest(BaseModel):
    email: str
    password: str
class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: int
    category: str

    class Config:
        orm_mode = True