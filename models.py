from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Scholarship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    eligibility = db.Column(db.String(200), nullable=True)
    deadline = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)

    def __repr__(self):
        return f"Scholarship({self.name}, {self.amount}, {self.deadline})"