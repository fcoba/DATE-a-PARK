from app import db

class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)

    def __repr__(self):
        return '<Pet %r>' % (self.name)


class Parks(db.Model):
    __tablename__ = 'parks'

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    lat = db.Column(db.String)
    lon = db.Column(db.String)
    address1 = db.Column(db.String)
    address2 = db.Column(db.String)
    address3 = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip = db.Column(db.String)
    description = db.Column(db.String)
    directions = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)

    def __repr__(self):
        return '<Park %r>' % (self.name)



class Activities(db.Model):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key=True)
    activity = db.Column(db.String(64))

    def __repr__(self):
        return '<Activities %r>' % (self.name)




class Links(db.Model):
    __tablename__ = 'links'

    id = db.Column(db.Integer, primary_key=True)
    URL = db.Column(db.String(100))
    
    def __repr__(self):
        return '<Links %r>' % (self.name)

