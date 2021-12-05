var Employeedb = require('../model/model');

// create and save new employee
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content cannot be emtpy."});
        return;
    }

    // new employee
    const employee = new Employeedb({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email
    })

    // save employee in the database
    employee
        .save(employee)
        .then(data => {
            //res.send(data)
            res.redirect('/add_employee');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Error occurred while creating an operation"
            });
        });

}

// Retrieve and return all employees/ retrieve and return a single employee
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Employeedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "No employee found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving employee id " + id})
            })

    }else{
        Employeedb.find()
            .then(employee => {
                res.send(employee)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error occurred while retriving employee information" })
            })
    }

    
}

// Update a new idetified employee by employee id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update cannot be empty"})
    }

    const id = req.params.id;
    Employeedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update employee with ${id}. Employee may not found.`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update with employee information"})
        })
}

// Delete employee with specified employee id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Employeedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Id maybe wrong`})
            }else{
                res.send({
                    message : "Employee was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete employee with id=" + id
            });
        });
}