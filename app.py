from flask import Flask
from flask_restful import Api
from models import db, Scholarship
from resources import ScholarshipResource, ScholarshipListResource, ScholarshipSearchResource

app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)
api = Api(app)

api.add_resource(ScholarshipResource, '/scholarships/<int:scholarship_id>')
api.add_resource(ScholarshipListResource, '/scholarships')
api.add_resource(ScholarshipSearchResource, '/scholarship_search')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # This will create the tables in the database
    app.run(debug=True)