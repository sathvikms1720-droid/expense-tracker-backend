from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import SessionLocal
from app import models, schemas
from app.auth import get_current_user

router = APIRouter(
    tags=["Expenses"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/expenses",
    response_model=schemas.ExpenseResponse
)
def create_expense(
    expense: schemas.ExpenseCreate,
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

    new_expense = models.Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        user_id=user.id,
        created_at=datetime.now(),
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense


@router.get(
    "/expenses",
    response_model=list[schemas.ExpenseResponse]
)
def get_expenses(
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

    expenses = db.query(models.Expense).filter(
        models.Expense.user_id == user.id
    ).all()

    return expenses


@router.get(
    "/expenses/{expense_id}",
    response_model=schemas.ExpenseResponse
)
def get_expense(
    expense_id: int,
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

    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == user.id
    ).first()

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return expense


@router.put(
    "/expenses/{expense_id}",
    response_model=schemas.ExpenseResponse
)
def update_expense(
    expense_id: int,
    updated_expense: schemas.ExpenseCreate,
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

    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == user.id
    ).first()

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    expense.title = updated_expense.title
    expense.amount = updated_expense.amount
    expense.category = updated_expense.category

    db.commit()
    db.refresh(expense)

    return expense


@router.delete("/expenses/{expense_id}")
def delete_expense(
    expense_id: int,
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

    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id,
        models.Expense.user_id == user.id
    ).first()

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    db.delete(expense)

    db.commit()

    return {
        "message": "Expense deleted successfully"
}
    