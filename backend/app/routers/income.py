from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import SessionLocal
from app.models import Income
from app.schemas import ExpenseCreate
from app import models
from app.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/income")
def add_income(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    user = db.query(models.User).filter(
        models.User.email == current_user["sub"]
    ).first()

    if user is None:

        user = models.User(
            username=current_user["sub"].split("@")[0],
            email=current_user["sub"],
            password="google_login_user"
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    new_income = Income(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        user_id=user.id,
        created_at=datetime.now()
    )

    db.add(new_income)
    db.commit()

    return {
        "message": "Income added successfully"
    }


@router.get("/income")
def get_income(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    user = db.query(models.User).filter(
        models.User.email ==current_user["sub"]
    ).first()

    if user is None:

        user = models.User(
            username=current_user["sub"].split("@")[0],
            email=current_user["sub"],
            password="google_login_user"
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    income = db.query(models.Income).filter(
        models.Income.user_id == user.id
    ).all()

    return income