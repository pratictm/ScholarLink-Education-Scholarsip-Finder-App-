from flask_restful import Resource, reqparse
from models import db, Scholarship

class ScholarshipResource(Resource):
    def get(self, scholarship_id):
        scholarship = Scholarship.query.get_or_404(scholarship_id)
        return {
            'name': scholarship.name,
            'amount': scholarship.amount,
            'eligibility': scholarship.eligibility,
            'deadline': scholarship.deadline,
            'description': scholarship.description
        }

    def delete(self, scholarship_id):
        scholarship = Scholarship.query.get_or_404(scholarship_id)
        db.session.delete(scholarship)
        db.session.commit()
        return {'message': 'Scholarship deleted'}

    def put(self, scholarship_id):
        scholarship = Scholarship.query.get_or_404(scholarship_id)

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('amount', type=float, required=True)
        parser.add_argument('eligibility', type=str, required=True)
        parser.add_argument('deadline', type=str, required=True)
        parser.add_argument('description', type=str, required=True)

        args = parser.parse_args()

        scholarship.name = args['name']
        scholarship.amount = args['amount']
        scholarship.eligibility = args['eligibility']
        scholarship.deadline = args['deadline']
        scholarship.description = args['description']

        db.session.commit()

        return {'message': 'Scholarship updated'}

class ScholarshipListResource(Resource):
    def get(self):
        scholarships = Scholarship.query.all()
        return [{
            'id': scholarship.id,
            'name': scholarship.name,
            'amount': scholarship.amount,
            'eligibility': scholarship.eligibility,
            'deadline': scholarship.deadline,
            'description': scholarship.description
        } for scholarship in scholarships]

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('amount', type=float, required=True)
        parser.add_argument('eligibility', type=str, required=True)
        parser.add_argument('deadline', type=str, required=True)
        parser.add_argument('description', type=str, required=True)

        args = parser.parse_args()

        scholarship = Scholarship(
            name=args['name'],
            amount=args['amount'],
            eligibility=args['eligibility'],
            deadline=args['deadline'],
            description=args['description']
        )
        db.session.add(scholarship)
        db.session.commit()

        return {'message': 'Scholarship added'}, 201

class ScholarshipSearchResource(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('min_amount', type=float, help='Minimum amount')
        parser.add_argument('max_amount', type=float, help='Maximum amount')

        args = parser.parse_args()

        query = Scholarship.query

        if args['min_amount']:
            query = query.filter(Scholarship.amount >= args['min_amount'])
        if args['max_amount']:
            query = query.filter(Scholarship.amount <= args['max_amount'])

        scholarships = query.all()
        return [{
            'name': scholarship.name,
            'amount': scholarship.amount,
            'eligibility': scholarship.eligibility,
            'deadline': scholarship.deadline
        } for scholarship in scholarships]
